<template>
    <v-container fluid class="mt-4 pa-0" v-if="formId">
        <v-row>
            <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card>
                    <v-card-text>
                        <h1 class="mb-3 mt-2" color="black">{{ title }}</h1>
                        <p class="mb-1">{{ description }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <AnswerCard :formId="formId" />
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    middleware: ['authenticated'],
    async asyncData({ params, store, redirect, error, i18n }) {
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
    computed: {
        ...mapState('forms', ['id', 'title', 'description']),
    },
    methods: {
        async fetch() {
            try {
                const response = await this.$store.dispatch('forms/show', this.formId)

                //check question owner
                if (response.form.userId !== this.$store.getters['auth/user'].id) {
                    throw { message: 'FORM_ID_EMPTY' }
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
                console.log(err.response)
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
        this.$store.commit('answers/reset')
    },
    mounted() {
        this.fetch()
    }
}
</script>