import Module from './Module'

type Course = {
  _id: string
  userEmail: string
  name: string
  user: string
  modules: Module[]
  currentModule: string
  currentTopic: string
  finishedModules: string[]
  finishedTopics: string[]
  createdAt: Date
  updatedAt: Date
}

export default Course
