import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import SearchInput from "../SearchInput"

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
		<AppBar position="static" elevation={1} className={classes.root}>
			<Container maxWidth="md">
				<Toolbar>
					<img src="/static/logo.png" className={classes.logo} />
					<SearchInput />
					<div className={classes.title} />
					<Button color="inherit" size="small">
						Login
					</Button>
					<Fab
						variant="extended"
						size="small"
						color="secondary"
						aria-label="add"
						className={classes.margin}
					>
						Sign Up
					</Fab>
				</Toolbar>
			</Container>
		</AppBar>
  );
}



const useStyles = makeStyles(theme => ({
  root: {
		// flexGrow: 1
		// backgroundColor: "transparent"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: "auto",
    height: 40
  },
  margin: {
		margin: theme.spacing(1),
		width: "90px !important"
  }
}));
