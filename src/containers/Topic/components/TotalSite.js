import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import axios from "axios";
import { config } from "../../../../config";
import Typography from "@material-ui/core/Typography";
import { withTranslation } from "../../../../i18n"



const TotalSite = ({ url, type, t }) => {
	const classes = useStyles();
	const [total, setTotal] = React.useState({ topic: 0, site: 0 });


	React.useEffect(() => {
    if (type !== "localImage" && type !== "text" && type !== "localGif") {
		  handleTipping();
    }
	}, [])
	
  const handleTipping = async () => {
    try {
      const UrlVal = await axios.get(config.getUrlTotal + "?url=" + url);
      
      setTotal(UrlVal.data);
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <div>
      {total.topic > 1 && (
        <Typography href={"/sites?s=" + url}  className={classes.link} component="a">
          {t("View")} {total.topic} {t("other conversations about this web page")}.
        </Typography>
      )}
      <br />
      {total.site > 1 && (
        <Typography href={"/domain?s=" + url} className={classes.link}  component="a">
          {t("View")} {total.site} {t("other conversations about this web site")}.
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

export default withTranslation()(TotalSite);
