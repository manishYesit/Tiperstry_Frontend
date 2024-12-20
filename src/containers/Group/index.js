import React from "react";
import Header from "../../components/Header";
import Layout from "./components/Layout";
import LayoutModerator from "./components/LayoutModerator";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);
const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false,
});
const Broadcast = dynamic(() => import("../../components/Broadcast"), {
  ssr: false,
});
const GiftModal = dynamic(() => import("../../components/GiftModal"), {
  ssr: false,
});
const Report = dynamic(() => import("../../components/Report"), {
  ssr: false,
});
const Share = dynamic(() => import("../../components/Share"), {
  ssr: false,
});
const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

// const EditPost = dynamic(() => import("../../components/EditPost"), {
//   ssr: false,
// });

const mapStateToProps = ({ user }) => ({
  user,
});

function GroupContainer({ user, group, viewstyle }) {
  return (
    <div>
      {group && (
        <div>
          <Header group={group} />
          {!user.user && <Layout viewstyle={"none"} group={group} />}
          {/* Moderators can view moderator page of a group with additional controls */}
          {user.user &&
            viewstyle == "moderator" &&
            (group.userId == user.user._id ||
              group.moderators.some((a) => a.identity == user.user._id) ||
              user.user.isAdmin) && (
              <LayoutModerator viewstyle={viewstyle} group={group} />
            )}
          {/* {user.user && user.user.isAdmin && (
            <LayoutModerator viewstyle={"moderator"} group={group} />
          )} */}
          {user.user && viewstyle == "normal" && (
            <Layout viewstyle={viewstyle} group={group} />
          )}
          {viewstyle == "moderator" &&
            user.user &&
            !(
              group.userId == user.user._id ||
              group.moderators.some((a) => a.identity == user.user._id) ||
              user.user.isAdmin
            ) && <Layout viewstyle={"none"} group={group} />}

          {/* check if the user data is availabe on redux */}
          {user.user && <GiftModal />}
          <AddComment />
          <Broadcast />
          <MobileComponent group={group} />
          <Report />
          <Share />
          <Notification />
          {/* <EditPost /> */}
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(GroupContainer);
