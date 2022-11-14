import { SetStateAction, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
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
  cardId: string;
}

export const WeatherCard = ({ cardId }: Props) => {
  const [currentWeatherData, updateWeatherData] = useState<any>();
  const [isCelcius, setUnits] = useState(true);
  const [isLoading, updateLoading] = useState(false);
  const [location, updateLocation] = useState("");
  const [isSearch, updateSearch] = useState(false);
  const [isInvalidCity, updateIncorrectCity] = useState(false);
  const [noInternet, updateConnection] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const cardCache = localStorage.getItem(cardId);
    if (cardCache) {
      updateWeatherData(JSON.parse(cardCache));
      updateSearch(false);
    }
  }, []);

  const handleStationChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    updateLocation(e.target.value);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };
  if (currentWeatherData) {
    setTimeout(async () => {
      const response = await getCurrentWeatherData(currentWeatherData.name);
      if (!response.invalidCity) {
        updateWeatherData(response.data);
        localStorage.setItem(cardId, JSON.stringify(response.data));
      }
    }, 30000);
  }
  async function fetchData() {
    updateLoading(true);
    updateConnection(false);
    const response = await getCurrentWeatherData(location);
    if (!response.invalidCity && !response.isOffline) {
      updateWeatherData(response.data);
      updateSearch(false);
      localStorage.setItem(cardId, JSON.stringify(response.data));
    } else if (response.isOffline) {
      updateConnection(response.isOffline);
    } else updateIncorrectCity(response.invalidCity);
    updateLoading(false);
  }

  return (
    <>
      <Card
        className="Weathercard ForstedGlass"
        sx={{ maxWidth: 360 }}
        onClick={() => updateSearch(false)}
      >
        {!currentWeatherData || isSearch ? (
          !isSearch || (currentWeatherData && !isSearch) ? (
            <CardContent
              style={{ height: "100%" }}
              onClick={(e) => {
                updateSearch(true);
                e.stopPropagation();
              }}
            >
              <IconButton style={{ top: "15px" }} aria-label="delete">
                <ControlPointIcon className="Icon fadeIn" />
              </IconButton>
            </CardContent>
          ) : (
            <CardContent>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <div
                  className="ForstedGlass fadeIn SearchCard"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TextField
                    error
                    helperText={
                      noInternet
                        ? "Unable to Connect to Internet"
                        : isInvalidCity
                        ? "Incorrect City"
                        : ""
                    }
                    placeholder="Search Cities"
                    value={location}
                    onChange={handleStationChange}
                    id="filled-hidden-label-small"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") handleSubmit(event);
                    }}
                    size="small"
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={fetchData}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
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
                <>
                  <IconButton aria-label="settings" onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    elevation={0}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    style={{ padding: "0" }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      style={{
                        borderBottom: "1px solid #b3b3b354",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                      onClick={(e) => {
                        updateSearch(true);
                        updateLocation("");
                        e.stopPropagation();
                        handleClose();
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      style={{
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                      onClick={() => {
                        updateWeatherData("");
                        updateLocation("");
                        localStorage.removeItem(cardId);
                        handleClose();
                      }}
                    >
                      Reset Card
                    </MenuItem>
                  </Menu>
                </>
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
                  <div className="subhead">Last Refreshed (Local Time)</div>
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
