import Vue from 'vue'
// import numberInput from './components/numberInput'
// import textInput from './components/textInput'
import numVisualizerA from './components/numVisualizerA'
// import numVisualizerB from './components/numVisualizerB'
import textVisualizerA from './components/textVisualizerA'
// import textVisualizerB from './components/textVisualizerB'

export default new Vue({
  el: '#app',

  components: {
    // 'number-input': numberInput,
    // 'text-input': textInput,
    'num-visualizerA': numVisualizerA,
    // 'num-visualizerB': numVisualizerB,
    'text-visualizerA': textVisualizerA
    // 'text-visualizerB': textVisualizerB
  },

  data: {
    numbers: [1, 2, 4, 8, 16, 32],
    moreNumbers: [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37],
    text: ['Hello', 'Kevin', 'Bodie', 'Lem E. Skrumpit'],
    moreText: ['Synapse Garden', 'Dwarf Game', 'PNX Engine', 'Mote']
  }
})
