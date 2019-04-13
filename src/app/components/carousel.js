import React from 'react'
import "./css/carousel.css"
import "./css/mobile-carousel.css"
import "./css/css-ratings/star-1.css"
import "./css/css-ratings/star-2.css"
import "./css/css-ratings/star-3.css"
import "./css/css-ratings/star-4.css"
import "./css/css-ratings/star-5.css"
import { makeid, firstLetterToUpperCase, formatDate } from '../utils/utils'
import Slider from "react-slick";
import { NextArrow, PrevArrow } from './arrows'
import { api, dev_api } from './config/config'




export default class Carousel extends React.Component {
    constructor() {
        super()
        this.state = {
            carouselIndex: 0,
            aval_read: '',
            painel_read: '',
            control: false,
            isLoading: false,
        }
        this.handleResponse = this.handleResponse.bind(this)
    }

    handleResponse(response) {
        if (!this._isMounted) return;
    }

    componentDidMount() {
        this._isMounted = true
        this.setState({
            control: false,
            isLoading: true,
        })

        let test_url = window.location.href
        let aval_read_api = (api.LOCATION_URL == test_url ? api.AVAL_READ : dev_api.DEV_AVAL_READ);
        let painel_read_api = (api.LOCATION_URL == test_url ? api.CAROU_READ : dev_api.DEV_CAROU_READ);
        fetch(aval_read_api)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response
                }
            })
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {

                    this.setState({
                        aval_read: response.records,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error)
                }
            })

        // fetch painel
        fetch(painel_read_api)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response
                }
            })
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        painel_read: response,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error)
                }
            })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { painel_read, aval_read, carouselIndex } = this.state;
        let settings
        let painel_ativo = painel_read.active
        // console.log(painel_read)
        // console.log(painel_read !== undefined)
        // console.log(painel_read.length > 0)
        if (painel_read !== undefined) {
            painel_ativo = painel_read.active
            settings = {
                infinite: true,
                speed: 1000,
                autoplaySpeed: +painel_read.slide_interval,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: painel_read.slide_autoplay == 1 ? true : false,
                className: painel_read.main_class,

            };


        } else {
            settings = {
                infinite: true,
                speed: 1000,
                autoplaySpeed: 5000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                className: "carousel-container",

            };

        }
        let carouselList
        if (aval_read !== undefined && aval_read.length > 0) {


            carouselList = aval_read.filter(aval => aval.allow == 1)
                .map(read => {
                    let atendimentoRating = +read.atendimento;
                    let precoRating = +read.preco;
                    let qualidadeRating = +read.qualidade;
                    let variedadeRating = +read.variedade;
                    let no_geralRating = +read.no_geral;

                    let sumDasRatings = atendimentoRating + precoRating + qualidadeRating + variedadeRating + no_geralRating;
                    let mediaDasRatings = (sumDasRatings / 5);

                    let testMediaDasRatings1 = +mediaDasRatings > 0 && +mediaDasRatings < 1 ? "rating-half" : mediaDasRatings >= 1 ? "rating-full" : "";
                    let testMediaDasRatings2 = +mediaDasRatings > 1 && +mediaDasRatings < 2 ? "rating-half" : mediaDasRatings >= 2 ? "rating-full" : "";
                    let testMediaDasRatings3 = +mediaDasRatings > 2 && +mediaDasRatings < 3 ? "rating-half" : mediaDasRatings >= 3 ? "rating-full" : "";
                    let testMediaDasRatings4 = +mediaDasRatings > 5 && +mediaDasRatings < 4 ? "rating-half" : mediaDasRatings >= 4 ? "rating-full" : "";
                    let testMediaDasRatings5 = +mediaDasRatings > 4 && +mediaDasRatings < 5 ? "rating-half" : mediaDasRatings >= 5 ? "rating-full" : "";

                    return (
                        <div key={`${makeid()}`}>

                            <div className={painel_read.main_class}>
                                <div className="carousel-part-1">
                                    <div className="form-feedback-carousel">
                                        <div className="flex-row flex-content-center">
                                            <span className={`rating ${testMediaDasRatings1} `}><label htmlFor=""></label></span>
                                            <span className={`rating ${testMediaDasRatings2}`}><label htmlFor=""></label></span>
                                            <span className={`rating ${testMediaDasRatings3}`}><label htmlFor=""></label></span>
                                            <span className={`rating ${testMediaDasRatings4}`}><label htmlFor=""></label></span>
                                            <span className={`rating ${testMediaDasRatings5}`}><label htmlFor=""></label></span>
                                        </div>
                                    </div>
                                    <div className="carousel-nomes">{firstLetterToUpperCase(read.nome)} {firstLetterToUpperCase(read.sobrenome)} </div>
                                    <div className="carousel-cidade">({firstLetterToUpperCase(read.cidade)} - {read.estado.toUpperCase()})</div>
                                </div>
                                <div className="carousel-part-2">
                                    <div className="carousel-msg">{read.mensagem}</div>
                                    <div className="carousel-data">
                                        <div className="carousel-nomes">Avaliação realizada em:</div>
                                        <div>{formatDate(read.created)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )

                })
        }

        return (
            <div>
                {carouselList && painel_ativo == 1 ? (
                    <Slider {...settings}>
                        {carouselList}
                    </Slider>
                ) : ''}
            </div>
        )
    }
}