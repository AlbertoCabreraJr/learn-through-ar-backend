type InstructionProps = {
  hasEnterAr: boolean
}
const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-5-topic-2-instructions-container'>
      <div className='module-5-topic-2-title'>Welcome</div>
      <div className='module-5-topic-2-subtitle'>
        In this topic, you will learn about loops, which are fundamental concept in programming that allow you to repeat
        a set of instructions multiple times.
      </div>
      <div className='module-5-topic-2-subtitle'>
        Note: Please ensure that your phone or camera is held upright in a portrait mode.
      </div>
    </div>
  )
}

export default Instructions
