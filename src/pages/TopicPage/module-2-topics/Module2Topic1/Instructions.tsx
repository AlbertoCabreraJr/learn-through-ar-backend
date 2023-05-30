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
      <div className='module-2-topic-1-subtitle'>Go and just tap the 'Start Activity’ button below! Enjoy!</div>
      <div className='module-2-topic-1-subtitle'>
        Note: Please ensure that your phone or camera is held upright if you are unable to see the models in the
        augmented reality (AR) environment.
      </div>
      <div className='module-2-topic-1-subtitle'>Note: Turn volume on.</div>
    </div>
  )
}

export default Instructions
