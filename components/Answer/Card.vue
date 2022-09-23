<template>
    <v-form v-if="questions.length > 0" ref="form">
        <v-row v-if="answerError">
            <v-col md="8" offset-md="2" sm="10" offset-sm="1" class="pb-0">
                <v-alert dark class="mb-0" color="red">{{ $t('ANSWER_ERROR') }}</v-alert>
            </v-col>
        </v-row>

        <v-row v-for="(question, index) in questions" :key="index">
            <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card>
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col cols="12" sm="8" class="pb-0">
                                <label class="label-question mb-0">{{
                                    question.question
                                }}</label>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <AnswerTypeText
                                    class="mb-4"
                                    v-if="question.type == 'Text'"
                                    :question="question"
                                />
                                <AnswerTypeEmail
                                    class="mb-4"
                                    v-if="question.type == 'Email'"
                                    :question="question"
                                />
                                <AnswerTypeDropdown
                                    class="mb-4"
                                    v-if="question.type == 'Dropdown'"
                                    :question="question"
                                />
                                <AnswerTypeCheckbox
                                    class="mb-4"
                                    v-if="question.type == 'Checkbox'"
                                    :question="question"
                                />
                                <AnswerTypeRadio
                                    class="mb-4"
                                    v-if="question.type == 'Radio'"
                                    :question="question"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col
                md="8"
                offset-md="2"
                sm="10"
                offset-sm="1"
                class="d-flex mb-3"
            >
                <v-btn dark color="primary" @click="onSubmit">Submit</v-btn>
            </v-col>
        </v-row>
    </v-form> 
</template>

<script>
import { mapState } from 'vuex'
export default {
    middleware: ['authenticated'],
    props: ['formId'],
    data() {
        return {
            answerError: false,
        }
    },
    computed: {
        ...mapState('questions', ['questions']),
    },
    methods: {
        async fetch() {
            try {
                const response = await store.dispatch('forms/show', this.formId)

                //get state questions
                if (response.form.questions.length > 0) {
                    store.commit('questions/set', response.form.questions)
                }
            } catch (err) {
                if (err.response) {
                    this.$nuxt.error({
                        statusCode: err.response.status,
                        customMessage: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
            }
        },
        async onSubmit() {
            try {
                if (this.$refs.form.validate()) {
                    await this.$store.dispatch('answers/store', this.formId)

                    //redirect to completed
                    this.$router.push('/answers/completed')
                } else {
                    this.answerError = true
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
            } catch (err) {
                this.$store.commit('alerts/show', {
                    type: 'error',
                    message: err.response
                        ? this.$t(err.response.data.message)
                        : this.$t('SERVER_ERROR'),
                })
            }
        }
    },
}
</script>

<style scoped>
.label-question {
    font-size: 1.3rem;
}
</style>