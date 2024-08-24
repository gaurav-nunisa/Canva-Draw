export default function NavTool({onChangePenColour, onChangePenWidth,  penWithDisplayNumber, penColorDisplayName, onChangeClearCanvas, onChangeEraserMode}) {
    return(
        <>
        <div>
            <label>Colour : {penColorDisplayName} </label>
            <input type="color"
            onChange = {(e) => onChangePenColour(e.target.value)}/>
        </div>
        <div>
            <label>Pen Size : {penWithDisplayNumber} </label>
            <input type="range"
            min="1"
            max="50"
            value={penWithDisplayNumber}
            onChange = {(e) => onChangePenWidth(e.target.value)}/>
        </div>
        <div>
            <button onClick={() => onChangeClearCanvas()}> Clear </button>
        </div>
        </>
    )
}