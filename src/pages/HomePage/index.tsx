import Layout from '../../components/LayoutWithNavigation'
import ModuleList from './ModuleList'
import { useParams } from 'react-router-dom'
import useCourse from '../../hooks/useCourse'

const HomePage = () => {
  let { id } = useParams()

  const { course, isLoading } = useCourse({ courseId: id! })

  if (isLoading) return <div>Loading</div>

  if (!course) return <div>Course does not exist</div>

  return (
    <Layout>
      <div className='home-page'>
        <div className='home-page-title'>Programming Fundamentals</div>
        <ModuleList course={course} />
      </div>
    </Layout>
  )
}

export default HomePage
