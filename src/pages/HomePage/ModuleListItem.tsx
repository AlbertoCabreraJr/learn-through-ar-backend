import check from '../../assets/check.svg'
import { useNavigate } from 'react-router-dom'
import Module from '../../types/Module'
import Course from '../../types/Course'

type ModuleListItemProps = {
  module: Module
  course: Course
}

const shouldDisableModule = (module: Module, course: Course) => {
  return !module.finished && !course.finishedModules.includes(module._id) && course.currentModule !== module._id
}

const ModuleListItem: React.FC<ModuleListItemProps> = ({ module, course }) => {
  return (
    <div className={`module-list-item${shouldDisableModule(module, course) ? ' disabled' : ' enabled'}`}>
      <ModuleListItemHeader module={module} course={course} />
      <ModuleListItemFooter module={module} course={course} />
    </div>
  )
}

const ModuleListItemHeader = ({ module, course }: { module: Module; course: Course }) => {
  return (
    <div className='module-list-item-header'>
      <div className='module-list-item-header-title'>{module.title}</div>
      <div className='module-list-item-header-subtitle'>{module.subtitle}</div>
    </div>
  )
}

const ModuleListItemFooter = ({ module, course }: { module: Module; course: Course }) => {
  return (
    <div className='module-list-item-footer'>
      <ModuleListItemProgress module={module} />
      <ModuleListItemButton module={module} course={course} />
    </div>
  )
}

const ModuleListItemButton = ({ module, course }: { module: Module; course: Course }) => {
  const navigate = useNavigate()

  if (shouldDisableModule(module, course)) return null

  const handleClick = async (e: any) => {
    e.preventDefault()
    navigate(`/module/${module._id}`)
  }

  return (
    <button
      className={`module-list-item-button${module.finished ? ' button-finished' : ' button-unfinish'}`}
      onClick={handleClick}
    >
      <div>{module.finished ? 'Review' : 'Continue'}</div>
      {module.finished && <img src={check} alt='Checkmark' />}
    </button>
  )
}

const ModuleListItemProgress = ({ module }: { module: Module }) => {
  return (
    <div className='module-list-item-progress'>
      Progress: {module.progress}/{module.totalTopicsAndExam}
    </div>
  )
}

export default ModuleListItem
