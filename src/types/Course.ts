type Course = {
  _id: string
  userEmail: string
  name: string
  user: string
  modules: string[]
  currentModule: string
  currentTopic: string
  finishedModules: string[]
  finishedTopics: string[]
  createdAt: Date
  updatedAt: Date
}

export default Course
