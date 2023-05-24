export default class VidPlay {
    constructor({triggers = '', block = ''} = {}) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(block);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    showPlayer() {
        this.overlay.style.display = "flex";
    }

    hidePlayer() {
        this.player.stopVideo();
        this.overlay.style.display = "none";
    }

    onPlayerStateChange(state) {
        if (state.data === 0 && this.activeBtn.parentElement.previousElementSibling === null) {
            const playBtn = this.activeBtn.parentElement.nextElementSibling.querySelector('.play');
            const playIcon = this.activeBtn.children[0].children[0].cloneNode(true);
            
            playBtn.children[0].classList.remove('closed');
            playBtn.parentNode.setAttribute('data-closed', false);
            playBtn.parentNode.style.cssText = `
                filter: none;
                opacity: 1;
            `;      

            playBtn.children[0].children[0].innerHTML = ''; 
            playBtn.children[0].children[0].append(playIcon);

            playBtn.children[1].classList.remove('attention');            
            playBtn.children[1].textContent = 'play video';
        }
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.parentNode.getAttribute('data-closed') === 'true') {
                    return;
                }

                this.activeBtn = btn;

                if (!this.player) {
                    this.path = btn.getAttribute('data-url');
                    this.createPlayer(this.path);
                }

                this.showPlayer();
                
                if (this.path !== btn.getAttribute('data-url')) {
                    this.path = btn.getAttribute('data-url');
                    this.player.loadVideoById({videoId: this.path});
                }
            });
        });
    }

    bindClose() {
        this.close.addEventListener('click', () => {
            this.hidePlayer();
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hidePlayer();
            }
        });
    }

    createPlayer(path) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: path,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        console.log(this.player);
    }

    init() {
        try {
            if (this.btns.length === 0) {return;}

            var tag = document.createElement('script');
            var firstScriptTag = document.getElementsByTagName('script')[0];
    
            tag.src = "https://www.youtube.com/iframe_api";
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindClose();

            document.querySelectorAll('.module__video').forEach(container => {
                container.children[1].setAttribute('data-closed', true);
            });
    
        } catch (e) {}
    }
}