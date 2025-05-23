import React from 'react'

const Search = ({onClick}) => {
  return (
<svg className='absolute right-2 top-3.5 cursor-pointer bg-white' onClick={onClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.58366 17.4998C13.9559 17.4998 17.5003 13.9554 17.5003 9.58317C17.5003 5.21092 13.9559 1.6665 9.58366 1.6665C5.2114 1.6665 1.66699 5.21092 1.66699 9.58317C1.66699 13.9554 5.2114 17.4998 9.58366 17.4998Z" stroke="#8E92BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.3337 18.3332L16.667 16.6665" stroke="#8E92BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}

export default Search