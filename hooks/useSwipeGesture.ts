import { useState, useRef, TouchEvent } from 'react';
import { Direction } from '../types';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

interface SwipePosition {
  x: number;
  y: number;
}

/**
 * Hook to detect swipe gestures on touch devices
 * @param onSwipe - Callback function called when a swipe is detected
 * @param minSwipeDistance - Minimum distance in pixels to register as a swipe (default: 50)
 * @returns Touch event handlers to attach to the element
 */
export const useSwipeGesture = (
  onSwipe: (direction: Direction) => void,
  minSwipeDistance: number = 50
): SwipeHandlers => {
  const [touchStart, setTouchStart] = useState<SwipePosition | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const distanceX = touchEndX - touchStart.x;
    const distanceY = touchEndY - touchStart.y;
    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(distanceY);

    // Determine if swipe is horizontal or vertical
    if (absDistanceX > absDistanceY) {
      // Horizontal swipe
      if (absDistanceX > minSwipeDistance) {
        if (distanceX > 0) {
          onSwipe('E'); // Swipe right
        } else {
          onSwipe('W'); // Swipe left
        }
      }
    } else {
      // Vertical swipe
      if (absDistanceY > minSwipeDistance) {
        if (distanceY > 0) {
          onSwipe('S'); // Swipe down
        } else {
          onSwipe('N'); // Swipe up
        }
      }
    }

    setTouchStart(null);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};
