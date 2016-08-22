<!--   COMP SPAWNER PROPS   -->

<script>
import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
  props: {
    dataSources: Array
  },

  template: '#comp-spawner-template',

  data: () => {
    return {
      showForm: false,
      compName: '',
      compType: '',
      sourceIndex: -1,
      arrayEditorProps: {
        editMode: true,
        showIndex: true
      },
      graphComponentProps: {
        canvasId: '000',
        animated: true,
        dimensions: [128, 128]
      }
    }
  },

  computed: {
    dataSourceOptions: function () {
      let sources = []
      this.dataSources.forEach(function (element, index) {
        sources.push({
          text: element.name, value: index
        })
      })
      return sources
    },

    validForm: function () {
      let valid = true
      if (!this.compName) valid = false
      if (!this.compType) valid = false
      if (this.sourceIndex < 0) valid = false
      // if (this.arrayEditorProps && this.graphComponentProps) valid = false

      return valid
    }
  },

  methods: {
    createComponent: function () {
      var newGirdle = $('<component-girdle></component-girdle>')
      var newComp

      if (this.compType === 'Array Editor') {
        newComp = document.createElement('array-editor')
        newComp.setAttribute('data-name', this.arrayEditorProps.dataName)
        newComp.setAttribute(':data-set', this.arrayEditorProps.dataSet)
        newComp.setAttribute(':edit-mode', this.arrayEditorProps.editMode)
        newComp.setAttribute(':show-index', this.arrayEditorProps.showIndex)
        newComp.appendTo(newGirdle)

        // $('<array-editor></array-editor>', {
        //   'data-name': this.compName,
        //   'data-set': this.dataSources[this.sourceIndex].data,
        //   'edit-mode': this.arrayEditorProps.editMode,
        //   'show-index': this.arrayEditorProps.showIndex
        // }).appendTo(newGirdle)

        console.log('Array Editor added!')
      }

      if (this.compType === 'Graph Component') {
        // newComp = document.createElement('array-editor')
        // newComp.setAttribute('data-name', this.graphComponentProps.dataName)
        // newComp.setAttribute('data-set', this.graphComponentProps.dataSet)
        // newComp.setAttribute('canvas-id', this.graphComponentProps.canvasId)
        // newComp.setAttribute('animated', this.graphComponentProps.animated)
        // newComp.setAttribute('dimensions', this.graphComponentProps.dimensions)
        console.log('Graph Component added!')
      }

      $('#dashboard-comp-spawner').before(newGirdle)

      // this.showForm = false
      // this.clearForm()
    },

    cancelCreation: function () {
      this.showForm = false
      this.clearForm()
    },

    clearForm: function () {
      this.compName = ''
      this.compType = null
      this.sourceIndex = -1
      this.arrayEditorProps = {
        editMode: true,
        showIndex: true
      }
      this.graphComponentProps = {
        canvasId: '000',
        animated: true,
        dimensions: [128, 128]
      }
    }
  }
})
</script>

<template id="comp-spawner-template">
  <div class="comp-spawner component-meta">

    <form v-show="showForm">
      Create a new
      <select v-model="compType">
        <option>Array Editor</option>
        <option>Graph Component</option>
      </select>
      called
      <input type='text' name='name' placeholder="Component Name" v-model="compName"></input>
      with the following properties:<br>

      <fieldset div v-if="compType">
        <div>
          Data source: <select v-model="sourceIndex">
          <option v-for="source in dataSourceOptions" v-bind:value="source.value">{{source.text}}</option>
          </select>
          <span v-if="sourceIndex>=0">
            {{dataSources[sourceIndex].data.length}} {{dataSources[sourceIndex].type}}
          </span>
        </div>

        <div v-if="compType==='Array Editor'">
          <input type="checkbox" v-model="arrayEditorProps.editMode">Editable
          <input type="checkbox" v-model="arrayEditorProps.showIndex">Show Indices
        </div>

        <div v-if="compType==='Graph Component'">
          <input type="checkbox" v-model="graphComponentProps.animated">Animated
          <input type="number" name="dimenionX" min="32" max="512" v-model="graphComponentProps.dimensions[0]">
          <input type="number" name="dimenionY" min="32" max="512" v-model="graphComponentProps.dimensions[1]">Canvas Dimensions
        </div>

      </fieldset>
    </form>

    <div style="display: flex;">
      <button v-on:click="showForm=true" v-show="!showForm">Add Component to Dashboard</button>
      <button v-on:click="cancelCreation" v-show="showForm">Cancel</button>
      <button v-on:click="createComponent" :disabled="!validForm" v-show="showForm">Create</button>
    </div>

  </div>

</template>

<style>

  .comp-spawner{
  }

  .comp-spawner button,
  .comp-spawner.component-meta{
    font-size: 0.9em;
    color: #808080;

    background: rgba(0,0,0,0.05);
    border: none;
    outline: 1px dotted #686058;
    outline-offset: -1px;

    transition: all 0.05s ease;
  }
  .comp-spawner button{
    cursor: pointer;
    height: 1.5rem;
    width: 100%;
  }
  .comp-spawner button:disabled{
    pointer-events: none;
    opacity: 0.3;
  }
  .comp-spawner button:hover{
    background: rgba(255,255,255,0.1);
    color: #c0c0c0;
  }
  .comp-spawner button:active{
    background: rgba(255,255,255,0.3);
    color: #e0e0e0;
  }

  .comp-spawner form{
    margin: 0.25rem;
    padding: 0.25rem;
    text-align: center;
  }

  .comp-spawner fieldset{
    display: flex;
  }
</style>
