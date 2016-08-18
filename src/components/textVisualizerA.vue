<template>
<table>
  <thead>
    <tr>
      <td>Index</td>
      <td>Number</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="point in points">
      <td>{{$index}}</td>
      <td>{{point}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import Vue from 'vue'

export default Vue.component('text-visualizerA', {
  template: '<div class="outline">Text Visualizer A</div>',
  props: {
    dataPoints: Array
  },
  data: function () {
    // var dataPoints = []
  }
})
</script>

<!--<script>
export default {
  data () {
    return {

    }
  }
}
</script>-->
