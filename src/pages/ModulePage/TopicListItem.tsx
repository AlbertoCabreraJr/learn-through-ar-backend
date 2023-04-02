import chevronRight from '../../assets/chevronright.svg'
import check from '../../assets/check.svg'
import Course from '../../types/Course'

const shouldDisableTopic = (topic: any, course: Course) => {
  return !topic.finished && !course.finishedTopics.includes(topic._id) && course.currentTopic !== topic._id
}

const TopicListItem = ({ topic, course }: { topic: any; course: Course }) => {
  let topicListItemClassname = 'topic-list-item'

  if (topic.finished) {
    topicListItemClassname += ' topic-list-item-finished'
  }

  if (shouldDisableTopic(topic, course)) {
    topicListItemClassname += ' topic-list-item-disabled'
  }

  return (
    <div key={topic._id} className={topicListItemClassname}>
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

export default TopicListItem
