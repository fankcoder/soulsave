"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * 长按触发工具（兼容 touch/mouse）
 * 用法：const handlers = useLongPress({ onLongPress, delay, disabled })
 * 然后把 handlers spread 到目标元素上。
 */
export default function useLongPress({ onLongPress, delay = 650, disabled = false }) {
  const timeoutRef = useRef(null);
  const pressEventRef = useRef(null);
  const longPressedRef = useRef(false);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    pressEventRef.current = null;
  }, []);

  const start = useCallback(
    (event) => {
      if (disabled) return;

      longPressedRef.current = false;
      pressEventRef.current = event;
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        longPressedRef.current = true;
        onLongPress?.(pressEventRef.current);
      }, delay);
    },
    [delay, disabled, onLongPress]
  );

  const cancel = useCallback(() => clear(), [clear]);

  // 兜底：组件卸载时清理定时器
  useEffect(() => cancel, [cancel]);

  return {
    onMouseDown: (e) => start(e),
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: (e) => start(e),
    onTouchEnd: cancel,
    onTouchCancel: cancel,
    // 某些移动端会触发 move，移动后一般就不应该触发长按
    onTouchMove: cancel,
    // 在长按触发后，尽量阻止后续 click 导致的误操作
    onClickCapture: (e) => {
      if (!longPressedRef.current) return;
      longPressedRef.current = false;
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      e.stopPropagation?.();
    },
  };
}

