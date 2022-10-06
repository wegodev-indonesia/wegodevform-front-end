<template>
    <div>
        <v-form ref="formInvite" onSubmit="return false">
            <v-text-field
                filled
                placeholder="To: email"
                class="input-creator"
                :rules="rules"
                :error-messages="errorMessages"
                v-model="email"
                :loading="saving"
                @blur="resetErrorMessage"
                @keydown.enter="addEmail"
            />
        </v-form>
        <div>
            <v-progress-circular
                v-if="fetching"
                indeterminate
                color="primary"
            ></v-progress-circular>
            <div v-else>
                <v-chip
                    v-for="(email, index) in invites" 
                    :key="index"
                    :close="email != removeLoading"
                    color="primary"
                    class="mr-1 mb-1"
                    outlined
                    small
                    @click:close="removeEmail(email)"
                    >
                        {{ email }}
                        <v-progress-circular
                            size="10"
                            width="1"
                            class="ml-1"
                            indeterminate
                            color="primary"
                            v-if="email == removeLoading"
                        ></v-progress-circular>
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['formId'],
    data() {
        return {
            email: null,
            saving: false,
            fetching: true,
            removeLoading: null,
            errorMessages: null,
            rules: [
                (v) => /.+@.+/.test(v) || this.$t('EMAIL_INVALID')
            ]
        }
    },
    methods: {
        async fetch() {
            try {
                await this.$store.dispatch('invites/index', this.formId)
                this.fetching = false
            } catch (err) {
                if (err.response) {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
                this.fetching = false
            }
        },
        resetErrorMessage() {
            this.errorMessages = null
            this.$refs.formInvite.resetValidation()
        },
        async addEmail() {
            try {
                if (this.$refs.formInvite.validate()) {
                    this.saving = true

                    //add email to invites
                    let payload = {
                        formId: this.formId,
                        email: this.email
                    }
                    await this.$store.dispatch('invites/store', payload)

                    this.saving = false
                    this.email = null //reset email
                    this.resetErrorMessage()
                }
            } catch (err) {
                if (err.response) {
                    this.errorMessages = this.$i18n.t(err.response.data.message)
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
                this.saving = false
            }
        },
        async removeEmail(email) {
            try {
                this.removeLoading = email

                //add email to invites
                let payload = {
                    formId: this.formId,
                    email: email
                }
                await this.$store.dispatch('invites/remove', payload)
            } catch (err) {
                if (err.response) {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
                this.removeLoading = null
            }
            
        },
    },
    computed: {
        ...mapState('invites', ['invites']),
    },
    mounted() {
        this.fetch()
    },
}
</script>

<style scoped>
    .list-invited{
        min-height: 0 !important;
    }
</style>