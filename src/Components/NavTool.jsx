export default function NavTool({
  onChangePenColour,
  onChangePenWidth,
  penWithDisplayNumber,
  penColorDisplayName,
  onChangeClearCanvas,
  onChangeEraserMode,
  returnEraserMode,
}) {
  let eraserWord = "Eraser Size";
  let penWord = "Pen Size";
  return (
    <>
      <div>
        <label>Colour : {penColorDisplayName} </label>
        <input
          type="color"
          onChange={(e) => onChangePenColour(e.target.value)}
        />
      </div>
      <div>
        <label>Eraser Mode </label>
        <input
          type="checkbox"
          onChange={(e) => onChangeEraserMode(e.target.checked)}
        />
      </div>
      <div>
        <label>{returnEraserMode ? eraserWord : penWord}</label>
        <input
          type="range"
          min="1"
          max="50"
          value={penWithDisplayNumber}
          onChange={(e) => onChangePenWidth(e.target.value)}
        />
      </div>
      <div>
        <label>Clear Canvas :</label>
        <button onClick={() => onChangeClearCanvas()}> Clear </button>
      </div>
     
    </>
  );
}
