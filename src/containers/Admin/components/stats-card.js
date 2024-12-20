import React from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withTranslation } from '../../../../i18n';

const StatisticsCard = ({title, total, subtotal, t, i18n,props }) => {
	const classes = useStyles();

    const format = (number)=> {
        if(number) return new Intl.NumberFormat().format(number);
        return 0
    }
	return (
		<Paper className={classes.root}>
            <div>
                <h2 style={{marginBottom:5}}>{title}</h2>
                <span className={classes.inner}>Based on inputed filter</span>
                <h1 className={classes.main} >{format(total)} <span className={classes.inner} style={{float:'right'}}>{format(subtotal)}</span></h1>
                
            </div>
		</Paper>
	);
};

export default withTranslation()(StatisticsCard);

let gradients = ["linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)","linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)","linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)","linear-gradient(90deg, #0700b8 0%, #00ff88 100%);"] 
const useStyles = makeStyles(({ spacing }) => ({
	root: {
        backgroundImage:gradients[Math.floor(Math.random() * 3)],
        color:'white',
        margin:'10px 10px 0px 0px',
        padding:'2em',
        boxSizing:"content-box"
    },
    main:{
        fontSize:'2.5em'
    },
    inner:{
        opacity:0.5
    }
}));
