import React from 'react'
import LoginRoot from '../src/containers/Login'
import { withTranslation } from "../i18n";

const Login = () => {
	return <LoginRoot />;
}


export default withTranslation()(Login)