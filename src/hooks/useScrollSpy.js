import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (partIds, offset = 150) => {
  const [activeId, setActiveId] = useState(partIds[0]);
  const isUpdating = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isUpdating.current) return;
      isUpdating.current = true;

      requestAnimationFrame(() => {
        const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        
        if (isBottom) {
          setActiveId(partIds[partIds.length - 1]);
        } else {
          const scrollPosition = window.scrollY + offset;

          for (const id of [...partIds].reverse()) {
            const element = document.getElementById(id);
            if (element && element.offsetTop <= scrollPosition) {
              setActiveId(id);
              break;
            }
          }
        }
        isUpdating.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [partIds, offset]);

  return activeId;
};
