<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['dataSet'],
  template: `
  <div>
    <h2>Number Visualizer B</h2>
    <div>
      <table class="graph">
        <thead>
          <tr> <td v-for="value in dataSet" track-by="$index">{{$index}}</td></tr>
        </thead>
        <tr>
          <td v-for="value in dataSet" track-by="$index">
            <div class="point" style="width:{{value}}px; height:{{value}}px;">
            </div>
          </td>
        </tr>
        <tfoot><tr><td v-for="value in dataSet" track-by="$index"></tr></tfoot>
      </table>
    </div>
  </div>`
})
</script>
