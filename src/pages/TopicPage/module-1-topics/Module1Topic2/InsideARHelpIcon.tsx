type InsideARHelpIconProps = {
  hasEnterAr: boolean
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>
}

const InsideARHelpIcon = ({ hasEnterAr, setShowContent }: InsideARHelpIconProps) => {
  if (!hasEnterAr) {
    return null
  }

  return (
    <div
      style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 999 }}
      onClick={() => setShowContent((prev) => !prev)}
    >
      <div
        style={{
          border: '3px solid #f3fcec',
          borderRadius: 999,
          padding: '10px',
          color: '#f3fcec',
          fontSize: '20px',
          fontWeight: 700,
          width: '14px',
          height: '14px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        ?
      </div>
    </div>
  )
}

export default InsideARHelpIcon
