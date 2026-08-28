import React, { useRef, useState, useCallback, useEffect } from 'react';
import './OptionWheel.css';

const OptionWheel = ({
  items = [],
  defaultSelected = 0,
  onChange,
  onItemSelect,
  textColor = 'rgba(255, 255, 255, 0.4)',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 2.2,
  spacing = 1.45,
  curve = 0.8,
  tilt = 6,
  blur = 1,
  fade = 0.45,
  minOpacity = 0.1,
  inset = 24,
  loop = false,
  draggable = true,
  className = ''
}) => {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const rafRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const onItemSelectRef = useRef(onItemSelect);
  const selectedRef = useRef(defaultSelected);
  const dragRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  const remPx = typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16;

  onChangeRef.current = onChange;
  onItemSelectRef.current = onItemSelect;

  const itemLabels = items.map(item => (typeof item === 'object' && item !== null ? item.label || item.name : item));

  cfgRef.current = {
    count: items.length,
    items,
    itemLabels,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    draggable
  };

  // Render items at current pos
  const renderItems = useCallback((currentPos) => {
    const cfg = cfgRef.current;
    const els = itemRefs.current;
    const n = cfg.count;
    const mirror = cfg.side === 'right' ? -1 : 1;
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - currentPos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);
      let x = 0;
      let y = d * cfg.rowH;
      let rot = 0;
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        y = R * Math.sin(ang);
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%), 0) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter = cfg.blur > 0 && dist > 0.2 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none';
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }
  }, []);

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - (lastFrameTimeRef.current || now)) / 1000, 0.05);
    lastFrameTimeRef.current = now;
    const cfg = cfgRef.current;

    // While dragging, position is 1:1 real-time directly from mouse/finger
    if (dragRef.current) {
      renderItems(posRef.current);
      rafRef.current = requestAnimationFrame(runFrame);
      return;
    }

    // Apply inertial velocity decay
    if (Math.abs(velocityRef.current) > 0.002) {
      posRef.current += velocityRef.current;
      targetRef.current = posRef.current;
      velocityRef.current *= 0.90; // smooth natural friction

      if (!cfg.loop) {
        if (posRef.current < 0) {
          posRef.current = 0;
          velocityRef.current = 0;
          targetRef.current = 0;
        } else if (posRef.current > cfg.count - 1) {
          posRef.current = cfg.count - 1;
          velocityRef.current = 0;
          targetRef.current = cfg.count - 1;
        }
      }

      if (Math.abs(velocityRef.current) <= 0.002) {
        velocityRef.current = 0;
        targetRef.current = Math.round(posRef.current);
      }
    } else {
      // Smooth snap to target rounded integer
      const cur = posRef.current;
      const target = targetRef.current;
      const step = (target - cur) * (1 - Math.exp(-dt / 0.12));
      posRef.current = Math.abs(target - cur) < 0.001 ? target : cur + step;
    }

    renderItems(posRef.current);

    // Update selected index notification continuously in real time
    const nearestIdx = Math.max(0, Math.min(cfg.count - 1, Math.round(posRef.current)));
    if (nearestIdx !== selectedRef.current) {
      selectedRef.current = nearestIdx;
      setSelectedIndex(nearestIdx);
      onChangeRef.current?.(nearestIdx, cfg.items[nearestIdx]);
    }

    const isSettled = Math.abs(targetRef.current - posRef.current) < 0.001 && Math.abs(velocityRef.current) < 0.001;
    if (!isSettled) {
      rafRef.current = requestAnimationFrame(runFrame);
    } else {
      rafRef.current = null;
    }
  }, [renderItems]);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastFrameTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  // Set target and start animation
  const snapTo = useCallback((index) => {
    const cfg = cfgRef.current;
    let target = Math.max(0, Math.min(cfg.count - 1, index));
    targetRef.current = target;
    velocityRef.current = 0;
    startLoop();
  }, [startLoop]);

  // Mouse wheel scroll listener
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let wheelTimer;

    const onWheel = (e) => {
      e.preventDefault();
      const cfg = cfgRef.current;
      const step = e.deltaY / (cfg.rowH * 1.5);
      velocityRef.current = 0;
      targetRef.current = Math.max(0, Math.min(cfg.count - 1, targetRef.current + step));
      startLoop();

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        targetRef.current = Math.round(targetRef.current);
        startLoop();
      }, 100);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [startLoop]);

  // Direct 1:1 Instant Pointer / Touch Dragging
  const handlePointerDown = useCallback((e) => {
    if (!cfgRef.current.draggable) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const now = performance.now();
    velocityRef.current = 0;
    lastPointerYRef.current = e.clientY;
    lastPointerTimeRef.current = now;

    dragRef.current = {
      startY: e.clientY,
      startPos: posRef.current,
      moved: false,
      pointerId: e.pointerId
    };

    isDraggingRef.current = false;
    setIsDragging(true);
    startLoop();
  }, [startLoop]);

  const handlePointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag) return;

    const now = performance.now();
    const dy = e.clientY - drag.startY;
    const dt = now - lastPointerTimeRef.current;

    if (!drag.moved && Math.abs(dy) > 3) {
      drag.moved = true;
      isDraggingRef.current = true;
    }

    if (drag.moved) {
      const cfg = cfgRef.current;
      const deltaPos = dy / cfg.rowH;
      let newPos = drag.startPos - deltaPos;

      // Elastic boundary resistance when dragging out of bounds
      if (!cfg.loop) {
        if (newPos < 0) {
          newPos = newPos * 0.3;
        } else if (newPos > cfg.count - 1) {
          const over = newPos - (cfg.count - 1);
          newPos = (cfg.count - 1) + over * 0.3;
        }
      }

      posRef.current = newPos;
      targetRef.current = newPos;

      // Track instant velocity for natural release momentum
      if (dt > 10) {
        const instantDelta = -(e.clientY - lastPointerYRef.current) / cfg.rowH;
        velocityRef.current = (instantDelta / dt) * 16; // normalized 60fps velocity
        lastPointerYRef.current = e.clientY;
        lastPointerTimeRef.current = now;
      }
    }
  }, []);

  const handlePointerUp = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag) return;
    try {
      e.currentTarget.releasePointerCapture(drag.pointerId);
    } catch {}

    dragRef.current = null;
    setIsDragging(false);

    // If there is fling velocity, let it coast; otherwise snap to nearest integer
    if (Math.abs(velocityRef.current) > 0.02) {
      startLoop();
    } else {
      velocityRef.current = 0;
      targetRef.current = Math.max(0, Math.min(cfgRef.current.count - 1, Math.round(posRef.current)));
      startLoop();
    }
  }, [startLoop]);

  // Click on item
  const handleItemClick = useCallback((index) => {
    if (isDraggingRef.current) return;
    snapTo(index);
    onItemSelectRef.current?.(index, cfgRef.current.items[index]);
  }, [snapTo]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    let delta = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1;
    if (delta !== 0) {
      e.preventDefault();
      snapTo(Math.round(targetRef.current) + delta);
    }
  }, [snapTo]);

  // Synchronize on defaultSelected change
  useEffect(() => {
    snapTo(defaultSelected);
  }, [defaultSelected, snapTo]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={`option-wheel${side === 'right' ? ' option-wheel--right' : ''}${isDragging ? ' option-wheel--dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ow-text-color': textColor,
        '--ow-active-color': activeColor,
        '--ow-font-size': `${fontSize}rem`,
        '--ow-inset': `${inset}px`,
        touchAction: 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => {
        const label = typeof item === 'object' && item !== null ? item.label || item.name : item;
        return (
          <div
            key={`${label}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            role="option"
            aria-selected={selectedIndex === index}
            className={`option-wheel__item${selectedIndex === index ? ' option-wheel__item--selected' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default OptionWheel;
