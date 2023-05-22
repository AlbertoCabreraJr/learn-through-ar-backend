type InstructionProps = {
  hasEnterAr: boolean
}
const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-4-topic-1-instructions-container'>
      <div className='module-4-topic-1-title'>Welcome</div>
      <div className='module-4-topic-1-subtitle'>
        In this topic, you will learn about variables, which are essential components of programming languages used for
        storing and manipulating data.
      </div>
    </div>
  )
}

export default Instructions
