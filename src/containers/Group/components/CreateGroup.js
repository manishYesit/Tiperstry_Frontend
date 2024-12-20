import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withTranslation } from "../../../../i18n";
import { config } from "../../../../config";
import axios from "axios";

const GroupCreate = ({ user, i18n, t }) => {
    const classes = useStyles();
    const router = useRouter();

    const [groupdata, setGroupdata] = useState({
        name: "",
        description: "",
        is_nsfw: 0,
        icon: "",
    });

    const [res, setRes] = React.useState({
        msg: "",
        err: false,
        status: "",
    });

    const [img, setImg] = useState(null);
    const [base64, setBase64] = useState(null);
    const [creategroup, setcreategroup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (name) => (event) => {
        setGroupdata({
            ...groupdata,
            [name]: event.target.value,
        });
    };

    function openCreateGroup() {
        if (!user) {
            // not logged in
            location.href = "/login";
            return;
        }

        setcreategroup(true);
    }
    
    function closeCreateGroup() {
        setcreategroup(false);
    }

    const getBase64 = () => {
        const file = event.target.files[0];

        if (typeof file === "undefined") return;

        setImg(event.target.files[0]);

        let self = this;

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            setBase64(reader.result);
        };

        reader.onerror = function (error) {
            
        };
    };

    function handleRemove() {
        setImg(null);
        setBase64(null);
    }

    const handleCreateGroup = async () => {
        try {
            // validations
            if (groupdata.name === "" || groupdata.name === undefined) {
                setRes({
                    err: true,
                    msg: "Group Name is required",
                    status: "warning",
                });
                return;
            }
            else if (groupdata.name.split(" ").length <= 1) {
                setRes({
                    err: true,
                    msg: "Group Name must have atleast two words",
                    status: "warning",
                });
                return;
            }
            else if (groupdata.description === "" || groupdata.description === undefined) {
                setRes({
                    err: true,
                    msg: "Group Description is required",
                    status: "warning",
                });
                return;
            }

            setLoading(true);

            const formData = new FormData();

            if (img)
                formData.append("icon", img);
            formData.append("name", groupdata.name);
            formData.append("description", groupdata.description);

            let is_nsfw = 0;
            if (groupdata.is_nsfw == "1") is_nsfw = 1;

            formData.append("is_nsfw", is_nsfw);
            setLoading(false);

            const token = localStorage.getItem("token");

            const headers = {
                "x-auth-token": token,
                "Content-Type": "multipart/form-data"
            };

            const creategroupresponse = await axios({
                method: "post",
                headers,
                url: config.creategroup,
                data: formData,
            });

            console.log("creategroup response", creategroupresponse);
            setLoading(false);
            
            router.push(`/group/${groupdata.name.replaceAll(" ", "-").replace("&", "%26")}`);
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };

    return (
        <div>
            <Dialog
                open={creategroup}
                style={{ WebkitOverflowScrolling: "touch" }}
                fullWidth={true}
                maxWidth="sm"
                aira-label="Create Group Window"
                onClose={closeCreateGroup}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div id="alert-dialog-slide-title" style={{ borderBottom: "1px solid #f3f5f6", padding: "20px 20px", margin: 0, fontSize: "26px" }}>
                    Create a Group
                </div>

                <DialogContent className={classes.crgrpdialog}>
                    <Typography>Maximum of 5 groups allowed per household.</Typography>

                    {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

                    <div className={classes.formgrp}>
                        <Typography><b>Name</b></Typography>
                        <Typography>
                            Group names must contain at least two words. For example, "Bitcoin Canada" is allowed, but "Bitcoin" is not. 
                            <br />
                            Brand names by themselves are not allowed. For example, "Bob's Twin Peaks Group" is allowed, but "Twin Peaks" is not.
                            <br />
                            Groups managed by related corporations are required to put the word "Official" in the group name. For example, "Twin Peaks Official" or "World Economic Forum Official".
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={handleChange("name")}
                            className={classes.TextField}
                        />
                    </div>

                    <div className={classes.formgrp}>
                        <Typography><b>Description</b></Typography>
                        <Typography>
                            Describe the purpose of your group to new members.
                        </Typography>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={3}
                            fullWidth
                            rowsMax={4}
                            onChange={handleChange("description")}
                            className={classes.TextField}
                        />
                    </div>

                    {base64 && <img src={base64} className={classes.img1} />}
                    <div className={classes.formgrp}>
                        <Typography><b>Icon</b></Typography>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="contained-button-file2"
                            onChange={getBase64}
                            type="file"
                        />
                        <div className={classes.ButtonRoot}>
                            <label htmlFor="contained-button-file2">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    component="span"
                                >
                                    {t("Upload")}
                                </Button>
                            </label>
                            <Button
                                variant="outlined"
                                disabled={!img}
                                onClick={handleRemove}
                                style={{ color: "red" }}
                                size="small"
                                component="span"
                            >
                                {t("remove")}
                            </Button>
                        </div>
                    </div>

                    <div className={classes.formgrp}>
                        <Typography><b>{t("Adult Content")}</b></Typography>
                        <FormControlLabel
                            value="1"
                            control={<Checkbox onChange={handleChange("is_nsfw")} color="primary" />}
                            label={<b><span className={classes.nsfw}>NSFW</span> 18+ year old community</b>}
                            labelPlacement="end"
                        />
                        <Typography>
                            Groups must be marked NSFW if they contain any of the following:
                            <br/>
                            1. Violent or sexual imagery.
                            <br/>
                            2. Bigotry.
                            <br/>
                            3. Personal attacks.
                            <br/>
                            Groups marked NSFW are opt-in and will not show up on the site's default feed. In order to view content from a NSFW group, members can subscribe to the group to see its content on their Home feed, or visit the group's page directly.
                        </Typography>
                    </div>
                </DialogContent>

                <DialogActions style={{ backgroundColor: "#edeff1", padding: "10px 10px" }}>
                    <Button className={classes.grpbtn2} onClick={closeCreateGroup} color="default" variant="outlined">
                        {t("Cancel")}
                    </Button>
                    <Button
                        className={classes.grpbtn3}
                        onClick={handleCreateGroup}
                        color="primary"
                        variant="contained"
                    >
                        {loading ? <CircularProgress style={{ color: "white" }} size={25} /> : t("Create Community")}
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper style={{ padding: "20px 10px", textAlign: "center" }}>
                <div className={classes.grpbtndiv} onClick={openCreateGroup}>
                    <div className={classes.grpbtn} >Create Group</div>
                </div>

                <Typography>Earn crypto based on the success of your group.</Typography>
            </Paper>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    grpbtn: {
        fontSize: 20,
        color: "#3f48cc",
    },
    nsfw: {
        backgroundColor: "#ff585b",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px"
    },
    grpbtn2: {
        borderRadius: "50px",
        borderColor: "#58a5de",
        color: "#0079d3"
    },
    grpbtn3: {
        borderRadius: "50px",
        backgroundColor: "#0079d3",
        color: "white"
    },
    formgrp: {
        padding: "20px 0",
        margin: "auto"
    },
    grpbtndiv: {
        cursor: "pointer",
        marginBottom: 8,
        padding: 10,
        alignItems: "center",
        border: "1px solid #0079d3",
        borderRadius: "50px"
    },
    ButtonRoot: {
        width: 150,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 2,
    },
    img1: {
        height: 150,
        width: 150,
        display: "block",
    },
}));

export default withTranslation()(GroupCreate);
