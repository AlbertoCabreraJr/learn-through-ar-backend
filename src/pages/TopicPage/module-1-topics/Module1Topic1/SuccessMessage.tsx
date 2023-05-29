type SuccessMessageProps = {
  showSuccessMessage: boolean
  setShowSuccessMessage: (value: React.SetStateAction<boolean>) => void
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ showSuccessMessage, setShowSuccessMessage }) => {
  if (!showSuccessMessage) {
    return null
  }

  return (
    <div className='module-1-topic-1-success-message'>
      <div className='success-message-content'>
        <div className='success-message-text'>
          You've just experienced programming by giving instructions to a 3D model on what to do.
        </div>
        <div className='success-message-text' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          Essentially, programming is crafting or writing instructions for computers to complete tasks.
        </div>
        <button className='success-message-button' onClick={() => setShowSuccessMessage(false)}>
          Close
        </button>
      </div>
    </div>
  )
}

export default SuccessMessage
