declare module "react-pageflip" {
  import type { ComponentType, ReactNode, Ref } from "react";

  type FlipBookProps = {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startPage?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    className?: string;
    style?: React.CSSProperties;
    startZIndex?: number;
    onFlip?: (e: { data: number }) => void;
    children?: ReactNode;
    ref?: Ref<unknown>;
  };

  const HTMLFlipBook: ComponentType<FlipBookProps>;
  export default HTMLFlipBook;
}
