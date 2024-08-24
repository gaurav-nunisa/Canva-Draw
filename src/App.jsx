import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Canvas from "./Components/canvas";
import NavTool from "./Components/NavTool";

function App() {
  const parentCanvasRef = useRef(null);
  const [penColourFromParent, setPenColour] = useState("black");
  const [penWidthFromParent, setPenWidth] = useState(5);
  function handleOnChangePenColour(color) {
    setPenColour(color);
  }

  function handleOnChangePenWidth(width) {
    setPenWidth(width);
  }

  function handleClearCanvas() {
    const Pcanvas = parentCanvasRef.current
    const Pctx = Pcanvas.getContext("2d")
    Pctx.clearRect(0,0, Pcanvas.width, Pcanvas.height)


  }
  return (
    <>
      <Canvas
        parentCanvasRef={parentCanvasRef}
        penColour={penColourFromParent}
        penWidth={penWidthFromParent}
      />
      {console.log(parentCanvasRef)}

      <NavTool
        onChangePenColour={handleOnChangePenColour}
        onChangePenWidth={handleOnChangePenWidth}
        onChangeClearCanvas={handleClearCanvas}
        penWithDisplayNumber = {penWidthFromParent}
        penColorDisplayName = {penColourFromParent}
      />
    </>
  );
}


export default App;
