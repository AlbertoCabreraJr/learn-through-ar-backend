import logo from '../assets/logo.svg'

const AllowCameraMessage = () => {
  return (
    <div className='allow-camera-message'>
      <img className='logo' src={logo} alt='Learn through AR logo' />
      <div className='text'>
        To get the most out of our web application's augmented reality features, please grant us access to your camera.
      </div>
      <div
        className='contact-text'
        onClick={() => {
          window.location.href = `mailto:aacabrera2@up.edu.ph`
        }}
      >
        Contact the developer for camera access guidance.
      </div>
    </div>
  )
}

export default AllowCameraMessage
