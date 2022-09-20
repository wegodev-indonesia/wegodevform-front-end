<template>
    <v-select
        solo
        class="mt-4"
        :rules="answerRule"
        :items="items"
        v-model="answer"
        item-text="value"
        item-value="value"
        label="Pilihan"
        @change="update"
    >
    </v-select>
</template>

<script>
export default {
    props: ['question'],
    data() {
        return {
            items: this.question.options,
            answer: null,
            answerRule: [],
        }
    },
    methods: {
        async update() {
            try {
                let payload = {
                    questionId: this.question.id,
                    value: this.answer,
                }

                //update question options
                await this.$store.commit('answers/update', payload)
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