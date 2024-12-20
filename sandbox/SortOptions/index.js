import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ShowChart from "@material-ui/icons/ShowChartOutlined";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Reorder from "@material-ui/icons/Reorder";
import NewReleases from "@material-ui/icons/NewReleasesOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setTopicView } from "../../store/actions"
import { withTranslation } from "../../../i18n"



const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    // backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 15,
    padding: "6px 26px 6px 12px",
    marginBottom: 2,
    marginLeft: 5,
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const mapStateToProps = state => ({
  topic: state.topics
});
const mapDispatchToProps = {
  setTopicView,
};

const SortOptions = ({ sort, setTopicView, topic: { view }, t }) => {
  const classes = useStyles();
  const router = useRouter();
  const handleChange = (event) => {
    if (event.target.value !== sort) {
      // // console.log("loadeddd", event.target.value);

      const map = {
        popular: "/",
        recent: "/recent",
      };
      router.push(map[event.target.value]);
    }
  };

  const handleChangeView = newView => () => {
    if (view === newView) return ;

    setTopicView(newView);
    localStorage.setItem("view", newView);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.side}>
        <Typography variant="overline">{t("View")}</Typography>
        <IconButton
          color={view === "compact" ? "primary" : "default"}
          onClick={handleChangeView("compact")}
          // onClick={() => setTopicView("compact")}  
          // disabled={view === "compact"}
        >
          <Reorder />
        </IconButton>
        <IconButton
          color={view === "normal" ? "primary" : "default"}
          onClick={handleChangeView("normal")}
          // onClick={() => setTopicView("normal")} 
          // disabled={view === "normal"}
        >
          <ViewAgenda />
        </IconButton>
      </div>

      <div style={{ borderLeft: "1px solid grey", height: 35 }} />
      <div className={classes.side}>
        <Typography variant="overline">{t("Sort")}</Typography>
        <Select
          id="demo-customized-select-native"
          value={sort}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="popular">
            <Box display="flex" alignItems="center">
              <ShowChart />
              {t("Popular")}
            </Box>
          </MenuItem>
          <MenuItem value="recent">
            <Box display="flex" alignItems="center">
              <NewReleases />
              {t("Recent")}
            </Box>
          </MenuItem>
        </Select>
      </div>
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SortOptions));


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    // maxWidth: 300,
    // marginTop: 50,
    // width: 420,
    // [breakpoints.down("xs")]: {
    //   width: "100%",
    // },
    // width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: spacing(0.5, 3),
  },
  button: {
    borderRadius: 0,
  },
  side: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  className: { display: "flex", alignItems: "center" },
}));













































// import React, { useState } from 'react';
// import Paper from "@material-ui/core/Paper";
// import makeStyles from "@material-ui/core/styles/makeStyles";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import ShowChart from "@material-ui/icons/ShowChartOutlined";
// import NewReleases from "@material-ui/icons/NewReleasesOutlined";


// const SortOptions = (props) => {
// 	const classes = useStyles();
//   const { disabled } = props;

// 	return (
//     // <Paper className={classes.root}>
//       <div>
//         <Typography variant="overline">Sort Post by</Typography>
//         <div>
//           <Button
//             variant={disabled === "Popular" ? "contained" : "outlined"}
//             color="primary"
//             // disabled={disabled === "Popular"}
//             href={disabled === "Popular" ? null : "/"}
//             size="small"
//             className={classes.button}
//             startIcon={<ShowChart />}
//           >
//             Popular
//           </Button>
//           <Button
//             variant={disabled === "Recent" ? "contained" : "outlined"}
//             color="primary"
//             // disabled={disabled === "Recent"}
//             size="small"
//             href={disabled === "Recent" ? null : "/recent"}
//             className={classes.button}
//             startIcon={<NewReleases />}
//           >
//             Recent
//           </Button>
//         </div>
//       </div>

      
//     // </Paper>
//   );
// }


// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 500,
//     marginTop: 50,
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: theme.spacing(1, 0.5)
//   },
//   button: {
// 		borderRadius: 0
// 	}
// }));


// export default SortOptions
