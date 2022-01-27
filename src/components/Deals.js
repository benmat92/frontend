import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
										<Link
											color="textPrimary"
											href={'deal/' + deal.id}
											className={classes.link}
										>
											<CardMedia
												className={classes.cardMedia}
												image="https://source.unsplash.com/random"
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
