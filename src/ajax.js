import { KEY } from "./config";
import axios from "axios";

export const getLocationsAutocomplete = (text) =>
  axios(`/locations/v1/cities/autocomplete?apikey=${KEY}&q=${text}`);

export const getCurrentConditions = (keyLocation) =>
  axios(`/currentconditions/v1/${keyLocation}?apikey=${KEY}`);

export const getFiveDaysForecast = (keyLocation, tempType) =>
  axios(
    `/forecasts/v1/daily/5day/${keyLocation}?apikey=${KEY}&metric=${
      tempType === "CELSIUS"
    }`
  );
