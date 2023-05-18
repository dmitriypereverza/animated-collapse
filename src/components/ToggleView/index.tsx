import React, {
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.scss";

function isFunction(fn: any): fn is Function {
  return typeof fn === "function";
}
function useForceUpdate() {
  const [, set] = useState({});
  return useCallback(() => set({}), []);
}
function easeInOut(progress: number) {
  return progress > 0.5
    ? 4 * Math.pow(progress - 1, 3) + 1
    : 4 * Math.pow(progress, 3);
}

interface ToggleViewInterface {
  children: ReactNode | ((ref: Ref<any>) => ReactNode);
  enableFakeDateOnClose?: boolean;
  isActive?: boolean;
  animateTime?: number;
}

const ToggleView = function ({
  children,
  enableFakeDateOnClose = true,
  isActive = true,
  animateTime = 500,
}: ToggleViewInterface) {
  const wrapperRef = useRef<HTMLElement | any>(null);
  const childrenRef = useRef<HTMLElement | any>(null);
  const mirrorHtml = useRef<string | any>(null);
  const transitionStats = useRef({ from: 0, to: 0, startTime: 0 });
  const forceUpdate = useForceUpdate();

  const startAnimation = useCallback(() => {
    const now = Date.now();
    const finishTime = transitionStats.current.startTime + animateTime;
    const timePassed = now - transitionStats.current.startTime;

    if (now > finishTime) {
      wrapperRef.current.style.height = transitionStats.current.to;
      transitionStats.current.from = transitionStats.current.to;

      if (transitionStats.current.to > 0) {
        wrapperRef.current.style.overflow = "";
      }
      if (transitionStats.current.to === 0) {
        mirrorHtml.current = null;
        forceUpdate();
      }
      return;
    }

    const distanceUnit =
      (transitionStats.current.to - transitionStats.current.from) / 100;
    const progress = timePassed / animateTime;

    wrapperRef.current.style.height =
      transitionStats.current.from +
      easeInOut(progress) * 100 * distanceUnit +
      "px";
    requestAnimationFrame(startAnimation);
  }, []);

  const update = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!isActive || !childrenRef.current) return;
      const height = entries
        .map((entry) => entry.contentRect.height)
        .reduce((acc, res) => acc + res, 0);

      if (height !== transitionStats.current.to) {
        transitionStats.current.from =
          parseFloat(wrapperRef.current.style.height) || 0;
        transitionStats.current.to = height;
        transitionStats.current.startTime = Date.now();
        startAnimation();
      }

      if (enableFakeDateOnClose) {
        wrapperRef.current.style.overflow = "hidden";
        mirrorHtml.current = childrenRef.current.outerHTML as string;
      }
    },
    [enableFakeDateOnClose, isActive]
  );

  useEffect(() => {
    if (!childrenRef.current || !isActive) return;
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(childrenRef.current);
    return () => resizeObserver.disconnect();
  }, [isActive, update]);

  return (
    <div ref={wrapperRef} className={styles.transitionHeightStyles}>
      {enableFakeDateOnClose && !children && (
        <div dangerouslySetInnerHTML={{ __html: mirrorHtml.current }} />
      )}
      {isFunction(children) ? (
        children(childrenRef)
      ) : (
        <div className={styles.innerDivStyles} ref={childrenRef}>
          {children}
        </div>
      )}
    </div>
  );
};

export default ToggleView;
