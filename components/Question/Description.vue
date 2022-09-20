<template>
    <v-text-field
        hide-details
        placeholder="Description"
        :value="description"
        @input="typing($event)"
    />
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            timer: null,
        }
    },
    methods: {
        async typing(value) {
            try {
                clearTimeout(this.timer)

                this.timer = setTimeout(async () => {
                    let payload = {
                        formId: this.id,
                        description: value,
                    }

                    const forms = await this.$store.dispatch(
                        'forms/update',
                        payload
                    )
                }, 1000)
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
    computed: {
        ...mapState('forms', ['id', 'description']),
    },
}
</script>