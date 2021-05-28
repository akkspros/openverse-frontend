<template>
  <div class="audio-container">
    <img :src="thumbnail" alt="song thumbnail" width="50" height="50" />
    <div id="waveform" />
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
export default {
  name: 'AudioView',
  props: ['src', 'thumbnail', 'wavesurfer'],
  data: () => ({
    wave: null,
  }),
  fetch() {
    console.log('Fetch in AudioView', this.wavesurfer)
  },
  mounted() {
    // console.log('Mounted', this.src, this.thumbnail, this.wavesurfer)
    // if (this.wavesurfer) {
    //   this.wavesurfer.create({
    //     container: '#waveform',
    //     waveColor: '#D9DCFF',
    //     progressColor: '#4353FF',
    //     cursorColor: '#4353FF',
    //     barWidth: 3,
    //     barRadius: 3,
    //     cursorWidth: 1,
    //     height: 100,
    //     barGap: 1,
    //   })
    //   console.log('Created the wavesurfer')
    // }
    this.wave = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#D9DCFF',
      progressColor: '#4353FF',
      cursorColor: '#4353FF',
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      barGap: 1,
    })
    console.log('Wave: ', this.wave)
    this.wave.load(this.src)
    console.log('Wave: ', this.wave)
  },
}
</script>

<style scoped></style>
