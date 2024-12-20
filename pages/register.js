import React from 'react'
import RegisterRoot from '../src/containers/Register'
import { withTranslation } from "../i18n";



const Register = () => {
	return (
		<div>
			<RegisterRoot />
		</div>
	)
}


export default withTranslation()(Register);
