---
id: 9
title: "Many Wouldn't Like This: Hiring an AI Engineer — A Practical Checklist"
date: 2025-11-16
tags: [ai, hiring, systems, architecture]
author: "Clark Ngo"
excerpt: "What I really want to know from an AI engineer candidate — end-to-end system design, costs, latency, determinism, embeddings, MLOps, fallbacks and more (no flashy agents)."
---

This is a practical, engineer-forward checklist and a set of model answers I use when hiring AI engineers. I’m less interested in toy RAG demos and more in whether the candidate understands end-to-end systems, trade-offs, and how to ship something resilient.

Below are concise, battle-tested answers and a small "contract" I expect the candidate to state when proposing a design.

Contract (inputs / outputs / success criteria)
- Inputs: raw user content (text, files), incremental user behavior events, metadata (IDs, timestamps), external knowledge sources.
- Outputs: ranked retrieval candidates, final generated responses, latency/quality SLAs, usage & cost metrics.
- Success: p95 latency < X ms (role-dependent), recall@k & MRR meet product thresholds, cost per 1k queries within budget, safe degradations on failure.

Edge cases I expect them to call out
- Empty or malformed user inputs; corrupted files.
- Distributional shift (new formats, new locales, new sensors).
- Partial downstream failures (vector DB unavailable, model OOM).
- Cost runaway due to bad prompts loops or abusive clients.

1) Can you design a system end-to-end? From ingestion to serving — what are the bottlenecks?
- Minimal architecture:
  - Ingestion: upload API (validate, sanitize, extract text/metadata). Workers for OCR, PDF parsing, media transcription.
  - Preprocess: normalize tokens, chunking, embedding generation pipeline.
  - Storage: blob store for raw assets; SQL for metadata; vector index for embeddings.
  - Indexing: build/refresh vector index (HNSW, IVF+PQ for large corpora).
  - Retrieval: ANN lookup → reranker (cross-encoder or cheap bi-encoder) → final candidate set.
  - Orchestration: router decides retrieval-only vs LM generation; LLM prompt assembly; response post-processing & safety filters.
  - Serving: model inference (hosted or self-hosted), caching, API layer, observability.
- Common bottlenecks:
  - Embedding generation (throughput when backfilling or re-embedding large corpora).
  - ANN index rebuild and memory footprint for large indexes.
  - LLM inference cost and latency (especially for large models & long contexts).
  - Reranker throughput if using expensive cross-encoders for each query.

2) How would you estimate costs? How to reduce it?
- Cost model components:
  - Storage (blobs, DBs, embeddings): GB-month.
  - Indexing: CPU/memory for building indexes and background jobs.
  - Inference: token-based pricing (for hosted) or instance-hours / GPU-hours (self-hosted).
  - Data pipelines & bandwidth.
- Estimation approach: multiply expected QPS * average tokens per request * cost per token (or GPU hour cost amortized). Add storage and background job costs.
- Cost reduction strategies:
  - Cache popular queries & responses (CDN + LRU local cache).
  - Multi-tier model usage: cheap model for most queries, expensive model for fallback/complex queries.
  - Distillation & quantization (8-bit / 4-bit); use quantized weights + bitsandbytes.
  - Reuse embeddings and avoid re-embedding unchanged docs.
  - Batching: batch inference where latency permit.
  - Limit max tokens and use concise prompts / instruction tuning to be efficient.

3) How would you reduce latency? Good tradeoff of latency vs quality?
- Reducing latency:
  - Use smaller distilled models or cached completion for known queries.
  - Use faster inference stacks: Triton, vLLM, NVIDIA TensorRT, or optimized CPU runtimes for quantized models.
  - Pre-compute heavy work: embeddings, retriever reranking candidates offline where possible.
  - Asynchronous early return: return retrieval-only answer quickly and complete generation in background (update when ready).
  - Shard index across machines and use in-memory indexes (mmap/ram) tuned for p95.
- Latency vs quality tradeoff:
  - Define tiers: immediate (p95 low, retrieval-only, lower quality), interactive (reranker + mid-size model), deep (large model, high cost/latency for critical tasks).
  - Set product SLOs. E.g., if user expectation is <300ms, prefer retrieval + concise LM.

