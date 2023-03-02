import Slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
    const pageSlider = new Slider('.page', '.next');

    pageSlider.render();
});