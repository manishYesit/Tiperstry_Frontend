import React from "react";
import Header from "../../components/Header";
import Layout from "./components/Layout";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);
const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false,
});
//edited her
const VerifyDomain = dynamic(
  () => import("../../components/DomainVerification/VerifyDomain"),
  {
    ssr: false,
  }
);

const AddDomain = dynamic(
  () => import("../../components/DomainVerification/AddDomain"),
  {
    ssr: false,
  }
);

// to her
const GiftModal = dynamic(() => import("../../components/GiftModal"), {
  ssr: false,
});
const Share = dynamic(() => import("../../components/Share"), {
  ssr: false,
});
const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const mapStateToProps = (state) => ({
  user: state.user,
});

function HomeComtainer(props) {
  const { user } = props;
  let router = useRouter();

  if (!router.query.s.toLowerCase().includes("http"))
    router.query.s = "https://" + router.query.s;

  return (
    <div>
      <Header />
      <Layout />
      {/* check if the user data is availabe on redux */}
      {user.user && <GiftModal />}
      <AddComment />
      <VerifyDomain />
      <AddDomain />
      <MobileComponent />
      <Share />
      <Notification />
    </div>
  );
}

export default connect(mapStateToProps)(HomeComtainer);
