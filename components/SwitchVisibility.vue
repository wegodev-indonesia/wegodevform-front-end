<template>
    <div class="d-flex align-center">
        <v-switch hide-details class="mt-0" v-model="localPublic" @change="changeVisibility" :loading="loading" />
        <label class="ml-3">
            <small v-if="localPublic">Semua yang punya link bisa response</small>
            <small v-else>Hanya yang di invite yang bisa response</small>
        </label>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['formId'],
    data() {
        return {
            loading: false,
            localPublic: false
        }
    },
    methods: {
        async changeVisibility() {
             try {
                this.loading = true
                let payload = {
                    formId: this.formId,
                    public: this.localPublic,
                }

                const forms = await this.$store.dispatch(
                    'forms/update',
                    payload
                )
                
                this.loading = false
            } catch (err) {
                this.$store.commit('alerts/show', {
                    type: 'error',
                    message: err.response
                        ? this.$t(err.response.data.message)
                        : this.$t('SERVER_ERROR'),
                })

                this.loading = false
            }
        }
    },
    computed: {
        ...mapState('forms', {
            public: 'public'
        })
    },
    mounted() {
        this.localPublic = this.public
    }
}
</script>