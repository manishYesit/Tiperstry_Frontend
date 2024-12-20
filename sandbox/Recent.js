import React, { Component } from "react";
import Home from "../src/containers/Home";
import { config } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import {
  setTopics,
  setCurrentPage,
  setToken,
  setUserData,
  setTopicView,
} from "../src/store/actions";
import BottomScrollListerer from "react-bottom-scroll-listener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { withTranslation } from "../i18n";
import { isMobile } from "react-device-detect";

const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setTopicView,
  setToken,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topics: state.topics,
  };
};

const HomePage = ({
  setTopics,
  setTopicView,
  firstTopics,
  topics,
  setCurrentPage,
  setUserData,
  setToken,
}) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    handleGetUser();

    setTopics(firstTopics);

    if (isMobile) {
      setTopicView("normal");
    }

    handleDefaultView();
  }, []);

  const handleDefaultView = () => {
    const view = localStorage.getItem("view");

    if (!view) return;

    setTopicView(view);
  };

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      }

      setToken(token);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFetchMore = async () => {
    if (topics.page <= topics.currentPage) return;

    if (loading) return;

    setLoading(true);

    const page = Number(topics.currentPage) + 1;
    try {
      const nextTopics = await axios.get(
        config.topics + "?page=" + page + "&type=recent"
      );

      nextTopics.data.topics.forEach((element) => {
        topics.topics.push(element);
      });
      topics.page = nextTopics.data.page;
      topics.total = nextTopics.data.total;

      setTopics(topics);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <BottomScrollListerer onBottom={handleFetchMore}>
      <Home />
      {loading && (
        <Container maxWidth="xs">
          <CircularProgress />
        </Container>
      )}
    </BottomScrollListerer>
  );
};

HomePage.getInitialProps = async (ctx) => {
  try {
    const topics = await axios.get(config.topics + "?type=recent");

    return {
      firstTopics: topics.data,
    };
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePage));

// import React, { Component } from 'react';
// import Home from "../src/containers/Home";
// import { config } from "../config";
// import axios from "axios";
// import { connect } from "react-redux";
// import { setTopics, setCurrentPage, setToken, setUserData } from "../src/store/actions"
// import BottomScrollListerer from "react-bottom-scroll-listener";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { Container } from '@material-ui/core';
// import Router from "next/router";
// import { withTranslation } from "../i18n";

// const mapDispatchToProps = {
//   setTopics,
//   setCurrentPage,
//   setUserData,
//   setToken
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     topics: state.topics
//   };
// }

// class Recent extends Component {
//   static async getInitialProps(context) {
//     const { req, res } = context;
//     try {
//       const topics = await axios.get(config.topics + "?type=recent");

//       return {
//         firstTopics: topics.data
//       };
//     } catch (error) {
//       // console.log("error", error);
//     }
//   }

//   constructor(props) {
//     super(props);

//     this.clear = null;

//     this.state = {
//       loading: false
//     }
//   }

//   componentDidMount() {
//     const { setTopics, firstTopics } = this.props;

//     this.handleGetUser();

//     setTopics(firstTopics);

//     // this.clear = setInterval(async() => {
//     //   this.handleFetchMore();
//     // }, 3000);
//   }

//   // componentDidUpdate(prevProps, prevState) {
//   //   if (prevProps.topics.currentPage > 3) {
//   //     clearInterval(this.clear);
//   //   }
//   // }

//   // handleSetToken = () => {
//   //   const { setToken } = this.props;

//   //   const token = localStorage.getItem("token");
//   //   setToken(token);
//   // }

//   handleGetUser = async () => {
//     try {
//       const { setToken, setUserData } = this.props;

//       const token = localStorage.getItem("token");
//       if (token) {
//         const user = await axios.get(config.me, {
//           headers: { "x-auth-token": token }
//         });

//         setUserData(user.data);
//         sessionStorage.setItem("userData", user.data);
//       }

//       setToken(token);
//     } catch (error) {
//       // console.log("error", error);
//     }
//   }

//   // componentWillUnmount() {
//   //   clearInterval(this.clear)
//   // }

//   handleFetchMore = async() => {
//     const { topics, setCurrentPage, setTopics } = this.props;
//     const { loading } = this.state;

//     if (topics.page <= topics.currentPage) return;

//     if (loading) return;

//     this.setState({
//       loading: true
//     });

//     const page = Number(topics.currentPage) + 1;
//     try {
//       const nextTopics = await axios.get(
//         config.topics + "?page=" + page + "&type=recent"
//       );

//       nextTopics.data.topics.forEach(element => {
//         topics.topics.push(element);
//       });
//       topics.page = nextTopics.data.page;
//       topics.total = nextTopics.data.total;

//       setTopics(topics);
//       setCurrentPage(page);
//       this.setState({
//         loading: false
//       });
//     } catch (error) {
//       // console.log("errorerror", error);
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
//     const { loading } = this.state;
//     return (
//       <BottomScrollListerer onBottom={this.handleFetchMore}>
//         <Home />
//         {loading && (
//           <Container maxWidth="xs">
//             <CircularProgress />
//           </Container>
//         )}
//       </BottomScrollListerer>
//     );
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withTranslation()(Recent));
