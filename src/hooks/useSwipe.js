import { useRef } from 'react';

const SWIPE_THRESHOLD_PX = 50;
const MAX_VERTICAL_DRIFT = 60;

export default function useSwipe({ onSwipeLeft, onSwipeRight } = {}) {
    const startX = useRef(null);
    const startY = useRef(null);

    const onTouchStart = (e) => {
        const t = e.changedTouches[0];
        startX.current = t.clientX;
        startY.current = t.clientY;
    };

    const onTouchEnd = (e) => {
        if (startX.current == null) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX.current;
        const dy = t.clientY - startY.current;
        startX.current = null;
        startY.current = null;

        if (Math.abs(dy) > MAX_VERTICAL_DRIFT) return;
        if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;

        if (dx < 0) onSwipeLeft && onSwipeLeft();
        else onSwipeRight && onSwipeRight();
    };

    return { onTouchStart, onTouchEnd };
}
