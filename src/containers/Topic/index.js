import React from "react";
import Header from "../../components/Header";
import Layout from "./components/Layout";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);

const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false,
});

const GiftModal = dynamic(() => import("../../components/GiftModal"), {
  ssr: false,
});

const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const Broadcast = dynamic(() => import("../../components/Broadcast"), {
  ssr: false,
});

const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics
});

function HomeComtainer(props) {
  const { user,topics } = props;
  return (
    <div>
      {topics && topics.singleTopic && <Header group={topics.singleTopic.group} singleTopic={topics.singleTopic}/> }
      <Layout user={user}/>
      <Broadcast />

      {/* check if the user data is availabe on redux */}
      {user.user && <GiftModal />}
      <AddComment />
      {topics && topics.singleTopic && <MobileComponent group={topics.singleTopic.group}/>}
      <Notification />
    </div>
  );
}

export default connect(mapStateToProps)(HomeComtainer);
