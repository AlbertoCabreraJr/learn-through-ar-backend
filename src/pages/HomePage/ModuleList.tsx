import Course from '../../types/Course'
import ModuleListItem from './ModuleListItem'

const ModuleList = ({ course }: { course: Course }) => {
  const { modules } = course

  return (
    <div className='module-list'>
      {modules.map((module) => {
        return <ModuleListItem key={module._id} module={module} course={course} />
      })}
    </div>
  )
}

export default ModuleList
