export default class Slider {
    constructor({parrent = null, btns = null, prev = null, next = null} = {}) {
        try {
            this.parrent = document.querySelector(parrent);
            this.slides = Array.from(this.parrent.children);
            this.btns = document.querySelectorAll(btns) || null;
            this.prev = document.querySelectorAll(prev);
            this.next = document.querySelectorAll(next);
            this.currentSlide = 0;
        } catch (e) {}
    }

    checkActiveSlide(n) {
        n = n > this.slides.length - 1 ? 0 : n;
        n = n < 0 ? n = this.slides.length - 1 : n;

        return n;
    }
}
