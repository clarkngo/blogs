---
id: 6
title: "APIs Explained: An ELI5 and Practical Guide"
date: 2025-10-28
tags: [api, tutorial, tools]
author: "Clark Ngo"
excerpt: "A friendly, practical guide to APIs: what they are, a scenario that shows why they're useful, how to read API resources, prompt tips for working with APIs, and common FAQs."
---

# APIs Explained: An ELI5 and Practical Guide

## 1 — ELI5: What is an API?

Imagine your favorite restaurant. You sit at a table and look at a menu. The menu lists dishes (what you can ask for). The waiter takes your order, tells the kitchen what you want, and comes back with the food. In this analogy:

- The restaurant is a service (an app or server).
- The menu is the API documentation (what the service offers).
- The waiter is the API — the messenger that takes requests and brings back responses.

You don't need to go into the kitchen or know how the stove works to get your meal. You just use the menu and the waiter. That same idea makes APIs powerful: they let different programs talk to each other without needing to know how each one is built.

## 2 — A practical scenario (and why APIs matter)

Scenario: You're building a travel app that shows flight prices, hotel availability, and weather for the destination.

Why APIs help:

- Flight companies expose APIs that return available flights and prices.
- Hotels expose APIs for room availability.
- Weather services expose APIs for forecasts.

Instead of scraping websites or duplicating data, your travel app calls each service's API to fetch up-to-date info. Each provider maintains and secures their own data; your app simply requests and displays it. That separation keeps systems modular, reliable, and easier to update.

## 3 — Understanding API resources (the basics)

APIs are usually organized around "resources" — nouns like users, posts, flights, or hotels. Here are the key pieces to understand:

- Endpoints (URLs): Where you send requests. Example: `GET /flights` or `POST /bookings`.
- HTTP verbs (methods): Actions you perform.
  - GET — read data
  - POST — create
  - PUT/PATCH — update
  - DELETE — remove
- Parameters:
  - Path params: part of the URL (e.g., `/flights/{id}`).
  - Query params: ?from=NYC&to=SFO&date=2025-12-01
  - Body payload: JSON for POST/PUT requests.
- Authentication & Authorization: API keys, OAuth, JWTs that ensure only authorized clients can access resources.
- Responses & status codes:
  - 200-range: success (200 OK, 201 Created)
  - 400-range: client error (400 Bad Request, 401 Unauthorized, 404 Not Found)
  - 500-range: server error (500 Internal Server Error)
- Rate limits & quotas: limits on how often you can call the API.

How to approach a new API quickly:

1. Find the base URL and authentication method.
2. Look for a playground or example requests (curl/Postman/Playground).
3. Try a simple GET to list a resource (e.g., `GET /flights?from=NYC`).
4. Inspect a single resource (e.g., `GET /flights/123`) to see its fields.
5. Read error responses — they often tell you exactly what's missing.

## 3.1 — Typical API headers and why they matter

HTTP headers are metadata sent with requests and responses. They control authentication, content negotiation, caching, tracing, and more. Understanding common headers helps you interact with APIs reliably and debug issues faster.

- Authorization
  - Purpose: Carries credentials or tokens (who you are).
  - Example: `Authorization: Bearer <token>` for JWTs or OAuth2 access tokens.
  - Why it matters: Without valid credentials you'll get 401/403 responses.

- Content-Type
  - Purpose: Tells the server the media type of the request body.
  - Example: `Content-Type: application/json`
  - Why it matters: The server uses this to parse your payload (e.g., JSON vs form data).

- Accept
  - Purpose: Signals what response formats the client can handle.
  - Example: `Accept: application/json`
  - Why it matters: Helps the API pick a response format when multiple are supported.

- User-Agent
  - Purpose: Identifies the client software.
  - Example: `User-Agent: MyTravelApp/1.0`
  - Why it matters: Useful for analytics and sometimes for troubleshooting request blocking.

- X-Request-ID / X-Correlation-ID
  - Purpose: Unique IDs you include to trace a request end-to-end across services.
  - Example: `X-Request-ID: 6f1a2b3c-8d4e-11ea-bc55-0242ac130003`
  - Why it matters: When you report an error to an API provider, giving this ID lets them locate logs quickly.

