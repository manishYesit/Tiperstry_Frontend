import React from "react";
import Comment from "./Comment";

// This component represents a single comment thread
const CommentThread = ({ comt, singleTopic }) => {

  // for collapsing/expanding current thread
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      style={{
        marginBottom: 10,
      }}
    >
      <Comment data={comt} collapsed={collapsed} setCollapsed={setCollapsed} singleTopic={singleTopic} />
    </div>
  )
}

export default CommentThread;
