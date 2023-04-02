const getAWSCredentials = () => {
  return localStorage.getItem('aws')
}

export default getAWSCredentials
