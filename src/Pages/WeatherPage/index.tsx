import React from "react";
import { WeatherCard } from "../../Components/WeatherCard";
import Grid from "@mui/material/Grid";
import "./Weatherpage.scss";

const n = 10;
export const WeatherPage = () => (
  <Grid className="Grid1" container spacing={3}>
    {React.Children.toArray(
      [...Array(n)].map((item, index) => (
        <Grid key={index} item xs>
          <WeatherCard cardId={index.toString()} />
        </Grid>
      ))
    )}
  </Grid>
);
