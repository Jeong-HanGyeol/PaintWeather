import { getCurentWeather } from "../service/api";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
// import { CurrentWeatherRes } from "../types/types";

interface CurrentWeatherRes {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// 현재 날씨
const CurrentWeather = () => {
  const { data, isLoading, isError } = useQuery<CurrentWeatherRes>(
    "weatherData",
    getCurentWeather
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isLoading || isError);
    if (isError) {
      console.error("Error GET data");
    }
  }, [isLoading, isError]);

  return (
    <div>
      <h1>Current Weather</h1>
      {loading && <div>로딩중...</div>}
      {!loading && data && (
        <div>
          <div>
            <div>{data.coord.lon}</div>
            <div>{data.coord.lat}</div>
          </div>
          <div>
            <div>{data.weather[0].main}</div>
            <div>{data.weather[0].description}</div>
            <div>{data.weather[0].icon}</div>
          </div>
          <div>
            <div>{data.base}</div>
          </div>
          <div>
            <div>온도: {kelvinToCelsius(data.main.temp)}°C</div>
            <div>체감온도: {kelvinToCelsius(data.main.feels_like)}°C</div>
            <div>최저온도: {kelvinToCelsius(data.main.temp_min)}°C</div>
            <div>최고온도: {kelvinToCelsius(data.main.temp_max)}°C</div>
            <div>습도: {data.main.humidity}%</div>
            <div>해수면 기압: {data.main.pressure}</div>
            <div>해수면 기압: {data.main.sea_level}</div>
            <div>지면 기압: {data.main.grnd_level}</div>
          </div>
          <div>
            <div>{data.visibility}</div>
          </div>
          <div>
            <div>{data.wind.speed}</div>
            <div>{data.wind.deg}</div>
            <div>{data.wind.gust}</div>
          </div>
          <div>
            <div>{data.clouds.all}</div>
          </div>
          <div>
            <div>{data.dt}</div>
          </div>
          <div>
            <div>{data.sys.type}</div>
            <div>{data.sys.country}</div>
            <div>{data.sys.sunrise}</div>
            <div>{data.sys.sunset}</div>
          </div>
          <div>
            <div>{data.timezone}</div>
          </div>
          <div>
            <div>{data.name}</div>
          </div>
        </div>
      )}
    </div>
  );
};
function kelvinToCelsius(temp: number): string {
  return (temp - 273.15).toFixed(2);
}

export default CurrentWeather;
