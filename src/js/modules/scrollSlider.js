export default class ScrollSlider {
    constructor ({page, btns, scrollDir = 'row'}) {
        // elements
        this.page = document.querySelector(page);
        this.slides = Array.from(this.page.children);
        this.btns = this.page.querySelectorAll(btns);

        // variables
        this.scrollDir = scrollDir;
        this.total = this.slides[0].clientHeight * (this.slides.length - 1);
        this.offset = this.slides[0].clientHeight;
        this.marginDir = this.scrollDir === 'row' ? 'marginLeft' : 'marginTop';
        this.currentOffset = 0;
    }

    render () {
        // appending wrapper
        let wrapper = document.createElement('div');
        this.page.innerHTML = "";
        this.page.append(wrapper);

        this.wrapper = this.page.firstElementChild;
        this.wrapper.dataset.slider = 'wrapper';
               
        this.wrapper.style.cssText = `
            display: flex;
            flex-direction: ${this.scrollDir};
            transition: 1s;
        `;

        this.wrapper.append(...this.slides);
    }

    pushSlide(val) {
        this.currentOffset += val;  

        if (this.currentOffset > this.total) {
            this.currentOffset = 0;
        }

        if (this.currentOffset < 0) {
            this.currentOffset = this.total - this.offset;
        }

        this.page.querySelector('[data-slider="wrapper"]').style[this.marginDir] = `-${this.currentOffset}px`;
    }    

    addNav(elem, val) {
        elem.forEach(btn => {
            btn.addEventListener('click', () => {
                this.pushSlide(val);
            });
        });
    }
}