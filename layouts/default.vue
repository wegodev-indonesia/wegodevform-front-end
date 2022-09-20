<template>
  <v-app>
    <v-main>
      <AlertRight />
      <TheHeader />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      sideDrawer: false,
    }
  }
}
</script>
