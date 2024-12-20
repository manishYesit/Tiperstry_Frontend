import React from 'react';
import Typography from "@material-ui/core/Typography"
import Header from "../src/components/Header";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {
	withStyles
} from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import { withTranslation } from "../i18n";
import Box from "@material-ui/core/Box";


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
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

const ExpansionPanelDetails = withStyles(({ spacing }) => ({
  root: {
    padding: spacing(2),
  },
}))(MuiExpansionPanelDetails);

const Faq  = ({ t }) => {
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
	}
	
  return (
    <div>
      <Header />

      <div style={{ margin: "80px 10%" }}>
        <ExpansionPanel
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey1")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody1")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey2")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody2")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey3")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody3")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey4")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody4")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey5")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody5")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey6")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box
            // variant="body2"
            // style={{ textAlign: "left", marginBottom: 10 }}
            >
              <ul>
                <li>{t("faqbody6-1")}</li>
                <li>{t("faqbody6-2")}</li>
                <li>{t("faqbody6-3")}</li>
                <li>{t("faqbody6-4")}</li>
                <li>{t("faqbody6-5")}</li>
              </ul>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey7")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody7")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel15"}
          onChange={handleChange("panel15")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey8")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody8")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel16"}
          onChange={handleChange("panel16")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey9")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody9")}{" "}
              <a href="mailto:feedback@tipestry.com">feedback@tipestry.com</a>.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel17"}
          onChange={handleChange("panel17")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey10")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              {t("faqbody10")}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel18"}
          onChange={handleChange("panel18")}
        >
          <ExpansionPanelSummary>
            <Typography>{t("faqkey11")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              0xBa20586B7D98539D8Dd9f459B2C76cB4852E98cA
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        {t("Copyright")} ©
        <Link color="inherit" href="/">
          Tipestry
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

Faq.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Faq);












{
  /* <ExpansionPanel
          square
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <ExpansionPanelSummary>
            <Typography>
              How can I add coins to my Tipestry account?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              You can send Bitcoins, Dogecoins, etc. from an online exchange
              or wallet to your Tipestry addresses, which can be found in
              the Currency link on the homepage. However, if you are new to
              cryptocurrencies, we recommend starting off by simply posting
              content to Tipestry and earning coins through tips.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */
}
{
  /* <ExpansionPanel
          square
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <ExpansionPanelSummary>
            <Typography>How can I keep my coins safe?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              Online cryptocurrency wallets, including the ones that come
              with Tipestry accounts, are inherently unsecure. The best way
              to secure your coins is in an offline wallet. Learn more about
              wallets and security at{" "}
              <a href="https://bitcoin.org/en/secure-your-wallet">
                https://bitcoin.org/en/secure-your-wallet
              </a>
              .If you end up with a significant amount of coins in your
              Tipestry account (for example if you post something really
              amazing and someone tips you a full Bitcoin), it is highly
              recommended that you make a withdrawal to somewhere more
              secure. To withdrawal coins, click on the Currencies link on
              the homepage, select the currency, and choose the Withdraw /
              Send coins option.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */
}
{
  /* <ExpansionPanel
          square
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <ExpansionPanelSummary>
            <Typography>What are Tipcoins and Tipestry Tokens?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              variant="body2"
              style={{ textAlign: "left", marginBottom: 10 }}
            >
              Tipcoins(TIPC) are utility tokens that can be earned by
              contributing to the Tipestry community. They serve several
              purposes such as giving owners proportional voting rights on
              the platform governance including moderator election and
              removal, moderation policy, and selecting Best Of content for
              special rewards and recognition. Tipcoins can also be used to
              purchase Tipestry Premium status and as a payment method for
              listing other tokens on Tipestry. Tipestry Token(TIP) will be
              used for our upcoming STO.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */
}