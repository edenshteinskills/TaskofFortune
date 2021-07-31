import React, { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import "./style.css";
import Swal from "sweetalert2";
import { friends_cut } from "../assets";
import useQueries from "../queries/useQueries";
import mondaySdk from "monday-sdk-js";
import useBoard from "../queries/useBoard";

const WheelOfFortune = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [itemName, setItemName] = useState("");
  const data = useQueries();
  const boardId = useBoard();
  const [colors, setColors] = useState([]);
  console.log("this is wheel");
  console.log(data);

  const monday = mondaySdk();
  // const tempColors = [];
  // if (data != null) {
  //   console.log("yo", data);
  //   for (let i = 0; i < data.length; i++) {
  //     // tempColors.push(Math.floor(Math.random() * 16777215).toString(16));
  //   }
  //   setColors(tempColors);
  // }

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    const audio = new Audio(friends_cut);
    audio.play();
    setItemName(data[newPrizeNumber].itemName);
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #372fd7 30%, #8190bc 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px #3d43eb4c",
      color: "white",
      height: 48,
      padding: "0 30px",
      marginTop: "10px",
      marginLeft: "16px",
    },
  });
  const classes = useStyles();

  return (
    <>
      {data && (
        <div className="main">
          <div className="Legend" align="left">
            <h2>Task Legend </h2>
            {data.map((item, index) => {
              return (
                <div key={index} className="Line">
                  <h4>&nbsp;{item.index}.&nbsp;&nbsp;</h4>
                  <h4>{item.itemName}</h4>
                </div>
              );
            })}
          </div>
          <div align="center">
            <div className="TitleDiv">
              <h1 align="center">Task of Fortune</h1>
              <h3 align="center">Spin the Wheel!</h3>
            </div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor={["#000000"]}
              outerBorderWidth={[15]}
              innerBorderColor={["#f2f2f2"]}
              radiusLineColor={["#000000"]}
              radiusLineWidth={[10]}
              innerRadius={[10]}
              innerBorderWidth={[10]}
              innerBorderColor={["#000000"]}
              textColors={["#ffffff"]}
              fontSize={[15]}
              perpendicularText={true}
              backgroundColors={data.map((item) => {
                return item.style;
              })}
              onStopSpinning={() => {
                Swal.fire({
                  title: `${itemName}  selected`,
                  confirmButtonText: "Start Task",
                  denyButtonText: "Spin Again",
                  showCloseButton: true,
                  showDenyButton: true,
                  focusConfirm: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    monday.api(
                      `
                    mutation {
                      change_column_value(
                      board_id: ${boardId},
                      item_id:${data[prizeNumber].itemId},
                      column_id:"status",
                      value: "{\\\"label\\\":\\\"Working on it\\\"}")
                    {
            	      id
                    column_values{
                      id
                      text
                    }
          	      }
                }

                    `
                    );
                    // Swal.fire("Lets Get Started!");
                    monday.execute("openItemCard", {
                      itemId: data[prizeNumber].itemId,
                      kind: "updates",
                    });
                  } else if (result.isDenied) {
                    handleSpinClick();
                  }
                });
                setMustSpin(false);
              }}
            />

            {!mustSpin && (
              <Button
                className={classes.root}
                onClick={handleSpinClick}
                variant="contained"
                color="primary"
                disableElevation
              >
                SPIN
              </Button>
            )}
          </div>
          {/* <div className="Blank"></div> */}
        </div>
      )}
    </>
  );
};

export default WheelOfFortune;
