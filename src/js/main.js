import Slider from "./modules/slider";
import ScrollSlider from "./modules/scrollSlider";
window.addEventListener("DOMContentLoaded", () => {
    // const pageSlider = new Slider('.page', '.next');

    // pageSlider.render();

    const pageSlidan = new ScrollSlider({
        page: '.page',
        btns: '.next',
        scrollDir: 'column'
    });
    
    pageSlidan.render();
    pageSlidan.addNav(pageSlidan.btns, pageSlidan.offset);
    pageSlidan.addNav(pageSlidan.page.querySelectorAll('.sidecontrol > a'), -pageSlidan.offset);
});