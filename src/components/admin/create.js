import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
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
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		title: '',
		slug: '',
		summary: '',
	});

	const [dealData, updateFormData] = useState(initialFormData);
	const [dealheader_image, setFormheader_image] = useState(null);

	const handleChange = (e) => {
		if ([e.target.name] == 'header_image') {
			setFormheader_image({
				header_image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...dealData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...dealData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', dealData.title);
		formData.append('slug', dealData.slug);
		formData.append('author', "http://127.0.0.1:8000/accounts/users/1/");
		formData.append('summary', dealData.summary);
		formData.append('url', 'chevk.com');
		formData.append('date_posted', "2022-02-09T14:54:39.022423Z");
		formData.append('price', 444);
		formData.append('store', 'ihaslnfldasf');
		formData.append('brand', 'ihaslnfldasf');
		formData.append('category', ['http://127.0.0.1:8000/category/8/']);
		formData.append('header_image', dealheader_image.header_image[0]);
		axiosInstance.post(`apiadmin/create/`, formData);
		navigate({
			pathname: '/',
		});
	};

	/*
	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post('/apiadmin/create/', {
				title: formData.title,
				slug: formData.slug,
				author: "http://127.0.0.1:8000/accounts/users/1/",
				brand: 'ljasndfljs',
				summary: formData.summary,
				date_posted:"2022-02-09T14:54:39.022423Z",
				url: 'chevk.com',
				price:444,
				store:'ihaslnfldasf',
				category:['http://127.0.0.1:8000/category/8/'],
			})
			.then((res) => {
				navigate('/');
			});
	};
*/
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Deal
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
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={dealData.slug}
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
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<input
							accept="image/*"
							className={classes.input}
							id="deal-header_image"
							onChange={handleChange}
							name="header_image"
							type="file"
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Deal
					</Button>
				</form>
			</div>
		</Container>
	);
}
