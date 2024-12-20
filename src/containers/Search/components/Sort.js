import React from "react";
import NewReleases from "@material-ui/icons/NewReleases";
import BarChart from "@material-ui/icons/BarChart";
import History from "@material-ui/icons/History";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";
import { config } from "../../../../config";
import { setSearch } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Sort = () => {
  const [loading, setLoading] = React.useState(false);
  const [sortType, setSortType] = React.useState("top");
  const dispatch = useDispatch();
  const router = useRouter();

  let searchQuery = router.query ? router.query.q : '';

  let token = localStorage.getItem("token");
  const handleChange = async (event, newSortType) => {
    try {
      setLoading(true);
      setSortType(newSortType);
      window.localStorage.setItem('sortType', newSortType);

      const headers = token && { "x-auth-token": token };

      const topics = await axios.get(
        `${config.search}?q=${searchQuery}&sort=${newSortType}`,
        { headers }
      );

      dispatch(setSearch(topics.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

export default Sort;
