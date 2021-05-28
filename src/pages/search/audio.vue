<template>
  <!-- eslint-disable -->
  <section
    id="tab-audio"
    role="tabpanel"
    aria-labelledby="audio"
    class="padding-normal"
  >
    <h3 class="title is-5 b-header">Audio Example</h3>
    <div class="search-grid-audio" v-if="wavesurferLoaded">
      <SearchGridCellAudio
        v-for="audio in audioList"
        :key="audio.id"
        :audio-id="audio.id"
        :src="audio.src"
        :creator="audio.creator"
        :duration="audio.duration"
        :license="audio.license"
        :thumbnail="audio.thumbnail"
        :title="audio.title"
        :wavesurferCreator="wavesurferCreator"
        :peaks="audio.peaks"
      />
    </div>
  </section>
</template>
<script>
import SearchGridCellAudio from '~/pages/search/SearchGridCellAudio'

export default {
  name: 'AudioPage',
  components: { SearchGridCellAudio },
  beforeRouteLeave() {
    this.wavesurfer.destroy()
  },
  data: () => ({
    wavesurfer: null,
    wavesurferLoaded: false,
    wavesurferCreator: null,
    currentlyPlaying: null,
    audioList: [
      {
        id: 'audio1',
        src:
          'https://mp3d.jamendo.com/?trackid=1157358&format=mp32&from=lJVJyHNhRHiRDKae5Y5BtQ%3D%3D%7CgPkUAo5jXFVp%2FFGS7w5fYg%3D%3D',
        thumbnail:
          'https://images.jamendo.com/albums/s138/138887/covers/1.200.jpg?du=1532152255',
        title: 'You and me',
        creator: 'JEKK',
        license: 'BY-NC-ND',
        duration: '3:13',
      },
      {
        id: 'audio2',
        src:
          'https://mp3d.jamendo.com/?trackid=1157358&format=mp32&from=lJVJyHNhRHiRDKae5Y5BtQ%3D%3D%7CgPkUAo5jXFVp%2FFGS7w5fYg%3D%3D',
        thumbnail:
          'https://images.jamendo.com/albums/s138/138887/covers/1.200.jpg?du=1532152255',
        title: 'You and me',
        creator: 'JEKK',
        license: 'BY-NC-ND',
        duration: 5,
        peaks: true,
      },
    ],
    isPlaying: false,
    // src: '/JekK_-_You_and_Me.mp3',
  }),
  fetch() {
    if (this.$nuxt.context.wavesurfer) {
      this.wavesurferCreator = this.$nuxt.context.wavesurfer
      this.wavesurferLoaded = true
    }
  },
  mounted() {
    this.$fetch()
  },
}
</script>
<style lang="scss" scoped>
$waveform-height: 30px;
</style>
