import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { openModal } from "../../store/actions";
import ProfileCard from "../ProfileCard";
import LadderBoard from "../LadderBoard";
import SiteInfo from "../SiteInfo";
import TopHashtag from "../../containers/Home/components/TopHashtag";
import HotSectionCard from "../../components/HotSectionCard";
import SuggestionCard from "../../components/SuggestionCard";
import countries_list from "../../components/HotSectionCard/countrieslist";
import { withTranslation } from "../../../i18n";
import Router from "next/router";
import axios from "axios";

import GroupCreate from "../../containers/Group/components/CreateGroup";
import CryptocurrencyCreate from "../../containers/Group/components/CreateCryptocurrency";
import GroupSidebar from "../../containers/Group/components/GroupSidebar";
import GroupRightSection from "../../containers/Profile/components/GroupRightSection";

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
});

const mapDispatchToProps = {
  openModal,
};

const MobileComponent = ({ user, openModal, t, group, profile }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClose = () => {
    openModal();
  };

  var [country, setCountry] = React.useState("US"); //default to USA

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    getUserCountry2();
  }, [open]);

  const getUserCountry2 = async () => {
    if (Router.router.route.includes("hashtag") && Router.query.c) {
      localStorage.setItem("country", Router.query.c);
      setCountry(Router.query.c);
      return;
    }

    try {
      let userLocation = null;
      if (localStorage.getItem("country") != "") {
        userLocation = localStorage.getItem("country");
      } else {
        userLocation = await axios.get(`${config.location}`);
        userLocation = userLocation.data;
      }

      localStorage.setItem("country", userLocation);
      setCountry(userLocation.data ? userLocation.data : null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={user.open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Side Bar</DialogTitle>
      <DialogContent dividers={true}>
        {user.user && <ProfileCard user={user.user} />}

        {user.user && <SuggestionCard max={3} />}
        <TopHashtag countries_list={countries_list} />
        <HotSectionCard
          max={6}
          countries_list={countries_list}
          country={country}
        />

        {group && <GroupSidebar group={group} />}
        <GroupCreate user={user.user} />
        <CryptocurrencyCreate user={user.user} />


        <LadderBoard item='1' single />
        {profile && Router.router.route.includes("/p/") && <GroupRightSection profile={profile} user={user.user} />}
        <SiteInfo />
      </DialogContent>
      <DialogActions>
        <Button id="sidenavbar_closebtn" onClick={handleClose} color="primary">
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(MobileComponent));
