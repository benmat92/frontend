import React, { useEffect, useState } from 'react';
import './App.css';
import Deals from './components/deals/Deals';
import DealLoadingComponent from './components/deals/DealLoading';
import axiosInstance from './axios';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';


const Front = () => {
	const DealLoading = Deals;
	const [data, setData] = useState([]);
	const [appState, setAppState] = useState({
		loading: true,
		deals: 'null',
});

	const [error, setError] = useState();

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allDeals = res.data;
			setAppState({ loading: false, deals: allDeals });
			console.log(res.data);

		});
	}, [setAppState]);

	if (error || !Array.isArray(appState.deals)) {
		return <p></p>;
	}
	return (
		<div className="App">
      <h1>Latest Posts</h1>
			<DealLoading isLoading={appState.loading} deals={appState.deals} />
		</div>
	);
}
export default Front;
