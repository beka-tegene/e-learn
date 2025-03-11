import React from 'react'
import Navbar from '../../../Client/Individuals/Layout/Navbar'
import Footer from '../../../Client/Individuals/Layout/Footer'
import ContactDetail from '../../../Client/Individuals/Contact/ContactDetail'

const Contact = () => {
  return (
    <div>
        <Navbar />
        <ContactDetail />
        <div className=" d-none d-lg-block">

        <Footer />
        </div>
    </div>
  )
}

export default Contact