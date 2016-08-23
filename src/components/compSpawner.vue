<!--   COMP SPAWNER PROPS   -->

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    sourceList: Array
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
        dimensionW: 256,
        dimensionH: 256
      }
    }
  },

  computed: {
    validForm: function () {
      let valid = true
      if (!this.compName) valid = false
      if (!this.compType) valid = false
      if (this.sourceIndex < 0) valid = false
      // if (this.arrayEditorProps && this.graphComponentProps) valid = false

      return valid
    },

    compProps: function () {
      let relevantProps = {}
      if (this.compType === 'Array Editor') relevantProps = this.arrayEditorProps
      if (this.compType === 'Graph Component') relevantProps = this.graphComponentProps
      return relevantProps
    }
  },

  methods: {
    createComponent: function () {
      this.$dispatch('add-component',
        this.compType,
        this.compName,
        this.sourceIndex,
        this.compProps
      )

      this.showForm = false
      this.clearForm()
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
        animated: true,
        dimensionW: 256,
        dimensionH: 256
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
          <option v-for="source in sourceList" v-bind:value="source.index">{{source.name}}</option>
          </select>
          <span v-if="sourceIndex>=0">
            {{sourceList[sourceIndex].count}} {{sourceList[sourceIndex].type}}
          </span>
        </div>

        <div v-if="compType==='Array Editor'">
          <input type="checkbox" v-model="arrayEditorProps.editMode">Editable
          <input type="checkbox" v-model="arrayEditorProps.showIndex">Show Indices
        </div>

        <div v-if="compType==='Graph Component'">
          <input type="checkbox" v-model="graphComponentProps.animated">Animated
          <input type="number" name="dimensionW" min="32" max="512" v-model="graphComponentProps.dimensionW">
          <input type="number" name="dimensionH" min="32" max="512" v-model="graphComponentProps.dimensionH">Canvas Dimensions
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
