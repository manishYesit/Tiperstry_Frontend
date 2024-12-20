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
import Typography from "@material-ui/core/Typography";
import Link from "next/link"
import CardMedia from "@material-ui/core/CardMedia";
import { config } from "../../../config";

const ProfileCard = ({ user, i18n, t }) => {
    const classes = useStyles();
    return (
        <Card
            className={classes.card}
        // className={cx(styles.card, shadowStyles.root)}
        >
            <Link href={`/p/${user.username}`}>
                {!user.coverImg ? (
                    <Box className={classes.header}>
                        <Typography className={classes.headerText}>TIPESTRY</Typography>
                    </Box>
                ) : (
                    <CardMedia
                        image={config.getImage + user.coverImg}
                        className={classes.media}
                    />
                )}
            </Link>

            <CardContent style={{ position: "absolute", marginTop: -45 }}>
                <ThumbNails name={user.username} size="md" url={user.img} />
            </CardContent>
            <Divider />
            <Box display={"flex"} mt={5}>
                <Box p={2} flex={"auto"} className={classes.body}>
                    <img src={config.tipcoinImage} className={classes.coin} />
                    <p className={classes.statValue}>{user.eth.tipcoinApiBalance}</p>
                    <p className={classes.statLabel}>{t("Tipcoins")}</p>
                </Box>
                <div className={classes.hr} />
                <Box p={2} flex={"auto"} className={classes.body}>
                    <img src={config.tipcoinTokenImage} className={classes.coin} />
                    <p className={classes.statValue}>{user.tokens}</p>
                    <p className={classes.statLabel}>{t("Tokens")}</p>
                </Box>
            </Box>
        </Card>
    );
};


export default withTranslation()(ProfileCard);


const useStyles = makeStyles(({ palette }) => ({
    card: {
        borderRadius: 5,
        minWidth: 256,
        textAlign: "center",
        position: 'relative',
        marginBottom: 15,
    },
    coin: {
        width: 20, height: 20,
        display: 'inline-block',
    },
    avatar: {
        width: 60,
        height: 60,
        margin: "auto",
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: "0.5px",
        marginTop: 8,
        marginBottom: 0,
    },
    subheader: {
        fontSize: 14,
        color: palette.grey[500],
        marginBottom: "0.875em",
    },
    statLabel: {
        fontSize: 12,
        color: palette.grey[500],
        fontWeight: 500,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        display: 'inline-block',
        marginTop: 1,
        verticalAlign: 'top',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
        letterSpacing: "1px",
    },
    body: {
        borderColor: "rgba(0, 0, 0, 0.08)",
        height: "50%",
    },
    header: {
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(#3a6dc5, #a73664)",
        cursor: "pointer",
    },
    headerText: {
        fontSize: 40,
        letterSpacing: 10,
        fontFamily: "monospace",
        color: "white",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
}));
