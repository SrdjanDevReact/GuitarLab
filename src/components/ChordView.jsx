import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import {
  convertChordPositions,
  getLowestFretNumber,
  transmongIndexesForCircles,
} from "../utils/chordUtils";

const ChordView = ({ arrayOfChordPositions, indexForChordPosition, setIndexForChordPosition}) => {

  const arrNumsOfChordFretPositions = arrayOfChordPositions[indexForChordPosition]?.p.split(",")
  const indexesForCircles = convertChordPositions(
    arrNumsOfChordFretPositions
  );
  const fretNumbersArray = getLowestFretNumber(
    arrNumsOfChordFretPositions
  );

  const transmogedIndexesForCircles = transmongIndexesForCircles(
    indexesForCircles,
    fretNumbersArray[0]
  );

  const emptyStringParagraphs = arrNumsOfChordFretPositions?.map((number, index) => (
      <p key={index} className="chords-cell-borderless">
        {number === "0" || number === "x" ? number : ""}
      </p>
    ));

  const chordCellsBorder = [...Array(25)].map((_, index) => (
    <div key={index} className="chordCell"></div>
  ));

  const fertNumbersParagraphs =
    fretNumbersArray.length > 0
      ? fretNumbersArray.map((fretNum) => <p key={fretNum}>{fretNum}</p>)
      : [...Array(5)].map((_, index) => <p key={index}>{index + 1}</p>);

  const chordCellsWithOutBorder = [...Array(30)].map((_, index) => {
    return (
      <div key={index} className="chords-cell-borderless">
        {transmogedIndexesForCircles.includes(index) && (
          <div
            className="chords-circle"
            onClick={() => console.log(index)}
          ></div>
        )}
      </div>
    );
  });

  return (
    <div className="chord-positions-box">
      <div className="container-for-fret-numbers">{fertNumbersParagraphs}</div>
      <div className="container-for-chord-column">
        <div className="grid-for-x-0">{emptyStringParagraphs}</div>
        <div className="container-for-chord-overlap">
          <div className="chordboardContainer">{chordCellsBorder}</div>
          <div className="chords-grid-borderless">
            {chordCellsWithOutBorder}
          </div>
        </div>
        <div className="arrow-container">
          <PiArrowLeftBold
            className="arrow"
            onClick={
              indexForChordPosition >= 1
                ? () => setIndexForChordPosition((prev) => prev - 1)
                : null
            }
            style={{ color: indexForChordPosition >= 1 ? "black" : "grey" }}
          />
          <p style={{ fontSize: "1.6vh" }}>{indexForChordPosition + 1}</p>
          <PiArrowRightBold
            className="arrow"
            onClick={
              indexForChordPosition < arrayOfChordPositions.length - 1
                ? () => setIndexForChordPosition((prev) => prev + 1)
                : null
            }
            style={{
              color:
                indexForChordPosition < arrayOfChordPositions.length - 1
                  ? "black"
                  : "grey",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChordView;
