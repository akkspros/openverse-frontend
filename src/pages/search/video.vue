<template>
  <!-- eslint-disable -->
  <section
    id="tab-video"
    role="tabpanel"
    aria-labelledby="video"
    class="padding-normal"
  >
    <h3 class="title is-5 b-header">Audio Example using peaks.js</h3>
    <div class="search-grid-audio" v-if="wavesurferLoaded">
      <SearchGridCellAudio2
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
        :provider="audio.provider"
        :landing-url="audio.landingUrl"
        :options="options"
      />
    </div>
  </section>
</template>
<script>
import SearchGridCellAudio2 from '~/pages/search/SearchGridCellAudio2'

export default {
  name: 'AudioPage',
  components: { SearchGridCellAudio2 },
  beforeRouteLeave() {
    console.log('leaving video route')
    // this.wavesurfer.destroy()
  },
  data: () => ({
    options: {},
    wavesurfer: null,
    wavesurferLoaded: false,
    wavesurferCreator: null,
    currentlyPlaying: null,
    audioList: [
      {
        id: 'audio1',
        landingUrl: 'https://www.jamendo.com/track/1157358/you-and-me',
        src:
          'https://mp3d.jamendo.com/?trackid=1157358&format=mp32&from=lJVJyHNhRHiRDKae5Y5BtQ%3D%3D%7CgPkUAo5jXFVp%2FFGS7w5fYg%3D%3D',
        thumbnail:
          'https://images.jamendo.com/albums/s138/138887/covers/1.200.jpg?du=1532152255',
        title: 'You and me',
        creator: 'JEKK',
        license: 'BY-NC-ND',
        duration: '193',
        provider: 'jamendo',
      },
      {
        id: 'audio3',
        landingUrl:
          'https://en.wikipedia.org/wiki/File:Christoph_Nolte_-_The_Rocky_Road_-_The_Rocky_Road_To_Dublin.ogg',
        src:
          'https://upload.wikimedia.org/wikipedia/commons/1/18/Christoph_Nolte_-_The_Rocky_Road_-_The_Rocky_Road_To_Dublin.ogg',
        thumbnail: null,
        title: 'The Rocky Road - The Rocky Road To Dublin',
        creator: 'Christoph Nolte',
        duration: 147,
        license: 'BY-SA',
        provider: 'wikimedia',
      },
      {
        // This is a 'preview' file with lower quality
        // To download the original, we need oauth authentication
        id: 'audio4',
        landingUrl: 'https://freesound.org/people/tim.kahn/sounds/33657/',
        src: 'https://freesound.org/data/previews/33/33657_7037-lq.mp3',
        thumbnail: null,
        title: 'Meow.wav',
        creator: 'tim.kahn',
        duration: 4,
        license: 'BY',
        provider: 'freesound',
      },
      {
        // Thumbnails are for albums, not songs
        id: 'audio5',
        landingUrl:
          'https://freemusicarchive.org/music/Sergey_Cheremisinov/movement-1/young-wind',
        src:
          'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GdgZnfi4ZxBeQ5NRJqIqREfMRkPai4NtbzUtKv1K.mp3',
        thumbnail:
          'https://freemusicarchive.org/image?file=image%2FslJFhDQjbetcJJZTNG9QfoaBQBwXviMaMcDDCrKH.jpeg&width=290&height=290&type=image',
        title: 'Young Wind',
        creator: 'Sergey Cheremisinov',
        duration: 132,
        license: 'BY-NC',
        provider: 'Free Music Archive',
      },
      {
        // thumbnail for user who uploaded, not audio
        id: 'audio6',
        landingUrl: 'http://ccmixter.org/files/copperhead/38880',
        src: 'http://ccmixter.org/content/copperhead/copperhead_-_Pompeii.mp3',
        thumbnail:
          'http://ccmixter.org/content/copperhead/Untitled-1_copy.jpgsmallfinal2.jpg',
        title: 'Pompeii',
        creator: 'copperhead',
        duration: 224,
        license: 'BY',
        peaks: true,
        provider: 'ccmixter',
      },
      {
        // Here, there is a composer and a performer. Include both as creators?
        id: 'audio7',
        landingUrl:
          'https://imslp.org/wiki/Dilatate_sunt_tribulationes_(Abbatini%2C_Antonio_Maria)',
        src:
          'https://imslp.simssa.ca/files/imglnks/usimg/e/eb/IMSLP81448-PMLP134761-Dilata.mp3',
        thumbnail: null,
        title: 'Dilatate sunt tribulationes',
        creator: 'Sibelius / Abbatini, Antonio Maria',
        duration: 253,
        license: 'BY',
        provider: 'IMSLP',
      },
    ],
    isPlaying: false,
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
