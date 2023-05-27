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
        <div>Show your hand either in a rock or scissor or paper position in front of the camera.</div>
      </div>
    </div>
  )
}

export default InsideARHelpContent
