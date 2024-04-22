import React, { useRef, useCallback, useEffect } from 'react';
import { ic_angle_up_solid } from '../../assets/index';
import './ScrollToTop.scss';

const ScrollToTop = ({ thresholdTop = 100 }) => {
  const rootRef = useRef(null);
  const debounceTimer = useRef(null);

  const handleClick = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const showOrHideBackToTopButton = useCallback(() => {
    if (
      document.body.scrollTop > thresholdTop ||
      document.documentElement.scrollTop > thresholdTop
    ) {
      rootRef.current.style.display = 'block';
    } else {
      rootRef.current.style.display = 'none';
    }
  }, [thresholdTop]);

  const handleScroll = useCallback(() => {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(() => {
      showOrHideBackToTopButton();
    }, 100);
  }, [showOrHideBackToTopButton]);

  useEffect(() => {
    showOrHideBackToTopButton();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showOrHideBackToTopButton, handleScroll]);

  return (
    <div className="scroll-to-top" ref={rootRef} onClick={handleClick}>
      <img
        className="icon"
        src={ic_angle_up_solid}
        alt="angle up"
        width="15"
        height="15"
      />
    </div>
  );
};

export default ScrollToTop;
