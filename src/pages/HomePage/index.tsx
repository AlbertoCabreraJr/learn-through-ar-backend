import Layout from '../../components/LayoutWithNavigation'
import ModuleList from './ModuleList'
import { useParams } from 'react-router-dom'
import useCourse from '../../hooks/useCourse'

const HomePage = () => {
  let { id } = useParams()
  const { course } = useCourse()

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
