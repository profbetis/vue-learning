<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['dataSet'],
  template: `
  <div>
    <h2>Number Visualizer A</h2>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value in dataSet">
            <td>{{$index}}</td>
            <td>{{value}}</td>
          </tr>
        </tbody>
        <tfoot> <tr> <td></td> <td></td> </tr> </tfoot>
      </table>
  </div>`
})
</script>
