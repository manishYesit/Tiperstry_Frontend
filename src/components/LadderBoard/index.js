import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { config } from "../../../config";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "First Bitcoin Capital Corp",
    href: "https://www.accesswire.com/560634/First-Bitcoin-Capital-Corp-OTCBITCF-Incubator-Division-Announced-Tipestry-Inc-An-Innovative-Content-Monetization-And-Social-Media-Platform-As-Its-First-Client-Company",
    imgPath: "/static/ladder/bitcfnews.png",
  },
  {
    label: "Post of the week contest",
    href: "https://www.silkroad.host/",
    imgPath: "/static/ladder/potw-banner.jpg",
  },
  {
    label: "NFT Museum",
    href: "https://art-nft.host/",
    imgPath: "/static/ladder/nft-museum.jpg",
  },
  {
    label: "Join us on now",
    href: "https://www.dogecoincash.org/",
    imgPath: "/static/ladder/ieo.jpg",
  },
];

function rotateBanners() {
  return Math.random() < 0.5 ? 1 : 2;
}

const LadderBoard = React.memo(({ visible, single, item, group }) => {
  item = item || 2;
  if (item == 2) item = 3;
  else if (single && item == 1) item = rotateBanners();

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      {(!group || !group.banner) && (
        <div>
          {!single ? (
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              interval={10000}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <a href={step.href} target="_blank" key={step.label}>
                  <div>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <img
                        className={classes.img}
                        src={step.imgPath}
                        alt={step.label}
                      />
                    ) : null}
                  </div>
                </a>
              ))}
            </AutoPlaySwipeableViews>
          ) : (
            <a
              href={tutorialSteps[item].href}
              target="_blank"
              key={tutorialSteps[item].label}
            >
              <div>
                <img
                  className={classes.img}
                  src={tutorialSteps[item].imgPath}
                  alt={tutorialSteps[item].label}
                />
              </div>
            </a>
          )}
        </div>
      )}

      {group && group.banner && !group.groupbannerlink && (
        <div>
          <img className={classes.img} src={config.getImage + group.banner} />
        </div>
      )}
      {group && group.banner && group.groupbannerlink && (
        <a href={group.groupbannerlink} target="_blank">
          <div>
            <img className={classes.img} src={config.getImage + group.banner} />
          </div>
        </a>
      )}
    </div>
  );
});

LadderBoard.defaultProps = {
  visible: false,
};

export default LadderBoard;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));
