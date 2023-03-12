import { user } from '../../utils/mockData'
import ModuleListItem from './ModuleListItem'

const ModuleList = () => {
  const { modules } = user

  return (
    <div className='module-list'>
      {modules.map((module) => {
        return <ModuleListItem module={module} />
      })}
    </div>
  )
}

export default ModuleList
