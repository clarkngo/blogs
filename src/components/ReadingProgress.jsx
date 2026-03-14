import { useState, useEffect } from 'react';
import { useReadingStore } from '../store/useStore';
import './ReadingProgress.css';

function ReadingProgress({ postId, className = '' }) {
  const [progress, setProgress] = useState(0);
  const { setReadingProgress } = useReadingStore();

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(scrollPercent, 100));

      // Save progress to store if post ID is provided
      if (postId && scrollPercent > 5) { // Only save if user has scrolled a bit
        setReadingProgress(postId, scrollPercent / 100);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postId, setReadingProgress]);

  return (
    <div className={`reading-progress ${className}`}>
      <div
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgress;