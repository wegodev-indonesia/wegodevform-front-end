<template>
    <v-select
        filled
        hide-details
        :items="items"
        class="input-creator"
        v-model="type"
    >
        <template v-slot:item="{ item }">
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
            {{ item.value }}
        </template>
        <template v-slot:selection="{ item }">
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
            {{ item.value }}
        </template>
    </v-select>
</template>

<script>
export default {
    props: ['formId', 'question'],
    data() {
        return {
            type: this.question.type,
            items: [
                { value: 'Text', icon: 'mdi-text-short' },
                {
                    value: 'Dropdown',
                    icon: 'mdi-arrow-down-drop-circle-outline',
                },
                { value: 'Checkbox', icon: 'mdi-check-circle-outline' },
                { value: 'Radio', icon: 'mdi-adjust' },
            ],
        }
    },
    methods: {
        async submit() {
            try {
                let payload = {
                    formId: this.formId,
                    questionId: this.question.id,
                    form: {
                        type: this.type,
                    },
                }

                //update question
                await this.$store.dispatch('questions/update', payload)
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
    watch: {
        type() {
            //called whenever switch changes
            this.submit()
        },
    },
}
</script>