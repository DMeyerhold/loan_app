export default class VidPlay {
    constructor({triggers = '', block = ''} = {}) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(block);
    }

    showPlayer() {
        this.overlay.style.display = "flex";
    }

    hidePlayer() {
        this.player.stopVideo();
        this.overlay.style.display = "none";
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.player) {
                    this.createPlayer(btn.getAttribute('data-url'));
                }
                this.showPlayer();
            });
        });
    }

    bindClose() {
        this.overlay.querySelector('.close').addEventListener('click', () => {
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
        });

        console.log(this.player);
    }

    init() {
        var tag = document.createElement('script');
        var firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindClose();
    }
}