import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
		console.log("fav3456789");
		setLoading(true);

		if (!user.token) return ;

		try {
			const fav = await axios.put(
        config.favourite,
        { topicId },
        { headers: { "x-auth-token": user.token } }
			);
			
			console.log("fav", fav);
			

			console.log("user.token", user.token);
			

			if (fav) {
				const userData = await axios.get(config.me, { headers: { "x-auth-token": user.token } });

				console.log(userData);
				
        setUserData(userData.data);
				setLoading(false);
			}

		} catch (error) {
			setLoading(false);
			console.log("error", error);
			console.log("error.response", error.response);
		}
	}

	return (
    <>
      {user.user && (
        <IconButton
          disabled={loading}
          aria-label="add to favorites"
          color={user.user.favourite.includes(topicId) ? "primary" : "default"}
          onClick={handleFavourite}
        >
          <FavoriteIcon />
        </IconButton>
      )}
    </>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
