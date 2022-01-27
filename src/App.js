import React, { useEffect, useState } from 'react';
import './App.css';
import Deals from './components/Deals';
import DealLoadingComponent from './components/DealLoading';
import axiosInstance from './axios';

/*
function App() {
	const DealLoading = DealLoadingComponent(Deals);
	const [appState, setAppState] = useState([]);
	const [error, setError] = useState();


	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((deals) => {
				setAppState({ loading: false, deals: deals })
			.catch((err) => {
	console.log(err);
});
			});
	}, []);
	console.log(appState.deals);
	if (error || !Array.isArray(appState.deals)) {
    return <p>There was an error loading your data!</p>;
  }
	return (
		<div className="App">
			<h1>Latest Deals</h1>
			<DealLoading isLoading={appState.loading} deals={appState.deals} />
		</div>
	);
}

export default App;
*/

function App() {
	const DealLoading = DealLoadingComponent(Deals);
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
		return <p>There was an error loading your data!</p>;
	}
	return (
		<div className="App">
			<h1>Latest Deals</h1>
			<DealLoading isLoading={appState.loading} deals={appState.deals} />
		</div>
	);
}
export default App;
