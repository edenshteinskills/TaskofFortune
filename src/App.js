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
