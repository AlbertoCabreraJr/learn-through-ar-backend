import Course from '../../types/Course'
import Module from '../../types/Module'
import TopicListItem from './TopicListItem'

const TopicList = ({ topics, course, module }: { topics: any; course: Course; module: Module }) => {
  return (
    <div className='topic-list'>
      {topics.map((topic: any) => {
        return <TopicListItem key={topic._id} topic={topic} course={course} module={module} />
      })}
    </div>
  )
}

export default TopicList
