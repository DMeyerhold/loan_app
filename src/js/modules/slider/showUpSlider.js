import Slider from './slider';

export default class ShowUpSlider extends Slider{
    constructor ({parrent = null, prev = null, next = null, activeClass = null, scrollDir,  auto = null} = {}) {
        super({parrent, scrollDir});
        this.auto = auto;
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.btns = [this.prev, this.next];
        this.activeClass = activeClass;
        this.clonedSlides = 3;
    }

    render() {
        this.defineDir();
        this.wrap();
        this.wrapper.style.width = 'fit-content';

        this.slides.forEach((slide, i) => {
            slide.dataset.sliderItem = i;

            if (i < this.clonedSlides) {
                this.wrapper.append(slide.cloneNode(true));
            }

            if (i > this.slides.length - 1 - this.clonedSlides) {
                this.wrapper.insertBefore(this.slides[i].cloneNode(true), this.slides[0]);
            }
        });
        this.currentSlide = 0;

        this.homeSlide();
        this.addNav(this.btns);
        this.decorate();
        this.scrollByTime();
        this.bindTimer(this.parrent);

        this.btns.forEach(btn => {
            this.bindTimer(btn.parentElement);
        });
    }

    nextSlide() {
        this.currentSlide++;
        this.wrapper.style.transform = `translateX(-${this.offset * (this.currentSlide + this.clonedSlides) - 10}px)`;

        if (this.currentSlide === this.slides.length) {
            this.currentSlide = 0;
            this.decorate();

            setTimeout(() => {
                this.wrapper.style.transform = `translateX(-${this.offset * this.clonedSlides - 10}px)`;
                this.wrapper.style.transitionDuration = '0s';
            }, 900);
        } else {
            this.wrapper.style.transitionDuration = '1s';
            this.decorate();
        }
    }

    prevSlide() {
        this.currentSlide--;
        this.wrapper.style.transform = `translateX(-${this.offset * (this.currentSlide + this.clonedSlides) - 10}px)`;

        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
            this.decorate();

            setTimeout(() => {
                this.wrapper.style.transform = `translateX(-${this.offset * (this.slides.length - 1 + this.clonedSlides) - 10}px)`;
                this.wrapper.style.transitionDuration = '0s';
            }, 900);
        } else {
            this.wrapper.style.transitionDuration = '1s';
            this.decorate();
        }   
    }

    homeSlide () {
        this.wrapper.style.transform = `translateX(-${this.offset * this.clonedSlides - 10}px)`;
        this.decorate();
    }

    decorate() {
        Array.from(this.wrapper.children).forEach((slide, i) => {
            slide.classList.remove(this.activeClass);
            if (+slide.dataset.sliderItem === this.currentSlide) {
                slide.classList.add(this.activeClass);
            }
        });
        // this.wrapper.children[this.currentSlide + this.clonedSlides].classList.add(this.activeClass);
    }

    extractArrows() {
        let btnContainer = document.createElement('div');

        btnContainer.style.cssText = `
            height: inherit;
            position: absolute;
            top: 0;
        `;

        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i] === this.prev || this.slides[i] === this.next) {
                btnContainer.append(this.slides[i]);

                this.slides.splice(i, 1);
                --i;
            }
        }

        this.parrent.append(btnContainer);
    }

    bindTimer(element) {
        element.addEventListener('mouseleave', () => {
            this.scrollByTime();
        });

        element.addEventListener('mouseenter', () => {
            clearInterval(this.paused);
            this.paused = null;
        });
    }

    scrollByTime() {
        if (this.auto && !this.paused) {
            this.paused = setInterval(() => {
                this.pushSlide(this.offset);
            }, this.auto);
        }
    }
}