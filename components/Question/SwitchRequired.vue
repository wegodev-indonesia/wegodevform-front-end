<template>
    <v-switch hide-details class="mt-0" v-model="required" />
</template>

<script>
export default {
    props: ['formId', 'question'],
    data() {
        return {
            required: this.question.required,
        }
    },
    methods: {
        async submit() {
            try {
                let payload = {
                    formId: this.formId,
                    questionId: this.question.id,
                    form: {
                        required: this.required,
                    },
                }

                //update question
                await this.$store.dispatch('questions/update', payload)
            } catch (err) {
                this.$store.commit('alerts/show', {
                    type: 'error',
                    message: err.response
                        ? this.$t(err.response.data.message)
                        : this.$t('SERVER_ERROR'),
                })
            }
        },
    },
    watch: {
        required(newValue) {
            //called whenever switch changes
            this.submit()
        },
    },
}
</script>