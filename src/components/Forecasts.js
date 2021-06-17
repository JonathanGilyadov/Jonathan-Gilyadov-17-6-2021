import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getLocationsAutocomplete } from '../ajax';
import LocationProfile from './LocationProfile';
import Select from 'react-select';
import defaultOptions from './defaultOptions.json';

const Forecasts = () => {
	const [redirectInfo, setRedirectInfo] = useState({
		to: '',
		redirect: false,
	});
	const [query, setQuery] = useState('');
	const [options, setOptions] = useState(defaultOptions);
	const [isLoading, setLoading] = useState(false);
	const [err, setErr] = useState({
		isErr: false,
		message: '',
	});
	let { path } = useRouteMatch();

	useEffect(() => {
		if (query === '') {
			setOptions(defaultOptions);
		} else {
			setLoading(true);
			getLocationsAutocomplete(query)
				.then(({ data }) => {
					setOptions(data);
					setLoading(false);
				})
				.catch((err) => {
					setErr({
						isErr: true,
						message: "Something went wrong... Let's try one more time!",
					});
					setLoading(false);
				});
		}
	}, [query]);

	const handleAutoComplete = (e, item) =>
		item &&
		setRedirectInfo({
			to: `${item.Key}/${item.LocalizedName}`,
			redirect: true,
		});

	const handleSearch = (e, text) => {
		console.log(text);
		// if (e === null) {
		// 	setQuery(text);
		// } else {
		let newValue = `${text}`;
		// Enforce English letters only
		newValue = newValue.replace(/[^A-Za-z]/gi, '');
		setQuery(newValue);
		// }
	};

	return (
		<Fragment>
			{redirectInfo.redirect && <Redirect to={`${path}/${redirectInfo.to}`} />}
			<div className='w-100 bg-white shadow p-2 rounded'>
				{/* <Select
					className='m-auto w-100'
					isLoading={isLoading}
					isClearable
					isSearchable
					options={options}
					onChange={handleAutoComplete}
					onInputChange={handleSearch}
					value={query}
				/> */}

				<Autocomplete
					className='m-auto w-100'
					options={options}
					onChange={handleAutoComplete}
					getOptionLabel={(option) => option.LocalizedName}
					onInputChange={handleSearch}
					inputValue={query}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Search for places around the world...'
							variant='outlined'
						/>
					)}
				/>
			</div>

			<Switch>
				<Route exact path={path}>
					<span className='mt-3 d-block'>Search for a place</span>
				</Route>
				<Route path={`${path}/:keyLocation/:cityName`}>
					<LocationProfile />
				</Route>
			</Switch>
		</Fragment>
	);
};

export default Forecasts;
