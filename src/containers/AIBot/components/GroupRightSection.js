import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { config } from "../../../../config";
import Button from "@material-ui/core/Button";
import { FormatAlignCenter } from "@material-ui/icons";

import GroupListRightProfile from "./GroupListRightProfile";

export default function GroupRightSection({ profile, user }) {
  const classes = useStyles();
  const [groupsrightbar, setGroupsRightbar] = React.useState([]);
  const [groupsloaded, setGrouspLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!groupsloaded) {
      loadgroupsRightBar();
      setGrouspLoaded(true);
    }
  });

  const loadgroupsRightBar = async () => {
    const token = localStorage.getItem("token");
    const groups = await axios.get(config.listgroups + "?username=" + profile.username, {
      headers: { "x-auth-token": token },
    });
    
    console.log("groupsdata_3", groups.data.groups);
    if (groups.data.status == "success")
      setGroupsRightbar(groups.data.groups);
  }

  return (
    <Paper className={classes.root}>
      <Typography>
        <b>Moderator of these communities</b>
        <br />
        {
          groupsrightbar.map((group, index) => (
            <div className={classes.groupright}>
              <a href={"/group/" + group.name.split(" ").join("-").replace("&", "%26")}>
                <img src={group.icon === null ? "/static/tipcoin.png" : config.getImage + group.icon} width={40} style={{ marginRight: "15px" }} height={"auto"} />
              </a>
              <div style={{ display: "inline-block" }}>
                <p style={{ margin: 0, padding: 0, fontWeight: "500" }} >
                  <a href={"/group/" + group.name.split(" ").join("-")} style={{ color: "inherit", textDecoration: 'none' }}>{group.name}</a>
                </p>
                <p style={{ margin: 0, padding: 0, fontWeight: "300" }} >{group.membercount} members</p>
              </div>

              <GroupListRightProfile user={user} group={group} profile={profile} />



            </div>
          ))
        }
      </Typography>
    </Paper>
  );

}


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    padding: "10px"
  },
  groupright: {
    marginTop: "20px"
  }
}));
