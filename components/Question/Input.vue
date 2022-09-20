<template>
    <v-text-field
        filled
        hide-details
        placeholder="Question"
        class="input-creator"
        v-model="localQuestion"
        @keyup="typing"
    />
</template>

<script>
export default {
    props: ['formId', 'question'],
    data() {
        return {
            timer: null,
            localQuestion: this.question.question,
        }
    },
    methods: {
        async typing() {
            try {
                clearTimeout(this.timer)

                this.timer = setTimeout(async () => {
                    let payload = {
                        formId: this.formId,
                        questionId: this.question.id,
                        form: {
                            question: this.localQuestion,
                        },
                    }

                    //update question
                    await this.$store.dispatch('questions/update', payload)
                }, 1000)
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
}
</script>