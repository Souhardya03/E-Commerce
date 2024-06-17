import React, { useEffect, useRef } from 'react';
import './Scrollbarstyle.css';

const CustomScrollContainer = ({ children }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let hideTimeout;

    const showScrollbar = () => {
      scrollContainer.classList.remove('hidden-scrollbar');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hideScrollbar, 2000); // 2 seconds delay before hiding
    };

    const hideScrollbar = () => {
      scrollContainer.classList.add('hidden-scrollbar');
    };

    scrollContainer.addEventListener('scroll', showScrollbar);

    // Initially hide the scrollbar
    hideScrollbar();

    // Cleanup event listener on component unmount
    return () => {
      scrollContainer.removeEventListener('scroll', showScrollbar);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="scroll-container hidden-scrollbar">
      {children}
    </div>
  );
};

export default CustomScrollContainer;
