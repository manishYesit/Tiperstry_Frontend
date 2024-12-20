import React from 'react';
import Layout from "./components/Layout"
import Header from "../../components/Header";
import dynamic from "next/dynamic";

const Notification = dynamic(() => import("../../components/Notification"), {
  ssr: false,
});

const WalletDetails = () => {
	return (
    <div>
      <Header />
      <Layout />
      <Notification />
    </div>
  );
}

export default WalletDetails
