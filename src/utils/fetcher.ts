import axios, { InternalAxiosRequestConfig } from 'axios'
import AWSCredential from '../types/AWSCredential'
import getAWSCredentials from './getAWSCredentials'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const STAGE = process.env.REACT_APP_STAGE

const getArgs = ({ config }: { config: InternalAxiosRequestConfig }) => {
  const host = new URL(BASE_URL!)
  const path = config.url?.split(config.baseURL!)[0]
  const method = config.method?.toUpperCase()

  const args = {
    service: 'execute-api',
    region: 'ap-southeast-1',
    host: host.hostname,
    path: `/${STAGE}${path}`,
    method,
    body: JSON.stringify(config.data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  if (method === 'GET') {
    // @ts-ignore
    delete args.body
    // @ts-ignore
    args.headers['Content-Type'] = ''
  }

  return args
}

const fetcher = axios.create({
  baseURL: `${BASE_URL}/${STAGE}`,
  timeout: 1000 * 90 // 90s
})

fetcher.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    const args = getArgs({ config })

    const credentials = {
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: ''
    }

    const storedAWSCredentials = getAWSCredentials()
    if (storedAWSCredentials) {
      const parsedAWSCredentials = JSON.parse(storedAWSCredentials) as AWSCredential

      credentials.accessKeyId = parsedAWSCredentials.Credentials.AccessKeyId
      credentials.secretAccessKey = parsedAWSCredentials.Credentials.SecretKey
      credentials.sessionToken = parsedAWSCredentials.Credentials.SessionToken

      const { data: signedRequest } = await axios.post(`${BASE_URL}/${STAGE}/signer`, {
        request: args,
        credentials
      })

      const options = {
        headers: {
          ...signedRequest.headers,
          app_user_id: parsedAWSCredentials.IdentityId,
          app_user_email: parsedAWSCredentials.email
        }
      }

      config.headers = options.headers
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default fetcher
