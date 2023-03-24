import Slider from "./slider";

export default class MainSlider extends Slider{
    constructor ({page = '', btns = '', home = '', scrollDir, popUp = ''} = {}) {
        super({page, btns, scrollDir});
        this.home = document.querySelectorAll(home);
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