import { useEffect, useState } from "react";
import { filterChordsByLetter } from "../utils/chordUtils";
import ChordForm from "./ChordForm";
import ChordView from "./ChordView";

const ChordBox = () => {
  const [chordRootNote, setChordRootNote] = useState("A");
  const [chordMode, setChordMode] = useState("Am");
  const [arrayOfChordPositions, setArrayOfChordPositions] = useState([]);
  const chordModesStartsWith = filterChordsByLetter(chordRootNote);
  const [indexForChordPosition, setIndexForChordPosition] = useState(0);


  useEffect(() => {
    if (chordMode !== "") {
      const selectedChordMode = chordModesStartsWith.find(
        (chordObj) => Object.keys(chordObj)[0] === chordMode
      );
      if (selectedChordMode) {
        const arrayOfChordPositions1 = selectedChordMode[chordMode];
        setArrayOfChordPositions(arrayOfChordPositions1);
      }
    }
  }, [chordMode, chordModesStartsWith, indexForChordPosition]);

  useEffect(() => {
    setIndexForChordPosition(0);
  }, [chordMode]);

  return (
    <div className="chord-box-container">
      <ChordForm
        chordModesStartsWith={chordModesStartsWith}
        setChordRootNote={setChordRootNote}
        setChordMode={setChordMode}
        chordRootNote={chordRootNote}
        chordMode={chordMode}
      />
      <div className="bottom-chord-container">
        <ChordView
          arrayOfChordPositions={arrayOfChordPositions}
          indexForChordPosition={indexForChordPosition}
          setIndexForChordPosition={setIndexForChordPosition}
        />
      </div>
    </div>
  );
};

export default ChordBox;
