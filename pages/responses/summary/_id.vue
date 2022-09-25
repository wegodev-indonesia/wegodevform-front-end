<template>
    <v-container fluid class="pa-0" v-if="formId">
        <Toolbar class="mb-5" />

        <v-container fluid>
            <v-row>
                <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                    <v-card class="card-border-top">
                        <v-card-text>
                            <h2 class="mb-3 mt-2" color="black">{{ responses.total }} responses</h2>
                        </v-card-text>
                        
                        <ToolbarResponse />
                    </v-card>
                </v-col>
            </v-row>

            <!-- summary -->
            <ResponseSummary class="mb-3" />
        </v-container>
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

            //keep formId
            await store.commit('forms/setState', { _id: params.id })

            //summary
            await store.dispatch('responses/summaries', params.id)

            return { formId: params.id }
        } catch (err) {
            if (err.message == 'FORM_ID_EMPTY') {
                redirect('/404')
                return false
            }

            if (err.response) {
                if (err.response.data.message) {
                    error({
                        statusCode: err.response.status,
                        customMessage: i18n.t(err.response.data.message),
                    })
                }
            } else {
                store.commit('alerts/show', {
                    type: 'error',
                    message: i18n.t('SERVER_ERROR'),
                })
            }

            return { formId: params.id }
        }
    },
    head () {
        return {
            title: this.$store.state.forms.title,
        }
    },
    computed: {
        ...mapState('forms', ['id']),
        ...mapState('responses', ['responses'])
    }
}
</script>