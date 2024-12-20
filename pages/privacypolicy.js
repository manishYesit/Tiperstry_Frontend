import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Header from "../src/components/Header";
import Box from "@material-ui/core/Box";
import { withTranslation } from "../i18n";

import commondata from '../public/static/locales/en/common.json';


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not2(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);


const PrivacyPolicy = ({ t }) => {

  const t2 = (key) => {
    return commondata[key];
  }
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  }

  return (
    <>
      <Header />

      <div style={{ textAlign: "center", margin: "80px 10%" }}>
        <Typography variant="h4">{t2("pp")}</Typography>
        <br />
        <Typography variant="h6" style={{ fontSize: 15 }}>
          {t2("ppheader")}
        </Typography>
        <br />
        <ExpansionPanel
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey1")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody1")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey2")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody2")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey3")}</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{ display: "block" }}>
            <Typography>{t2("ppbody3")}</Typography>
            <p>
              <ul style={{ textAlign: "left" }}>
                <li><Typography>{t2("ppbody3-1")}</Typography></li>
              </ul>
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey4")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody4")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey5")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody5")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey6")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody6")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey7")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody7")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* <ExpansionPanel
          square
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey8")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody8-1")}{" "}
              <a href="https://support.google.com/adwordspolicy/answer/1316548?hl=en">
                {" "}
                https://support.google.com/adwordspolicy/answer/1316548?hl=en
              </a>
              {t2("ppbody8-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey9")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody9")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey10")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody10")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel11"}
          onChange={handleChange("panel11")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey11")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody11")}{" "}
              <a href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf">
                http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
              </a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel12"}
          onChange={handleChange("panel12")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey12")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody12-1")}
              <Typography variant="button">{t2("ppbody12-2")}</Typography>
              {t2("ppbody12-3")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel13"}
          onChange={handleChange("panel13")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey13")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody13")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel14"}
          onChange={handleChange("panel14")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey14")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody14")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel15"}
          onChange={handleChange("panel15")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey14")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody15-1")}
              <br />
              {t2("ppbody15-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel16"}
          onChange={handleChange("panel16")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey16")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody16")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel17"}
          onChange={handleChange("panel17")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey17")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody17-1")}
              <br />
              {t2("ppbody17-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel18"}
          onChange={handleChange("panel18")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey18")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppkey18")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel19"}
          onChange={handleChange("panel19")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey19")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="h4">{t2("ppkey19-1")}</Typography>
              <ul style={{ textAlign: "left" }}>
                <li>{t2("ppkey19-2")}</li>
                <li>{t2("ppkey19-3")}</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel20"}
          onChange={handleChange("panel20")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey20")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody20")}</Typography>
            <Box>
              <ul style={{ textAlign: "left" }}>
                <li>{t2("ppbody20-1")}</li>
                <li>{t2("ppbody20-2")}</li>
                <li>{t2("ppbody20-2")}</li>
                <li>{t2("ppbody20-2")}</li>
                <li>{t2("ppbody20-2")}</li>
                <li>{t2("ppbody20-2")}</li>
              </ul>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        {/* <ExpansionPanel
          square
          expanded={expanded === "panel21"}
          onChange={handleChange("panel21")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey22")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>{" "}
              {t2("ppbody22")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        <ExpansionPanel
          square
          expanded={expanded === "panel22"}
          onChange={handleChange("panel22")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey22")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t2("ppbody22")}
              <br />
              3835 East Thousand Oaks Blvd
              <br />
              Suite 158
              <br />
              West Lake Village, CA 91362
              <br />
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === "panel23"}
          onChange={handleChange("panel23")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey23")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody23")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel24"}
          onChange={handleChange("panel24")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey24")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody24")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === "panel25"}
          onChange={handleChange("panel25")}
        >
          <ExpansionPanelSummary>
            <Typography>{t2("ppkey25")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t2("ppbody25")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </>
  );
}
PrivacyPolicy.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(PrivacyPolicy);