4) Do you really need self-hosted LLMs? When is it needed?
- Use hosted APIs for speed of development, safety infra, and occasional heavy lifting. Self-host when:
  - Cost at scale favors owning GPUs and quantized inference.
  - Data residency / compliance requires models & data stay on-prem or in VPC.
  - You need custom fine-tuning or control over model internals (plugins, custom kernels).
  - Low-latency edge deployment (private inference near users).
- Hybrid approach is common: hosted for baseline, self-hosted for high-volume or sensitive workloads.

5) How would you fine-tune language models on user behavior? Which framework? What about model serving?
- Process:
  - Collect signal: explicit feedback, clicks, satisfaction, session transcripts.
  - Build supervised dataset: (prompt, desired_response) pairs. Use weight decay for older examples.
  - Use SFT (supervised fine-tuning) first; later consider RLHF or preference models for optimizing UX metrics.
- Frameworks:
  - Training: Hugging Face Transformers + Accelerate / DeepSpeed for scale. Use PEFT (LoRA, AdaLoRA) to reduce GPU needs.
  - For preference learning: use reward models + PPO (TrlX library) cautiously.
  - For embeddings training: sentence-transformers (SBERT) with contrastive/triplet losses.
- Model serving:
  - CI/CD for models (model registry with versions). Canary deploy new weights.
  - Use specialized inference servers: vLLM, Triton, TorchServe, Ray Serve, or Hugging Face Inference Endpoints.
  - Support model-level autoscaling and request-level batching.

6) How would you construct the dataset, what about loss function? What about MLOps?
- Dataset construction:
  - Ingestion → dedupe → normalize → chunk & add metadata.
  - Labeling: human annotation for high-quality signals, and weak supervision for large volume.
  - Balance dataset for long-tail domains and outliers.
- Loss functions:
  - Generation: cross-entropy next-token loss for SFT.
  - Ranking/contrastive: InfoNCE / contrastive loss for embedding models.
  - Reranker: cross-entropy over pairs or listwise losses for ranking.
  - Preference learning: cross-entropy over pairs, or policy-gradient (PPO) on reward model.
- MLOps:
  - Data versioning (DVC, LakeFS), pipelines (Airflow/Prefect), model registry (MLflow or HF hub), infra IaC for reproducibility.
  - Automated validation: unit tests for data, model sanity checks, bias checks, and integration tests.
  - Monitoring & drift detection: population / covariate shifts, label/feedback lag.

7) Which database would you use and why? Vector DB? SQL? NoSQL?
- Hybrid recommendation:
  - SQL (Postgres) for transactional metadata, ACID guarantees, and complex joins.
  - Vector DB (Milvus, Qdrant, Weaviate, Pinecone) for ANN retrieval; choose one with snapshot/backup and multi-tenancy.
  - NoSQL (Mongo/Cassandra) for flexible document storage if you need schema-on-read or high write throughput.
  - Use Postgres + pgvector for small-to-medium scale (simpler stack). Move to Milvus/FAISS-backed service at scale.

8) What metrics would you track? How?
- Observability metrics:
  - Latency p50/p95/p99 per endpoint, error rates, queue sizes.
  - Cost metrics: cost per request, GPU utilization.
  - Quality metrics: recall@k, MRR, nDCG, BLEU/ROUGE where applicable; user-facing: satisfaction, CTR, task success.
  - Model-specific: calibration, token perplexity, hallucination rate (via sampling & human eval).
  - Data drift metrics: feature distribution distance (KL, Wasserstein), embedding drift.
- Tooling: Prometheus + Grafana, ELK for logs, Datadog for full-stack, SLOs with alerting.

9) What about system monitoring? How to debug failure cases?
- Monitoring and debugging:
  - Structured logging with correlation IDs and traces (OpenTelemetry, Jaeger).
  - Request replay tooling: record requests + retriever+prompt state so you can replay exactly.
  - Canary & shadow testing: route a small percentage to new models; shadow traffic to test infra.
  - Root cause checklist: reproduce locally, compare embeddings + ANN results, validate reranker scores, run model locally with same weights and prompt.

