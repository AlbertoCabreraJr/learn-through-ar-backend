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
        <div>1. Use good light for a clear, bright picture.</div>
        <div>2. Try landscape mode if object is not detected.</div>
        <div>3. Try searching for an image in Google, and take a picture of it.</div>
      </div>
    </div>
  )
}

export default InsideARHelpContent
