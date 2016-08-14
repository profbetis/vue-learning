<template>
    <div id="siteTitle">
        <div id="site-title">{{ siteTitle }}</div>
        <div id="site-subtitle">{{ siteSubtitle }}</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      siteTitle: 'Vue Tests',
      siteSubtitle: 'Planted by Kevin Weber and Bodie Solomon'
    }
  }
}
</script>
