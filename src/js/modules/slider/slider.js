export default class Slider {
    constructor({page = '', btns = '', scrollDir = 'row'} = {}) {
        this.page = document.querySelector(page);
        this.slides = Array.from(this.page.children);
        this.btns = document.querySelectorAll(btns);
        this.scrollDir = scrollDir;
        this.currentOffset = 0;
        this.currentSlide = 0;
    }

    render () {
        this.defineDir();
        // appending wrapper
        let wrapper = document.createElement('div');
        this.page.innerHTML = "";
        this.page.append(wrapper);
        this.page.style.overflow = 'hidden';

        this.wrapper = this.page.firstElementChild;
        this.wrapper.dataset.slider = 'wrapper';
        this.wrapper.append(...this.slides);               
        this.wrapper.style.cssText = `
            display: flex;
            flex-direction: ${this.scrollDir};
            transition: 1s;
        `;

        if (this.scrollDir === 'row') {
            this.wrapper.style.width = this.total + 'px';
        } 

        this.pushSlide();

        this.addNav(this.btns, this.offset);

        if (this.home && this.home.length > 0) {
            this.addNav(this.home);
        } 

        if (this.decorate) {
            this.decorate();
        }

        if (this.auto) {
            this.scrollByTime();
        }

        try {
            this.popUp = document.querySelector(".hanson");
            this.popUp.style.display = "none";
        } catch (e) {
            console.error(e.message);
        }
    }

    pushSlide(val) {
        if (!val) {
            this.currentOffset = 0;
        } else {
            this.currentOffset += val;  
        }

        if (this.currentOffset >= this.total) {
            this.currentOffset = 0;
        }

        if (this.currentOffset < 0) {
            this.currentOffset = this.total - this.offset;
        }

        this.currentSlide = (this.currentOffset / this.offset);

        if (this.currentSlide === 2) {
            setTimeout(() => {
                this.popUp.classList.add('animated', 'fadeInUp');
                this.popUp.style.display = 'block';
            }, 3000);
        }

        if (this.decorate) {
            this.decorate();
        }

        this.wrapper.style[this.marginDir] = `-${this.currentOffset}px`;
    }    

    addNav(elem, val) {
        elem.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn === this.prev) {
                    this.pushSlide(-val);
                } else {
                    this.pushSlide(val);
                }
            });
        });
    }

    defineDir() {
        if (this.scrollDir === 'row') {
            this.total = this.slides[0].clientWidth * (this.slides.length);
            this.offset = this.slides[0].clientWidth;
            this.marginDir = 'marginLeft';    
        } else {
            this.total = this.slides[0].clientHeight * (this.slides.length);
            this.offset = this.slides[0].clientHeight;
            this.marginDir = 'marginTop';    
        }
    }

    scrollByTime() {
        if (this.auto) {
            this.page.addEventListener('mouseleave', () => {
                this.paused = setInterval(() => {
                    this.pushSlide(this.offset);
                }, this.auto);    
            });
            
            this.page.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            });
        }
    }
}
