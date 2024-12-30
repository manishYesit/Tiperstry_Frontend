import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
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

const AICreate = ({ user, t }) => {
    const classes = useStyles();
    const router = useRouter();

    const [aiData, setAIData] = useState({
        name: "",
        agent_model: "",
        groupId: "",
        topic: "",
    });

    const [res, setRes] = React.useState({
        msg: "",
        err: false,
        status: "",
    });

    const [createAI, setCreateAI] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chipData, setChipData] = useState([]);
    const [groupsList, setGroupsList] = useState([]);

    const [val, setVal] = useState({
        tag: ""
    });

    useEffect(() => {
        if (user) {
            handleGetGroupsList();  // Call the function to fetch groups data on component mount
        }
    }, [user]);

    const handleChange = (name) => (event) => {
        setAIData({
            ...aiData,
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

    function openCreateAI() {
        if (!user) {
            // not logged in
            location.href = "/login";
            return;
        }
        setCreateAI(true);
    }

    function closeCreateAI() {
        setCreateAI(false);
    }

    const handleGetGroupsList = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const groups = await axios.get(config.listgroups + "?joinedgroups=1&username=" + user.username, {
                    headers: { "x-auth-token": token },
                });

                if (groups.data.status == "success") {
                    setGroupsList(groups.data.groups);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleCreateAI = async () => {
        try {
            // validations
            if (aiData.name === "" || aiData.name === undefined) {
                setRes({
                    err: true,
                    msg: "AI Agent name is required",
                    status: "warning",
                });
                return;
            } else if (aiData.name.split(" ").length <= 1) {
                setRes({
                    err: true,
                    msg: "AI Agent name must have atleast two words",
                    status: "warning",
                });
                return;
            } else if (
                aiData.agent_model === "" ||
                aiData.agent_model === undefined
            ) {
                setRes({
                    err: true,
                    msg: "AI Agent model is required",
                    status: "warning",
                });
                return;
            }

            setLoading(true);

            const formData = new FormData();
            formData.append("name", aiData.name);
            formData.append("agent_model", aiData.agent_model);
            formData.append("groupId", aiData.groupId);
            formData.append("topic", aiData.topic);

            setLoading(false);
            return;

            const token = localStorage.getItem("token");

            const headers = {
                "x-auth-token": token
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
                    msg: "This AI Agent already exists",
                    status: "warning",
                });

                return;
            }

            setLoading(false);

            router.push(
                `/group/${aiData.name.replaceAll(" ", "-").replace("&", "%26")}`
            );
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };

    return (
        <div>
            <Dialog
                open={createAI}
                style={{ WebkitOverflowScrolling: "touch" }}
                fullWidth={true}
                maxWidth="sm"
                aira-label="Create Group Window"
                onClose={closeCreateAI}
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
                    {res.err && <Alert severity={res.status}>{res.msg}</Alert>}

                    <div className={classes.selectBox}>
                        <Typography className={classes.selectInput}>
                            <b>AI Agent Model</b>
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select onChange={handleChange("agent_model")}>
                                <MenuItem value="" disabled>
                                    AI Agent Model
                                </MenuItem>
                                <MenuItem value="Content">Content-Agent</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.selectBox}>
                        <Typography className={classes.selectInput}>
                            <b>Select Group</b>
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select onChange={handleChange("groupId")}>
                                <MenuItem value="" disabled>
                                    Select Group
                                </MenuItem>
                                {groupsList.length && (
                                    groupsList.map((group, index) => (
                                        <MenuItem key={index} value={group._id}>
                                            {group.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>

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
                        onClick={closeCreateAI}
                        color="default"
                        variant="outlined"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        className={classes.grpbtn3}
                        onClick={handleCreateAI}
                        color="primary"
                        variant="contained"
                    >
                        {loading ? (
                            <CircularProgress style={{ color: "white" }} size={25} />
                        ) : (
                            t("Create AI Bot")
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper className={classes.root}>
                <div className={classes.grpbtndiv} onClick={openCreateAI}>
                    <div className={classes.grpbtn}>Create AI</div>
                </div>
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
        gap: "5px"
    },
}));

export default withTranslation()(AICreate);