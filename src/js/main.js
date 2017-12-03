import Flickity from "flickity";
import ScrollReveal from "scrollreveal";

Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach(function (elem, i) {
        elem.on(name, fn);
    });
}

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

document.on("DOMContentLoaded", (e) => {
    const $workCarousel = query(".work-carousel");
    const workCarousel = new Flickity($workCarousel, {
        wrapAround: true,
        autoPlay: 6000,
        pauseAutoPlayOnHover: false,
        lazyLoad: 2
    })
    const sr = new ScrollReveal();

    const commonOptions = {
        scale: 1,
        duration: 1000,
        distance: "50px",
        viewFactor: 0.3
    }

    sr.reveal(queryAll(".sr--top"), Object.assign(commonOptions, {
        origin: "top"
    }));
    sr.reveal(queryAll(".sr--bottom"), Object.assign(commonOptions, {
        origin: "bottom"
    }));
    sr.reveal(queryAll(".sr--right"), Object.assign(commonOptions, {
        origin: "right",
        rotate: {z: -5}
    }));
    sr.reveal(queryAll(".sr--left"), Object.assign(commonOptions, {
        origin: "left",
        rotate: {z: 5}
    }));
});