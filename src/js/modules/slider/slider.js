export default class Slider {
    constructor({parrent = null, btns = null, scrollDir = 'X'} = {}) {
        this.parrent = document.querySelector(parrent);
        this.slides = Array.from(this.parrent.children);
        this.btns = document.querySelectorAll(btns);
        this.scrollDir = scrollDir;
        this.currentOffset = 0;
        this.currentSlide = 0;
    }

    addNav(elem, home) {
        elem.forEach(btn => {
            btn.addEventListener('click', () => {
                if (home) {
                    this.homeSlide();
                } else if (btn === this.prev) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            });
        });
    }

    defineDir() {
        let margin;

        if (this.scrollDir === 'X') {
            margin = +window.getComputedStyle(this.slides[1]).marginRight.slice(0, -2);
            this.offset = this.slides[1].clientWidth + margin;
        } else {
            margin = +window.getComputedStyle(this.slides[1]).marginBottom.slice(0, -2);
            this.offset = this.slides[1].clientHeight + margin;    
        }
    }

    getString(val) {
        return `translate${this.scrollDir}(${val}px)`;
    }

    wrap() {
        let wrapper = document.createElement('div');
        this.parrent.innerHTML = "";
        this.parrent.append(wrapper);
        this.parrent.style.overflow = 'hidden';

        if (this.extractArrows) {
            this.extractArrows();
        }

        this.wrapper = this.parrent.firstElementChild;
        this.wrapper.dataset.slider = 'wrapper';
        this.wrapper.append(...this.slides);               
        this.wrapper.style.cssText = `
            display: flex;
            flex-direction: ${this.scrollDir === 'Y' ? 'column' : 'row'};
            transition: 1s all;
        `;

        if (this.scrollDir === 'row') {
            this.wrapper.style.width = this.total + 'px';
            this.wrapper.style.alignItems = 'flex-start';
        } 
    }
}
