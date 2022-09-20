<template>
    <v-text-field
        name="answer"
        v-model="answer"
        :rules="answerRule"
        placeholder="Jawaban kamu"
        @keyup="typing"
    />
</template>

<script>
export default {
    props: ['question'],
    data() {
        return {
            timer: null,
            answer: null,
            answerRule: [],
        }
    },
    methods: {
        async typing() {
            try {
                clearTimeout(this.timer)

                this.timer = setTimeout(async () => {
                    let payload = {
                        questionId: this.question.id,
                        value: this.answer,
                    }

                    //update question
                    await this.$store.commit('answers/update', payload)
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
    beforeMount() {
        if (this.question.required) {
            this.answerRule.push((v) => !!v || this.$t('QUESTION_REQUIRED'))
        }
    },
}
</script>
