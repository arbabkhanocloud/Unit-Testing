import React from "react";
import "./App.css";
import Board from "./component/board/board";
import Heading from "./component/heading/heading";

function App() {
  return (
    <div className="App">
      <Heading title="OCS Trello Board" />
      <Board />
    </div>
  );
}

export default App;
