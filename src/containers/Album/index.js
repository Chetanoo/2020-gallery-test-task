import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataServices } from '../../services/data.service'
import Loading from '../../components/Loading/Loading'
import LazyLoad from 'react-lazyload'
import './index.css'

export default function Album() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalClasses, setModalClasses] = useState(['modal'])
    const { userId, albumId } = useParams()
    let slideIndex = 1

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

    function openModal(n) {
        setModalClasses(["modal", "activeModal"])
        showSlides(slideIndex = n)
    }

    function closeModal() {
        setModalClasses(["modal"])
    }

    function plusSlides(n) {
        showSlides(slideIndex += n)
    }

    function currentSlide(n) {
        showSlides(slideIndex = n)
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        let captionText = document.getElementById("caption");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block"
        dots[slideIndex-1].className += " active"
        captionText.innerHTML = dots[slideIndex-1].alt
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
                                <img className="hover-shadow" src={ image.thumbnailUrl } alt={ image.title } onClick={() => openModal(index + 1)}/>
                            </LazyLoad>
                        )}
                    </div>
                    <div id="myModal" className={ modalClasses.join(' ') }>
                        <span className="close cursor" onClick={() => closeModal()}>&times;</span>
                        <div className="modal-content">

                            {images.map((image, index) =>
                                <div className="mySlides" key={ image.id }>
                                    <div className="numbertext">{ index + 1 } / { images.length }</div>
                                    <LazyLoad>
                                        <img className="slide" src={ image.url } style={ {width:'100%'} } alt={ image.title }/>
                                    </LazyLoad>
                                </div>
                            )}

                            <div className="prev" onClick={() => plusSlides(-1)}>&#10094;</div>
                            <div className="next" onClick={() => plusSlides(1)}>&#10095;</div>

                            <div className="caption-container">
                                <p id="caption">

                                </p>
                            </div>
                            {images.map((image, index) =>
                                <div className="column" key={ image.id }>
                                    <img
                                        className="demo"
                                        src={ image.thumbnailUrl }
                                        onClick={() => currentSlide(index + 1)}
                                        alt={ image.title }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
