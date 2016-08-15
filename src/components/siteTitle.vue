<template>
    <div id="site-title" class="outline">
        <div id="site-mainTitle">{{ siteMainTitle }}</div>
        <div id="site-subTitle">{{ siteSubtitle }}</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      siteMainTitle: 'Vue Tests',
      siteSubtitle: 'Planted by Kevin Weber and Bodie Solomon'
    }
  }
}
</script>
