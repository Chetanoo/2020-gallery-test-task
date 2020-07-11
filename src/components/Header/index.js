import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default function Header() {
    return(
        <div className="headerContainer">
            <header className="header">
                <div className="headerItem">
                    <Link to="/"><strong>GalleryTestTask</strong></Link>
                </div>
                <nav>
                    <div className="headerItem h">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="headerItem h">
                        <Link to="/about">About</Link>
                    </div>
                </nav>
            </header>
        </div>
    )
}
