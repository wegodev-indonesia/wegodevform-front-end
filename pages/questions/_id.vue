<template>
    <v-container fluid class="pa-0" v-if="formId">
        <Toolbar class="mb-5" />
        <v-container>
            <v-row>
                <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                    <v-card class="card-border-top">
                        <v-card-text>
                            <QuestionTitle class="text-h5 creator-input" />
                            <QuestionDescription class="creator-input" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- cardQuestions -->
            <QuestionCard :formId="formId" />

            <v-row>
                <v-col
                    color="white"
                    md="8"
                    offset-md="2"
                    sm="10"
                    offset-sm="1"
                    class="d-flex mb-3"
                >
                    <v-spacer></v-spacer>
                    <QuestionBtnAdd :formId="formId" />
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    middleware: ['authenticated'],
    async asyncData({ params, redirect }) {
        try {
            if (!params.id) {
                throw { message: 'FORM_ID_EMPTY' }
            }

            return { formId: params.id }
        } catch (err) {
            if (err.message == 'FORM_ID_EMPTY') {
                redirect('/404')
                return false
            }
        }
    },
    head () {
        return {
            title: this.$store.state.forms.title,
        }
    },
    data() {
        return {}
    },
    methods: {
        async fetch() {
            try {
                const response = await this.$store.dispatch(
                    'forms/show',
                    this.formId
                )

                //check question owner
                if (response.form.userId !== this.$store.getters['auth/user'].id) {
                    this.$nuxt.error({
                        statusCode: 404,
                        customMessage: this.$i18n.t('ID_NOT_FOUND'),
                    })
                }

                /* 
                    Get Questions
                    kalau cara yang standard, fetch di dalam QuestionCard, tapi karena disini sudah dapat response form,
                    ngapain fetch lagi di QuestionCard, mending langsung di set state questions aja disini
                    hemat request ke BE server
                */
                if (response.form.questions.length > 0) {
                    this.$store.commit('questions/set', response.form.questions)
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
        }
    },
    beforeMount() {
        this.$store.commit('menus/show')
        this.$store.commit('alerts/reset')
        this.$store.commit('forms/reset')
        this.$store.commit('saves/reset')
        this.$store.commit('questions/reset')
    },
    beforeDestroy() {
        this.$store.commit('menus/hide')
    },
    mounted() {
        this.fetch()
    },
}
</script>