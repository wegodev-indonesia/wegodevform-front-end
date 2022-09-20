<template>
    <v-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        @click="createNewForm"
    >
        New form
        <v-icon right>mdi-plus</v-icon>
    </v-btn>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async createNewForm() {
            try {
                this.loading = true
                const form = await this.$store.dispatch('forms/store')
                const question = await this.$store.dispatch(
                    'questions/store',
                    form.form._id
                )

                setTimeout(async () => {
                    this.loading = false
                    this.$router.push({
                        path: `/questions/${form.form._id}`,
                    })
                }, 1000)
            } catch (err) {
                this.loading = false
                this.$store.commit('alerts/show', {
                    type: 'error',
                    message: err.response
                        ? this.$t(err.response.data.message)
                        : this.$t('SERVER_ERROR'),
                })
            }
        },
    },
}
</script>