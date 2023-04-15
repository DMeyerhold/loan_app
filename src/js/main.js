import Slider from "./modules/slider/slider";
import MainSlider from "./modules/slider/mainSlider";
import ShowUpSlider from "./modules/slider/showUpSlider";
import VideoPlayer from "./modules/videoPlayer";
import UnfoldList from "./modules/unfoldList";

window.addEventListener("DOMContentLoaded", () => {
    // const pageSlider = new Slider('.page', '.next');

    // pageSlider.render();

    const scrollSlider = new MainSlider({
        parrent: '.page',
        btns: '.page .next',
        scrollDir: 'Y',
        home: '.page .sidecontrol > a'
    });

    scrollSlider.render();
    scrollSlider.animateOnHover();

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

    const showUpVideo = new VideoPlayer({
        triggers: '.showup .play',
        block: '.overlay'
    });

    showUpVideo.init();
    
    const differenceList = new UnfoldList({
        listItem: '.difference__wrapper .officer__card-item'
    }); 

    differenceList.render();
});