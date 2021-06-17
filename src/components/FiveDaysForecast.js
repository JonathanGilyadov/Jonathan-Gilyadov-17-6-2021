import React, { useEffect, useState, Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getFiveDaysForecast } from '../ajax';
import './FiveDaysForecast.css';
import Forcast from './Forcast';

const FiveDaysForecast = ({ cityName, keyLocation }) => {
	const [forecasts, setForecasts] = useState(null);
	const [err, setErr] = useState({
		isErr: false,
		message: '',
	});
	const tempType = useSelector((state) => state.tempType);
	useEffect(() => {
		getFiveDaysForecast(keyLocation, tempType)
			.then((res) => setForecasts(res.data))
			.catch((err) =>
				setErr({
					isErr: true,
					message: "Something went wrong... Let's try one more time!",
				})
			);
	}, [keyLocation, tempType]);

	if (err.isErr) return <h3>{err.message}</h3>;
	if (!forecasts)
		return (
			<div className='text-center p-3'>
				<CircularProgress />
			</div>
		);
	return (
		<Fragment>
			<h4 className='text-align-left'>{forecasts.Headline.Text}</h4>
			<div className='d-flex flex-wrap mt-3 flex-column'>
				{forecasts.DailyForecasts.map((forecast, index) => (
					<Forcast {...{ forecast, index }} />
				))}
			</div>
		</Fragment>
	);
};

export default FiveDaysForecast;
