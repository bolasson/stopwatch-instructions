import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 150) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      const scrollPosition = window.scrollY + offset;

      for (const id of [...sectionIds].reverse()) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};
