<template>
    <div>
        <v-radio-group v-model="answer" @change="update" :rules="answerRule">
            <v-radio
                solo
                v-for="(option, key) in items"
                :key="key"
                :label="option.value"
                :value="option.value"
            >
            </v-radio>
        </v-radio-group>
    </div>
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