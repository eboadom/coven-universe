<template>
    <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
    :fields="['name', 'nickname', 'email', 'gender']"
    data-path=""
    pagination-path=""
  ></vuetable>
    <!-- :api-mode="false"
    :data="localData" -->
</template>
<script>
import Vuetable from 'vuetable-2'

export default {
    name: 'landing',
  components: {
      Vuetable
  }
}
</script>
<style scoped>

</style>


