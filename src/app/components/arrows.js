import React from 'react'

export let NextArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={"carousel-arrow"}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >NEXT</div>
    );
}
export let PrevArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={"carousel-arrow"}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >PREV</div>
    );
}