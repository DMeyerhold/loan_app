export default class Accordion {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
    }

    init() {
        try {
            document.querySelectorAll('.module__info-controls')
            .forEach(control => control.style.backgroundColor = '#FFF');

        this.triggers.forEach(trigger => {
            const msg = trigger.parentNode.nextElementSibling;

            trigger.classList.add('closed');
            msg.style.cssText = `
                display: block;
                transition: 1s all;
                height: 0;
                overflow: hidden;
            `;

            trigger.addEventListener('click', () => {
                if (trigger.classList.contains('closed')) {
                    msg.style.height = `${msg.scrollHeight}px`; 
                    trigger.classList.remove('closed');
                } else {
                    msg.style.height = `0px`; 
                    trigger.classList.add('closed');                    
                }
                });
            });
        } catch (e) {}
    }
}