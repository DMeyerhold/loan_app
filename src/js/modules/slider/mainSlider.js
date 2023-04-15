import Slider from "./slider";

export default class MainSlider extends Slider{
    constructor ({parrent = null, btns = null, home = null, scrollDir, popUp = null} = {}) {
        super({parrent, btns, scrollDir});
        this.home = document.querySelectorAll(home);
    }

    nextSlide() {
        this.currentSlide++; 
        this.wrapper.style.transform = `translateY(-${this.offset * this.currentSlide}px)`;

        if (this.currentSlide === this.slides.length) {
            this.currentSlide = 0;
            this.wrapper.style.transform = `translateY(0px)`;        
        }

        this.decorate();
    }
   
    homeSlide() {
        this.currentSlide = 0;
        this.wrapper.style.transform = `translateY(0px)`;        
    }
   
    decorate() {
        if (this.currentSlide === 2) {
            setTimeout(() => {
                this.popUp.classList.add('animated', 'fadeInUp');
                this.popUp.style.display = 'block';
            }, 4000);
        }
    }

    render () {
        this.wrap();
        this.defineDir();
        this.homeSlide();
        this.addNav(this.btns);
        this.addNav(this.home, true);
        this.decorate();

        try {
            this.popUp = document.querySelector(".hanson");
            this.popUp.style.display = "none";
        } catch (e) {
            console.error(e.message);
        }
    }

    animateOnHover() {
        this.btns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add("animated", "headShake");
            });
    
            btn.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    btn.classList.remove("headShake");
                }, 400);
            }); 
        });
    }
}