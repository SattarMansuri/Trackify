const Logo = ({height, width}) => {
  return (
<svg width={width} height={height} viewBox="0 0 260 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(15, 10)">
    <circle cx="20" cy="20" r="18" stroke="#10B981" strokeWidth="4" opacity="0.3"/>
    <path d="M2 20a18 18 0 1 1 36 0" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
    <path d="M14.5 20l3.5 3.5 7-7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <text x="65" y="38" fontFamily="Inter, Segoe UI, sans-serif" fontSize="26" fill="#10B981" fontWeight="600" letterSpacing="0.4">
    Trackify
  </text>
</svg>
  )
}

export default Logo