import { course } from '../../utils/mockData'
import ModuleListItem from './ModuleListItem'

const ModuleList = () => {
  const { modules } = course

  return (
    <div className='module-list'>
      {modules.map((module) => {
        return <ModuleListItem key={module._id} module={module} />
      })}
    </div>
  )
}

export default ModuleList