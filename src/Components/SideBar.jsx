export default function SideBar({onchangeBGColor, onChangeDownloadImage}) {
  return (
    <>
      <div>
        <label>Background Color</label>
        <input type="color" 
        onChange={(e) => onchangeBGColor(e.target.value)}/>
      </div>
      <div>
        <button onClick={onChangeDownloadImage()}>
        Export as PNG

        </button>
      </div>
    </>
  );
}
