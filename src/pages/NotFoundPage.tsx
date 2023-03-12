import logo from '../assets/logo.svg'
import Layout from '../components/Layout'

const NotFoundPage = () => {
  return (
    <Layout>
      <div className='not-found-page'>
        <img className='logo' src={logo} alt='Learn through AR logo' />
        <div className='text'>Sorry, this page does not exist!</div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
