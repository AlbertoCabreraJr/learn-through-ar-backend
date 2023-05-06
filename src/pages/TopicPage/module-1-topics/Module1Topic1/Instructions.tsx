type InstructionProps = {
  hasEnterAr: boolean
}
const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-1-topic-1-instructions-container'>
      <div className='module-1-topic-1-title'>Objective</div>
      <div className='module-1-topic-1-subtitle'>
        Welcome! Before entering the AR environment, read these instructions.
      </div>
      <div className='module-1-topic-1-instructions'>
        <div>1. When you enter the AR environment, you will be presented a 3D model.</div>
        <div>2. You will see 3 buttons, each representing a different action the 3D model will do.</div>
        <div>3. Tap all 3 buttons to complete the task and pass.</div>
        <div>4. Tap ‘Enter AR’ below. Enjoy!</div>
      </div>
    </div>
  )
}

export default Instructions
