type InstructionProps = {
  hasEnterAr: boolean
}

const Instructions: React.FC<InstructionProps> = ({ hasEnterAr }) => {
  if (hasEnterAr) {
    return null
  }

  return (
    <div className='module-1-topic-2-instructions-container'>
      <div className='module-1-topic-2-subtitle'>
        Welcome! Before entering the AR environment, read these instructions.
      </div>
      <div className='module-1-topic-2-instructions'>
        <div>1. When you enter the AR environment, you will see a lot of cards.</div>
        <div>2. These cards represent each event in the timeline of the history of programming.</div>
        <div>3. DOUBLE TAP on the year to see the information of that event.</div>
        <div>4. Go through each event to complete the task and pass.</div>
        <div>5. You can move around the AR environment.</div>
        <div>
          6. Remember, this is by no means an exhaustive list but rather an overview of the key events and developments
          in the history of programming
        </div>
        <div>7. When you enter the AR environment, point your camera upwards to see the cards.</div>
        <div>8. Tap ‘Start Activity’ below. En joy!</div>
      </div>
    </div>
  )
}

export default Instructions
