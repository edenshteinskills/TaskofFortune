import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { makeStyles } from "@material-ui/core/styles";
import data from "../database/data";
import Button from "@material-ui/core/Button";
import "./style.css";
import Swal from "sweetalert2";
import { friends_cut } from "../assets";

const WheelOfFortune = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    const audio = new Audio(friends_cut);
    audio.play();
    console.log(data[newPrizeNumber].option);
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #FE5B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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
      <div align="center">
        <h1 align="center">Task of Fortune</h1>
        <h3 align="center">Spin the Wheel</h3>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#000000"]}
          outerBorderWidth={[15]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#000000"]}
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
            Swal.fire({
              title: "Task #1 selected",
              confirmButtonText: "Start Task",
              denyButtonText: "Spin Again",
              showCloseButton: true,
              showDenyButton: true,
              focusConfirm: false,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Lets Get Started");
              } else if (result.isDenied) {
                handleSpinClick();
              }
            });
            setMustSpin(false);
          }}
        />
        {}
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

        {!mustSpin ? data[prizeNumber].option : "0"}
      </div>
    </>
  );
};

export default WheelOfFortune;
