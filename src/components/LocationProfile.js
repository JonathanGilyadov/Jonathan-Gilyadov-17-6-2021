import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, IconButton, CircularProgress } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { getCurrentConditions } from '../ajax';
import { toggleFavoriteLocation } from '../actions/FavoriteLocation';
import FiveDaysForecast from './FiveDaysForecast';
import './LocationProfile.css';

const LocationProfile = () => {
	let { keyLocation, cityName } = useParams();
	const [weather, setWeather] = useState(null);
	const [err, setErr] = useState({
		isErr: false,
		message: '',
	});
	const favoritesLocations = useSelector((state) => state.favoritesLocations);
	const tempType = useSelector((state) => state.tempType);
	const dispatch = useDispatch();

	useEffect(() => {
		getCurrentConditions(keyLocation)
			.then((res) => setWeather(res.data[0]))
			.catch((err) => {
				const errRes = err.response;
				if (errRes.status === 404) {
					setErr({
						isErr: true,
						message: "Can't find this location, wanna try another one?",
					});
				} else {
					setErr({
						isErr: true,
						message: "Something went wrong... Let's try one more time!",
					});
				}
			});
	}, [keyLocation]);

	if (err.isErr) return <h3>{err.message}</h3>;
	if (!weather)
		return (
			<Paper className='p-3'>
				<CircularProgress />
			</Paper>
		);
	return (
		<Paper className='mt-2 p-3 animate__animated animate__backInUp'>
			<div className='d-flex aligm-items-center container justify-content-between mb-2'>
				<div className='d-flex align-items-center'>
					<img
						alt='Weather icon'
						className='weather-icon'
						src={`https://www.accuweather.com/images/weathericons/${weather.WeatherIcon}.svg`}
					/>
					<div className='text-left ml-3'>
						<div>{cityName}</div>
						<div>
							{tempType === 'CELSIUS' ? (
								<span>
									{weather.Temperature.Metric.Value}°
									{weather.Temperature.Metric.Unit}
								</span>
							) : (
								<span>
									{weather.Temperature.Imperial.Value}°
									{weather.Temperature.Imperial.Unit}
								</span>
							)}
						</div>
					</div>
				</div>

				<h1 className='display-4 d-flex align-items-center weather-text-title'>
					{weather.WeatherText}
				</h1>
				<div className='d-flex align-items-center'>
					<IconButton
						onClick={() =>
							dispatch(
								toggleFavoriteLocation(
									cityName,
									keyLocation,
									weather.Temperature
								)
							)
						}>
						{favoritesLocations.filter((item) => item.key === keyLocation)
							.length > 0 ? (
							<Favorite className='text-danger' />
						) : (
							<Favorite />
						)}
					</IconButton>
				</div>
			</div>
			<FiveDaysForecast cityName={cityName} keyLocation={keyLocation} />
		</Paper>
	);
};

export default LocationProfile;
