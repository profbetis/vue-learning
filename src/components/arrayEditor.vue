<!--   ARRAY EDITOR PROPS   -->
<!--   'data-name' // Literal String // The name of the data set   -->
<!--   'data-set' // Referenced Array // The data to be used   -->
<!--   'edit-mode' // Bool // Enables array editing   -->
<!--   'show-index' // Bool // Generates a column for the index number   -->

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['dataName', 'dataSet', 'show-index'],
  template: `
  <div class="array-editor-meta">
    <div class="info">{{dataName}}<br>
    {{dataSet.length}} elements</div>

    <h2>Array Editor</h2>

  <table class="array-editor-body">
    <thead>
      <tr>
        <td class="array-editor-undo">↺</td>
        <td class="array-editor-index">#</td>
        <td class="array-editor-value">Value</td>
        <td class="array-editor-redo">↻</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="value in dataSet" track-by="$index">
        <td class="array-editor-delete"
            v-on:click="removeElement($index)">×</td>
        <td class="array-editor-index">{{$index}}</td>
        <td class="array-editor-value">{{value}}</td>
        <td class="array-editor-add"
            v-on:click="moveElement($index, $index - 1)"
            v-if=$index>^</td>
      </tr>
      <tr>
        <td class="array-editor-delete">&nbsp;</td>
        <td class="array-editor-index">&nbsp;</td>
        <td class="array-editor-value">
          <input type="text" v-model="newEntry" placeholder="new">
        </td>
        <td class="array-editor-add"
            v-show=newEntry
            v-on:click="insertElement(dataSet.length, newEntry)">+</td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  </div>`,
  data: {
    newEntry: ''
  },
  methods: {
    // removeElement: function (id) {
    //   return [...this.dataSet.slice(0, id), ...this.dataSet.slice(id + 1)]
    // },
    removeElement: function (id) {
      this.dataSet.splice(id, 1)
    },
    insertElement: function (id, value) {
      this.dataSet.splice(id, 0, value)
      this.newEntry = ''
    },
    moveElement: function (id, newId) {
      this.dataSet = [
        ...this.dataSet.slice(0, id),
        this.dataSet[newId],
        ...this.dataSet.slice(id + 1)
      ]
    }
  }
})
</script>

<style>
.info{
    float: right;
    text-align: right;
    line-height: 1.1em;
    font-size: 0.8em;
    color: #707070;
}

.array-editor-undo,
.array-editor-redo{
    color: #4080a0;
}

.array-editor-delete{ color: #a06060; }
.array-editor-add{ color: #60a060; }
.array-editor-index{ color: #606060; }

.array-editor-delete,
.array-editor-add{
    opacity: 0.5;
    cursor: default;
}
.array-editor-delete:hover,
.array-editor-add:hover{
    opacity: 1;
}
.array-editor-delete:active,
.array-editor-add:active{
    background-color: rgba(255,255,255,0.2);
}
.array-editor-delete:last-of-type:hover{
    opacity: 0.5;
}

/*********************/
/* TABLES START
/*********************/
table{
    font-size: 14px;
    font-family: monospace;
}
table thead td,
table tfoot td{
    font-weight: 600;
    background-color: rgba(0,0,0,0.4);
    transition: all 0.1s ease-out;
}
table tbody td{
    background-color: rgba(0,0,0,0.3);
}
table tr{
    margin: 0.5em;
}
table td{
    padding: 0.125em 1em;
}
table tbody td:hover{ background-color: rgba(255,255,255,0.03); }

/*********************/
/* TABLES END
/*********************/
</style>
