import Slider from "./slider";

export default class MainSlider extends Slider{
    constructor ({parrent = null, btns = null, next = null, prev = null, home = null} = {}) {
        super({parrent, btns, next, prev});
        try {
            this.home = document.querySelectorAll(home);
        } catch(e) {}
    }

    pushToSlide(n) {
        this.slides.forEach(slide => slide.style.display = "none");

        n = this.checkActiveSlide(n);

        this.currentSlide = n;

        this.slides[n].style.display = 'block';
        this.decorate();
    }
   
    decorate() {
        try {
            if (this.currentSlide === 2) {
                setTimeout(() => {
                    this.popUp.classList.add('animated', 'fadeInUp');
                    this.popUp.style.display = 'block';
                }, 4000);
            }
        } catch(e) {}
    }

    bindTriggers(arr, val) {
        this.prev.forEach(btn => {
            btn.addEventListener('click', () => {
                this.pushToSlide(--this.currentSlide);
            });
        });

        this.next.forEach(btn => {
            btn.addEventListener('click', () => {
                this.pushToSlide(++this.currentSlide);
            });
        });

        this.home.forEach(btn => {
            btn.addEventListener('click', () => {
                this.pushToSlide(0);
            });
        });
    }

    render () {
        if (this.parrent) {
            this.pushToSlide(0);

            this.animateOnHover(this.next);
            this.animateOnHover(this.prev);

            this.bindTriggers();
    
            try {
                this.popUp = document.querySelector(".hanson");
                this.popUp.style.display = "none";
            } catch (e) {
                console.error(e.message);
            }
        } 
    }

    animateOnHover(btns) {
        btns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add("animated", "headShake");
                btn.style.cursor = 'pointer';
            });
    
            btn.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    btn.classList.remove("headShake");
                }, 400);
            }); 
        });
    }
}