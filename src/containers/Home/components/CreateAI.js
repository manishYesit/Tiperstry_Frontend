import React, { useState, useEffect } from "react";
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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Add from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import { withTranslation } from "../../../../i18n";
import { config } from "../../../../config";
import axios from "axios";

const AICreate = ({ user, siteUrl, i18n, t }) => {
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
    const [chipData, setChipData] = useState([]);
    const [groupsList, setGroupsList] = useState([]);

    const [val, setVal] = useState({
        url: siteUrl ? siteUrl : "",
        title: "",
        details: "",
        tag: "",
        img: "",
    });

    useEffect(() => {
        handleGetGroupsList();  // Call the function to fetch groups data on component mount
    }, []);

    const handleChange = (name) => (event) => {
        setGroupdata({
            ...groupdata,
            [name]: event.target.value,
        });
    };

    const handleChangeEventForTags = (name) => (event) => {
        setVal({
            ...val,
            [name]: event.target.value,
        });
    };

    const addTag = () => {
        handleChangeTag(undefined, true);
    };

    const handleChangeTag = (e, ignoreEvent) => {
        if (
            ignoreEvent ||
            e.keyCode === 32 ||
            e.key === " " ||
            e.key === "Spacebar" ||
            e.key === "Enter"
        ) {
            let data = chipData.flatMap((chip) => chip.label);
            val.tag = val.tag && val.tag.replace(/[#\$%&\^\!@#$*\[\]\.\()+`~]*/g, "");
            if (
                val.tag &&
                !data.includes(val.tag) &&
                chipData.length <= 4 &&
                !val.tag.match(/^\s+$/)
            ) {
                chipData.push({
                    key: val.tag + Math.floor(Math.random() * 10 + 1),
                    label: val.tag
                        .substring(0, 20)
                        .toLocaleLowerCase()
                        .replace(/ /gi, ""),
                });

                setChipData(chipData);
                setVal({
                    ...val,
                    tag: "",
                });
            }
        }
    };

    const handleTagRender = () => {
        return chipData.map((tag) => (
            <Chip
                key={tag.key}
                variant="outlined"
                size="small"
                avatar={<Avatar>#</Avatar>}
                label={tag.label}
                onDelete={() => handleDeleteForTag(tag)}
                color="primary"
            />
        ));
    };

    const handleDeleteForTag = (data) => {
        setChipData(chipData.filter((chip) => chip.key !== data.key));
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

    const handleGetGroupsList = async () => {

        try {
            if (!loading) {
                const token = localStorage.getItem("token");
                const groups = await axios.get(config.listgroups + "?joinedgroups=1&username=" + user.username, {
                    headers: { "x-auth-token": token },
                });
                setLoading(true);
                setGroupsList([]);

                console.log("groupslist", groups.data);
                if (groups.data.status == "success") {
                    setLoading(false);
                    setGroupsList(groups.data.groups);
                }
            }
        }
        catch (error) {
            setLoading(false);
        }
    };

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
            } else if (groupdata.name.split(" ").length <= 1) {
                setRes({
                    err: true,
                    msg: "Group Name must have atleast two words",
                    status: "warning",
                });
                return;
            } else if (
                groupdata.description === "" ||
                groupdata.description === undefined
            ) {
                setRes({
                    err: true,
                    msg: "Group Description is required",
                    status: "warning",
                });
                return;
            }

            setLoading(true);

            const formData = new FormData();
            if (img) formData.append("icon", img);
            formData.append("name", groupdata.name);
            formData.append("description", groupdata.description);

            let is_nsfw = 0;
            if (groupdata.is_nsfw == "1") is_nsfw = 1;

            formData.append("is_nsfw", is_nsfw);
            setLoading(false);

            const token = localStorage.getItem("token");

            const headers = {
                "x-auth-token": token,
                "Content-Type": "multipart/form-data",
            };

            const creategroupresponse = await axios({
                method: "post",
                headers,
                url: config.creategroup,
                data: formData,
            });

            if (creategroupresponse.data.status != "success") {
                setRes({
                    err: true,
                    msg: "This group already exists",
                    status: "warning",
                });
            }

            if (creategroupresponse.data.status != "success") {
                setRes({
                    err: true,
                    msg: "This group already exists",
                    status: "warning",
                });
                return;
            }

            console.log("creategroup response", creategroupresponse);
            setLoading(false);

            router.push(
                `/group/${groupdata.name.replaceAll(" ", "-").replace("&", "%26")}`
            );
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
                <div
                    id="alert-dialog-slide-title"
                    style={{
                        borderBottom: "1px solid #f3f5f6",
                        padding: "20px 20px",
                        margin: 0,
                        fontSize: "26px",
                    }}
                >
                    Create AI Bot
                </div>


                <DialogContent className={classes.crgrpdialog}>

                    <div className={classes.selectBox}>
                        <Typography className={classes.selectInput}>
                            <b> AI Agent Model</b>
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select onChange={handleChange("networkId")}>
                                <MenuItem value="" disabled>
                                    AI Agent Model
                                </MenuItem>
                                <MenuItem value="GPT-4o mini">Content-Agent</MenuItem>
                            </Select>
                        </FormControl>
                    </div>



                    {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

                    <div className={classes.formgrp}>
                        <Typography>
                            <b>Name</b>
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={handleChange("name")}
                            className={classes.TextField}
                        />
                    </div>

                    <div className={classes.selectBox}>
                        <Typography className={classes.selectInput}>
                            <b> Select Group</b>
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select onChange={handleChange("networkId")}>
                                <MenuItem value="" disabled>
                                    Select Group
                                </MenuItem>
                                {groupsList.length > 0 ? (
                                    groupsList.map((group, index) => (
                                        <MenuItem key={index} value={group.name}>
                                            {group.name}  {/* Adjust the property name to match your data */}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="" disabled>Loading Groups...</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.formgrp}>
                        <Typography>
                            <b>Topic</b>
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            onChange={handleChange("topic")}
                            className={classes.TextField}
                        />
                    </div>

                    {base64 && <img src={base64} className={classes.img1} />}
                    <div className={classes.formgrp}>
                        <Typography>
                            <b>Icon</b>
                        </Typography>
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

                    <div className={classes.tag}>{handleTagRender()}</div>

                    <div className={classes.relative}>
                        <TextField
                            required
                            id="name"
                            onChange={handleChangeEventForTags("tag")}
                            onText
                            onKeyUp={handleChangeTag}
                            value={val.tag}
                            label={t("Add Tag")}
                            margin="dense"
                            placeholder={t("Enter a hashtag")}
                            // size="small"
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            disabled={val.tag == ""}
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            onClickCapture={addTag}
                        >
                            {" "}
                            <Add />
                        </Button>
                    </div>
                </DialogContent>

                <DialogActions
                    style={{ backgroundColor: "#edeff1", padding: "10px 10px" }}
                >
                    <Button
                        className={classes.grpbtn2}
                        onClick={closeCreateGroup}
                        color="default"
                        variant="outlined"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        className={classes.grpbtn3}
                        onClick={handleCreateGroup}
                        color="primary"
                        variant="contained"
                    >
                        {loading ? (
                            <CircularProgress style={{ color: "white" }} size={25} />
                        ) : (
                            t("Create Community")
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper className={classes.root}>
                <div className={classes.grpbtndiv} onClick={openCreateGroup}>
                    <div className={classes.grpbtn}>Create AI</div>
                </div>

                {/* <Typography>Earn crypto based on the success of your group.</Typography> */}
            </Paper>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        backgroundImage: "url('/static/arrow.png')",
        borderRadius: "unset",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 41,
        marginBottom: 15,
        boxShadow: "none",
    },
    grpbtn: {
        fontSize: 16,
        color: "#3f48cc",
    },
    nsfw: {
        backgroundColor: "#ff585b",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px",
    },
    grpbtn2: {
        borderRadius: "50px",
        borderColor: "#58a5de",
        color: "#0079d3",
    },
    grpbtn3: {
        borderRadius: "50px",
        backgroundColor: "#0079d3",
        color: "white",
    },
    formgrp: {
        padding: "20px 0",
        margin: "auto",
    },
    grpbtndiv: {
        cursor: "pointer",
        marginBottom: 15,
        padding: 10,
        alignItems: "center",
        borderRadius: "50px",
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
    selectInput: {
        display: "inline",
        marginRight: "2rem",
    },
    selectBox: {
        padding: "20px 0",
        margin: "auto",
    },
    formControl: {
        minWidth: 120,
    },
    button: {
        position: "absolute",
        top: 10.3,
        right: 3,
    },
    relative: {
        position: "relative",
    },
    tag: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
}));

export default withTranslation()(AICreate);