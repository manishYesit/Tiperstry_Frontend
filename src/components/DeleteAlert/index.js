import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteAlert({ open, setClose, handleApprove, name }) {
  return (
    <Dialog
			open={open}
			onClose={() => setClose(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Delete {name}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to delete this {name}. Once deleted it can't be recovered.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button style={{ color: "red" }} onClick={() => setClose(false)} >
					Disagree
				</Button>
				<Button onClick={() => handleApprove()} color="primary" variant="outlined" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
  );
}
// #29333af5