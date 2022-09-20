<template>
    <div>
        <v-row :key="index" v-for="(summary, index) in responses.summaries">
            <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card class="cards-questions card-border-left">
                    <v-card-text background="white" class="pb-0">
                        <v-row>
                            <v-col cols="12">
                                {{ summary.question }}
                            </v-col>
                        </v-row>

                        <v-row class="mt-0">
                            <v-col cols="12">
                                {{ group(summary.answers) }}
                            </v-col>
                        </v-row>
                    </v-card-text>
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
        ...mapState('responses', ['responses']),
    },
    methods: {
        group(answers) {
            return answers.reduce((acc, answer) => {                
                if (acc[answer]) {
                    acc[answer]++
                } else {
                    acc[answer] = 1
                }

                return acc
            }, {})
        }
    }
}
</script>