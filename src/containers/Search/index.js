import React from "react";
import Header from '../../components/Header'
import Layout from './components/Layout';
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import GiftModal from "../../components/GiftModal";

const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);

const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false
});

const Report = dynamic(() => import("../../components/Report"), {
  ssr: false
});

const Share = dynamic(() => import("../../components/Share"), {
  ssr: false
});

const mapStateToProps = (state) => ({
  user: state.user,
});

function SearchContainer(props) {
  const { user } = props;
  return (
    <div>
      <Header />
      <Layout />
      {user.user && <GiftModal />}
      <AddComment />
      <MobileComponent />
      <Report />
      <Share />
      <Notification />
    </div>
  );
}

export default connect(mapStateToProps)(SearchContainer)