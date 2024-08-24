import { useEffect , useRef} from "react";

export default function Canvas({parentCanvasRef, penColour, penWidth, eraserMode}) {
  const childCanvasRef = useRef(null)


   
useEffect  (() => {
    let isDrawing = false
 
    const canvas =  childCanvasRef.current
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = penColour;
    ctx.lineWidth = penWidth;


    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mouseup", endDrawing)
    canvas.addEventListener("mousemove", draw)

    function startDrawing(e) {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }

    function draw(e) {
      if (isDrawing == true) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
    function endDrawing(){
        isDrawing = false
    }
    if(parentCanvasRef){
      parentCanvasRef.current = canvas
    }
    return ()=>{
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mouseup", endDrawing)
      canvas.removeEventListener("mousemove", draw)

    }
   
  }, [parentCanvasRef, penColour, penWidth, eraserMode]);
  return(
    <>
    <canvas ref={childCanvasRef} 
    
    height = {400}
    width = {600}
    style={{border: "1px solid black"}}
    />
    </>
  )

  
}

