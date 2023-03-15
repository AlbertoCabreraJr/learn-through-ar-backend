import { course } from '../../utils/mockData'
import chevronRight from '../../assets/chevronright.svg'
import check from '../../assets/check.svg'

const shouldDisableTopic = (topic: any, course: any) => {
  return !topic.finished && !course.finishedTopics.includes(topic._id) && course.currentTopic !== topic._id
}

const TopicListItem = ({ topic }: { topic: any }) => {
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
      <RightIcon topic={topic} />
    </div>
  )
}

const RightIcon = ({ topic }: { topic: any }) => {
  if (topic.finished) return <img src={check} alt='Check' />

  if (shouldDisableTopic(topic, course)) return null

  return <img src={chevronRight} alt='Check' className='topic-list-item-chevron-right' />
}

export default TopicListItem
