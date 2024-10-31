class UIController {
    constructor() {
        this.initializeElements();
        this.initializeQueue();
    }

    initializeElements() {
        this.playBtn = document.getElementById('play');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.progressBar = document.getElementById('progress');
        this.progressSlider = document.getElementById('progressSlider');
        this.titleElement = document.getElementById('title');
        this.artistElement = document.getElementById('artist');
        this.coverElement = document.getElementById('cover');
        this.currentTimeElement = document.getElementById('currentTime');
        this.durationElement = document.getElementById('duration');
        this.queueContainer = document.getElementById('queue');
    }

    initializeQueue() {
        this.renderQueue();
    }

    updateTrackInfo(track) {
        this.titleElement.textContent = track.title;
        this.artistElement.textContent = track.artist;
        this.coverElement.src = track.cover;
    }

    updatePlayButton(isPlaying) {
        this.playBtn.innerHTML = isPlaying 
            ? '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
            : '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
    }

    updateProgress(percent) {
        this.progressBar.style.width = `${percent}%`;
        this.progressSlider.value = percent;
    }

    updateTime(current, duration) {
        this.currentTimeElement.textContent = current;
        this.durationElement.textContent = duration;
    }

    renderQueue() {
        this.queueContainer.innerHTML = '';
        playlist.forEach((track, index) => {
            const queueItem = document.createElement('div');
            queueItem.className = `queue-item ${index === this.currentTrack ? 'active' : ''}`;
            queueItem.innerHTML = `
                <img src="${track.cover}" alt="${track.title}" class="queue-item-img">
                <div class="queue-item-info">
                    <div class="queue-item-title">${track.title}</div>
                    <div class="queue-item-artist">${track.artist}</div>
                </div>
            `;
            queueItem.addEventListener('click', () => {
                if (typeof this.onQueueItemClick === 'function') {
                    this.onQueueItemClick(index);
                }
            });
            this.queueContainer.appendChild(queueItem);
        });
    }

    setCurrentTrack(index) {
        this.currentTrack = index;
        this.renderQueue();
    }
}