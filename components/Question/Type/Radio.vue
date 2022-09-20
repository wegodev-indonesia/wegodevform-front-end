<template>
    <v-radio-group class="mt-0">
        <div
            v-for="(option, key) in options"
            :key="key"
            class="d-flex align-center"
        >
            <v-radio :disabled="true" class="mb-1" />

            <v-text-field
                text-field-border-radius="0"
                placeholder="Option"
                :value="option.value"
                :id="`inputActive${key}${option.id}`"
                class="creator-input"
                @input="typing($event, option.id)"
            />

            <v-btn icon class="ml-auto" @click="remove(options[key]['id'])">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <!-- Add option -->
        <div class="d-flex align-center">
            <v-radio :disabled="true" class="mb-1" />
            <v-text-field
                @click="add"
                @input="add"
                v-model="addOption"
                placeholder="Add option"
                style="max-width: 70%"
            />
        </div>
    </v-radio-group>
</template>

<script>
export default {
    props: ['formId', 'question'],
    data() {
        return {
            timer: null,
            addOption: null,
        }
    },
    methods: {
        focusInput(optionId) {
            let inputActiveId = this.options.length - 1 + optionId
            if (document.getElementById(`inputActive${inputActiveId}`)) {
                let target = document.getElementById(
                    `inputActive${inputActiveId}`
                )
                target.focus()
                target.select()
            }
        },
        async add() {
            let payload = {
                formId: this.formId,
                questionId: this.question.id,
                form: {
                    options: `New Option`,
                },
            }

            let options = await this.$store.dispatch(
                'questions/addOptions',
                payload
            )

            //reset field new option
            this.addOption = null

            //focus to new input
            this.focusInput(options.option.id)
        },
        async typing(value, optionId) {
            try {
                // alert(optionId)
                clearTimeout(this.timer)

                this.timer = setTimeout(async () => {
                    let payload = {
                        formId: this.formId,
                        questionId: this.question.id,
                        optionId: optionId,
                        form: {
                            options: value,
                        },
                    }

                    //update question options
                    await this.$store.dispatch(
                        'questions/updateOptions',
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
        async remove(id) {
            try {
                let payload = {
                    formId: this.formId,
                    questionId: this.question.id,
                    optionId: id,
                }

                //update question options
                await this.$store.dispatch('questions/removeOptions', payload)

                //clear input
                // this.option.value = ''
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
        options() {
            return this.question.options
        },
    },
}
</script>