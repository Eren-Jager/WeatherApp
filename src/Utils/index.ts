import axios from "axios";

export const getCurrentWeatherData = (location: string) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dfffa2e2e3703e399511a46f0099d3c3&units=metric`
    )
    .then((response) => {
      return { data: response.data, invalidCity: false, isOffline: false };
    })
    .catch((error) => {
      console.log(error);
      if (
        error.code === "ERR_INTERNET_DISCONNECTED" ||
        error.code === "ERR_NETWORK"
      )
        return { data: "", invalidCity: true, isOffline: true };
      else return { data: "", invalidCity: true, isOffline: false };
    });
};
