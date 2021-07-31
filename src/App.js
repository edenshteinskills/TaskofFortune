import React from "react";
import WheelOfFortune from "./WheelOfFortune/WheelOfFortune";
import Swal from "sweetalert2";
import mondaySdk from "monday-sdk-js";

const App = () => {
  const monday = mondaySdk();
  // monday.execute("notice", {
  //   message: "I'm a success message",
  //   type: "success", // or "error" (red), or "info" (blue)
  //   timeout: 10000,
  // });
  monday.storage.instance.setItem("token", false);
  {
    monday.storage.instance.getItem("token") &&
      Swal.fire({
        icon: "info",
        title: "Rules to use Task Of Fortune",
        text: "The roulette will automatically find low priority open tasks",
        background: "#fff",
      }).then(() => {
        Swal.fire({
          icon: "info",
          title: "Important",
          text: "Status will change only if column labeled as Priority",
        });
        monday.storage.instance.setItem("token", true);
      });
  }

  return <WheelOfFortune />;
};

export default App;
