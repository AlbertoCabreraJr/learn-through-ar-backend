import Header from '../../components/Header'
import ModuleList from './ModuleList'

const HomePage = () => {
  return (
    <div className='home-page'>
      <Header />
      <div className='home-page-title'>Programming Fundamentals</div>
      <ModuleList />
    </div>
  )
}

export default HomePage
