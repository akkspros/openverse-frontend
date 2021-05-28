<template>
  <!-- eslint-disable -->
  <section
    id="tab-audio"
    role="tabpanel"
    aria-labelledby="audio"
    class="padding-normal"
  >
    <h3 class="title is-5 b-header">Audio Example </h3>
    <div class="audio-container">
      <img class="audio-thumbnail" :src="thumbnail" />
      <span class="audio-play-button" @click="handleClick">
        <svg
          v-if="!isPlaying"
           :height="waveformHeight"
           :width="waveformHeight"
           fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" fill="#ec5a3a" fill-opacity=".74" r="50"/><path d="m63.5023 48.5588c.8177.7868.8177 2.0956 0 2.8824l-17.6155 16.9505c-1.2707 1.2227-3.3868.3222-3.3868-1.4411v-33.9012c0-1.7633 2.1161-2.6638 3.3868-1.4411z" fill="#fff"/></svg>
      <svg v-else
      :width="waveformHeight"
        :height="waveformHeight" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="50" r="50" fill="#EC5A3A" fill-opacity="0.74"/>
<rect x="38" y="30" width="7" height="40" rx="3.5" fill="white"/>
<rect x="56" y="30" width="7" height="40" rx="3.5" fill="white"/>
</svg>
      </span>
      <div class="audio-meta">
        <p>
          <span class="audio-title">{{title}}</span>
          by
          <span class="audio-creator">{{creator}}</span>
        </p>
        <p>
          <span class="audio-icons">{{license}}</span>
          <span class="audio-duration">{{duration}}</span>
        </p>
      </div>
     <div id="ws" />
    </div>
  </section>
</template>
<script>
export default {
  name: 'AudioPage',
  beforeRouteLeave() {
    this.wavesurfer.destroy()
  },
  data: () => ({
    wavesurfer: null,
    isPlaying: false,
    waveformHeight: 30,
    // src: '/JekK_-_You_and_Me.mp3',
    src:
      'https://mp3d.jamendo.com/?trackid=1157358&format=mp32&from=lJVJyHNhRHiRDKae5Y5BtQ%3D%3D%7CgPkUAo5jXFVp%2FFGS7w5fYg%3D%3D',
    thumbnail:
      'https://images.jamendo.com/albums/s138/138887/covers/1.200.jpg?du=1532152255',
    title: 'You and me',
    creator: 'JEKK',
    license: 'BY-NC-ND',
    duration: '3:13',
    wsOptions: {
      container: '#ws',
      waveColor: '#b0b0b0',
      progressColor: '#333333',
      cursorColor: '#333333',
      backgroundColor: '#ffffff',
      cursorWidth: 1,
      height: 30,
    },
  }),
  fetch() {
    console.log('Fetching, wavesurfer', this.$nuxt.context.wavesurfer)
    if (this.$nuxt.context.wavesurfer) {
      this.wavesurfer = new this.$nuxt.context.wavesurfer.create(this.wsOptions)
    }
  },
  mounted() {
    this.$fetch()
    console.log('Audio page mounted, ', this.wavesurfer)
    if (this.wavesurfer) {
      this.wavesurfer.load(this.src)
      this.wavesurfer.on('ready', () => {
        this.start()
      })
    }
  },
  methods: {
    pause() {
      if (this.wavesurfer) {
        this.wavesurfer.pause()
        this.isPlaying = false
      }
    },
    start() {
      if (this.wavesurfer) {
        this.wavesurfer.play()
        this.isPlaying = true
      }
    },
    handleClick() {
      if (this.wavesurfer) {
        this.wavesurfer.isPlaying() ? this.pause() : this.start()
      }
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
#ws {
  grid-area: waveform;
  border-radius: 4px;
}

.audio-title {
  font-weight: bold;
}
</style>
