import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ShareIcon from '@material-ui/icons/Share';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';





const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	dealTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	dealText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));


const Deals = (props) => {
	const { deals } = props;
	const classes = useStyles();
	console.log(props);
	console.log(deals);


	const [count, setCount] = useState(0);
	var user = localStorage.getItem("user");
	const [liked, setLiked] = useState(false);
	const [favorite, setFavorite] = useState(props.favBool);
	const toggleFavorite = (dealID, data = {}) => {
			// const clickedRecipe = target.value; //don't need target as argument either??

			// this sets the state for my selected recipes (adds/ removes)			const [liked, setLiked] = useState(false);


		setFavorite((dealId) => {
			if (favorite == true) {
				console.log("I clicked unliked")
				console.log(props)
				fetch(`http://127.0.0.1:8000/api/like/${dealID}/`, {
				    method: 'POST', // *GET, POST, PUT, DELETE, etc.
				    mode: 'cors', // no-cors, *cors, same-origin
				    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				    credentials: 'same-origin', // include, *same-origin, omit
				    headers: {
				      'Content-Type': 'application/json'
				      // 'Content-Type': 'application/x-www-form-urlencoded',
				    },
				    redirect: 'follow', // manual, *follow, error
				    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				    body: JSON.stringify(data) // body data type must match "Content-Type" header
				  })
				.then(console.log("This was a favorited recipe, but now it isnt!"));

			}
			if (favorite == false) {
				console.log("I clicked favorite")
				fetch(`http://127.0.0.1:8000/api/like/${dealID}/`, {
				    method: 'POST', // *GET, POST, PUT, DELETE, etc.
				    mode: 'cors', // no-cors, *cors, same-origin
				    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				    credentials: 'same-origin', // include, *same-origin, omit
				    headers: {
				      'Content-Type': 'application/json'
				      // 'Content-Type': 'application/x-www-form-urlencoded',
				    },
				    redirect: 'follow', // manual, *follow, error
				    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				    body: JSON.stringify(data) // body data type must match "Content-Type" header
				  })
				.then(console.log("This was not a favorited recipe. Now it is!"));
			}
			return !favorite;
		});
		console.log(props.deals.id);
	}
	if (!deals || !deals.length === 0) return <p>Can not find any deals, sorry</p>;
		console.log(deals);
		return (
			<React.Fragment>
				<Container maxWidth="md" component="main">
					<Grid container spacing={5} alignItems="flex-end">
						{deals.map((deal) => {
							return (
								// Enterprise card is full width at sm breakpoint
								<Grid item key={deal.id} xs={12} md={4}>
									<Card className={classes.card}>
									<CardHeader
											avatar={
												<Avatar aria-label="recipe" className={classes.avatar}>
													R
												</Avatar>
											}
											title="Title"
											subheader="User"
										/>
										<CardMedia
											className={classes.media}
											image="/static/images/cards/paella.jpg"
											title="Paella dish"
										/>
										<Link
											color="textPrimary"
											href={'deal/' + deal.id}
											className={classes.link}
										>
											<CardMedia
												className={classes.cardMedia}
												image={deal.header_image}
												title="Image title"
											/>
										</Link>
										<CardContent className={classes.cardContent}>
											<Typography
												gutterBottom
												variant="h6"
												component="h2"
												className={classes.dealTitle}
											>
												{deal.title.substr(0, 50)}
											</Typography>
											<div className={classes.dealSummary}>
												<Typography
													component="p"
													color="textPrimary"
												></Typography>
												<Typography variant="p" color="textSecondary">
													{deal.summary.substr(0, 60)}
												</Typography>
											</div>
										</CardContent>
										<CardActions disableSpacing>
											<IconButton aria-label="add to favorites" onClick={() => toggleFavorite(deal.id,{
											          pk: deal.id,
											          postid: deal.id,
											          action: 'post',
																user: user
											        })}
											>
											{liked === false? (
												deal.like_count+1
											 ) : (
												deal.like_count
											 )}
											{liked === false? (
												<FavoriteBorder color="primary"/>
											 ) : (
												 <FavoriteBorder/>
											 )}
											</IconButton>
											<IconButton aria-label="share">
												<ShareIcon />
											</IconButton>
										</CardActions>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</React.Fragment>
		);
	};
export default Deals;
