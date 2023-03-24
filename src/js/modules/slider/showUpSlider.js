import Slider from './slider';

export default class ShowUpSlider extends Slider{
    constructor ({page = '', btns = '', prev = '', next = '', activeClass = '', scrollDir,  auto = ''} = {}) {
        super({page, btns, scrollDir});
        this.auto = auto;
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
    }

    decorate() {
        this.slides.forEach((slide, i) => {
            if (i === this.currentSlide ) {
                slide.classList.add(this.activeClass);
            } else {
                slide.classList.remove(this.activeClass);                
            }
        });
    }
}