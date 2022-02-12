import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	const navigate = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		summary: '',
		date_posted:'',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('/apiadmin/edit/dealdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['summary']: res.data.summary,
				['date_posted']: res.data.date_posted,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`apiadmin/edit/` + id + '/', {
			title: formData.title,
			slug: 'okay',
			author: "http://127.0.0.1:8000/accounts/users/1/",
			brand: 'ljasndfljs',
			summary: formData.summary,
			id: id,
			url: 'chevk.com',
			price:444,
			store:'ihaslnfldasf',
			date_posted:formData.date_posted,
			category:['http://127.0.0.1:8000/category/8/'],
		});
		navigate({
			pathname: '/admin/',
		});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Deal Title"
								name="title"
								autoComplete="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="summary"
								label="summary"
								name="summary"
								autoComplete="summary"
								value={formData.summary}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="date_posted"
								label="date_posted"
								name="date_posted"
								autoComplete="date_posted"
								value={formData.date_posted}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Deal
					</Button>
				</form>
			</div>
		</Container>
	);
}
