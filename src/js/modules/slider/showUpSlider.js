import Slider from './slider';

export default class ShowUpSlider extends Slider{
    constructor ({parrent = null, next = null, prev = null, activeClass = null, auto = null} = {}) {
        super({parrent, next, prev});
        this.auto = auto;
        this.btns = [this.prev, this.next];
        this.activeClass = activeClass;
    }

    bindTriggers() {
        let wrapper = this.wrapper,
        slides = this.slides;

        slides.forEach(slide => slide.classList.add('animated'));

        this.prev.forEach(item => {
            item.addEventListener('click', () => {
                this.currentSlide = this.checkActiveSlide(--this.currentSlide);
                
                if (wrapper.children[slides.length - 1].nodeName === "BUTTON") {
                    wrapper.insertBefore(wrapper.children[slides.length - 1], wrapper.children[0]);
                    this.currentSlide -= 2;
                } else {
                    wrapper.insertBefore(wrapper.children[slides.length - 1], wrapper.children[0]);
                }

                this.decorate();
                animateMovement('slideInLeft');
            });
        });

        this.next.forEach(item => {
            item.addEventListener('click', () => {
                if (wrapper.children[1].nodeName === "BUTTON") {
                    wrapper.append(wrapper.children[0], wrapper.children[1], wrapper.children[2]);
                    this.currentSlide += 2;
                } else {
                    wrapper.append(wrapper.children[0]);
                }

                this.currentSlide = this.checkActiveSlide(++this.currentSlide);

                this.decorate();
                animateMovement('slideInRight');
            });
        });

        function animateMovement(animation) {
            slides.forEach((slide, i) => {
                if (slide.nodeName !== "BUTTON") {
                    slide.classList.add(animation);
                }
            });

            setTimeout(() => {
                slides.forEach(slide => {
                    slide.classList.remove(animation);
                });
            }, 1000);
        }
    }

    render() {
        try {
            this.wrap();
            this.pushToSlide(0);
            this.decorate();

            this.bindTriggers();

            this.scrollByTime();
            this.bindTimer(this.parrent);

            this.btns.forEach(btn => {
                this.bindTimer(btn.parentElement);
            });
        } catch(e) {}
    }

    wrap() {
        this.parrent.innerHTML = `<div class="wrapper"></div>`;

        this.wrapper = this.parrent.querySelector('.wrapper');
        this.wrapper.style.cssText = `
            display: flex;
            width: max-content;
        `;

        this.parrent.style.overflow = 'hidden';
        this.wrapper.append(...this.slides);
    }

    pushToSlide(n) {
        this.currentSlide = this.checkActiveSlide(this.currentSlide);

        this.wrapper.innerHTML = '';
        this.wrapper.append(...this.slides);
    }

    decorate() {
        Array.from(this.wrapper.children).forEach((slide, i) => slide.classList.remove(this.activeClass));

        this.wrapper.children[0].style.transition = "0s all";
        this.wrapper.children[0].classList.add(this.activeClass);
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