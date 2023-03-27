import Slider from "./modules/slider/slider";
import MainSlider from "./modules/slider/mainSlider";
import ShowUpSlider from "./modules/slider/showUpSlider";
import VideoPlayer from "./modules/videoPlayer";

window.addEventListener("DOMContentLoaded", () => {
    // const pageSlider = new Slider('.page', '.next');

    // pageSlider.render();

    const scrollSlider = new MainSlider({
        page: '.page',
        btns: '.page .next',
        scrollDir: 'column',
        home: '.page .sidecontrol > a'
    });

    scrollSlider.render();
    scrollSlider.animateOnHover();

    const showUpSlider = new ShowUpSlider({
        page: '.showup__content-slider',
        btns: '.showup__content-title button',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active'
    });

    showUpSlider.render();

    const modulesSlider = new ShowUpSlider({
        page: '.modules__content-slider',
        btns: '.modules__info-btns button',
        prev: '.slick-prev',
        next: '.slick-prev',
        activeClass: 'card-active',
        auto: 3000
    });

    modulesSlider.render();

    const showUpVideo = new VideoPlayer({
        triggers: '.showup .play',
        block: '.overlay'
    });

    showUpVideo.init();
});