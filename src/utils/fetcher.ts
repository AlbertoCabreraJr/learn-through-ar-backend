import axios, { InternalAxiosRequestConfig } from 'axios'
import AWSCredential from '../types/AWSCredential'
import getAWSCredentials from './getAWSCredentials'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const STAGE = process.env.REACT_APP_STAGE

const getArgs = ({ config }: { config: InternalAxiosRequestConfig }) => {
  const host = new URL(BASE_URL!)
  const path = config.url?.split(config.baseURL!)[1]
  const method = config.method?.toUpperCase()

  const args = {
    service: 'execute-api',
    region: 'ap-southeast-1',
    host: host.hostname,
    path,
    method,
    body: config.data,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  if (method === 'GET') {
    delete args.body
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

      const { data: signedHeaders } = await axios.post(`${BASE_URL}/${STAGE}/signer`, {
        request: args,
        credentials
      })

      const options = {
        headers: {
          ...signedHeaders,
          app_user_id: parsedAWSCredentials.IdentityId,
          app_user_email: parsedAWSCredentials.email
        }
      }

      // @ts-ignore
      delete options.headers?.Host
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default fetcher
