<template>
  <!-- eslint-disable -->
  <div class="audio-container">
    <img
      :alt="`audio thumbnail for ${title}`"
      class="audio-thumbnail"
      :src="thumbnail"
    />
    <span class="audio-play-button" @click="handleClick">
      <svg
        v-if="!isPlaying"
        :height="waveformHeight"
        :width="waveformHeight"
        fill="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" fill="#ec5a3a" fill-opacity=".74" r="50" />
        <path
          d="m63.5023 48.5588c.8177.7868.8177 2.0956 0 2.8824l-17.6155 16.9505c-1.2707 1.2227-3.3868.3222-3.3868-1.4411v-33.9012c0-1.7633 2.1161-2.6638 3.3868-1.4411z"
          fill="#fff"
        />
      </svg>
      <svg
        v-else
        :width="waveformHeight"
        :height="waveformHeight"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" fill="#EC5A3A" fill-opacity="0.74" />
        <rect x="38" y="30" width="7" height="40" rx="3.5" fill="white" />
        <rect x="56" y="30" width="7" height="40" rx="3.5" fill="white" />
      </svg>
    </span>
    <div class="audio-meta">
      <p>
        <span class="audio-title">{{ title }}</span>
        by
        <span class="audio-creator">{{ creator }}</span>
      </p>
      <p>
        <span class="audio-icons">{{ license }}</span>
        <span class="audio-duration">{{ duration }}</span>
      </p>
    </div>
    <div ref='ws' class="waveform" />
  </div>
</template>
<script>
export default {
  name: 'SearchGridCellAudio',
  props: {
    audioId: {},
    src: {},
    creator: {},
    duration: {},
    license: {},
    thumbnail: {},
    title: {},
    wavesurferCreator: {},
  },
  data: () => ({
    wavesurfer: null,
    waveformHeight: 30,
    isPlaying: false,
    wsOptions: {
      waveColor: '#b0b0b0',
      progressColor: '#333333',
      cursorColor: '#333333',
      backgroundColor: '#ffffff',
      cursorWidth: 1,
      height: 30,
    },
  }),
  mounted() {
    console.log('Mounted ', this.$refs, this.$refs.ws)
    const wsOptions = { ...this.wsOptions, container: this.$refs.ws }
    this.wavesurfer = new this.wavesurferCreator.create(wsOptions)
    this.wavesurfer.load(this.src)
  },
  methods: {
    pause() {
      this.wavesurfer.pause()
      this.isPlaying = false
    },
    start() {
      this.wavesurfer.play()
      this.isPlaying = true
    },
    handleClick() {
      this.wavesurfer.isPlaying() ? this.pause() : this.start()
    },
  },
}
</script>
<style lang="scss" scoped>
$waveform-height: 30px;
.audio-container {
  display: grid;
  grid-template-columns: calc(#{$waveform-height} + 2rem) $waveform-height 1fr;
  grid-template-rows: 1.5rem $waveform-height;
  grid-template-areas:
    'thumbnail meta meta'
    'thumbnail play waveform';
  margin-top: 1rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
}

.audio-thumbnail {
  grid-area: thumbnail;
}

.audio-play-button {
  grid-area: play;
}

.audio-meta {
  display: flex;
  grid-area: meta;
  justify-content: space-between;

  span:not(.audio-creator) {
    font-weight: bold;
  }
}

.waveform {
  grid-area: waveform;
  border-radius: 4px;
}

.audio-title {
  font-weight: bold;
}
</style>
