import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { setTopicView } from "../../../store/actions";
import Paper from "@material-ui/core/Paper";
import Reorder from "@material-ui/icons/Reorder";
import Box from "@material-ui/core/Box";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import { connect } from "react-redux";
import { withTranslation } from "../../../../i18n"

const mapStateToProps = ({ topics,user }) => ({
    topics,
    user
  });
  
const mapDispatchToProps = {
    setTopicView,
   
  };


const ViewOptions = ({t, topics: {view},  setTopicView})=> {
    const classes = useStyles();
    const handleChangeView = newView => () => {
        if (view === newView) return ;
    
        setTopicView(newView);
        localStorage.setItem("view", newView);
      }

    return (
        <Paper className={classes.root}>
         <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="row"
        width="100%"
      >
      <Typography variant="overline">{t("View")}</Typography>
        <IconButton
          color={view === "compact" ? "primary" : "default"}
          onClick={handleChangeView("compact")}
        >
          <Reorder />
        </IconButton>
        <IconButton
          color={view === "normal" ? "primary" : "default"}
          onClick={handleChangeView("normal")}
        >
          <ViewAgenda />
        </IconButton>
      </Box>  
      </Paper>
    )
}





const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      padding: spacing(0.5, 3),
      marginTop: '10px'
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

  export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(ViewOptions));
