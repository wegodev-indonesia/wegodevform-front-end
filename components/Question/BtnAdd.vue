<template>
    <v-btn
        color="primary"
        @click="addQuestion"
        :disabled="isDisable"
        :loading="isDisable"
    >
        New question
        <v-icon right>mdi-plus </v-icon>
    </v-btn>
</template>

<script>
export default {
    props: ['formId'],
    data() {
        return {
            isDisable: false,
        }
    },
    methods: {
        async addQuestion() {
            try {
                //disable button
                this.isDisable = true

                //store new question
                const question = await this.$store.dispatch(
                    'questions/store',
                    this.formId
                )

                //enable button
                this.isDisable = false
            } catch (err) {
                //enable button
                this.isDisable = false

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