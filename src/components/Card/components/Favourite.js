import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { connect } from "react-redux";
import { config } from '../../../../config';
import { setUserData } from "../../../store/actions"

const mapStateToProps = state => {
	return {
		user: state.user
	}
}


const mapDispatchToProps = {
  	setUserData
};

const Favourite = props => {
	const { user, topicId, setUserData } = props;
	const [loading, setLoading] = useState(false)

	const handleFavourite = async () => {
		setLoading(true);

		if (!user.token) return ;

		try {
			const fav = await axios.put(config.favourite, { topicId }, { headers: { "x-auth-token": user.token } });
			
			if (fav) {
				const userData = await axios.get(config.me, { headers: { "x-auth-token": user.token } });
				
        		setUserData(userData.data);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	}

	return (
		<>
      	{user.user && (
      		<>
				{/* <IconButton
				  disabled={loading}
							aria-label="add to favorites"
							size="small"
				  color={user.user.favourite.includes(topicId) ? "primary" : "default"}
				  onClick={handleFavourite}
				>
				  <FavoriteIcon />
				</IconButton> */}
				<Typography style={{ cursor: "pointer", color: user.user.favourite.includes(topicId) ? "#e53935" : "gray", fontSize: 12 }} onClick={handleFavourite}>&emsp;save</Typography>
        	</>
      	)}
      </>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
