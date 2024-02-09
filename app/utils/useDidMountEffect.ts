import { useEffect, useRef, useState } from 'react';

export const useDidMountEffect = () => {
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  return () => mountRef.current;
};
