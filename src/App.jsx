import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Canvas from "./Components/canvas";
import NavTool from "./Components/NavTool";
import SideBar from "./Components/SideBar";

function App() {
  const parentCanvasRef = useRef(null);
  const [parentBgColor, setBGColor] = useState("white");
  const [penColourFromParent, setPenColour] = useState("black");
  const [penWidthFromParent, setPenWidth] = useState(5);
  const [penEraserMode, setEraserMode] = useState(false);

  const Pcanvas = parentCanvasRef.current;

  function handleOnChangePenColour(color) {
    setPenColour(color);
  }

  function handleOnChangePenWidth(width) {
    setPenWidth(width);
  }
  function handleOnChangeEraserMode(boolean) {
    setEraserMode(boolean);
  }

  function handleClearCanvas() {
    const Pctx = Pcanvas.getContext("2d");

    Pctx.clearRect(0, 0, Pcanvas.width, Pcanvas.height);
  }
  function handleOnChangeBGColor(color) {
    setBGColor(color);
    console.log(parentBgColor);
  }
  function exportCanvas(format) {
    if (Pcanvas) {
      const dataURL = Pcanvas.toDataURL();
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `canvas_image.${format.split("/")[1]} `;
      document.body.appendChild(link);
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
    console.log("This is " + Pcanvas);
  }

  return (
    <>
      <div>
        <div>
          <Canvas
            parentCanvasRef={parentCanvasRef}
            penColour={penColourFromParent}
            penWidth={penWidthFromParent}
            eraserMode={penEraserMode}
            backgroundColor={parentBgColor}
          />
        </div>
        <div>
          <NavTool
            onChangePenColour={handleOnChangePenColour}
            onChangePenWidth={handleOnChangePenWidth}
            onChangeClearCanvas={handleClearCanvas}
            onChangeEraserMode={handleOnChangeEraserMode}
            penWithDisplayNumber={penWidthFromParent}
            penColorDisplayName={penColourFromParent}
            returnEraserMode={penEraserMode}
          />
        </div>

        <div>
          <SideBar
            onchangeBGColor={handleOnChangeBGColor}
            onChangeDownloadImage={exportCanvas}
          />
        </div>
      </div>
    </>
  );
}

export default App;
