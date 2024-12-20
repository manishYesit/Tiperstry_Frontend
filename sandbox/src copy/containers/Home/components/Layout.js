import React from 'react';
import Grid from "@material-ui/core/Grid";
import RegularPost from "../../../components/RegularPost";
import AdvertBoard from "../../../components/AdvertBoard";
import Container from "@material-ui/core/Container";
import ProfileCard from '../../../components/ProfileCard';
import TopHashtag from './TopHashtag';
import Leaderboard from './LeaderBoard';
import ImageCard from '../../../components/ImagePost/components/ImageCard';


export default function Layout() {
	return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <RegularPost />
          <ImageCard />
          <RegularPost />
          <ImageCard />
          <RegularPost />
          <RegularPost />
          <RegularPost />
          <RegularPost />
          <RegularPost />
          <RegularPost />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <ProfileCard />
          <TopHashtag />
          <Leaderboard />
          {/* <AdvertBoard /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
