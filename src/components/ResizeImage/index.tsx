import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

const MIN_WIDTH_RESIZE = 100;

const EResizeCorner = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
} as const;

type EResizeCorner = (typeof EResizeCorner)[keyof typeof EResizeCorner];

interface ResizeImageProps {
  keepRatio?: boolean;
  src: string;
  imgClassName?: string;
}

export default function ResizeImage({
  keepRatio = false,
  src,
  imgClassName,
}: ResizeImageProps) {
  const [resizeCorner, setResizeCorner] = useState<EResizeCorner | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const borderResizeRef = useRef<HTMLDivElement>(null);
  const [cornerPositions, setCornerPositions] = useState<{
    [key in EResizeCorner]: IPointPosition;
  }>({
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, left: 0 },
    "bottom-right": { top: 0, left: 0 },
    "bottom-left": { top: 0, left: 0 },
  });
  const imgDimension = useMemo(
    () => ({
      height:
        cornerPositions["bottom-left"].top - cornerPositions["top-left"].top,
      width:
        cornerPositions["top-right"].left - cornerPositions["top-left"].left,
    }),
    [cornerPositions]
  );

  const cornerPositionsRef = useRef(cornerPositions);
  const initialRatioRef = useRef<number | null>(null);

  function handleMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      target.dataset.type &&
      Object.values(EResizeCorner).includes(
        target.dataset.type as EResizeCorner
      )
    ) {
      setResizeCorner(target.dataset.type as EResizeCorner);
      // cache the image bounding rect for accurate coordinates during drag
      if (imgRef.current)
        rectRef.current = imgRef.current.getBoundingClientRect();
    } else {
      setResizeCorner(null);
    }
  }

  function setFixCornerOfBorderResize(resizeCorner: EResizeCorner) {
    if (!borderResizeRef.current) return;
    switch (resizeCorner) {
      case EResizeCorner.BOTTOM_LEFT:
        borderResizeRef.current.style.top = "0px";
        borderResizeRef.current.style.left = "unset";
        borderResizeRef.current.style.right = "0px";
        borderResizeRef.current.style.bottom = "unset";
        return;
      case EResizeCorner.BOTTOM_RIGHT:
        borderResizeRef.current.style.top = "0px";
        borderResizeRef.current.style.left = "0px";
        borderResizeRef.current.style.right = "unset";
        borderResizeRef.current.style.bottom = "unset";
        return;
      case EResizeCorner.TOP_LEFT:
        borderResizeRef.current.style.top = "unset";
        borderResizeRef.current.style.left = "unset";
        borderResizeRef.current.style.right = "0px";
        borderResizeRef.current.style.bottom = "0px";
        return;
      case EResizeCorner.TOP_RIGHT:
        borderResizeRef.current.style.top = "unset";
        borderResizeRef.current.style.left = "0px";
        borderResizeRef.current.style.right = "unset";
        borderResizeRef.current.style.bottom = "0px";
        return;
      default:
        break;
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (!resizeCorner || !imgRef.current) return;
    // Use clientX/clientY with the cached bounding rect so positions
    // are stable even when the mouse leaves the original target.
    const rect = rectRef.current ?? imgRef.current.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    setCornerPositions((prev) => {
      //TODO: need to remake the limitation of resize size image. it just work for the top-right and bottom-right
      const next = { ...prev };
      if (resizeCorner === EResizeCorner.BOTTOM_LEFT) {
        if (keepRatio && initialRatioRef.current) {
          // dragging horizontally (left edge) -> update width, compute height
          const width = Math.max(
            prev["top-right"].left - relX,
            MIN_WIDTH_RESIZE
          ); // new width when left moves
          const newLeft = prev["top-right"].left - width;
          const height = width / initialRatioRef.current;
          const top = prev["top-left"].top; // keep top
          next["bottom-left"] = { left: newLeft, top: top + height };
          next["top-left"] = { left: newLeft, top };
          next["bottom-right"] = {
            left: prev["bottom-right"].left,
            top: top + height,
          };
        } else {
          const width = Math.max(
            prev["top-right"].left - relX,
            MIN_WIDTH_RESIZE
          );
          const newLeft = prev["top-right"].left - width;
          next["bottom-left"] = { left: newLeft, top: relY };
          next["top-left"] = { left: newLeft, top: prev["top-left"].top };
          next["bottom-right"] = { left: prev["bottom-right"].left, top: relY };
        }

        setFixCornerOfBorderResize(EResizeCorner.BOTTOM_LEFT);
      } else if (resizeCorner === EResizeCorner.BOTTOM_RIGHT) {
        if (keepRatio && initialRatioRef.current) {
          // dragging bottom-right: primary movement changes width and height proportionally
          const left = prev["top-left"].left;
          const width = Math.max(relX - left, MIN_WIDTH_RESIZE);
          const height = width / initialRatioRef.current;
          const top = prev["top-left"].top;
          next["bottom-right"] = { left: left + width, top: top + height };
          next["top-right"] = { left: left + width, top };
          next["bottom-left"] = { left, top: top + height };
        } else {
          const left = prev["top-left"].left;
          const width = Math.max(relX - left, MIN_WIDTH_RESIZE);
          const newRight = left + width;
          next["bottom-right"] = { left: newRight, top: relY };
          next["top-right"] = { left: newRight, top: prev["top-right"].top };
          next["bottom-left"] = { left: prev["bottom-left"].left, top: relY };
        }

        setFixCornerOfBorderResize(EResizeCorner.BOTTOM_RIGHT);
      } else if (resizeCorner === EResizeCorner.TOP_LEFT) {
        if (keepRatio && initialRatioRef.current) {
          // dragging top-left: compute width from right, then height from ratio
          const right = prev["top-right"].left;
          const width = Math.max(right - relX, MIN_WIDTH_RESIZE);
          const newLeft = right - width;
          const height = width / initialRatioRef.current;
          const bottom = prev["bottom-left"].top;
          next["top-left"] = { left: newLeft, top: bottom - height };
          next["top-right"] = { left: right, top: bottom - height };
          next["bottom-left"] = { left: newLeft, top: bottom };
        } else {
          const width = Math.max(
            prev["top-right"].left - relX,
            MIN_WIDTH_RESIZE
          );
          const newLeft = prev["top-right"].left - width;
          next["top-left"] = { left: newLeft, top: relY };
          next["top-right"] = { left: prev["top-right"].left, top: relY };
          next["bottom-left"] = { left: newLeft, top: prev["bottom-left"].top };
        }

        setFixCornerOfBorderResize(EResizeCorner.TOP_LEFT);
      } else if (resizeCorner === EResizeCorner.TOP_RIGHT) {
        if (keepRatio && initialRatioRef.current) {
          // dragging top-right: compute width from left, then height from ratio
          const left = prev["top-left"].left;
          const width = Math.max(relX - left, MIN_WIDTH_RESIZE);
          const height = width / initialRatioRef.current;
          const bottom = prev["bottom-left"].top;
          next["top-right"] = { left: left + width, top: bottom - height };
          next["top-left"] = { left, top: bottom - height };
          next["bottom-right"] = { left: left + width, top: bottom };
        } else {
          const left = prev["top-left"].left;
          const width = Math.max(relX - left, MIN_WIDTH_RESIZE);
          const newRight = left + width;
          next["top-right"] = { left: newRight, top: relY };
          next["top-left"] = { left: prev["top-left"].left, top: relY };
          next["bottom-right"] = {
            left: newRight,
            top: prev["bottom-right"].top,
          };
        }

        setFixCornerOfBorderResize(EResizeCorner.TOP_RIGHT);
      }
      cornerPositionsRef.current = { ...next };
      return next;
    });
  }

  function handleMouseUp() {
    setResizeCorner(null);
    const pos = cornerPositionsRef.current;
    const newWidth = pos["top-right"].left - pos["top-left"].left;
    const newHeight = pos["bottom-left"].top - pos["top-left"].top;

    if (imgRef.current) {
      imgRef.current.style.height = newHeight + "px";
      imgRef.current.style.width = newWidth + "px";
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    cornerPositionsRef.current = cornerPositions;
  }, [cornerPositions]);

  useEffect(() => {
    if (!resizeCorner) return;
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resizeCorner]);

  useEffect(() => {
    if (
      imgDimension.height > 0 &&
      imgDimension.width > 0 &&
      initialRatioRef.current === null
    ) {
      initialRatioRef.current = imgDimension.width / imgDimension.height;
    }
  }, [imgDimension]);

  useEffect(() => {
    if (imgRef.current == null) return;
    const rect = imgRef.current.getBoundingClientRect();
    rectRef.current = rect;
    setCornerPositions({
      "top-left": { top: 0, left: 0 },
      "top-right": { top: 0, left: rect.width || 0 },
      "bottom-right": { top: rect.height || 0, left: rect.width || 0 },
      "bottom-left": { top: rect.height || 0, left: 0 },
    });
  }, [imgRef.current?.clientWidth, imgRef.current?.clientHeight]);

  return (
    <div className="relative group w-fit">
      <img
        ref={imgRef}
        src={src}
        alt="resize-image"
        className={cn("select-none", imgClassName)}
      />
      <div
        ref={borderResizeRef}
        style={{
          ...imgDimension,
        }}
        className={cn(
          "group-hover:block absolute top-0 left-0 border border-blue-400",
          resizeCorner ? "block" : "hidden"
        )}
      ></div>
      <div
        data-type="top-left"
        style={{
          top: cornerPositions["top-left"].top,
          left: cornerPositions["top-left"].left,
        }}
        className={cn(
          "absolute -translate-y-1/2 -translate-x-1/2 h-3 w-3 bg-blue-400 group-hover:block cursor-nw-resize",
          resizeCorner ? "block" : "hidden"
        )}
      ></div>
      <div
        data-type="top-right"
        style={{
          top: cornerPositions["top-right"].top,
          left: cornerPositions["top-right"].left,
        }}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-blue-400 group-hover:block cursor-ne-resize",
          resizeCorner ? "block" : "hidden"
        )}
      ></div>
      <div
        data-type="bottom-right"
        style={{
          top: cornerPositions["bottom-right"].top,
          left: cornerPositions["bottom-right"].left,
        }}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-blue-400 group-hover:block cursor-se-resize",
          resizeCorner ? "block" : "hidden"
        )}
      ></div>
      <div
        data-type="bottom-left"
        style={{
          top: cornerPositions["bottom-left"].top,
          left: cornerPositions["bottom-left"].left,
        }}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-blue-400 group-hover:block cursor-sw-resize",
          resizeCorner ? "block" : "hidden"
        )}
      ></div>
    </div>
  );
}