- Cache-Control
  - Purpose: Controls caching behavior for responses.
  - Example: `Cache-Control: no-cache` or `Cache-Control: max-age=60`
  - Why it matters: Affects freshness; important when you expect live data.

- Rate limit headers (response headers)
  - Common examples: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
  - Why it matters: Lets clients back off or schedule retries before hitting quotas.

Example: a typical authenticated JSON POST request with headers

```bash
curl -X POST "https://api.example.com/bookings" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Request-ID: $(uuidgen)" \
  -d '{"flight_id": 123, "passenger": {"name":"Alice"}}'
```

Quick tips:

- Always include an `X-Request-ID` on critical requests so you can reference it with support teams.
- For public APIs, keep your `Authorization` credentials on a server (never embed secrets in client-side code).
- Inspect `X-RateLimit-Remaining` to avoid sudden 429 errors; implement exponential backoff on 429/5xx responses.

## 4 — Prompts and examples to help you work with APIs (use with an LLM)

The right prompts make an LLM a powerful assistant for learning and working with APIs. Here are practical prompt templates you can copy:

- Understand an endpoint:

  "I have an API endpoint `GET /users/{id}` that returns JSON like {id, name, email}. Explain what this endpoint does, what parameters it needs, and give an example curl command."

- Translate docs into a simple guide:

  "Summarize the authentication steps for this API: [paste auth doc]. Provide a minimal code example in JavaScript using fetch to authenticate and call `GET /profile`."

- Generate a typed request example:

  "Create a TypeScript type for the response from `GET /flights/{id}` given this JSON example: {"id":123,"airline":"X","from":"NYC","to":"SFO","price":199}. Then write a fetch example that types the response."

- Debug an error response:

  "I called `POST /bookings` and got a 400 with body {error: 'missing_field', details: 'passenger.name required'}. Explain probable causes and suggest a fix."

- Create Postman/curl from OpenAPI:

  "Given this OpenAPI fragment: [paste], generate a curl example to call the endpoint that creates a booking."

Tips when prompting:

- Paste small snippets of the API response or the relevant part of the docs — not the entire spec.
- Ask for a concrete example in the language you use (fetch, axios, curl, Python requests).
- Ask the model to explain both the happy path and common failure modes.

## 5 — Quick checklist for testing an API manually

1. Authenticate and confirm a 200/201 response for a known-good call.
2. Try invalid input to see error responses (helps understand validation).
3. Check rate-limiting headers or behavior.
4. Inspect response fields for nested resources and IDs to follow links.
5. Verify idempotency for safe retries (GET/PUT vs POST).

## 6 — FAQs

- Q: REST vs GraphQL — which should I use?

  A: REST is simple and widely supported: useful when endpoints map neatly to resources. GraphQL is powerful when clients need flexible queries and want to reduce over/under-fetching. Choose GraphQL for complex client-driven queries; choose REST for simplicity and broad tooling.

- Q: How do I authenticate securely?

  A: Prefer short-lived tokens, use OAuth for user-level access, and store secrets on the server (not in client-side code). When building clients, use a backend to hold credentials and mint short-lived tokens for frontends.

- Q: What does a 401 vs 403 mean?

  A: 401 Unauthorized means no valid authentication. 403 Forbidden means you are authenticated but don't have permission.

- Q: How do I discover what fields a resource has?

  A: Fetch a single resource (e.g., `GET /flights/123`) or look at an OpenAPI/Swagger schema. Many APIs include example responses in their docs.

- Q: How do I handle pagination?

  A: Look for pagination parameters (page/limit, offset) or links in response headers (Link header). Implement client-side logic to follow next links or increment pages until done.

## Wrap-up

APIs are the building blocks of modern apps — they let services share data and capabilities cleanly. Start simple: try a GET on a public endpoint, inspect the JSON, and iterate. Use the prompt templates above to have an LLM convert docs into runnable examples, and keep a short checklist handy when you test new endpoints.

If you'd like, I can:

- Add a runnable code sample in your preferred language (JS, Python, curl).
- Generate a Postman collection or OpenAPI example for a sample service.
- Produce a short cheat-sheet you can pin while you explore APIs.

Which of those would you like next?
