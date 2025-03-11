import React from 'react'
import Navbar from '../../../Client/Individuals/Layout/Navbar'
import Footer from '../../../Client/Individuals/Layout/Footer'
import ProfileDetail from '../../../Client/Individuals/Profile/ProfileDetail'

const Profile = () => {
  return (
    <div>
        <Navbar />
        <ProfileDetail />
        <Footer />
    </div>
  )
}

export default Profile