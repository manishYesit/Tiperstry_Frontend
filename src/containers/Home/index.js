import React from "react";
import Header from "../../components/Header";
import Layout from "./components/Layout";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

import CookieBanner from "./components/CookieBanner";

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

function HomeComtainer({ user }) {
  return (
    <div>
      <div>
        <Header />
        <Layout />

        {/* check if the user data is availabe on redux */}
        {user.user && <GiftModal />}
        <AddComment />
        <Broadcast />
        <MobileComponent />
        <Report />
        <Share />
        <CookieBanner />
        <Notification />
        {/* <EditPost /> */}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(HomeComtainer);
