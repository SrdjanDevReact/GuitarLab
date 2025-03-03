import { createFretboardCircleObjects, findScaleObjectByName, getNotesForScaleFromRootNote } from "../utils/scaleUtils";

const FretBoard = ( {rootNote, scaleName, optionsObject} ) => {
  const blackDottsArray = [44,46,69,27,50,74,32,56,58,60]
  const allFretsObjects = createFretboardCircleObjects()
  const scaleObjectByName = findScaleObjectByName(scaleName)
  const notesForScaleFromRoot = getNotesForScaleFromRootNote(scaleObjectByName,rootNote)
  const thirdNoteFromRoot = notesForScaleFromRoot[2]
  const fifthNoteFromRoot = notesForScaleFromRoot[4]
  console.log("Sve:", notesForScaleFromRoot, " Third: ", thirdNoteFromRoot, " Fifth: ", fifthNoteFromRoot)

  const allEmptyWithoutBorder = allFretsObjects.map( fertObject =>{
    let borderColor = null;
    let noteColor = null;
    if (fertObject.note === rootNote) {
        borderColor = '0.2vw solid rgb(218, 177, 90)';
        noteColor = 'rgb(218, 177, 90)'
    } else if ((fertObject.note === thirdNoteFromRoot || fertObject.note === fifthNoteFromRoot) && optionsObject.triads) {
        borderColor = '0.1vw solid ' + (fertObject.note === thirdNoteFromRoot ? 'rgba(187, 255, 0, 0.911)' : 'rgb(75, 243, 255)');
        noteColor = fertObject.note === thirdNoteFromRoot ? 'rgba(187, 255, 0, 0.911)' : 'rgb(75, 243, 255)'
    }

    return <div key={`${fertObject.fretIndex}-${fertObject.stringIndex}`} className="cellNoBorder">
      {
      optionsObject.show && notesForScaleFromRoot.includes(fertObject.note) && 
      <div className="circle" style={{ border: borderColor, color: noteColor }}>{optionsObject.showNotes?fertObject.note:""}</div>
      }
    </div>
  })

  const allEmptyFrets = [...Array(105)].map((_,index)=>{
    return (
        <div key={index} className="cell" onClick={()=>console.log(index)}>
          {blackDottsArray.includes(index) && <div className="black-circle"></div>}
        </div>
    )
  })

  return (
    <div className="overlapContainer">
        <div className="fretboardContainer">{allEmptyFrets}</div>
        <div className="fretboardContainerWithoutBorders">{allEmptyWithoutBorder}</div>
    </div>
  )
};
//44,46,69,27,50,74,32,56,79,37,60

export default FretBoard;
