import React from "react";
import Grid from "@material-ui/core/Grid";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import ProfileCard from "../../../components/ProfileCard";
import { connect, useSelector } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import FirebaseTabs from "./Header";
import Box from "@material-ui/core/Box";
import TopicsSection from "./TopicsSection";
import CommentSection from "./CommentSection";
import ProfileInfo from "./ProfileInfo";
import FollowersSection from "./FollowersSection";
import FollowingSection from "./FollowingSection";
import BlockedUsers from "./BlockedUsers";
import GroupSection from "./GroupSection";
import FavoriteSection from "./FavoriteSection";
import GroupRightSection from "./GroupRightSection";
import ViewOptions from './ViewOptions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
  };
};

function Layout({ profile, user }) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const currentuser = useSelector(({ user: { user } }) => user);

  return (
    <Container maxWidth="md" style={{ marginTop: 100, paddingRight: 0, paddingLeft: 0 }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={8} align="center">
          {profile.user && <ProfileInfo profile={profile.user} />}
          <Hidden smUp>
            <LadderBoard item="1" single />
            <br />
          </Hidden>
          {profile.user && !profile.user.isDeleted && (
            <>
              <FirebaseTabs
                profile={profile}
                tabIndex={tabIndex}
                currentuser={currentuser}
                setTabIndex={setTabIndex}
              />
              <ViewOptions />
              {tabIndex === 0 && <TopicsSection />}
              {tabIndex === 1 && <CommentSection />}

              {tabIndex === 2 && <FollowersSection currentuser={currentuser} />}
              {tabIndex === 3 && <FollowingSection currentuser={currentuser} />}
              {tabIndex === 5 && <GroupSection currentuser={currentuser} />}
              {tabIndex === 6 && currentuser.username == profile.user.username && <FavoriteSection currentuser={currentuser} />}
              {tabIndex === 4 && currentuser.username == profile.user.username && (
                <BlockedUsers user={user} />
              )}
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          {/* <SearchInput /> */}
          <Hidden smDown>
            {user.user && <ProfileCard user={user.user} />}
            <LadderBoard item='1' single />

            {user?.user && <GroupRightSection profile={profile} user={user.user} />}
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

export default connect(mapStateToProps)(Layout);
