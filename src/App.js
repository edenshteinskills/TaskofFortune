import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { id: 1, option: "Avi" },
  { id: 2, option: "david" },
  { id: 3, option: "Eden" },
  { id: 4, option: "George" },
  { id: 5, option: "John" },
  { id: 6, option: "Bruce" },
];

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <div align="center">
        <h1 align="center">Task of Fortune</h1>
        <h3 align="center">Spin the Wheel</h3>

        <hr />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          outerBorderWidth={[15]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#dedede"]}
          radiusLineWidth={[10]}
          textColors={["#ffffff"]}
          fontSize={[20]}
          perpendicularText={[true]}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#24CA69",
            "#514E50",
            "#46AEFF",
            "#9145B7",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="button2" onClick={handleSpinClick}>
          SPIN
        </button>
        <br />
        {!mustSpin ? data[prizeNumber].option : "0"}
        <hr />
      </div>
    </>
  );
}

export default App;

// componentDidMount() {
//   // TODO: set up event listeners
//   monday.listen("context", (res) => {
//     console.log(res);
//   });
//   monday.api(`
//   query{

//   }
//   `)
// }
