import React from "react";
import Header from "../../components/Header";
import Layout from "./components/Layout";
import GiftModal from "../../components/GiftModal";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const AddDomain = dynamic(
  () => import("../../components/DomainVerification/AddDomain"),
  {
    ssr: false,
  }
);

const VerifyDomain = dynamic(
  () => import("../../components/DomainVerification/VerifyDomain"),
  {
    ssr: false,
  }
);

const YoutubeVerification = dynamic(
  () => import("../../components/Youtube/YoutubeVerification"),
  {
    ssr: false,
  }
);

const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);

const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false,
});

const ReportProfile = dynamic(() => import("../../components/ReportProfile"), {
  ssr: false,
});

const Share = dynamic(() => import("../../components/Share"), {
  ssr: false,
});

const Broadcast = dynamic(() => import("../../components/Broadcast"), {
  ssr: false,
});

const Setting = dynamic(() => import("../../components/Setting"), {
  ssr: false,
});

const mapStateToProps = (state) => ({
  user: state.user,
});

function HomeComtainer(props) {
  const { user } = props;
  return (
    <div>
      <Header />
      <Layout />

      {/* check if the user data is availabe on redux */}
      {user.user && <GiftModal />}
      <AddComment />
      <VerifyDomain />
      <AddDomain />
      <YoutubeVerification />
      <MobileComponent />
      <ReportProfile />
      <Share />
      <Notification />
      <Broadcast />
      <Setting />
    </div>
  );
}

export default connect(mapStateToProps)(HomeComtainer);
