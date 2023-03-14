import { course } from '../../utils/mockData'
import check from '../../assets/check.svg'
import { useNavigate } from 'react-router-dom'

type ModuleListItemProps = {
  module: any
}

const shouldDisableModule = (module: any, course: any) => {
  return !module.finished && !course.finishedModules.includes(module._id) && course.currentModule !== module._id
}

const ModuleListItem: React.FC<ModuleListItemProps> = ({ module }) => {
  return (
    <div className={`module-list-item${shouldDisableModule(module, course) ? ' disabled' : ' enabled'}`}>
      <ModuleListItemHeader module={module} />
      <ModuleListItemFooter module={module} />
    </div>
  )
}

const ModuleListItemHeader = ({ module }: { module: any }) => {
  return (
    <div className='module-list-item-header'>
      <div className='module-list-item-header-title'>{module.title}</div>
      <div className='module-list-item-header-subtitle'>{module.subtitle}</div>
    </div>
  )
}

const ModuleListItemFooter = ({ module }: { module: any }) => {
  return (
    <div className='module-list-item-footer'>
      <ModuleListItemProgress module={module} />
      <ModuleListItemButton module={module} />
    </div>
  )
}

const ModuleListItemButton = ({ module }: { module: any }) => {
  const navigate = useNavigate()

  if (shouldDisableModule(module, course)) return null

  const handleClick = async (e: any) => {
    e.preventDefault()
    navigate(`/module/${module._id}`)
  }

  return (
    <button className={`module-list-item-button${module.finished ? ' button-finished' : ' button-unfinish'}`} onClick={handleClick}>
      <div>{module.finished ? 'Review' : 'Continue'}</div>
      {module.finished && <img src={check} alt='Checkmark' />}
    </button>
  )
}

const ModuleListItemProgress = ({ module }: { module: any }) => {
  return (
    <div className='module-list-item-progress'>
      Progress: {module.progress}/{module.totalTopicsAndExam}
    </div>
  )
}

export default ModuleListItem
