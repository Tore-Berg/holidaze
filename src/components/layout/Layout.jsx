import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import styled from 'styled-components'

const Layout = ({children}) => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">{children}</main>
            <Footer />
        </div>
    )
}
 export default Layout