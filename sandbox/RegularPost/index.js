import React from 'react'
import ReviewCard from './components/ReviewCard'

function Index({ topic }) {
	return (
    <div>
      <ReviewCard topic={topic} />
    </div>
  );
}

export default Index
