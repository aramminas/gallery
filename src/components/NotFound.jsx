import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import "../scss/main.css";

const NotFound = () => {
    const {isAuth} = useSelector(state => state.auth);

    useEffect(_ => {
        const body = document.querySelector('body');
        body.style.overflow = "hidden";

        return _ => body.style.overflow = "inherit";
    }, []);

    const parallax = function(e) {
        let windowWidth = window.innerWidth;
        if (windowWidth < 768) return;
        let parallaxElement = document.querySelector('.parallax');
        let width = parallaxElement.offsetWidth;
        let height = parallaxElement.offsetHeight;

        let elemRect = parallaxElement.getBoundingClientRect();
        let halfFieldWidth = width / 2,
            halfFieldHeight = height / 2,
            x = e.pageX,
            y = e.pageY - elemRect.top,
            newX = (x - halfFieldWidth) / 30,
            newY = (y - halfFieldHeight) / 30;
        const parallaxes = document.querySelectorAll('.parallax [class*="wave"]');

        [].forEach.call(parallaxes, function(elem, index) {
            elem.style.transition = "";
            elem.style.transform = "translate3d(" + index * newX + "px," + index * newY + "px,0px)";
        });
    }

    const stopParallax = () => {
        const parallaxes = document.querySelectorAll('.parallax [class*="wave"]');
        [].forEach.call(parallaxes, function(elem) {
            elem.style.transition = "all .7s";
            elem.style.transform = "translate(0px,0px)";
        });
        setTimeout(() => {
            const parallaxesTime = document.querySelectorAll('.parallax [class*="wave"]');
            [].forEach.call(parallaxesTime, function(elem) {
                elem.style.transition = "";
            });
        }, 700);
    };

    return (
        <div className="not-found parallax" onMouseMove={parallax} onMouseLeave={stopParallax}>
            <div className="sky-bg"/>
            <div className="wave-7"/>
            <div className="wave-6"/>
            <Link to={isAuth ? `/` : `/sign-in`} className="wave-island">
                <img src="/images_404/island.svg" alt="Island"/>
            </Link>
            <div className="wave-5"/>
            <div className="wave-lost wrp">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div className="wave-4"/>
            <div className="wave-boat">
                <img className="boat" src="/images_404/boat.svg" alt="Boat"/>
            </div>
            <div className="wave-3"/>
            <div className="wave-2"/>
            <div className="wave-1"/>
            <div className="wave-message">
                <p>You're lost</p>
                <p>Click on the island to return</p>
            </div>
        </div>
    );
}

export default NotFound;