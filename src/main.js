import Vue from 'vue'
import componentGirdle from './components/componentGirdle'
import graphComponent from './components/graphComponent'
import arrayEditor from './components/arrayEditor'
// import textInput from './components/textInput'
// import textVisualizerA from './components/textVisualizerA'
// import textVisualizerB from './components/textVisualizerB'

var atom = {
  numbers: [1, 2, 4, 8, 16, 32],
  moreNumbers: [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37],
  text: ['Hello', 'Kevin', 'Bodie', 'Lem E. Skrumpit'],
  moreText: ['Synapse Garden', 'Dwarf Game', 'PNX Engine', 'Mote']
}

export default new Vue({
  el: '#app',

  components: {
    'component-girdle': componentGirdle,
    'graph-component': graphComponent,
    'array-editor': arrayEditor
    // 'text-input': textInput,
    // 'text-visualizer-a': textVisualizerA
  },

  data: {
    atom: atom
  }
})
