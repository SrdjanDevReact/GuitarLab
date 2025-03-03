import { notes } from "../utils/scaleUtils";

const ChordForm = ({ chordModesStartsWith, setChordRootNote, setChordMode, chordRootNote, chordMode }) => {
  
  const handleChange = (e) => {
    setChordMode(e.target.value)
  };

  const handleChangeRoot = (e) =>{
    setChordRootNote(e.target.value)
    setChordMode(e.target.value)
  }

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="root">Root:</label>
        <select id="root" name="root" value={chordRootNote} onChange={handleChangeRoot} className="root-select-et">
          {
            notes.map((note,index)=>(
              <option key={index} value={note}>
                {note}
              </option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="chord">Chord:</label>
        <select id="chord" name="chord" onChange={handleChange} value={chordMode}>
          {chordModesStartsWith.map((chordObj, index) => (
            <option key={index} value={Object.keys(chordObj)[0]}>
              {Object.keys(chordObj)[0]}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ChordForm;
