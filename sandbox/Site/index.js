import React from "react";
import Header from '../../components/Header'
import Layout from './components/Layout';
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const MobileComponent = dynamic(
  () => import("../../components/MobileComponent"),
  { ssr: false }
);
const AddComment = dynamic(() => import("../../components/AddComment"), {
  ssr: false
});
const GiftModal = dynamic(() => import("../../components/GiftModal"), {
  ssr: false
});
const Share = dynamic(() => import("../../components/Share"), {
  ssr: false
});

const mapStateToProps = state => ({
	user: state.user
})

function HomeComtainer(props) {
	const { user } = props;
	return (
    <div>
      <Header />
      <Layout />

      {/* check if the user data is availabe on redux */}
      {user.user && <GiftModal />}
      <AddComment />
      <MobileComponent />
      <Share />
    </div>
  );
}


export default connect(mapStateToProps)(HomeComtainer)