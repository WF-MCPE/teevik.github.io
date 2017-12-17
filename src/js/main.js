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
        lazyLoad: 3
    })
    const sr = new ScrollReveal();

    const scrollRevealOptions = {
        scale: 1,
        duration: 1000,
        distance: "50px",
        viewFactor: 0.3,
        origin: "top"
    }
    // sr.reveal(queryAll(".sr--initial"), scrollRevealOptions, 550);
    // sr.reveal(queryAll(".sr"), scrollRevealOptions);    
});