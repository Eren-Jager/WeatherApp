import React from "react";
import "./App.scss";
import { WeatherPage } from "./Pages/WeatherPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherPage></WeatherPage>
      </header>
    </div>
  );
}

export default App;
