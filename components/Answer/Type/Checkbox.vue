<template>
    <v-radio-group class="mt-0" v-model="answer" :rules="answerRule">
        <v-checkbox
            v-for="(option, key) in items"
            :key="key"
            hide-details
            :rules="answerRule"
            v-model="answer"
            :label="option.value"
            :value="option.value"
            @click="update"
        />
    </v-radio-group>
</template>

<script>
export default {
    props: ['question'],
    data() {
        return {
            items: this.question.options,
            answer: [],
            answerRule: [],
        }
    },
    methods: {
        async update() {
            try {
                console.log(this.answerRule)
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
            this.answerRule.push(
                (v) => v.length > 0 || this.$t('QUESTION_REQUIRED')
            )
        }
    },
}
</script>