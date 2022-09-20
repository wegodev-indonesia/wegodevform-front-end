<template>
  <v-app dark>
    <v-container class="mt-5">
      <v-row>
        <v-col class="text-center">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>

          <div class="mt-3">
            <NuxtLink to="/">
              Home page
            </NuxtLink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: this.error.customMessage || this.$t('404_NOT_FOUND'),
      otherError: this.error.customMessage || this.$t('SERVER_ERROR')
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
