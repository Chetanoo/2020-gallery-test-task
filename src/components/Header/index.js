import React from 'react'
import { Link } from "react-router-dom";
import './index.css'

export default function Header() {
    return(
        <div className="headerContainer">
            <header className="header">
                <div className="Logo">
                    <Link to="/"><strong>GalleryTestTask</strong></Link>
                </div>
                <div className="headerItem">
                    <Link to="/">Home</Link>
                </div>
                <div className="headerItem">
                    <Link to="/about">About</Link>
                </div>
            </header>
        </div>
    )
}
