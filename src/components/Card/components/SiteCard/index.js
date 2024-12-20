import React from 'react';
import Hidden from "@material-ui/core/Hidden";
// import dynamic from "next/dynamic";
import ReviewCardDesktop from "./components/ReviewCardDesktop";
import ReviewCardMobile from "./components/ReviewCardMobile";
import ClassicCard from "../ClassicCard";

function Index({ topic }) {
  
  if(topic.url && topic.url.toLowerCase().includes(".mp4")){
    return <ClassicCard topic={topic} />
  }
  else{
    return (
      <div>
        <Hidden smDown>
          <ReviewCardDesktop topic={topic} />
        </Hidden>
        <Hidden smUp>
          <ReviewCardMobile topic={topic} />
        </Hidden>
      </div>
    );
}}

export default Index
