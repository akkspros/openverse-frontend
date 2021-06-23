<template>
  <!-- eslint-disable -->
  <div class="audio-container">
    <img
      v-if="thumbnail"
      :alt="`audio thumbnail for ${title}`"
      class="audio-thumbnail"
      :src="thumbnail"
    />
    <div v-else class="audio-thumbnail thumbnail-placeholder" />
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
        <span class="audio-provider">{{ provider }}</span>
        <a :href="landingUrl" class="audio-link">
          <span class="audio-title">{{ title }}</span>
          by
          <span class="audio-creator">{{ creator }}</span>
        </a>
      </p>
      <p>
        <LicenseIcons :license="license.toLowerCase()" />
        <span class="audio-icons">{{ license }}</span>
        <span class="audio-duration">{{ durationString }}</span>
      </p>
    </div>
    <div class="waveform" ref="overview"></div>
    <audio ref="ws" class="audio" :src="src"></audio>
  </div>
</template>
<script>
import Peaks from 'peaks.js'
import wave from './wave.dat'

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
    peaks: {},
    provider: {},
    landingUrl: {},
    options: {},
  },
  data: () => ({
    wavesurfer: null,
    waveData: null,
    waveformHeight: 30,
    isPlaying: false,
    wsOptions: {
      backend: 'MediaElement',
      waveColor: '#b0b0b0',
      progressColor: '#333333',
      cursorColor: '#333333',
      backgroundColor: '#ffffff',
      cursorWidth: 1,
      height: 30,
      responsive: true,
    },
  }),
  async fetch() {
    console.log('FETCH')
    let response = await fetch(wave)
    if (response.ok) {
      let arrayBuffer = await response.arrayBuffer()
      this.waveData = new Uint8Array(arrayBuffer)
    }
  },
  computed: {
    durationString() {
      let minutes = Math.floor(this.duration / 60)
      let seconds = this.duration % 60
      return `${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
  },
  async mounted() {
    console.log('MOUNTED ')
    if (typeof window !== 'undefined') {
      const peaksOptions = {
        ...this.options,
        mediaElement: this.$refs.ws,
        multiChannel: true,
        containers: {
          overview: this.$refs.overview,
        },
        dataUri: {
          arraybuffer: 'http://localhost:8000/road_to_dublin_ch.dat',
        },
        withCredentials: false,
      }
      Peaks.init(peaksOptions, function (err, something) {
        console.log(err, something)
        something.on('overview.dblclick', () => {
          console.log('ready')
        })
      })
    }
  },
  methods: {
    pause() {
      this.$refs.ws.pause()
      this.isPlaying = false
    },
    start() {
      this.$refs.ws.play()
      this.isPlaying = true
    },
    handleClick() {
      this.isPlaying ? this.pause() : this.start()
    },
  },
}
</script>
<style lang="scss" scoped>
$waveform-height: 30px;
.audio-container {
  display: grid;
  grid-template-columns: calc(#{$waveform-height} + 2rem) $waveform-height 1fr;
  grid-template-rows: 1.5rem $waveform-height 2rem;
  grid-template-areas:
    'thumbnail meta meta'
    'thumbnail play waveform'
    'audio audio audio';
  margin-top: 1rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
}
.audio {
  grid-area: audio;
}
.audio-thumbnail {
  grid-area: thumbnail;
}

.thumbnail-placeholder {
  background-color: #333;
  position: relative;
  &::after {
    content: 'OV';
    font-size: 3rem;
    place-items: center;
    color: white;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
}

.audio-play-button {
  grid-area: play;
}

.audio-meta {
  display: flex;
  grid-area: meta;
  justify-content: space-between;

  .audio-title {
    font-weight: bold;
  }
}
.audio-meta .audio-provider {
  margin-right: 0.5rem;
  font-weight: normal;
}
.audio-link {
  color: #333;
}

.waveform {
  grid-area: waveform;
  border-radius: 4px;
}

.audio-title {
  font-weight: bold;
}
</style>
