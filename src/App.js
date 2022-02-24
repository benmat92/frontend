import React, { useEffect, useState } from 'react';
import './App.css';
import Deals from './components/deals/Deals';
import DealLoadingComponent from './components/deals/DealLoading';
import axiosInstance from './axios';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/deals/single';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';
import Front from './front';

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
/*
const App = () => {
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
		return <p>There was an error loading your data!</p>;
	}
	return (
		<div className="App">
			<DealLoading isLoading={appState.loading} deals={appState.deals} />
		</div>
	);
}
export default App;

*/

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("access_token")) {
			setLoggedIn(true);
		}
	}, []);

//	const handleLogin = (access_token) => {
//		if (!access_token) return;
//		localStorage.setItem("access_token", access_token);
//
	//	setLoggedIn(true);
	//};

	const handleLogout = () => () => {
		setLoggedIn(false);
		localStorage.clear();
	};
	return (
		<div className="App">
			<Router>
			<Header isLoggedIn={isLoggedIn} logout={handleLogout} />
				<Routes>
					<Route exact path="/" element={<Front />}/>
					<Route exact path="/admin/" element={<Admin />} />
					<Route exact path="/admin/create/" element={<Create />} />
					<Route exact path="/admin/edit/:id" element={<Edit />} />
					<Route exact path="/admin/delete/:id" element={<Delete />} />
					<Route path="/register/" element={<Register />} />
					<Route path="/login/" element={<Login />} />
					<Route path="/logout/" element={<Logout />} />
					<Route path="/deal/:slug" element={<Single />} />
				</Routes>
			<Footer />
			</Router>
		</div>
	);
}
export default App;
