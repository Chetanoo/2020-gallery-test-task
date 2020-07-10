import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataServices } from '../../services/data.service'
import Loading from "../../components/Loading/Loading"
import './index.css'
import UserAlbumItem from '../UserAlbumItem'

export default function User() {
    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(true)
    const { userId } = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        dataServices.getSingleUser(userId, { signal: signal })
            .then(res => setAlbums(res.data))
            .then(() => setLoading(false))
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    return(
        <div>
            { loading
                ?
                <Loading />
                :
                <div className="user-albums">
                    {albums.map(album => {
                        return (<Link className="albumOuter" to={`/user/${userId}/${ album.id }`} key={ album.id }>
                            <UserAlbumItem albumId={ album.id } albumName={ album.title } albumUserId={ userId }/>
                        </Link>)
                    })}
                </div>
            }

        </div>
    )
}
