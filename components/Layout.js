import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'
import Header from './Header'



function Layout({children}) {
    return (
        <div className="container">
            {/* <NavBar/> */}
            <Header />
            {/* <Notify /> */}
            {/* <Modal /> */}
            

            {children}
            <Footer/>
        </div>
    )
}

export default Layout
