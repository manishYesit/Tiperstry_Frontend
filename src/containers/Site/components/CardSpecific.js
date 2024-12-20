import React, { useEffect, Fragment } from "react";
import ClassicCard from "../../../components/Card/components/ClassicCard";
import SiteCard from "../../../components/Card/components/SiteCard";
import CompactCard from "../../../components/Card/components/CompactCard";
import lozad from "lozad";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Pageview } from "@material-ui/icons";
import axios from "axios";
import { config } from "../../../../config";

const mapStateToProps = (state) => ({
  topic: state.site,
  topics: state.site.topics,
});

function filterTopicsDuplicate(topics) {
  return topics.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.title === thing.title)
  );
}

function filterTopicsURLDifferent(topics, url) {
  return topics.filter(
    (thing, index, self) => index === self.findIndex((t) => t.url !== url)
  );
}

const CardSpecific = ({ route, filter, siteurl, topic: { view } }) => {
  const [topics, setTopics] = React.useState([]);

  /* Pagination optimization*/
  const perPage = 8;
  var [pagestart, setPageStart] = React.useState(0);
  var [pagend, setPageEnd] = React.useState(perPage);
  var [topics_paginated, setTopicsPaginated] = React.useState([]);

  useEffect(() => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    // load specific posts
    if (filter == "specificposts") {
      siteurl = siteurl.replace(/\/$/, "");
      if (route == "/sites") {
        axios
          .get(config.getTopicsByUrl + "?url=" + siteurl)
          .then(function (topics_new) {
            setTopics(topics_new.data.topics);
            setTopicsPaginated(topics_new.data.topics);
          });
      } else {
        axios
          .get(config.siteTopics + "?url=" + siteurl)
          .then(function (topics) {
            setTopicsPaginated(topics.data.topics);
          });
      }
    }
  }, []);

  const handlePagination = (start, end) => {
    if (topics_paginated.length == 0) {
      start = 0;
      end = perPage;
    }
    setPageStart(start);
    setPageEnd(end);
    setTopicsPaginated(topics_paginated.concat(topics.slice(start, end)));
  };

  return (
    <div>
      {topics_paginated.map((topic, index) => (
        <Fragment key={index}>
          {view === "compact" ? (
            <CompactCard topic={topic} />
          ) : topic.type === "site" ? (
            <SiteCard topic={topic} />
          ) : (
            <ClassicCard topic={topic} />
          )}
        </Fragment>
      ))}

      {/* { topics.length > perPage &&
         (
          <div style={{alignContent:"center"}}>

            <Button id={"paginate_button2"} variant="outlined" onClick={()=>{handlePagination(pagestart + perPage,pagend + perPage)}} color="primary">View More</Button>
        </div>
        )
      } */}
    </div>
  );
};

export default connect(mapStateToProps)(CardSpecific);
