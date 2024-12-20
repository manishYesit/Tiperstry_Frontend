import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Header from "../src/components/Header";
import Box from "@material-ui/core/Box";
import { withTranslation } from "../i18n";

import terms from "../public/static/locales/en/termspage_content";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  },
  expanded: {
    margin: "auto",
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})((props) => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(({ spacing }) => ({
  root: {
    padding: spacing(2),
  },
}))(MuiExpansionPanelDetails);

const TermsCondition = ({ t }) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const getTerm = (key) => {
    return terms[key];
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", margin: "80px 10%" }}>
        <Typography variant="h4">
          {getTerm("TERMS OF SERVICE AGREEMENT")}
        </Typography>
        <br />
        <Typography variant="h6" style={{ fontSize: 15 }}>
          {getTerm("header")}
        </Typography>
        <br />
        <ExpansionPanel
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead1")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody1-1")}
              <a href="http://www.tipestry.com">www.tipestry.com</a>,
              {getTerm("tbody1-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead2")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody2-1")}
              <br />
              {getTerm("tbody2-2")}
              <br />
              {getTerm("tbody2-3")}
              <br />
              {getTerm("tbody2-4")}
              <br />
              {getTerm("tbody2-5")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead3")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody3-1")}
              <br />
              {getTerm("tbody3-2")}
              <Typography variant="button">{getTerm("tbody3-3")}</Typography>
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody3-4")}</li>
                <li>{getTerm("tbody3-5")}</li>
              </ul>
              {getTerm("tbody3-6")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead4")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody4")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead5")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography>{getTerm("tbody5-1")}</Typography>
              <Typography>{getTerm("tbody5-2")}</Typography>
              <Typography>{getTerm("tbody5-3")}</Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead6")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody6-1")}

              <Typography variant="button">{getTerm("tbody6-2")}</Typography>
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody6-3")}</li>
                <li>{getTerm("tbody6-4")}</li>
                <li>{getTerm("tbody6-5")}</li>
                <li>{getTerm("tbody6-6")}</li>
                <li>{getTerm("tbody6-7")}</li>
                <li>{getTerm("tbody6-8")}</li>
                <li>{getTerm("tbody6-9")}</li>
                <li>{getTerm("tbody6-10")}</li>
                <li>{getTerm("tbody6-11")}</li>
                <li>{getTerm("tbody6-12")}</li>
                <li>{getTerm("tbody6-13")}</li>
                <li>{getTerm("tbody6-14")}</li>
                <li>{getTerm("tbody6-15")}</li>
                <li>{getTerm("tbody6-16")}</li>
              </ul>
              {getTerm("tbody6-17")}

              <Typography variant="button">{getTerm("tbody6-18")}</Typography>
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody6-19")}</li>
                <li>{getTerm("tbody6-20")}</li>
                <li>{getTerm("tbody6-21")}</li>
                <li>{getTerm("tbody6-22")}</li>
                <li>{getTerm("tbody6-23")}</li>
              </ul>
              {getTerm("tbody6-24")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead7")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody7")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead8")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody8-1")}
              <a href="http://www.access.gpo.gov/bis/ear/ear_data.html">
                (http://www.access.gpo.gov/bis/ear/ear_data.html)
              </a>
              {getTerm("tbody8-2")}
              United States
              <a href="http://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx">
                (http://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx)
              </a>
              {getTerm("tbody8-3")}
              <ul style={{ textAlign: "left" }}>
                <li>
                  {getTerm("tbody8-4")}

                  <a href="http://www.bis.doc.gov/complianceandenforcement/liststocheck.htm">
                    (http://www.bis.doc.gov/complianceandenforcement/liststocheck.htm)
                  </a>
                  {getTerm("tbody8-5")}
                </li>
                <li>{getTerm("tbody8-6")}</li>
                <li>{getTerm("tbody8-7")}</li>
                <li>{getTerm("tbody8-8")}</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead9")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody9-1")}

              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody9-2")}</li>
                <li>{getTerm("tbody9-3")}</li>
                <li>{getTerm("tbody9-4")}</li>
              </ul>
              {getTerm("tbody9-5")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead10")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody10-1")}

              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody10-2")}</li>
                <li>{getTerm("tbody10-3")}</li>
                <li>{getTerm("tbody10-4")}</li>
                <li>{getTerm("tbody10-5")}</li>
                <li>{getTerm("tbody10-6")}</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel11"}
          onChange={handleChange("panel11")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead11")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody11")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel12"}
          onChange={handleChange("panel12")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead12")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody12")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel13"}
          onChange={handleChange("panel13")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead13")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody13-1")}

              <br />
              {getTerm("tbody13-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel14"}
          onChange={handleChange("panel14")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead14")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody14")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel15"}
          onChange={handleChange("panel15")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead15")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody15-1")}
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>.
              <br />
              {getTerm("tbody15-2")}
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody15-3")}</li>
                <li>{getTerm("tbody15-4")}</li>
                <li>{getTerm("tbody15-5")}</li>
                <li>{getTerm("tbody15-6")}</li>
                <li>{getTerm("tbody15-7")}</li>
                <li>{getTerm("tbody15-8")}</li>
                <li>
                  {getTerm("tbody15-9")}{" "}
                  <a href="http://www.tipestry.com">www.tipestry.com</a>
                  {getTerm("tbody15-10")}
                </li>
              </ul>
              <br />
              {getTerm("tbody15-11")}
              <Typography variant="button">{getTerm("tbody15-12")}</Typography>
              <ul>
                <li>
                  {getTerm("tbody15-13")}
                  <a href="http://www.tipestry.com">www.tipestry.com</a>;
                </li>
                <li>{getTerm("tbody15-14")}</li>
                <li>{getTerm("tbody15-15")}</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel16"}
          onChange={handleChange("panel16")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead16")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody16")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel17"}
          onChange={handleChange("panel17")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead17")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody17")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel18"}
          onChange={handleChange("panel18")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead18")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody18-1")}

              <br />
              {getTerm("tbody18-2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel19"}
          onChange={handleChange("panel19")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead19")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="h4">{getTerm("tbody19-1")}</Typography>
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody19-2")}</li>
                <li>{getTerm("tbody19-3")}</li>
                <li>{getTerm("tbody19-4")}</li>
                <li>{getTerm("tbody19-5")}</li>
                <li>{getTerm("tbody19-6")}</li>
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
            <Typography>{getTerm("thead20")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody20-1")}

              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody20-2")}</li>
                <li>{getTerm("tbody20-3")}</li>
                <li>{getTerm("tbody20-4")}</li>
                <li>{getTerm("tbody20-5")}</li>
                <li>{getTerm("tbody20-6")}</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel21"}
          onChange={handleChange("panel21")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead21")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody21")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel22"}
          onChange={handleChange("panel22")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead22")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody22")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel23"}
          onChange={handleChange("panel23")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead23")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody23")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel24"}
          onChange={handleChange("panel24")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead24")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody24")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel25"}
          onChange={handleChange("panel25")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead25")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody25")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel26"}
          onChange={handleChange("panel26")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead26")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{getTerm("tbody26")}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel27"}
          onChange={handleChange("panel27")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead27")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody27-1")}
              <ul style={{ textAlign: "left" }}>
                <li>{getTerm("tbody27-2")}</li>
                <li>{getTerm("tbody27-3")}</li>
                <li>{getTerm("tbody27-4")}</li>
                <li>{getTerm("tbody27-5")}</li>
                <li>{getTerm("tbody27-6")}</li>
                <li>{getTerm("tbody27-7")}</li>
              </ul>
              <br />
              <Typography variant="button">{getTerm("tbody27-8")}</Typography>
              {getTerm("tbody30-2")}
              <br />
              3835 East Thousand Oaks Blvd
              <br />
              Suite 158
              <br />
              West Lake Village, CA 91362
              <br />
              Email: {" "}
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel28"}
          onChange={handleChange("panel28")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead28")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {getTerm("tbody28")}
              <a href="http://www.tipestry.com">www.tipestry.com</a>.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel29"}
          onChange={handleChange("panel29")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead29")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ul style={{ textAlign: "left" }}>
                <li>
                  <Typography style={{ textDecoration: "underline" }}>
                    {getTerm("tbody29-1")}
                  </Typography>
                  {getTerm("tbody29-2")}
                </li>
                <li>
                  <Typography style={{ textDecoration: "underline" }}>
                    {getTerm("tbody29-3")}
                  </Typography>
                  {getTerm("tbody29-4")}
                </li>
                <li>
                  <Typography style={{ textDecoration: "underline" }}>
                    {getTerm("tbody29-5")}
                  </Typography>
                  {getTerm("tbody29-6")}
                </li>
                <li>
                  <Typography style={{ textDecoration: "underline" }}>
                    {getTerm("tbody29-7")}
                  </Typography>
                  {getTerm("tbody29-8")}
                </li>
                <li>
                  <Typography style={{ textDecoration: "underline" }}>
                    {getTerm("tbody29-9")}
                  </Typography>
                  {getTerm("tbody29-10")}
                </li>
              </ul>
              <br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel30"}
          onChange={handleChange("panel30")}
        >
          <ExpansionPanelSummary>
            <Typography>{getTerm("thead30")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="h4">{getTerm("tbody30-1")}</Typography>
              <br />
              {getTerm("tbody30-2")}
              <br />
              3835 East Thousand Oaks Blvd
              <br />
              Suite 158
              <br />
              West Lake Village, CA 91362
              <br />
              Email: {" "}
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </>
  );
};

TermsCondition.getInitialProps = async () => ({
  namespacesRequired: ["terms", "common"],
});

export default withTranslation("terms")(TermsCondition);
