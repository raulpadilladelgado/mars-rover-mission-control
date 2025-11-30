import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device has touch capabilities
 * @returns boolean indicating if device supports touch
 */
export const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch events
    const hasTouchSupport = 
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - for older browsers
      navigator.msMaxTouchPoints > 0;

    setIsTouchDevice(hasTouchSupport);
  }, []);

  return isTouchDevice;
};
