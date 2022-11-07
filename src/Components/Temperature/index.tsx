
import React, { useEffect, useRef, useState } from "react";
import './Temperature.scss';

interface Props {
  isCelcius: boolean;
  temperature: number;
  toggleUnits: React.Dispatch<React.SetStateAction<boolean>>;
}
function convertToF(temp: number) {
    return temp * 9/5 + 32
  }

export const CurrentTemperature = ({
  isCelcius,
  temperature,
  toggleUnits,
}: Props) => {
  return (
    <div className="currenttemperatureConatiner">
      <span className="currenttemperature">{isCelcius ? temperature.toFixed(1) : convertToF(temperature).toFixed(1) }º</span>
      <div className="currenttempUnits">
        <span className={isCelcius ? "highlight" : ""} onClick={()=>toggleUnits(true)}>C</span>&nbsp;&nbsp;|&nbsp;&nbsp;  
        <span className={isCelcius ? "" : "highlight"} onClick={()=>toggleUnits(false)}>F</span>
      </div>
    </div>
  );
};

export const Temperature = (props: { temperature: number, isCelcius: boolean }) => {
    return (
      <>
        <span className="temperature">{props.isCelcius ? props.temperature.toFixed(1) : convertToF(props.temperature).toFixed(1) }º</span>
      </>
    );
  };
