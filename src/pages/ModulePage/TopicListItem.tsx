import chevronRight from '../../assets/chevronright.svg'
import check from '../../assets/check.svg'
import Course from '../../types/Course'
import { useNavigate } from 'react-router-dom'
import Topic from '../../types/Topic'
import Module from '../../types/Module'

const soundTap = require('../../assets/sounds/sound-tap.mp3')

const TopicListItem = ({ topic, course, module }: { topic: Topic; course: Course; module: Module }) => {
  const navigate = useNavigate()

  let topicListItemClassname = 'topic-list-item'

  if (topic.finished) {
    topicListItemClassname += ' topic-list-item-finished'
  }

  if (shouldDisableTopic(topic, course)) {
    topicListItemClassname += ' topic-list-item-disabled'
  }

  return (
    <div
      key={topic._id}
      className={topicListItemClassname}
      onClick={() => {
        if (shouldDisableTopic(topic, course)) {
          return
        }

        navigate(`/course/${course._id}/module/${module._id}/topic/${topic._id}`)
      }}
    >
      <div className='topic-list-item-title'>{topic.title}</div>
      <RightIcon topic={topic} course={course} />
    </div>
  )
}

const RightIcon = ({ topic, course }: { topic: any; course: Course }) => {
  if (topic.finished) return <img src={check} alt='Check' />

  if (shouldDisableTopic(topic, course)) return null

  return <img src={chevronRight} alt='Check' className='topic-list-item-chevron-right' />
}

const shouldDisableTopic = (topic: any, course: Course) => {
  return !topic.finished && !course.finishedTopics.includes(topic._id) && course.currentTopic !== topic._id
}

export default TopicListItem
