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
    (thing, index, self) => index === self.findIndex((t) => t.url == url)
  );
}

const Card = ({ route, filter, siteurl, topics, topic: { view } }) => {
  topics = filterTopicsDuplicate(topics);

  /* Pagination optimization*/
  const perPage = 8;
  let pagestart = 0;
  let pagend = perPage;
  let topics_paginated = topics.slice(pagestart, pagend);

  useEffect(() => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    setTimeout(() => {
      let btn = document.getElementById("paginate_button");
      if (btn != null) btn.click();
    }, 1000);
  }, []);

  const handlePagination = (start, end) => {
    if (topics_paginated.length == 0) {
      start = 0;
      end = perPage;
    }
    pagestart = start;
    pagend = end;
    topics_paginated = topics_paginated.concat(topics.slice(start, end));
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

      {topics.length > perPage && (
        <div style={{ alignContent: "center" }}>
          <Button
            id={"paginate_button"}
            variant="outlined"
            onClick={() => {
              handlePagination(pagestart + perPage, pagend + perPage);
            }}
            color="primary"
          >
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Card);
