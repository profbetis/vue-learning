<!--   ARRAY EDITOR PROPS   -->
<!--   'data-name' // Literal String // The name of the data set   -->
<!--   'data-set' // Referenced Array // The data to be used   -->
<!--   'edit-mode' // Bool // Enables array editing   -->
<!--   'show-index' // Bool // Generates a column for the index number   -->

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['dataName', 'dataSet', 'editMode', 'showIndex'],

  template: '#array-editor-template',

  data: () => {
    return {
      newEntry: ''
    }
  },

  ready: function () {
    this.passInfoToGirdle({
      compName: 'Array Editor',
      compInfo: [
        ['dataSet', this.dataName, this.dataSet.length + ' elements'],
        ['showIndex', this.showIndex],
        ['editMode', this.editMode]
      ]
    })
  },

  methods: {
    passInfoToGirdle: function (information) {
      this.$dispatch('give-component-info', information)
    },

    removeElement: function (id) {
      this.dataSet.splice(id, 1)
    },

    insertElement: function (id, value) {
      this.dataSet.splice(id, 0, value)
      this.newEntry = ''
    },

    moveElement: function (id, newId) {
      var elem = this.dataSet[id]
      this.dataSet.splice(id, 1)
      this.dataSet.splice(newId, 0, elem)
    },

    submitOnEnter: function () {
      if (this.newEntry.length > 0) {
        this.insertElement(this.dataSet.length, this.newEntry)
      }
    }
  }
})
</script>

<template id="array-editor-template">
  <div class="array-editor component-meta">

    <table class="array-editor-body">
      <thead>
        <tr>
          <td class="array-editor-undo">↺</td>
          <td class="array-editor-index">#</td>
          <td class="array-editor-value">Value</td>
          <td class="array-editor-redo">↻</td>
          <td class="array-editor-redo">&nbsp;</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="value in dataSet" track-by="$index">

          <td class="array-editor-delete"
            v-if=($index<dataSet.length)
            v-on:click="removeElement($index)">×</td>

            <td class="array-editor-delete"
              style="pointer-events: none;"
              v-else>&nbsp;</td>

          <td class="array-editor-index">{{$index}}</td>

          <td class="array-editor-value">{{value}}</td>

          <td class="array-editor-move move-up"
            v-on:click="moveElement($index, $index - 1)"
            v-if=($index)>↑</td>

            <td class="array-editor-blank"
              v-else>&nbsp;</td>

          <td class="array-editor-move move-down"
            v-on:click="moveElement($index, $index + 1)"
            v-if=($index<dataSet.length-1)>↓</td>
            <td class="array-editor-blank"
              v-else>&nbsp;</td>

        </tr>

        <tr>
          <td class="array-editor-delete" style="pointer-events: none;">&nbsp;</td>
          <td class="array-editor-blank">&nbsp;</td>
          <td class="array-editor-value new-entry">
            <input type="text"
              v-model="newEntry"
              @keydown.enter="submitOnEnter()"
              placeholder="New Entry">
          </td>
          <td class="array-editor-move"
            v-show=newEntry
            v-on:click="insertElement(dataSet.length, newEntry)">+</td>
            <td v-else class="array-editor-blank">&nbsp;</td>

          <td class="array-editor-blank">&nbsp;</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>



  </div>

</template>

<style>

.array-editor{
}

.array-editor .info{
    float: left;
    text-align: left;
    margin-top: 0.5em;
    padding-top: 0.5em;
    line-height: 1.1em;
    font-size: 0.8em;
    color: #707070;
    border-top: 1px solid #485058;
    width: 100%;
}

.array-editor-undo,
.array-editor-redo{
    color: #4080a0;
    cursor: no-drop;
}

.array-editor-delete{ color: #a06060; }
.array-editor-move{ color: #60a060; }
.array-editor-index{ color: #606060; }

.array-editor-delete,
.array-editor-move,
.array-editor-blank{
    opacity: 0.5;
    cursor: default;
}

.array-editor-delete,
.array-editor-move.move-up,
.array-editor-move.move-down,
.array-editor-value .new-entry{
  cursor: pointer;
}

.array-editor-blank{ pointer-events: none; }
.array-editor-delete:hover,
.array-editor-move:hover{
    opacity: 1;
}
.array-editor-delete:active,
.array-editor-move:active{
  background-color: rgba(255,255,255,0.15);
  outline: 1px solid;
}

/*********************/
/* TABLES START
/*********************/
table{
  margin-top: 0.5em;
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
table tbody td:hover{ background-color: rgba(0,0,0,0.1); }

table .new-entry{
  background-color: rgba(0,0,0,0.15);
}
table .new-entry:hover{
  background-color: rgba(255,255,255,0.1);
  outline: 1px solid #686058;
}

/*********************/
/* TABLES END
/*********************/



/*********************/
/* INPUT START
/*********************/
table input{
  background-color: transparent;
  border: none;
  color: #d0d0d0;
  width: auto;
  font-size: 14px;
  font-family: monospace;
}
table input:focus{outline: none;}
input::-webkit-input-placeholder,
input:-moz-input-placeholder,
input::-moz-input-placeholder,
input:-ms-input-placeholder{
  color: #f06060;
}
/*********************/
/* INPUT START
/*********************/
</style>
