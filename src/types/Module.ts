import Topic from './Topic'

type Module = {
  _id: string
  moduleNumber: number
  title: string
  subtitle: string
  totalTopicsAndExam: number
  topics: Topic[]
  progress: number
  exam: string
  finished: boolean
  createdAt: Date
  updatedAt: Date
}

export default Module
