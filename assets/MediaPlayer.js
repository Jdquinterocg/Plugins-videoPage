// Creo una función para luego añadirle métodos
function MediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];

    this._initPlugins();
}

// Run a plugin 
MediaPlayer.prototype._initPlugins = function() {
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
        get muted() {
            return this.media.muted;
        },
        set muted(value){
            this.media.muted = value;
        },
    };
    
    this.plugins.forEach(plugin => {
        plugin.run(player);
    });
}

MediaPlayer.prototype.play = function () {
    this.media.play();
}

MediaPlayer.prototype.pause = function () {
    this.media.pause();
}

MediaPlayer.prototype.mute = function () {
    this.media.muted = true;
}
MediaPlayer.prototype.unmute = function () {
    this.media.muted = false;
}

// Action to pause or play the video with the button
MediaPlayer.prototype.action = function () {
    if (this.media.paused) {
        this.play();
    } else {
        this.pause();
    }
};

export default MediaPlayer;