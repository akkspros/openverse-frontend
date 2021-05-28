import WaveSurfer from 'wavesurfer.js'

/**
 * Initialize wavesurfer on the client-side
 * @param {import('@nuxt/types').Context} context
 */
export default function initWaveSurfer(context) {
  console.log('Initialized wavesurfer')
  context.wavesurfer = WaveSurfer
}
