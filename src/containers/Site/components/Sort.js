import React from "react";
import NewReleases from "@material-ui/icons/NewReleases";
import BarChart from "@material-ui/icons/BarChart";
import History from "@material-ui/icons/History";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";
import { config } from "../../../../config";
import { setTopicForSite } from "../../../store/actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Tooltip from "@material-ui/core/Tooltip";

const mapDispatchToProps = {
  setTopicForSite,
};

const Sort = ({ setTopicForSite, url }) => {
  const [loading, setLoading] = React.useState(false);
  const [sortType, setSortType] = React.useState("top");
  const router = useRouter();

  const handleChange = async (event, newSortType) => {
    try {
      setLoading(true);
      setSortType(newSortType);

      if (router.route === "/sites") {
        const topics = await axios.get(
          config.siteTopics + "?url=" + url + "&sort=" + newSortType
        );

        setTopicForSite(topics.data);
      } else {
        const topics = await axios.get(
          config.siteTopics + "?url=" + url + "&sort=" + newSortType
        );
        // // console.log("topics.data", topics);

        setTopicForSite(topics.data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // // console.log("error", error);
      // // console.log("error", error.response);
    }
  };

  const children = [
    <Tooltip title="Popular">
      <ToggleButton disabled={loading} key={1} value="top">
        <BarChart />
      </ToggleButton>
    </Tooltip>,
    <Tooltip title="New">
      <ToggleButton disabled={loading} key={2} value="newest">
        <NewReleases />
      </ToggleButton>
    </Tooltip>,
    <Tooltip title="Old">
      <ToggleButton disabled={loading} key={3} value="oldest">
        <History />
      </ToggleButton>
    </Tooltip>,
  ];

  return (
    <ToggleButtonGroup
      size="small"
      value={sortType}
      exclusive
      onChange={handleChange}
    >
      {children}
    </ToggleButtonGroup>
  );
};

export default connect(null, mapDispatchToProps)(Sort);
