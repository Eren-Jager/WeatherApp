import { SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { CurrentTemperature, Temperature } from "../Temperature";
import humidity from "../../assets/humidity.svg";
import wind from "../../assets/wind.svg";
import visibility from "../../assets/visibility.svg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCurrentWeatherData } from "../../Utils";
import "./WeatherCard.scss";
dayjs.extend(utc);

interface Props {
  isMetricUnit: boolean;
  isAnimated: boolean;
}

export const WeatherCard = ({ isMetricUnit, isAnimated }: Props) => {
  const [currentWeatherData, updateWeatherData] = useState<any>();
  const [isCelcius, setUnits] = useState(true);
  const [isLoading, updateLoading] = useState(false);
  const [location, updateLocation] = useState("");
  const [isSearch, updateSearch] = useState(false);
  const handleStationChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    updateLocation(e.target.value);
  };
  async function fetchData() {
    updateLoading(true);
    updateWeatherData(await getCurrentWeatherData(location));
    updateLoading(false);
  }
  return (
    <>
      <Card
        className="Weathercard ForstedGlass"
        sx={{ maxWidth: 360 }}
        onClick={() => updateSearch(false)}
      >
        {!currentWeatherData ? (
          !isSearch ? (
            <IconButton
              onClick={(e) => {
                updateSearch(true);
                e.stopPropagation();
              }}
              style={{ top: "15px" }}
              aria-label="delete"
            >
              <ControlPointIcon className="Icon" />
            </IconButton>
          ) : (
            <CardContent>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Paper
                  onClick={(e) => e.stopPropagation()}
                  className="ForstedGlass fadeIn"
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                  }}
                  style={{ borderRadius: "22px" }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Cities"
                    inputProps={{ "aria-label": "Search Cities" }}
                    value={location}
                    onChange={handleStationChange}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={fetchData}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              )}
            </CardContent>
          )
        ) : (
          <>
            <CardHeader
              className="fadeIn"
              avatar={<LocationOnIcon color="primary" />}
              title={
                currentWeatherData.name + ", " + currentWeatherData.sys.country
              }
              style={{ textAlign: "left", fontWeight: "1000", color: "grey" }}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent style={{ paddingTop: 0 }}>
              <div className="CurrentWeatherConatiner fadeIn">
                <img
                  style={{ transform: "scale(2.5)" }}
                  className="weatherimg"
                  alt="image1"
                  src={require(`../../assets/${currentWeatherData.weather[0].icon}.svg`)}
                />
                <div className="currentweatherTemps">
                  <div className="weatherdesc">
                    {currentWeatherData.weather[0].description}
                  </div>

                  <CurrentTemperature
                    isCelcius={isCelcius}
                    temperature={currentWeatherData.main.temp}
                    toggleUnits={setUnits}
                  />
                  <div className="feels">
                    Feels Like{" "}
                    <Temperature
                      temperature={currentWeatherData.main.feels_like}
                      isCelcius={isCelcius}
                    />
                  </div>
                </div>
              </div>
              <div className="localTimes">
                <div>
                  <div className="subhead">Local Time</div>
                  <div>
                    {dayjs
                      .utc()
                      .utcOffset(currentWeatherData.timezone / 60)
                      .format("ddd, MMM D, YYYY h:mm A")}
                  </div>
                </div>
                <div className="SunTimes">
                  <div className="subhead">Sun Rise</div>
                  <div>
                    {dayjs
                      .unix(currentWeatherData.sys.sunrise)
                      .utcOffset(currentWeatherData.timezone / 60)
                      .format("h:mm A")}
                  </div>
                  <div className="subhead">Sun Set</div>
                  <div>
                    {dayjs
                      .unix(currentWeatherData.sys.sunset)
                      .utcOffset(currentWeatherData.timezone / 60)
                      .format("h:mm A")}
                  </div>
                </div>
              </div>

              <div className="infos">
                <div>
                  <img
                    alt="windspeed1"
                    className="windimg"
                    style={{ width: "30px", height: "30px" }}
                    src={wind}
                  ></img>
                  <div className="subtext">
                    {(currentWeatherData.wind.speed * 3.6).toFixed(1)} Km/h
                  </div>
                  <div className="subhead">Wind Speed</div>
                </div>
                <div>
                  <img
                    alt="humidity1"
                    className="humidityimg"
                    style={{ width: "30px", height: "30px" }}
                    src={humidity}
                  ></img>
                  <div className="subtext">
                    {currentWeatherData.main.humidity}%
                  </div>
                  <div className="subhead">Humidity</div>
                </div>
                <div>
                  <img
                    alt="visibility1"
                    className="visibilityimg"
                    style={{ width: "30px", height: "30px" }}
                    src={visibility}
                  ></img>
                  <div className="subtext">
                    {currentWeatherData.visibility / 1000} km
                  </div>
                  <div className="subhead">Visibility</div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};
