import React from 'react'
import { Link } from 'react-router-dom'
import {FaLaptopHouse, FaMailBulk, FaCommentDots} from 'react-icons/fa'

const AdminMenu = () => {
    return (
        <nav className="admin-menu">
            <Link to="/admin/new"><FaLaptopHouse size={120} /></Link>
            <Link to="/admin/read-mail"><FaMailBulk size={120} /></Link>
            <Link to="/admin/read-enquiries"><FaCommentDots size={120} /></Link>
        </nav>
    )
}

export default AdminMenu