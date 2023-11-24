import axios from "axios";

// const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
const API_KEY = process.env.REACT_APP_API_KEY;
const TEST_API = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`;

export const getCurentWeather = async () => {
  const response = await axios.get(TEST_API);
  return response.data;
};
