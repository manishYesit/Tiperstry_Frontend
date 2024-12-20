import React from 'react'
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { withTranslation } from "../../../i18n";

const RECAPTCHA = ({ t }) => {
	return (
    <Box>
      {/* <Typography variant="body2" color="textSecondary">
        {t("This site is protected by reCAPTCHA and the Google")}{" "}
        <Link href="https://policies.google.com/privacy" variant="body2">
          {t("Privacy Policy")}
        </Link>{" "}
        {t("and")}{" "}
        <Link href="https://policies.google.com/terms" variant="body2">
          {t("Terms of Service")}
        </Link>{" "}
        {t("apply")}.
      </Typography> */}
    </Box>
  );
}

export default withTranslation()(RECAPTCHA);
