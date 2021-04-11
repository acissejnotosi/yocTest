import React, { useEffect, useState } from 'react';

type Root = Element | Document | null;

type RootMargin = string;

type Threshold = number | number[];

export function useIntersectionObserver(ref: React.RefObject<HTMLVideoElement>, root: Root, rootMargin: RootMargin, threshold: Threshold): boolean {

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const intersectionObserverCallback: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    const currentRef = ref.current;
    const options: IntersectionObserverInit = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    }
    const observer = new IntersectionObserver(intersectionObserverCallback, options);
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.observe(currentRef);
    }
  }, [ref, root, rootMargin, threshold])

  return isVisible


}
