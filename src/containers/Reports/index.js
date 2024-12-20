import React from "react";
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";
import StickyHeadTable from "./components/reportTable";
import axios from "axios";
import { config } from "../../../config";
import { deleteReport, reportedUsers } from '../../store/actions'
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";


const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const mapStateToProps = (state) => ({
    user: state.user.reportedusers
});

const mapDispatchToProps = {
    deleteReport,
    reportedUsers
}
const ReportData = ({ user, deleteReport, reportedUsers }) => {
    const classes = useStyles();
    const [report, setReport] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [pages, setPages] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [currentid, setCurrentId] = React.useState('');

    React.useEffect(() => {
    reportedUsers(pages) ? setLoading(false) : null;
        
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

        

    return (
        <>
            <Header />

            <Container
                maxWidth="lg"
                style={{
                    marginTop: 100,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <h2>Reported Users</h2>
                <div className={classes.root}>
                    {loading ? (
                        <LinearProgress variant="determinate" value={progress} />
                    ) : (
                            <StickyHeadTable user={user} reportedUsers={reportedUsers} deleteReport={deleteReport} setCurrentId={setCurrentId} currentid={currentid} />
                        )}
                </div>
            </Container>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportData);
