import React from "react";
import { WeatherCard } from "../../Components/WeatherCard";
import Grid from "@mui/material/Grid";
import './Weatherpage.scss';

export const WeatherPage = () => (
  <>
  
<Grid className="Grid1" container spacing={3}>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
      <Grid item xs>
        <WeatherCard isMetricUnit={true} isAnimated={true} />
      </Grid>
    </Grid>
  </>
);
