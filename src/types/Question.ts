import Choice from './Choice'

type Question = {
  _id: string
  text: string
  choices: Choice[]
  correctChoice: Choice
  createdAt: Date
  updatedAt: Date
}

export default Question
