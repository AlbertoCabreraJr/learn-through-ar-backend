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
        <div>2. In this exercise, you will locate various examples of a specific data type.</div>
        <div>3. In the AR environment, you can identify data types by double-tapping on corresponding boxes.</div>
      </div>
    </div>
  )
}

export default InsideARHelpContent
