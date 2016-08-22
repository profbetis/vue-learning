import Vue from 'vue'

import dashboard from './components/dashboard'
import componentGirdle from './components/componentGirdle'
import compSpawner from './components/compSpawner'
import graphComponent from './components/graphComponent'
import arrayEditor from './components/arrayEditor'
// import textInput from './components/textInput'
// import textVisualizerA from './components/textVisualizerA'

export default new Vue({
  el: '#app',

  components: {
    'dashboard': dashboard,
    'component-girdle': componentGirdle,
    'comp-spawner': compSpawner,
    'graph-component': graphComponent,
    'array-editor': arrayEditor
    // 'text-input': textInput,
    // 'text-visualizer-a': textVisualizerA
  },

  data: {
    user: {
      name: 'Kevin Weber',
      id: '001',
      joinedDate: '2016/08/22',
      teams: [
        'Synapse Garden',
        'Blue Visual',
        'Bayfront'
      ],
      projects: [
        'Vue Learning',
        'Kyber',
        'Dwarf Game',
        'Mote',
        'Phoenix Engine',
        'i',
        'Transit VR'
      ],
      dataSets: [
        {
          name: 'Powers of 2',
          id: '000',
          type: 'numbers',
          data: [
            1, 2, 4, 8, 16, 32
          ]
        },
        {
          name: 'Primes',
          id: '001',
          type: 'numbers',
          data: [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71
          ]
        },
        {
          name: 'Associates',
          id: '002',
          type: 'strings',
          data: [
            'HelloVue', 'Kevin', 'Bodie', 'Lem E. Skrumpit'
          ]
        },
        {
          name: 'Projects',
          id: '003',
          type: 'reference',
          path: 'user/projects'
        }
      ]
    },
    dashboard: [],
    build: {
      build: 'dev',
      version: 'v0.0.1',
      passing: 'passing'
    }
  }
})
