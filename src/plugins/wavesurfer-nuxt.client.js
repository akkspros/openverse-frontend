import WaveSurfer from 'wavesurfer.js'

/**
 * Initialize wavesurfer on the client-side
 * @param {import('@nuxt/types').Context} context
 */
export default function initWaveSurfer(context) {
  context.wavesurfer = WaveSurfer
}
