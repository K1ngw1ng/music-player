class MusicPlayer {
    constructor() {
        this.audioController = new AudioController();
        this.uiController = new UIController();
        this.currentTrack = 0;
        this.initializePlayer();
    }

    initializePlayer() {
        // Play/Pause button
        this.uiController.playBtn.addEventListener('click', () => {
            const isPlaying = this.audioController.toggle();
            this.uiController.updatePlayButton(isPlaying);
        });

        // Previous button
        this.uiController.prevBtn.addEventListener('click', () => this.playPrevious());

        // Next button
        this.uiController.nextBtn.addEventListener('click', () => this.playNext());

        // Progress bar
        this.uiController.progressSlider.addEventListener('change', () => {
            const time = (this.uiController.progressSlider.value / 100) * this.audioController.getDuration();
            this.audioController.seek(time);
        });

        // Audio time update
        this.audioController.audio.addEventListener('timeupdate', () => {
            const percent = (this.audioController.getCurrentTime() / this.audioController.getDuration()) * 100;
            this.uiController.updateProgress(percent);
            this.uiController.updateTime(
                this.audioController.formatTime(this.audioController.getCurrentTime()),
                this.audioController.formatTime(this.audioController.getDuration())
            );
        });

        // Track ended
        this.audioController.audio.addEventListener('ended', () => this.playNext());

        // Queue click handler
        this.uiController.onQueueItemClick = (index) => this.skipToTrack(index);

        // Load first track
        this.loadTrack(this.currentTrack);
    }

    loadTrack(index) {
        const track = playlist[index];
        this.audioController.loadTrack(track);
        this.uiController.updateTrackInfo(track);
        this.uiController.setCurrentTrack(index);
    }

    skipToTrack(index) {
        this.currentTrack = index;
        this.loadTrack(index);
        if (this.audioController.isPlaying) {
            this.audioController.play();
        }
    }

    playNext() {
        this.currentTrack = (this.currentTrack + 1) % playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.audioController.isPlaying) {
            this.audioController.play();
        }
    }

    playPrevious() {
        this.currentTrack = (this.currentTrack - 1 + playlist.length) % playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.audioController.isPlaying) {
            this.audioController.play();
        }
    }
}

// Initialize player when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});