import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
// import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
// import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import ThumbNails from "../ThumbNails";
import { withTranslation } from "../../../i18n";


const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 5,
    minWidth: 256,
    textAlign: "center"
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em"
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px"
  },
  body: {
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%"
  }
}));

const ProfileCard = ({ user, i18n, t }) => {
  const styles = useStyles();
  return (
    <Card
      className={styles.card}
      // className={cx(styles.card, shadowStyles.root)}
    >
      <CardContent>
        <ThumbNails name={user.username} size="lg" url={user.img} />
        <h3 className={styles.heading}>{user.name}</h3>
        <span className={styles.subheader}>@{user.username}</span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"} className={styles.body}>
          <p className={styles.statLabel}>{t("Follower")}</p>
          <p className={styles.statValue}>{user.followers.length}</p>
        </Box>
        <Box p={2} flex={"auto"} className={styles.body}>
          <p className={styles.statLabel}>{t("Following")}</p>
          <p className={styles.statValue}>{user.following.length}</p>
        </Box>
        {/* <Box
          p={2}
          flex={"auto"}
        >
          <p className={styles.statLabel}>Tip</p>
          <p className={styles.statValue}>12,400</p>
        </Box> */}
      </Box>
    </Card>
  );
};


export default withTranslation()(ProfileCard);
