<<<<<<< HEAD
import React from "react";
import WheelOfFortune from "./WheelOfFortune/WheelOfFortune";
import Swal from "sweetalert2";

const App = () => {
  {
    Swal.fire({
      title: "Rules to use Task Of Furtu222wwwwne",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
  return <WheelOfFortune />;
};
=======
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import mondaySdk from "monday-sdk-js";

const data = [
  { id: 1, option: "item1" },
  { id: 2, option: "item2" },
  { id: 3, option: "item3" },
  { id: 4, option: "item4" },
  { id: 5, option: "item5" },
];

function App() {
  const [info, setInfo] = useState([]);
  const tempList = [];
  const tempItems = [{ id: "", option: "" }];
  const [itemsList, setItemsList] = useState(tempList);

  useEffect(() => {
    const monday = mondaySdk();
    monday.listen("context", (res) => {
      console.log(res);
    });
    monday
      .api(
        `query {
      boards (ids:[1512802386]) {
      name
  	    id
  	    description
  	    items {
    	    name
    	    column_values {
      	    title
      	    id
      	    type
      	    text
  		    }
        }
      }
    }`
      )
      .then((res) => {
        console.log(res);
        setInfo(res);
        console.log(res.data.boards[0].items);
        res.data.boards[0].items.map((item, index) => {
          console.log(item);
          tempList.push(item);
          tempItems.push(index, item.name);
          setItemsList(tempList);
        });
        console.log(itemsList);
        console.log(tempItems);
      });
  }, []);

  useEffect(() => {
    // console.log(info);
    // info.map((item, index) => {
    //   console.log(item);
    // });
  }, []);

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
>>>>>>> feature/new_comps

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
