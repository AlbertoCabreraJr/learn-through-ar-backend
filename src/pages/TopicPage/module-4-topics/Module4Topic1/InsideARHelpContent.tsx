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
        <div>1. Take a picture of a book, keyboard, and computer screen.</div>
        <div>2. Use good light for a clear, bright picture.</div>
        <div>3. Try landscape mode if object not detected.</div>
      </div>
    </div>
  )
}

export default InsideARHelpContent
