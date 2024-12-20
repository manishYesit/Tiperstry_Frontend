import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import ModeComment from "@material-ui/icons/ModeComment";
import Favorite from "@material-ui/icons/Favorite";
import usePushingGutterStyles from "./PushingGutter";
import useLabelIconStyles from "./LabelIcon";
import useRowFlexStyles from "./RowFlex";
import { Typography } from "@material-ui/core";
import TagButton from "../../TagButton";
import FollowButton from "../../FollowButton";
import MoreVertOptions from "../../MoreVertOptions";


const ReviewCard = () => {
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles();
  const flexStyles = useRowFlexStyles();

  return (
    <Card className={styles.card} elevation={0}>
      <CardContent className={styles.content}>
        {/* header */}
        <Box mb={1} className={styles.boxRoot}>
          <div className={styles.headingRoot}>
            <h3 className={styles.heading}>Aegen Ergon</h3>
            <Typography variant="caption">@aegen</Typography>
          </div>
          <div>
            <FollowButton />
          </div>
        </Box>

        {/* Title content */}
        <p className={styles.body}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </p>

        {/* site URL */}
        <a href="www.brighttv.co.th">(www.brighttv.co.th)</a>

        {/* handle Tags */}
        <Box className={styles.boxTag}>
          <TagButton name="facebook" />
          <TagButton name="lagos" />
          <TagButton name="twitter" />
          <TagButton name="wearewhoweare" />
          <TagButton name="bringiton" />
        </Box>

        <Divider className={styles.divider} light />

        {/* bottom */}
        <div className={flexStyles.parent}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            className={cx(labelStyles.primaryLink, styles.textFooter)}
            component={"button"}
          >
            Read more <ArrowForwardIos className={labelStyles.icon} />
          </Link>
          <div
            className={cx(
              flexStyles.rightChild,
              flexStyles.parent,
              gutterStyles.parent
            )}
          >
            <MoreVertOptions />

            <button type={"button"} className={labelStyles.link}>
              <ModeComment className={labelStyles.icon} /> 135
            </button>
            <button type={"button"} className={labelStyles.link}>
              <Favorite className={labelStyles.icon} /> 12
            </button>
          </div>
        </div>
      </CardContent>
      <CardMedia
        className={styles.media}
        image={
          "https://www.brighttv.co.th/wp-content/uploads/2018/04/29739332_996623360491913_2322116227981377536_n.jpg"
        }
      />
    </Card>
  );
};


const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 5,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    },
    margin: "10px auto"
  },
  media: {
    minWidth: "25%",
    maxWidth: "25%",
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
  },
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headingRoot: {
    display: "flex",
    flexDirection: "column"
  },
  rating: {
    verticalAlign: "text-top"
  },
  content: {
    padding: spacing(0, 2, 0, 0)
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block"
  },
  body: {
    fontSize: 14,
    color: palette.grey[500]
  },
  divider: {
    margin: spacing(1, 0)
  },
  textFooter: {
    fontSize: 14
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom"
  },
  boxTag: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));


export default ReviewCard;
