import Course from '../../types/Course'
import TopicListItem from './TopicListItem'

const TopicList = ({ topics, course }: { topics: any; course: Course }) => {
  return (
    <div className='topic-list'>
      {topics.map((topic: any) => {
        return <TopicListItem key={topic._id} topic={topic} course={course} />
      })}
    </div>
  )
}

export default TopicList
