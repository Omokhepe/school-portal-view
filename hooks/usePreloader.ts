// hooks/usePreloader.ts

import { useState, useEffect } from "react";

interface UsePreloaderOptions {
  /**
   * Duration of the preloader in seconds
   * @default 3
   */
  duration?: number;

  /**
   * Minimum display time in seconds (prevents flash on fast loads)
   * @default 2
   */
  minDisplayTime?: number;

  /**
   * Enable session storage to show preloader only once per session
   * @default false
   */
  sessionPersist?: boolean;

  /**
   * Session storage key
   * @default "preloader-shown"
   */
  sessionKey?: string;
}

interface UsePreloaderReturn {
  /**
   * Whether to show the preloader
   */
  showPreloader: boolean;

  /**
   * Current loading progress (0-100)
   */
  progress: number;

  /**
   * Whether the preloader has completed
   */
  isComplete: boolean;

  /**
   * Manually complete the preloader
   */
  complete: () => void;

  /**
   * Reset the preloader
   */
  reset: () => void;
}

export const usePreloader = (
  options: UsePreloaderOptions = {},
): UsePreloaderReturn => {
  const {
    duration = 3,
    minDisplayTime = 2,
    sessionPersist = false,
    sessionKey = "preloader-shown",
  } = options;

  const [showPreloader, setShowPreloader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Check if preloader should be skipped (session persist)
    if (sessionPersist && typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem(sessionKey);
      if (hasShown) {
        setShowPreloader(false);
        setIsComplete(true);
        setProgress(100);
        return;
      }
    }

    // Progress animation
    const totalSteps = duration * 60; // 60 fps
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }

        return newProgress;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [duration, sessionPersist, sessionKey]);

  useEffect(() => {
    // Complete preloader when progress reaches 100
    if (progress >= 100) {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        setIsComplete(true);

        // Small delay before hiding
        setTimeout(() => {
          setShowPreloader(false);

          // Store in session if persist is enabled
          if (sessionPersist && typeof window !== "undefined") {
            sessionStorage.setItem(sessionKey, "true");
          }
        }, 600); // Match exit animation duration
      }, remainingTime * 1000);
    }
  }, [progress, startTime, minDisplayTime, sessionPersist, sessionKey]);

  const complete = () => {
    setProgress(100);
    setIsComplete(true);
    setTimeout(() => {
      setShowPreloader(false);
    }, 600);
  };

  const reset = () => {
    setProgress(0);
    setIsComplete(false);
    setShowPreloader(true);
    if (sessionPersist && typeof window !== "undefined") {
      sessionStorage.removeItem(sessionKey);
    }
  };

  return {
    showPreloader,
    progress,
    isComplete,
    complete,
    reset,
  };
};
