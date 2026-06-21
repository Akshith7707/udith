import { animate, inView, stagger } from 'motion';

const APPLE_EASE = [0.25, 0.1, 0.25, 1];
const APPLE_EASE_OUT = [0.16, 1, 0.3, 1];

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function revealOnScroll(element, { delay = 0, y = 12, duration = 0.6 } = {}) {
  if (!element) return () => {};
  if (prefersReducedMotion()) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    return () => {};
  }
  return inView(
    element,
    () => {
      animate(
        element,
        { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] },
        { duration, delay, easing: APPLE_EASE_OUT },
      );
    },
    { amount: 0.15 },
  );
}

export function staggerReveal(elements, { gap = 0.05, y = 12, duration = 0.6 } = {}) {
  if (!elements || elements.length === 0) return () => {};
  if (prefersReducedMotion()) {
    elements.forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return () => {};
  }
  return animate(
    elements,
    { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] },
    { duration, delay: stagger(gap), easing: APPLE_EASE_OUT },
  );
}

export function pageEnter(element, { duration = 0.45 } = {}) {
  if (!element) return;
  if (prefersReducedMotion()) {
    element.style.opacity = '1';
    return;
  }
  animate(
    element,
    { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0px)'] },
    { duration, easing: APPLE_EASE },
  );
}

export function countUp(element, target, { duration = 1.2, suffix = '' } = {}) {
  const display = (v) => `${Math.round(v)}${suffix}`;
  if (!element || prefersReducedMotion()) {
    if (element) element.textContent = display(target);
    return;
  }
  animate(0, target, {
    duration,
    easing: APPLE_EASE_OUT,
    onUpdate: (v) => {
      element.textContent = display(v);
    },
  });
}

export { APPLE_EASE, APPLE_EASE_OUT };
