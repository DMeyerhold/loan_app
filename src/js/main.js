import Slider from "./modules/slider/slider";
import MainSlider from "./modules/slider/mainSlider";
import ShowUpSlider from "./modules/slider/showUpSlider";
import VideoPlayer from "./modules/videoPlayer";
import UnfoldList from "./modules/unfoldList";
import Forms from "./modules/forms";
import Accordion from "./modules/accordion";

window.addEventListener("DOMContentLoaded", () => {
    // const pageSlider = new Slider('.page', '.next');

    // pageSlider.render();

    const scrollSlider = new MainSlider({
        parrent: '.page',
        next: '.page .next',
        home: '.page .sidecontrol > a'
    });

    scrollSlider.render();

    const moduleAppSlider = new MainSlider({
        parrent: '.moduleapp',
        next: '.moduleapp .next',
        prev: '.moduleapp .prev',
        home:'.moduleapp .sidecontrol > a'
    });

    moduleAppSlider.render();

    const showUpSlider = new ShowUpSlider({
        parrent: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active'
    });

    showUpSlider.render();

    const modulesSlider = new ShowUpSlider({
        parrent: '.modules__content-slider',
        prev: '.modules .slick-prev',
        next: '.modules .slick-next',
        activeClass: 'card-active',
        // auto: 5000
    });

    modulesSlider.render();

    const feedSlider = new ShowUpSlider({
        parrent: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });

    feedSlider.render();

    new VideoPlayer({
        triggers: '.showup .play',
        block: '.overlay'
    }).init();

    new VideoPlayer({
        triggers: '.module__video-item .play',
        block: '.overlay',
    }).init();
    
    new VideoPlayer({
        triggers: '.schedule__wrapper .play',
        block: '.overlay'
    }).init();

    new UnfoldList({listItem: '.difference__wrapper .officer__card-item'}).render();
    new Forms('.form').init();

    new Accordion('.module__info-show .plus').init();
});