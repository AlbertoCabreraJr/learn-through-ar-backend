type InstructionProps = {
  hasEnterAr: boolean
}
const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-5-topic-1-instructions-container'>
      <div className='module-5-topic-1-title'>Welcome</div>
      <div className='module-5-topic-1-subtitle'>
        In this topic, you will learn about if/then conditions and how they enable computers and programs to make
        decisions based on specific conditions.
      </div>
      <div className='module-5-topic-1-subtitle'>
        Note: Please ensure that your phone or camera is held upright in a portrait mode.
      </div>
    </div>
  )
}

export default Instructions
