import { user } from './mockData'
import check from '../../assets/check.svg'

const ModuleList = () => {
  const { modules } = user

  const shouldDisableModule = (module: any) => {
    return !module.finished && !user.finishedModules.includes(module._id) && user.currentModule !== module._id
  }

  return (
    <div className='module-list'>
      {modules.map((module) => {
        return (
          <div className={`module${shouldDisableModule(module) ? ' module-disabled' : ' module-enabled'}`}>
            <div className='title-container'>
              <div className='module-title'>{module.title}</div>
              <div className='module-subtitle'>{module.subtitle}</div>
            </div>
            <div className='module-footer'>
              <div className='module-progress'>
                Progress: {module.progress}/{module.totalTopicsAndExam}
              </div>
              {!shouldDisableModule(module) && (
                <button className={`module-button${module.finished ? ' button-finished' : ' button-unfinish'}`}>
                  <div>{module.finished ? 'Review' : 'Continue'}</div>
                  {module.finished && <img src={check} alt='Checkmark' />}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ModuleList
