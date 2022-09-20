<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideDrawer: false,
    }
  }
}
</script>
