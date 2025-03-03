import { notes } from "../utils/scaleUtils";

const ScaleBox = ( {allScaleNames, rootNote, setRootNote, scaleName, setScaleName,optionsObject, setOptionsObject } ) => {
  const handleChangeRoot = (e) => {
    setRootNote(e.target.value)
  };

  const handleChangeScaleName = (e) =>{
    setScaleName(e.target.value)
  }

  return (
    <div className="scale-box-container">
      <form className="form">
        <div className="form-group-scale">
            <label htmlFor="root">Root:</label>
            <select id="root" name="root" value={rootNote} onChange={handleChangeRoot}>
              {notes.map((note, index) => (
                <option key={index} value={note}>{note}</option>
              ))}
            </select>
        </div>
        <div className="form-group-scale">
          <label htmlFor="scale">Scale:</label>
          <select id="scale" name="scale" value={scaleName} onChange={handleChangeScaleName}>
            {
              allScaleNames.map((name,index)=><option key={index} value={name}>{name}</option>)
            }
          </select>
        </div>
        <div className="form-group-checkbox-group">
          <label htmlFor="triads">Triads:</label>
          <input type="checkbox" id="triads" name="triads" className="check-square" checked={optionsObject.triads} onChange={()=>setOptionsObject(prev => ({...prev,triads:!prev.triads}))}/>
          <label htmlFor="show">Show:</label>
          <input type="checkbox" id="show" name="show" className="check-square" checked={optionsObject.show} onChange={()=>setOptionsObject(prev => ({...prev,show: !prev.show}))}/> {/* Dodajemo defaultChecked atribut */}
          <label htmlFor="notes">Notes:</label>
          <input type="checkbox" id="notes" name="notes" className="check-square" checked={optionsObject.showNotes} onChange={()=>setOptionsObject(prev=>({...prev, showNotes: !prev.showNotes}))} />
        </div>
      </form>
    </div>
  );
};

export default ScaleBox;
