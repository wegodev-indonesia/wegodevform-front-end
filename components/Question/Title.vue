<template>
    <v-text-field
        hide-details
        placeholder="Title"
        :value="title"
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
    computed: {
        ...mapState('forms', ['id', 'title']),
    },
    methods: {
        async typing(value) {
            try {
                clearTimeout(this.timer)

                this.timer = setTimeout(async () => {
                    let payload = {
                        formId: this.id,
                        title: value,
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
}
</script>