10) Feedback loop: tracking & evaluation
- Loop:
  - Capture signals: explicit (thumbs up/down), implicit (clicks/time-to-first-action), hard outcomes (task success).
  - Offline evaluation: compute counterfactual metrics on logged data.
  - Online evaluation: A/B tests with guardrails.
  - Continuous learning: queue high-value feedback for human review → add to training corpus → retrain periodically.

11) How would you make the system more deterministic?
- Techniques for determinism:
  - Use deterministic tokenization and set random seed across RNGs.
  - For generation: set temperature=0 and use greedy decoding or beam search with fixed seed.
  - Use fixed model weights, disable dropout at inference, ensure library versions pinned.
  - Deterministic retrieval: sort candidates by deterministic key when scores tie; use stable ANN index seed and deterministic index construction.

12) How to replace embedding models and backfill embeddings without downtime?
- Versioned embeddings & zero-downtime strategy:
  - Store embeddings with version tag (embedding_v1, embedding_v2).
  - During backfill, write new vectors to a parallel index (index_v2) while serving index_v1.
  - Use an index alias or router that can read from both indexes (first probe v2, fallback to v1) or run dual-retrieval and merge results with weighted scores.
  - After backfill and validation, flip alias to v2 atomically. Keep v1 for rollback.
  - For memory-heavy indexes, backfill incrementally by segment and use warm-up queries to populate caches.

13) What are fallback mechanisms?
- Fallback layers (degrade gracefully):
  - Retrieval-only answer (no LLM) when model is unavailable.
  - Cached best-known response for repeated queries.
  - Rule-based templates or FAQ when hallucination risk is high.
  - Human-in-the-loop escalation for high-stakes scenarios.

My favourite deeper questions (what I actually ask candidates)
1️⃣ How would you solve this problem without LLMs or vector DBs?
- Use classical IR: BM25 / TF-IDF + document parsing + heuristics + structured data and knowledge graphs. Often combined with templates and rules. This can be more robust and cost-effective for many product problems.

2️⃣ Can you solve it with classical IR, rules, heuristics?
- Yes. Example: FAQ system → candidate passages with BM25, exact-match boosting, answer templates. Add heuristics for dates, numbers, and code blocks. Only escalate to LLM for complex synthesis.

3️⃣ How would you make the system more deterministic?
- See point 11 above — prefer greedy/beam decoding, seed everything, disable nondeterministic ops (cuDNN nondeterminism), and pin libraries.

4️⃣ Can you explain tokenization and embeddings from scratch?
- Tokenization: convert raw text into discrete tokens — byte-pair encoding (BPE) or unigram/subword splits. Tokenizers trade off sequence length vs vocabulary size. Deterministic tokenization is key for stable embeddings.
- Embeddings: map tokens (or chunks) into dense vector space where semantic similarity corresponds to vector similarity. Trained with contrastive or next-sentence objectives; used for ANN retrieval.

5️⃣ What happens during fine-tuning? optimizer, learning rate, layer freezing?
- Typical recipe:
  - Optimizer: AdamW.
  - LR schedule: warmup + cosine or linear decay.
  - Batch size: as large as the GPU memory allows; accumulate gradients if needed.
  - Layer freezing: freeze lower layers for small data regimes; tune selectively.
  - PEFT (LoRA): inject low-rank adapters to update fewer params, faster and cheaper.
  - Regularization: weight decay, early stopping, validation on offline human-labeled metrics.

Quick practical checklist for interviews
- Ask candidate to sketch an architecture on a whiteboard, call out bottlenecks and SLOs, name the libraries they’d use and why.
- Ask cost estimation for a given QPS and tokens/request.
- Ask how to validate a reranker locally and how to replay a failing request.
- Ask them to write the small contract above and 2-3 deterministic tests they would add.

Final note
- I prefer engineers who know fundamentals (IR, systems, distributed infra, cost modeling) and can apply those fundamentals to LLMs. When hiring, look for people who can trade off simplicity and robustness over novelty.

If you want, I’ll add this as a new post entry on the site (I already will), shorten the title/slug, or create an accompanying `public/posts/<slug>/hero.jpg` image. I can also generate a one-page hiring rubric based on these questions.
