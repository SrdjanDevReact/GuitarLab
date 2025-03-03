import { useState } from "react";
import "./App.css";
import ChordBox from "./components/ChordBox";
import FretBoard from "./components/FretBoard";
import ScaleBox from "./components/ScaleBox";
import { extractScaleNames, fretNumsArr } from "./utils/scaleUtils";

function App() {
  const [rootNote, setRootNote] = useState("A");
  const [scaleName, setScaleName] = useState("Minor");
  const [optionsObject, setOptionsObject] = useState({
    show: true,
    triads: true,
    showNotes: true,
  });
  const fretNumbers = [...Array(21)].map((_, index) => (
    <div key={index} className="cellNoBorder-fretnum">
      {fretNumsArr.includes(index + 1) && <p>{index + 1}</p>}
    </div>
  ));
  const allScaleNames = extractScaleNames();

  return (
    <>
      <main className="mainElement">
        <FretBoard
          rootNote={rootNote}
          scaleName={scaleName}
          optionsObject={optionsObject}
        />
        <div className="container-for-fret-numbers-for-scale">
          {fretNumbers}
        </div>
        <div className="panel-main-container">
          <div className="left-side-flex-column-citava-strana">
            <div className="left-side-panel">
              <ScaleBox
                allScaleNames={allScaleNames}
                rootNote={rootNote}
                setRootNote={setRootNote}
                scaleName={scaleName}
                setScaleName={setScaleName}
                optionsObject={optionsObject}
                setOptionsObject={setOptionsObject}
              />
            </div>
            <div className="extrapanel-div">ALLAHU</div>
          </div>
          <div className="right-side-panel">
            <ChordBox />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
