import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Button from "../ui/Button.jsx";
import { dashboardRoles } from "./dashboardData.js";

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function DashboardSwitcher({
  activeRole,
  transitionDuration,
  transitionEasing,
  onSelectRole,
  onDraggingChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const switcherRef = useRef(null);
  const indicatorRef = useRef(null);
  const dragRef = useRef(null);
  const indicatorMetricsRef = useRef(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimeoutRef = useRef(null);

  const measureIndicator = useCallback(() => {
    const switcher = switcherRef.current;
    const indicator = indicatorRef.current;
    const buttons = switcher?.querySelectorAll("button");

    if (!switcher || !indicator || !buttons || buttons.length < 2) {
      return null;
    }

    const [teacherButton, studentButton] = buttons;
    const switcherRect = switcher.getBoundingClientRect();
    const indicatorRect = indicator.getBoundingClientRect();
    const teacherRect = teacherButton.getBoundingClientRect();
    const studentRect = studentButton.getBoundingClientRect();
    const borderLeft =
      Number.parseFloat(window.getComputedStyle(switcher).borderLeftWidth) || 0;
    const teacherCenter = teacherRect.left + teacherRect.width / 2;
    const studentCenter = studentRect.left + studentRect.width / 2;
    const teacherLeft = teacherCenter - indicatorRect.width / 2;
    const metrics = {
      baseLeft: teacherLeft,
      baseOffset: teacherLeft - switcherRect.left - borderLeft,
      indicatorWidth: indicatorRect.width,
      travel: Math.max(studentCenter - teacherCenter, 0),
      threshold: (teacherCenter + studentCenter) / 2,
    };

    indicatorMetricsRef.current = metrics;
    indicator.style.left = `${metrics.baseOffset}px`;
    indicator.style.width = `${metrics.indicatorWidth}px`;

    if (!dragRef.current?.isDragging) {
      indicator.style.transform = `translateX(${
        switcher.dataset.activeRole === "student" ? metrics.travel : 0
      }px)`;
    }

    return metrics;
  }, []);

  useLayoutEffect(() => {
    measureIndicator();

    const switcher = switcherRef.current;
    if (!switcher) {
      return undefined;
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureIndicator);

    if (resizeObserver) {
      resizeObserver.observe(switcher);
      for (const button of switcher.querySelectorAll("button")) {
        resizeObserver.observe(button);
      }
    } else {
      window.addEventListener("resize", measureIndicator);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureIndicator);
    };
  }, [measureIndicator]);

  useLayoutEffect(() => {
    const indicator = indicatorRef.current;

    const metrics = indicatorMetricsRef.current;
    if (indicator && metrics && !isDragging) {
      indicator.style.transform = `translateX(${
        activeRole === "student" ? metrics.travel : 0
      }px)`;
    }
  }, [activeRole, isDragging]);

  useEffect(
    () => () => {
      if (suppressClickTimeoutRef.current !== null) {
        window.clearTimeout(suppressClickTimeoutRef.current);
      }
    },
    [],
  );

  const handlePointerDown = (event) => {
    if (
      !event.isPrimary ||
      (event.button !== 0 && event.pointerType !== "touch")
    ) {
      return;
    }

    if (suppressClickTimeoutRef.current !== null) {
      window.clearTimeout(suppressClickTimeoutRef.current);
      suppressClickTimeoutRef.current = null;
    }
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      isDragging: false,
    };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.isDragging) {
      if (
        event.pointerType === "touch" &&
        Math.abs(deltaY) > Math.abs(deltaX)
      ) {
        dragRef.current = null;
        return;
      }

      if (Math.abs(deltaX) < 4) {
        return;
      }

      drag.isDragging = true;
      setIsDragging(true);
      onDraggingChange(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();

    const metrics = indicatorMetricsRef.current ?? measureIndicator();
    const indicator = indicatorRef.current;
    if (!metrics || !indicator) {
      return;
    }

    const offset = clamp(
      event.clientX - metrics.indicatorWidth / 2 - metrics.baseLeft,
      0,
      metrics.travel,
    );
    indicator.style.transform = `translateX(${offset}px)`;

    const role = event.clientX < metrics.threshold ? "teacher" : "student";
    if (role !== activeRole) {
      onSelectRole(role);
    }
  };

  const finishDrag = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (drag.isDragging) {
      const metrics = indicatorMetricsRef.current ?? measureIndicator();
      const role =
        metrics && event.clientX >= metrics.threshold ? "student" : "teacher";

      if (role !== activeRole) {
        onSelectRole(role);
      }

      setIsDragging(false);
      onDraggingChange(false);
      suppressClickRef.current = true;
      suppressClickTimeoutRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        suppressClickTimeoutRef.current = null;
      }, 0);
    }

    dragRef.current = null;
  };

  const handlePointerCancel = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;
    if (drag.isDragging) {
      setIsDragging(false);
      onDraggingChange(false);
    }
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) {
      return;
    }

    suppressClickRef.current = false;
    if (suppressClickTimeoutRef.current !== null) {
      window.clearTimeout(suppressClickTimeoutRef.current);
      suppressClickTimeoutRef.current = null;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      ref={switcherRef}
      className="relative grid w-[200px] grid-cols-2 touch-pan-y rounded-full border border-slate-200 bg-slate-100 p-1"
      data-active-role={activeRole}
      role="group"
      aria-label="Choose dashboard preview"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onClickCapture={handleClickCapture}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%_-_0.5rem)] rounded-full bg-indigo-600 shadow-sm ${
          isDragging
            ? "!transition-none"
            : "transition-transform motion-reduce:transition-none"
        }`}
        style={{
          transitionDuration: `${transitionDuration}ms`,
          transitionTimingFunction: transitionEasing,
        }}
      />
      {dashboardRoles.map((role) => (
        <Button
          key={role}
          type="button"
          variant="subtle"
          aria-pressed={activeRole === role}
          onClick={() => onSelectRole(role)}
          className={`!relative !z-10 !w-full !rounded-full !px-3 !py-2 !bg-transparent !shadow-none !transition-colors !duration-300 motion-reduce:!transition-none hover:!bg-transparent focus-visible:!ring-2 focus-visible:!ring-indigo-500 focus-visible:!ring-offset-2 ${
            activeRole === role
              ? "!text-white"
              : "!text-slate-600 hover:!text-slate-900"
          }`}
        >
          {role === "teacher" ? "Teacher" : "Student"}
          <span className="sr-only"> dashboard</span>
        </Button>
      ))}
    </div>
  );
}

export default memo(DashboardSwitcher);
