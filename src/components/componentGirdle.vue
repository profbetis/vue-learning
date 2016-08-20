<!--   GRAPH COMPONENT PROPS   -->
<!--   'controls' // Boolean // Shows controls for the component   -->
<!--   'info' // Boolean // Shows info for the component   -->
<!--   'title' // Boolean // Shows the title of the component   -->

<script>
import Vue from 'vue'

// COMPONENT TEMPLATE
var comp = Vue.extend({
  props: {
    initShowControls: Boolean,
    initShowInfo: Boolean,
    initShowName: Boolean
  },

  data: function () {
    return {
      showControls: this.initShowControls,
      showInfo: this.initShowInfo,
      showName: this.initShowName,
      minimized: false,
      compName: 'Component Name',
      compInfo: [
        ['componentInfo', 'null info'],
        ['moreComponentInfo', 'will be loaded soon']
      ]
    }
  },

  template: '#component-girdle-template',

  methods: {
    toggleMinimize: function () {
      this.minimized = !this.minimized
    },

    toggleInfo: function () {
      this.showInfo = !this.showInfo
    },

    toggleName: function () {
      this.showName = !this.showName
    }
  },

  events: {
    'give-component-info': function (information) {
      this.compName = information.compName
      this.compInfo = information.compInfo
    }
  }
})

export default comp

</script>

<!-- COMPONENT TEMPLATE -->
<template id="component-girdle-template">

  <div class="component-girdle component-meta outline">

    <div class="girdle-controls" v-if="showControls">
      <div class="girdle-toggle-name"
        v-on:click="toggleName()">
        <span>T</span>
      </div>

      <div class="girdle-toggle-info"
        v-on:click="toggleInfo()">
        <span>i</span>
      </div>

      <div class="girdle-minimize"
        v-on:click="toggleMinimize()">
        <span v-if="minimized">+</span>
        <span v-else>-</span>
      </div>
    </div>

    <div class="girdle-title"
      v-show="showName"
      transition="name-info">
      {{compName}}
    </div>

    <div v-show="!minimized" transition="comp-minimize">
      <slot>No component loaded.</slot>
    </div>

    <div class="girdle-info"
      v-show="showInfo"
      transition="name-info">
      <span v-for="line in compInfo">
        <span v-for="item in line">
          <span v-if="$index==0"><b>{{item}}</b></span>
          <span v-else>» {{item}}</span>
        </span>
        <br>
      </span>
    </div>
  </div>

</template>


<style>
.component-girdle{
  position: relative;
}

.girdle-controls{
  position: absolute;
  right: 0.5em;
  top: 0.5em;

  text-align: justify;
  -ms-text-justify: distribute-all-lines;
  text-justify: distribute-all-lines;
}

.girdle-controls>div{
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  *display: inline;
  zoom: 1;
  outline: 1px solid #485058;
  background: rgba(255,255,255,0.05);
  cursor: pointer;
  margin-left: 0.125em;
}
.girdle-controls>div:hover{
  outline-color: #686058;
  background: rgba(255,255,255,0.15);
}
.girdle-controls>div:active{
  background: rgba(255,255,255,0.5);
}

.name-info-transition{
  transition: all 0.2s ease;
  max-height: 4em;
  width: 100%;
  opacity: 1.0;
}
.name-info-enter,
.name-info-leave{
  width: 0%;
  max-height: 0;
  opacity: 0.0;
}

.comp-minimize-transition{
  transition: all 0.2s ease;
  max-height: 20em;
  max-width: 50em;
  overflow: hidden;
}
.comp-minimize-enter,
.comp-minimize-leave{
  max-height: 0em;
  max-width: 15em;
}

.girdle-title{
  font-size: 1rem;
  line-height: 1rem;
  vertical-align: middle;
  min-height: 1rem;

  margin-top: -0.5rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-bottom: 0.5em;

  border-bottom: 1px solid #485058;
}
.girdle-info{
  color: #687078;
  border-top: 1px solid #485058;
  font-size: 0.7em;
  line-height: 1.1em;

  text-align: left;
  padding-top: 0.25em;
  margin-top: 0.5rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  margin-bottom: -0.5rem;
}

</style>
