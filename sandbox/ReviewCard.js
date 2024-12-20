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




const ReviewCard = () => {
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles();
  const flexStyles = useRowFlexStyles();

  return (
    <Card className={styles.card} elevation={0}>
      <CardContent className={styles.content}>
        <Box mb={1}>
          <h3 className={styles.heading}>Aegen magazines </h3>
          <Rating
            name={"rating"}
            value={2}
            className={styles.rating}
            size={"small"}
          />
        </Box>
        <p className={styles.body}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
          credit (www.brighttv.co.th)
        </p>
        <Divider className={styles.divider} light />
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

// hide-start
// ReviewCard.metadata = {
//   title: "Review II",
//   path: "card/review2",
//   size: "large",
//   frameProps: {
//     bgcolor: "rgb(245, 248, 250)"
//   },
//   files: [
//     { pkg: "mui-styles", path: "gutter/pushing/pushingGutter.styles.js" },
//     { pkg: "mui-styles", path: "icon/label/labelIcon.styles.js" },
//     { pkg: "mui-styles", path: "flex/row/rowFlex.styles.js" }
//   ],
//   creators: [require("constants/creators").siriwatknp]
// };
// hide-end





const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 16
  },
  media: {
    minWidth: "25%",
    maxWidth: "25%",
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
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
  }
}));


// const root = {
//   display: "inline-flex",
//   alignItems: "center",
//   fontSize: 16,
//   background: "none"
// };

// const link = {
//   cursor: "pointer",
//   textDecoration: "none",
//   border: "none",
//   padding: 0
// };

// const useLabelIconStyles = makeStyles(({ spacing, palette }) => ({
//   root: {
//     ...root,
//     color: palette.text.secondary,
//     cursor: "default"
//   },
//   link: {
//     ...root,
//     ...link,
//     color: palette.text.secondary,
//     "&:hover, &:focus": {
//       color: palette.primary.main,
//       "& $icon": {
//         opacity: 1
//       }
//     }
//   },
//   primaryLink: {
//     color: palette.primary.light,
//     opacity: 0.87,
//     "&:hover, &:focus": {
//       color: palette.primary.main,
//       opacity: 1,
//       "& $icon": {
//         opacity: 1
//       }
//     }
//   },
//   icon: {
//     opacity: 0.6,
//     fontSize: "1.125em",
//     verticalAlign: "middle",
//     "&:first-child": {
//       marginRight: spacing(1)
//     },
//     "&:last-child": {
//       marginLeft: spacing(1)
//     }
//   }
// }));



// const useRowFlexStyles = makeStyles(({ spacing, palette }) => ({
//   parent: {
//     display: "flex",
//     alignItems: "center"
//   },
//   relativeParent: {
//     display: "flex",
//     alignItems: "center",
//     position: "relative"
//   },
//   centeredChild: {
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%, -50%)"
//   },
//   rightChild: {
//     marginLeft: "auto"
//   },
//   autoChild: {
//     flex: "auto"
//   }
// }));




export default ReviewCard;
