import { combineReducers } from 'redux';
import tempType from './tempTypes';
import favoritesLocations from './favoritesLocations';

export default combineReducers({
	tempType,
	favoritesLocations,
});
