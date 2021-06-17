import React from 'react';
import classNames from 'classnames';
import styles from './Forcast.module.css';
const URL_ICON = 'https://www.accuweather.com/images/weathericons';

const Forcast = ({ forecast, index }) => {
	let classNamesIconForecast = classNames(
		styles.forcast,
		'h-100 ml-2 icon-forcast'
	);

	return (
		<div className='day-item container border' key={index}>
			<div className='h-100 d-flex align-items-center'>
				{forecast.Date.slice(5, 10)}
				<img
					src={`${URL_ICON}/${forecast.Day.Icon}.svg`}
					alt={`Day icon number ${forecast.Day.Icon}`}
					className={classNamesIconForecast}
				/>
				<div className='ml-2'>
					<span className='high'>{forecast.Temperature.Maximum.Value}° </span>
					<span className='low'>/ {forecast.Temperature.Minimum.Value}°</span>
				</div>
			</div>
			<div className='flex-grow-1 text-center'>{forecast.Day.IconPhrase}</div>
		</div>
	);
};

export default Forcast;
