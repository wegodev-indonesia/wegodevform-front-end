<template>
    <div>
        <v-row
            :key="index"
            v-for="(question, index) in questions"
            @click="active(index)"
        >
            <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card
                    class="cards-questions card-border-left"
                    :id="`card-${index}`"
                >
                    <v-card-text background="white" class="pb-0">
                        <v-row>
                            <v-col cols="12" sm="8">
                                <QuestionInput
                                    :formId="formId"
                                    :question="question"
                                />
                            </v-col>
                            <v-col cols="12" sm="4">
                                <QuestionSelectType
                                    :formId="formId"
                                    :question="question"
                                />
                            </v-col>
                        </v-row>

                        <v-row class="mt-0">
                            <v-col cols="12">
                                <QuestionTypeText
                                    class="mb-4"
                                    v-if="question.type == 'Text'"
                                />
                                <QuestionTypeRadio
                                    v-else-if="question.type == 'Radio'"
                                    :formId="formId"
                                    :question="question"
                                />
                                <QuestionTypeCheckbox
                                    v-else-if="question.type == 'Checkbox'"
                                    :formId="formId"
                                    :question="question"
                                />
                                <QuestionTypeDropdown
                                    v-else-if="question.type == 'Dropdown'"
                                    :formId="formId"
                                    :question="question"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider class="mb-0 mx-4"></v-divider>

                    <v-card-actions class="py-3">
                        <v-spacer></v-spacer>

                        <QuestionBtnRemove
                            :formId="formId"
                            :questionId="question.id"
                        />

                        <v-divider vertical class="mx-3"></v-divider>

                        <label for="required" class="mr-3">Required</label>
                        <QuestionSwitchRequired
                            :formId="formId"
                            :question="question"
                        />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    middleware: ['authenticated'],
    props: ['formId'],
    data() {
        return {}
    },
    computed: {
        ...mapState('questions', ['questions']),
    },
    methods: {
        active(index) {
            let clickedElement = document.getElementById(`card-${index}`)

            if (clickedElement.classList.contains('active')) {
                //to make sure that the card is not already active
                return true
            }

            let active = document.getElementsByClassName(
                'cards-questions active'
            )[0]

            if (active) {
                //remove before active
                active.classList.remove('active')
            }

            //new active
            clickedElement.classList.add('active')
        },
    },
}
</script>