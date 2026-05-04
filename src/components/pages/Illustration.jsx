import React from 'react'
import Navbar from '../navComp/Navbar'
import AllImage from './AllImage'
import CursorEffect from './section/CursorEffect'
// import AdminUpload from '../admin/AdminUpload'
// import UploadImage from '../admin/UploadImage'

function Illustration() {
  return (
    <div>
      <CursorEffect />
      <div><Navbar /></div>
      <div className='w-full h-full pt-2 lg:pt-15'><AllImage /></div>
    </div>
  )
}
export default Illustration
