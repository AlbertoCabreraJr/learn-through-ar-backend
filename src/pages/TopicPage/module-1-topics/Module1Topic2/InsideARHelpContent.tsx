type InsideARHelpContentProps = {
  showContent: boolean
  hasEnterAr: boolean
}

const InsideARHelpContent = ({ hasEnterAr, showContent }: InsideARHelpContentProps) => {
  if (!hasEnterAr || !showContent) {
    return null
  }

  return (
    <div
      className='content-container'
      style={{
        position: 'absolute',
        top: '60px',
        left: 20,
        right: 20
      }}
    >
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          backgroundColor: '#f3fcec',
          borderRadius: '20px',
          color: '#003075',
          fontWeight: 500
        }}
      >
        <div>1. Point your camera upwards to see the cards.</div>
        <div>2. Cards represent each event in the timeline of the history of programming.</div>
        <div>3. DOUBLE TAP on the year to see the information of that event.</div>
        <div>4. Go through each event to complete the task and pass.</div>
      </div>
    </div>
  )
}

export default InsideARHelpContent
