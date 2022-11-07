import React from "react";
import "./App.scss";
import Header from "./Components/Header";
import { WeatherPage } from "./Pages/WeatherPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <WeatherPage></WeatherPage>
    </div>
  );
}

export default App;
