
import React, { useState }  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

function Header(props) {
	const classes = useStyles();
	let navigate = useNavigate();
	console.log(props);
	const [data, setData] = useState({ search: '' });
	const goSearch = (e) => {
		navigate({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Deals
						</Link>
					</Typography>

					<nav>
						{props.isLoggedIn ? (
							<nav>
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/logout"
								>
									Logout
								</Button>
							</nav>
							) : (
								<nav>
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/login"
								>
									Login
								</Button>
								<Button
									color="primary"
									href="#"
									className={classes.link}
									component={NavLink}
									to="/register"
									variant="outlined"
								>
									Register
								</Button>
								</nav>
						)}
					</nav>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
