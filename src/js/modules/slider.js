export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } 

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach((slide, i) => {
            slide.classList.add('animated');   
            slide.classList.remove('slideOutDown');
            
            if (this.slideIndex - 2 === i) {
                slide.classList.add('slideOutDown');
                setTimeout(() => {
                    slide.style.display = "none";                
                }, 200);
            } else {
                slide.style.display = "none";                
            }
        });

        this.slides[this.slideIndex - 1].classList.add('fadeInDown');
        this.slides[this.slideIndex - 1].style.display = "block";
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    animateOnHover(btn) {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add("animated", "headShake");
        });

        btn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                btn.classList.remove("headShake");
            }, 400);
        }); 
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            this.animateOnHover(btn);

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}