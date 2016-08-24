<!--   DASHBOARD PROPS   -->

<script>
import Vue from 'vue'
import compSpawner from './compSpawner'
import streamComponent from './streamComponent'
import componentGirdle from './componentGirdle'
import graphComponent from './graphComponent'
import arrayEditor from './arrayEditor'

export default Vue.extend({
  props: {
    dataSources: Array
  },

  template: '#dashboard-template',

  components: {
    'comp-spawner': compSpawner,
    'component-girdle': componentGirdle,
    'stream-component': streamComponent,
    'graph-component': graphComponent,
    'array-editor': arrayEditor
  },

  data: () => {
    return {
      componentList: [],
      nextId: 0
    }
  },

  computed: {
    sourceInfo: function () {
      let sources = []
      this.dataSources.forEach(function (element, index) {
        sources.push({
          name: element.name, index: index, type: element.type, count: element.data.length
        })
      })
      return sources
    }
  },

  events: {
    'add-component': function (compType, compName, sourceIndex, compProps) {
      console.log('Request to add new component')

      this.componentList.push({
        type: compType,
        name: compName,
        sourceName: this.dataSources[sourceIndex].name,
        source: sourceIndex,
        compProps: compProps,
        compId: this.nextId
      })

      this.nextId++
    },

    'please-kill-me': function (compIdToDelete) {
      console.log('Request to delete component #' + compIdToDelete)

      let newCompList = this.componentList
      this.componentList.forEach(function (element, index) {
        if (element.compId === compIdToDelete) {
          newCompList.splice(index, 1)
        }
      })
      this.componentList = newCompList
    }
  }
})
</script>

<template id="dashboard-template">
  <div id="dashboard">
    <h1>Dashboard</h1>

    <div v-for="comp in componentList">
      <component-girdle v-if="comp.type==='Array Editor'" :comp-id="comp.compId">
        <array-editor
          :comp-name="comp.name"
          :data-name="comp.sourceName"
          :data-set="dataSources[comp.source].data"
          :edit-mode="comp.compProps.editMode"
          :show-index="comp.compProps.showIndex"
          :comp-id="comp.compId">
        </array-editor>
      </component-girdle>

      <component-girdle v-if="comp.type==='Graph Component'" :comp-id="comp.compId">
        <graph-component
          :comp-name="comp.name"
          :data-name="comp.sourceName"
          :data-set="dataSources[comp.source].data"
          :animated="comp.compProps.animated"
          :canvas-w="+comp.compProps.dimensionW"
          :canvas-h="+comp.compProps.dimensionH"
          :comp-id="comp.compId">
        </graph-component>
      </component-girdle>

      <component-girdle v-if="comp.type==='Stream Component'" :comp-id="comp.compId">
        <stream-component
          :comp-name="comp.name"
          :stream-name="comp.sourceName"
          :stream-Data="dataSources[comp.source].data"
        </stream-component>
      </component-girdle>
    </div>

    <comp-spawner :source-list="sourceInfo"></comp-spawner>

  </div>
</template>

<style>
</style>
