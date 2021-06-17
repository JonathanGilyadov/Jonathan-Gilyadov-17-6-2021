import { combineReducers } from 'redux';
import tempType from './TempTypes';
import favoritesLocations from './favoritesLocations';

export default combineReducers({
	tempType,
	favoritesLocations,
});
