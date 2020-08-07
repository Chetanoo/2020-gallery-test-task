import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataServices } from '../../services/data.service'
import Loading from '../../components/Loading/Loading'
import LazyLoad from 'react-lazyload'
import './index.css'
import SimpleImageSlider from "react-simple-image-slider";

export default function Album() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { userId, albumId } = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        dataServices.getAlbum(albumId, {signal: signal})
            .then(res => {
                setImages(res.data)
            })
            .then(() => setLoading(false))

        return function cleanup() {
            abortController.abort()
        }
    }, [albumId])

    function toggleModal(img) {
        setShowModal(!showModal)
    }

    return(
        <div>
            { loading
                ?
                <Loading />
                :
                <div className="album">
                    <div className="backButton"><Link to={`/user/${ userId }`}>Back to albums</Link></div>
                    <div className="thumbnails">
                        {images.map((image, index) =>
                            <LazyLoad key={ image.id }>
                                <img className="hover-shadow" src={ image.thumbnailUrl } alt={ image.title } onClick={() => toggleModal()}/>
                            </LazyLoad>
                        )}
                    </div>
                    <div className={showModal ? 'modal activeModal' : 'modal'}>
                        <span className="close cursor" onClick={() => toggleModal()}>&times;</span>
                        <SimpleImageSlider
                            width={1000}
                            height={700}
                            images={images}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
