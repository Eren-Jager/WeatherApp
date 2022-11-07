import axios from "axios";

export const getCurrentWeatherData = (location: string) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dfffa2e2e3703e399511a46f0099d3c3&units=metric`
    )
    .then((response) => {
      return { data: response.data, hasError: false };
    })
    .catch((error) => {
      return { data: "", hasError: true };
    });
};
