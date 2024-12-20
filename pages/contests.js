import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography"
import Header from "../src/components/Header";
import { withTranslation  } from "../i18n";


const Contests = ({ t }) =>{
	return (
		<>
			<Header />
			<div style={{ margin: "80px 10%", textAlign: "left" }} >
				<Typography variant="h4" >
					{t("c")}
				</Typography>
				<Typography variant="h6" >
					{t("cheader1")}
				</Typography>
				<ul>
					<li>
					{t("cbody1-1")}
					</li>
					<li>
					{t("cbody1-2")}
					</li>
					<li>
					{t("cbody1-3")}
					</li>
				</ul>
				<Typography variant="h6" >
					{t("cheader2")}
				</Typography>
				<br />
				<ol>
					<li>
						{t("cbody2-1")}
						{t("cbody2-2")}
						<br />
						{t("cbody2-3")}
					</li>
					<li>
						{t("cbody2-4")}
					</li>
					<li>
						{t("cbody2-5")}
						<br />
						{t("cbody2-6")}
					</li>
					<li>
						{t("cbody2-7")}
					</li>
					<li>
						{t("cbody2-8")}
						<br />
						{t("cbody2-9")}
					</li>
					<li>
						{t("cbody2-10")}
						<br />
						{t("cbody2-11")}
							
						< a href = "https://www.facebook.com/about/privacy" > https: //www.facebook.com/about/privacy</a> and <a href="https://www.facebook.com/legal/terms/update">https://www.facebook.com/legal/terms/update</a> .</li>
					<li>
						{t("cbody2-12")}
					</li>
					<li>
						ADMINISTRATOR: <br />
						TIPESTRY LTD, <br />
						OFFICE 7<br />
						35-37 LUDGATE HILL<br />
						LONDON<br />
						EC4M 7JN<br />
						UNITED KINGDOM<br />
						FEEDBACK@TIPESTRY.COM<br />
					</li>
				</ol>
			</div>
		</>
	);
}

Contests.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation()(Contests);