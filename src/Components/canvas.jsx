import { useEffect, useRef, useMemo } from "react";

export default function Canvas({
  parentCanvasRef,
  penColour,
  penWidth,
  eraserMode,
  backgroundColor,
}) {
  const childCanvasRef = useRef(null);
  const savedCanvasRef = useRef(null);

  // Memoize penColour and penWidth to avoid unnecessary re-renders
  const stablePenColour = useMemo(() => penColour, [penColour]);
  const stablePenWidth = useMemo(() => penWidth, [penWidth]);

  useEffect(() => {
    let isDrawing = false;

    const canvas = childCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set up event listeners
    const startDrawing = (e) => {
      const { pageX, pageY } = e.touches ? e.touches[0] : e;
      ctx.moveTo(pageX - canvas.offsetLeft, pageY - canvas.offsetTop);
      isDrawing = true;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (isDrawing) {
        const { pageX, pageY } = e.touches ? e.touches[0] : e;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;

        if (eraserMode) {
          // ctx.globalCompositeOperation = "destination-out";
          ctx.strokeStyle = backgroundColor;
          ctx.lineWidth = stablePenWidth;
        }
        if (!eraserMode) {
          // ctx.globalCompositeOperation = "source-over";
          ctx.strokeStyle = stablePenColour;
          ctx.lineWidth = stablePenWidth;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const endDrawing = () => {
      isDrawing = false;
      // Save canvas state after drawing
      savedCanvasRef.current = canvas.toDataURL();
    };

    // Attach event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", endDrawing);
    canvas.addEventListener("touchmove", draw);

    // Apply background color
    if (backgroundColor) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Restore canvas state
    if (savedCanvasRef.current) {
      const img = new Image();
      img.src = savedCanvasRef.current;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }

    // Update parent reference to the canvas
    if (parentCanvasRef) {
      parentCanvasRef.current = canvas;
    }


    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = 400;
      // Optionally redraw content here
    }

    // Resize canvas on mount and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchend", endDrawing);
      canvas.removeEventListener("touchmove", draw);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [
    parentCanvasRef,
    stablePenColour,
    stablePenWidth,
    eraserMode,
    backgroundColor,
  ]);

  return (
    <div className="w-full h-full flex justify-center items-center">
  
      <canvas
        ref={childCanvasRef}
        style={{ border: '1px solid black' }}
        className="w-full h-full border-2 border-black"
       
       
      />
    </div>
  );
}
