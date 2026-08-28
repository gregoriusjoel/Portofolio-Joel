import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 28,
  itemScale = 0.03,
  itemStackDistance = 16,
  stackPosition = 90, // px from top
  baseScale = 0.82,
  blurAmount = 0
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);

  const updateCardScales = useCallback(() => {
    if (!cardsRef.current.length) return;

    const cards = cardsRef.current;
    const n = cards.length;

    cards.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardStickyTop = stackPosition + i * itemStackDistance;

      // Calculate how much subsequent cards are scrolling over card i
      let subsequentDepth = 0;

      for (let j = i + 1; j < n; j++) {
        const nextCard = cards[j];
        if (!nextCard) continue;

        const nextRect = nextCard.getBoundingClientRect();
        const nextStickyTop = stackPosition + j * itemStackDistance;
        // The distance over which nextCard transitions from approaching to fully stacked
        const triggerDistance = Math.max(160, (nextCard.offsetHeight || 300) * 0.75);

        // Smooth continuous 0 to 1 progress
        const rawProgress = (nextStickyTop + triggerDistance - nextRect.top) / triggerDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));

        subsequentDepth += progress;
      }

      // Smooth cubic easing for natural deceleration
      const smoothDepth = Math.pow(subsequentDepth, 0.95);
      const scale = Math.max(baseScale, 1 - smoothDepth * itemScale);
      const blur = blurAmount > 0 ? smoothDepth * blurAmount : 0;

      card.style.transform = `scale(${scale.toFixed(4)})`;
      if (blurAmount > 0) {
        card.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : 'none';
      }
    });
  }, [itemScale, itemStackDistance, stackPosition, baseScale, blurAmount]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.setProperty('--stack-top', `${stackPosition}px`);
      card.style.setProperty('--stack-offset', `${i * itemStackDistance}px`);
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    // Setup Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.3,
      infinite: false
    });

    lenis.on('scroll', updateCardScales);

    const raf = time => {
      lenis.raf(time);
      updateCardScales();
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;

    // Window scroll listener fallback
    window.addEventListener('scroll', updateCardScales, { passive: true });
    window.addEventListener('resize', updateCardScales, { passive: true });
    updateCardScales();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('scroll', updateCardScales);
      window.removeEventListener('resize', updateCardScales);
      cardsRef.current = [];
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, updateCardScales]);

  return (
    <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
      {children}
      <div className="scroll-stack-end" />
    </div>
  );
};

export default ScrollStack;
