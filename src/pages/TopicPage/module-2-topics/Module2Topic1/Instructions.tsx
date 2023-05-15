type InstructionProps = {
  hasEnterAr: boolean
}
const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-2-topic-1-instructions-container'>
      <div className='module-2-topic-1-title'>Instructions</div>
      <div className='module-2-topic-1-subtitle'>
        Welcome! For this topic, all the instructions will be in the AR environment.
      </div>
      <div className='module-2-topic-1-subtitle'>Go and just tap the Enter AR button below! Enjoy!</div>
      <div className='module-2-topic-1-subtitle'>
        Note: Please ensure that your phone or camera is held upright if you're unable to see the models in the
        augmented reality (AR) environment.
      </div>
    </div>
  )
}

export default Instructions
