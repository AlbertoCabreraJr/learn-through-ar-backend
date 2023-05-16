type SuccessMessageProps = {
  information: string
  hasEnterAr: boolean
  isFinish: boolean
  year: number
}

const InformationMessage: React.FC<SuccessMessageProps> = ({ year, information, hasEnterAr, isFinish }) => {
  if (!hasEnterAr || isFinish) {
    return null
  }

  return (
    <div className='module-1-topic-2-information-message'>
      <div className='information-message-content'>
        <div className='information-message-title'>{year !== 0 ? `${year}s` : ''}</div>
        <div className='information-message-text'>{Boolean(information) ? information : <PlaceHolderMessage />}</div>
      </div>
    </div>
  )
}

const PlaceHolderMessage = () => {
  return <div className='placeholder-message'>Double Tap on a year to show information</div>
}

export default InformationMessage
