<template>
<table>
  <thead>
    <tr>
      <td>Index</td>
      <td>Data</td>
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
export default {
  data () {
    return {

    }
  }
}
</script>
