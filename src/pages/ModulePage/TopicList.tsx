import React from 'react'
import TopicListItem from './TopicListItem'

const TopicList = ({ topics }: { topics: any }) => {
  return (
    <div className='topic-list'>
      {topics.map((topic: any) => {
        return <TopicListItem key={topic.id} topic={topic} />
      })}
    </div>
  )
}

export default TopicList
