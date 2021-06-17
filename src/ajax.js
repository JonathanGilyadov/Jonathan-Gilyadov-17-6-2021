import { KEY } from './config';
import axios from 'axios';

export const getLocationsAutocomplete = (text) =>
	axios(
		`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${text}`
	);

export const getCurrentConditions = (keyLocation) =>
	axios(
		`http://dataservice.accuweather.com/currentconditions/v1/${keyLocation}?apikey=${KEY}`
	);

export const getFiveDaysForecast = (keyLocation, tempType) =>
	axios(
		`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${keyLocation}?apikey=${KEY}&metric=${
			tempType === 'CELSIUS'
		}`
	);
