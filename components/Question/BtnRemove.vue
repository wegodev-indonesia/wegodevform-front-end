<template>
    <v-btn
        icon
        plain
        :ripple="false"
        class="mr-0"
        @click="remove"
        :loading="isDisable"
        :disabled="isDisable"
    >
        <v-icon v-if="!isDisable"> mdi-trash-can </v-icon>
    </v-btn>
</template>

<script>
// import { mapActions, mapMutations } from 'vuex'

export default {
    middleware: ['authenticated'],
    props: ['formId', 'questionId'],
    data() {
        return {
            isDisable: false,
            form: {
                questions: '',
                type: 'Text',
                required: false,
            },
        }
    },
    methods: {
        async remove() {
            try {
                this.isDisable = true

                let params = {
                    formId: this.formId,
                    questionId: this.questionId,
                }
                const question = await this.$store.dispatch(
                    'questions/remove',
                    params
                )

                this.isDisable = false
            } catch (err) {
                this.isDisable = false
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