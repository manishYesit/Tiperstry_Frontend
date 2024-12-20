import React from "react";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { config } from "../../../../config";

export default function GroupListRightProfile({profile,group,user}) {
    const [userjoined,setUserJoined] = React.useState(false);

    const joinGroup = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            let group_joiningstatus = await axios.post(
              config.joingroup,
              {
                userId: user._id,
                groupId: group._id,
              },
              {
                headers: { "x-auth-token": token },
              }
            );
            if(group_joiningstatus.data.message.includes("Left"))
              setUserJoined(false);
            else if(group_joiningstatus.data.message.includes("Joined"))
            setUserJoined(true);
          
            // location.reload();
          }
        } catch (error) {
          console.error("join group error", error);
        }
    };


    return (
        <>
    
                  
                    {
                        user && group.userId != user._id &&  (
                            <Button
                            onClick={joinGroup}
                            style={{backgroundColor:"#0079d3",borderRadius:"50px",textTransform:"capitalize",marginTop:"10px",fontWeight:"600"}}
                            color="primary"
                            variant="contained"
                            >
                                {(group.members.includes(user._id) || userjoined) && "Leave"}
                                {(!group.members.includes(user._id) && !userjoined) && "Join"}
                            </Button>
                        )
                        
                        
                    }
        </>
    );

}