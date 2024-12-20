import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setTopicsForProfile,
  setCurrentPageProfile,
} from "../../../store/actions";
import axios from "axios";
import { config } from "../../../../config";
import Card from "../../../components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomScrollListerer from "react-bottom-scroll-listener";
import { useRouter } from "next/router"

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {
  setTopicsForProfile,
  setCurrentPageProfile,
};

const FavoriteSection = ({
  profile: { topics, topicCurrentPage, topicPage, topicTotal },
  setTopicsForProfile,
  setCurrentPageProfile,
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  
  React.useEffect(() => {
    handleGetTopics();
  }, []);

  const handleGetTopics = async () => {
      console.log("handleGetTopics");
    try {
      if (loading) return;
    
      setLoading(true);

      const nextTopics = await axios.get(
        config.profileFavorites +
          "/" +
          router.query.username +
          "?page=" +
          topicCurrentPage
      );
    
      let newData = JSON.parse(JSON.stringify(nextTopics.data.topics));
      
      topicPage = nextTopics.data.page;
      topicTotal = nextTopics.data.total;
 
      const pageNo = Number(topicCurrentPage) + 1;
      setTopicsForProfile({ topics: newData, topicPage, topicTotal });
      setCurrentPageProfile({
        page: "topicCurrentPage",
        pageNo,
      });
      setLoading(false);
    } catch (error) {
      console.log("error", error.response);
      setLoading(false);
    }
  };

  return (
    <>
      <BottomScrollListerer onBottom={handleGetTopics}>
        <Card topics={topics} />
      </BottomScrollListerer>

      {loading && <CircularProgress />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteSection);









































































// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import {
//   setTopicsForProfile,
//   setCurrentPageProfile
// } from "../../../store/actions";
// import axios from "axios";
// import { config } from "../../../../config";
// import Card from "../../../components/Card";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import BottomScrollListerer from "react-bottom-scroll-listener";
 



// const mapStateToProps = ({ profile }) => ({
//   profile,
// });

// const mapDispatchToProps = {
//   setTopicsForProfile,
//   setCurrentPageProfile
// };

// class FavoriteSection extends Component {
//   state = {
//     loading: false
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { profile } = this.props;

//     if (
//       prevProps.profile.username !== profile.username ||
//       typeof profile.topics[0] === "undefined"
//     ) {
//       this.handleGetTopics();
//     }
//   }



//   handleGetTopics = async () => {
//     const { profile, setTopicsForProfile, setCurrentPageProfile } = this.props;
//     const { loading } = this.state;

//     try {
//       if (!loading) {
//         const nextTopics = await axios.get(
//           config.profileTopic +
//             "/" +
//             profile.username +
//             "?page=" +
//             profile.topicCurrentPage
//         );

//         // // console.log("nextTopics", nextTopics.data);

//         this.setState({
//           loading: true
//         });

//         nextTopics.data.topics.forEach(element => {
//           profile.topics.push(element);
//         });
//         profile.topicPage = nextTopics.data.page;
//         profile.topicTotal = nextTopics.data.total;

//         const pageNo = Number(profile.topicCurrentPage) + 1;
//         setTopicsForProfile(profile);
//         this.setState({
//           loading: false
//         });
//         setCurrentPageProfile({
//           page: "topicCurrentPage",
//           pageNo
//         });
//       }
//     } catch (error) {
//       // // console.log("error", error);
//       // // console.log("error", error.response);
//       this.setState({
//         loading: false
//       });
//     }
//   };

//   render() {
//     const { profile } = this.props;
//     const { loading } = this.state;

//     return (
//       <div>
//         <BottomScrollListerer onBottom={this.handleGetTopics}>
//           <Card topics={profile.topics} />
//         </BottomScrollListerer>

//         {loading && <CircularProgress />}
//       </div>
//     );
//   }
// };


// export default connect(mapStateToProps, mapDispatchToProps)(FavoriteSection)

