export default class UnfoldList {
    constructor({listItem} = {}) {
        this.list = document.querySelectorAll(listItem);
    }

    render() {
        this.list.forEach(item => {
            item.classList.add('animated');

            if (item.nextElementSibling !== null) {
                item.classList.add('hidden');
                item.style.display = 'none';
            } else {
                item.addEventListener('click', () => {
                    this.unfold(item);
                });
            }
        });
    }

    unfold(btn) {
        const elems = btn.parentNode.children; 
        for (let i = 0; i < elems.length; i++) {
            if (i === elems.length - 2) {
                elems[i + 1].classList.add('fadeOut');
                setTimeout(() => elems[i + 1].remove(), 1000);
            }
            
            if (elems[i].classList.contains('hidden')) {
                elems[i].classList.remove('hidden');
                elems[i].classList.add('fadeInDown');
                elems[i].style.display = 'flex';
                btn.classList.add('slideInDown');
                break;
            }
        } 

        setTimeout(() => btn.classList.remove('slideInDown'), 800);
    }
}