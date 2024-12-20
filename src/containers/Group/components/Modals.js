import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import { withTranslation } from "../../../../i18n";

import axios from "axios";
import { config } from "../../../../config";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modals = ({
  sidebardata,
  group,
  modalopen,
  setModalOpen,
  modaldata,
  loadSideBarData,
  setModalData,
}) => {
  const addRule = async () => {
    if (sidebardata.grouprules.length == 10) {
      alert("Cannot add more than 10 rules!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          config.savegrouprule,
          {
            groupId: group._id,
            name: document.getElementById("addrule_name").value,
            description: document.getElementById("addrule_description").value,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        loadSideBarData();
        setModalOpen(0);
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  const editRule = async (ruleId) => {
    if (sidebardata.grouprules.length == 10) {
      alert("Cannot add more than 10 rules!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          config.savegrouprule,
          {
            ruleId: ruleId,
            groupId: group._id,
            name: document.getElementById(ruleId + "_name").value,
            description: document.getElementById(ruleId + "_description").value,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        loadSideBarData();
        setModalOpen(0);
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  const addRemoveModerator = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          config.addremovemoderator,
          {
            groupId: group._id,
            userId: userId,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        loadSideBarData();
        setModalOpen(0);
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  function changeRuleOrder(rule, position, direction) {
    let rules = modaldata;
    if (position == 0 && direction == -1) return;
    else if (position == rules.length - 1 && direction == 1) return;

    let i = position;
    // swap elements
    let temp = rules[i + direction];
    rules[i + direction] = rules[i];
    rules[i] = temp;
    setModalData(rules);
    setModalOpen(0);
  }

  const saveRuleSequence = async () => {
    try {
      const rules = modaldata;
      let ids = [];
      for (let i = 0; i < rules.length; i++) {
        ids.push(rules[i]._id);
      }

      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          config.updaterulesequence,
          {
            groupId: group._id,
            rule_ids: ids,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        loadSideBarData();
        setModalOpen(0);
      }
    } catch (error) {
      console.error("group moderator sidebar error", error);
    }
  };

  return (
    <>
      <Dialog
        open={modalopen == 1}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Rule</DialogTitle>
        <DialogContent>
          <p>Rule Name:</p>
          <p>
            <TextField id="addrule_name" />
          </p>
          <p>Rule Description:</p>
          <p>
            {" "}
            <TextField
              variant="outlined"
              multiline
              rows={3}
              rowsMax={4}
              id="addrule_description"
              style={{ width: "100%" }}
            />
            <br />
            <Button
              style={{
                backgroundColor: "#0079d3",
                borderRadius: "50px",
                marginTop: 5,
                textTransform: "capitalize",
                fontWeight: "600",
              }}
              color="primary"
              variant="contained"
              onClick={addRule}
            >
              Add
            </Button>
          </p>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalopen == 22}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Rule Description
        </DialogTitle>
        {modaldata && <DialogContent>{modaldata.description}</DialogContent>}
      </Dialog>

      <Dialog
        open={modalopen == 2}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Edit Rule</DialogTitle>
        {modaldata && (
          <DialogContent>
            <p>Rule Name:</p>
            <p>
              <TextField
                defaultValue={modaldata.name}
                id={modaldata._id + "_name"}
              />
            </p>
            <p>Rule Description:</p>
            <p>
              {" "}
              <TextField
                variant="outlined"
                defaultValue={modaldata.description}
                multiline
                rows={3}
                rowsMax={4}
                id={modaldata._id + "_description"}
                style={{ width: "100%" }}
              />
              <br />
              <Button
                style={{
                  backgroundColor: "#0079d3",
                  borderRadius: "50px",
                  marginTop: 5,
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
                color="primary"
                variant="contained"
                onClick={() => {
                  editRule(modaldata._id);
                }}
              >
                Save
              </Button>
            </p>
          </DialogContent>
        )}
      </Dialog>

      <Dialog
        open={modalopen == 3}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Rule</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to remove this user as a moderator from{" "}
            {group.name} ?
          </p>
          <Button
            style={{
              backgroundColor: "#0079d3",
              borderRadius: "50px",
              marginTop: 5,
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            color="primary"
            variant="contained"
            onClick={() => {
              addRemoveModerator(modaldata.identity._id);
            }}
          >
            Yes
          </Button>
          <Button
            style={{
              borderRadius: "50px",
              marginTop: 5,
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            color="default"
            variant="contained"
            onClick={() => {
              setModalOpen(0);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalopen == 4}
        style={{ WebkitOverflowScrolling: "touch" }}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Rule</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to add this user as a moderator to{" "}
            {group.name} ?
          </p>
          <Button
            style={{
              backgroundColor: "#0079d3",
              borderRadius: "50px",
              marginTop: 5,
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            color="primary"
            variant="contained"
            onClick={() => {
              addRemoveModerator(modaldata.identity._id);
            }}
          >
            Yes
          </Button>
          <Button
            style={{
              borderRadius: "50px",
              marginTop: 5,
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            color="default"
            variant="contained"
            onClick={() => {
              setModalOpen(0);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalopen == 5}
        style={{ WebkitOverflowScrolling: "touch", width: "100%" }}
        maxWidth="sm"
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Reorder Rules</DialogTitle>
        <DialogContent>
          {modaldata &&
            modaldata.length > 0 &&
            modaldata.map((rule, index) => (
              <Paper style={{ fontSize: 14, padding: 8 }}>
                <Typography
                  style={{
                    position: "relative",
                    paddingRight: "58px",
                    wordBreak: "break-all",
                  }}
                >
                  {index + 1}. {rule.name}
                  <span
                    style={{
                      position: "absolute",
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ArrowDownwardIcon
                      onClick={() => {
                        changeRuleOrder(rule, index, 1);
                      }}
                    />
                    <ArrowUpwardIcon
                      onClick={() => {
                        changeRuleOrder(rule, index, -1);
                      }}
                    />
                  </span>
                </Typography>
              </Paper>
            ))}

          <Button
            style={{
              backgroundColor: "#0079d3",
              borderRadius: "50px",
              marginTop: 5,
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            color="primary"
            variant="contained"
            onClick={saveRuleSequence}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withTranslation()(Modals);
