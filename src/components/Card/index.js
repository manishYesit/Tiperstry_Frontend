import React, { useEffect, Fragment } from "react";
import ClassicCard from "./components/ClassicCard";
import SiteCard from "./components/SiteCard";
import CompactCard from "./components/CompactCard";
import lozad from "lozad";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state) => ({
  topic: state.topics,
});

const Card = ({ topics, topic: { view } }) => {
  useEffect(() => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }, []);

  const user = useSelector(({ user: { user } }) => user);
  
  return (
    <div>
      {topics.map((topic, index) => (
        <Fragment key={index}>
          {!user || (topic.userId !== null && user !== null) ? (
            view === "compact" ? (
              <CompactCard topic={topic} key={index} />
            ) : topic.type === "site" ? (
              <SiteCard topic={topic} key={index}/>
            ) : (
              <ClassicCard topic={topic} key={index}/>
            )
          ) : (
            <></>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Card);
