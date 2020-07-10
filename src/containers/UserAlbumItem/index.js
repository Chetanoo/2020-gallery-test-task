import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { dataServices } from "../../services/data.service"
import Loading from "../../components/Loading/Loading"
import LazyLoad from 'react-lazyload'
import './index.css'

export default function UserAlbumItem(props){
    const [album, setAlbum] = useState([])
    const [loading, setLoading] = useState(true)
    const { userId } = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        dataServices.getAlbum(props.albumId, { signal: signal })
            .then(res => setAlbum(res.data))
            .then(() => setLoading(false))
        return function cleanup() {
            abortController.abort()
        }
    }, [userId, props.albumId])

    return(
        <div>
            { loading
                ?
                <Loading />
                :
                <div>
                    <LazyLoad>
                        <img className="albumLogo" src={ album[0].thumbnailUrl } alt={ props.albumName }/>
                    </LazyLoad>
                    <p className="text"><strong>{ props.albumName }</strong></p>
                    <p className="pageNumber">{ album.length } photos</p>
                </div>
            }

        </div>
    )
}
