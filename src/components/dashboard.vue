<!--   DASHBOARD PROPS   -->

<script>
import Vue from 'vue'
import compSpawner from './compSpawner'
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

    'delete-component': function (compId) {
      console.log('Request to delete component #' + compId)
    }
  }
})
</script>

<template id="dashboard-template">
  <div id="dashboard">
    <h1>Dashboard</h1>

    <div v-for="comp in componentList">
      <component-girdle v-if="comp.type==='Array Editor'">
        <array-editor
          :comp-name="comp.name"
          :data-name="comp.sourceName"
          :data-set="dataSources[comp.source].data"
          :edit-mode="comp.compProps.editMode"
          :show-index="comp.compProps.showIndex"
          :comp-id="comp.compId">
        </array-editor>
      </component-girdle>

      <component-girdle v-if="comp.type==='Graph Component'">
        <graph-component
          :comp-name="comp.name"
          :data-name="comp.sourceName"
          :data-set="dataSources[comp.source].data"
          :animated="comp.compProps.animated"
          :canvas-w="comp.compProps.dimensions[0]"
          :canvas-h="comp.compProps.dimensions[1]"
          :comp-id="comp.compId">
        </graphComponent>
      </component-girdle>
    </div>

    <comp-spawner :source-list="sourceInfo"></comp-spawner>

  </div>
</template>

<style>
</style>
