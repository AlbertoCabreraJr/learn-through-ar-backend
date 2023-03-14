import Layout from '../../components/LayoutWithNavigation'
import ModuleList from './ModuleList'

const HomePage = () => {
  return (
    <Layout>
      <div className='home-page'>
        <div className='home-page-title'>Programming Fundamentals</div>
        <ModuleList />
      </div>
    </Layout>
  )
}

export default HomePage
