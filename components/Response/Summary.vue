<template>
    <div>
        <v-row :key="index" v-for="(summary, index) in responses.summaries">
            <v-col md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card class="cards-questions card-border-left">
                    <v-card-text background="white" class="pb-0">
                        <v-row>
                            <v-col cols="12">
                                <h3>{{ summary.question }}</h3>
                            </v-col>
                        </v-row>

                        <v-row class="mt-0">
                            <v-col cols="12">
                                <GChart
                                    v-if="summary.type == 'Text' || summary.type == 'Email'"
                                    type="ColumnChart"
                                    :data="group(summary.answers)"
                                />
                                <GChart
                                    v-else-if="summary.type == 'Radio'"
                                    type="PieChart"
                                    :data="group(summary.answers)"
                                />
                                <GChart
                                    v-else-if="summary.type == 'Dropdown'"
                                    type="BarChart"
                                    :data="group(summary.answers)"
                                />
                                <GChart
                                    v-else-if="summary.type == 'Checkbox'"
                                    type="BarChart"
                                    :data="groupCheckbox(summary.answers)"
                                />
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
import { GChart } from 'vue-google-charts/legacy'

export default {
    middleware: ['authenticated'],
    components: {
        GChart
    },
    props: ['formId'],
    data() {
        return {
            chartData: [
                ['', '']
            ],
            chartOptions: {}
        }
    },
    computed: {
        ...mapState('responses', ['responses']),
    },
    methods: {
        group(answers) {
            let gChart = []
            let groupingByValue =  answers.reduce((acc, answer) => {
                //skip empty answers
                if(answer == null || answer == '') {
                    return acc
                }

                if (acc[answer]) {
                    acc[answer]++
                } else {
                    acc[answer] = 1
                }

                return acc
            }, {})
            
            //create ['value', 'total']
            var result = Object.keys(groupingByValue).map((key) => [key, groupingByValue[key]]);

            gChart.push(['', '']) // label google chart
            gChart.push(...result) // data google chart
            
            return gChart
        },
        groupCheckbox(answers) {
            let gChart = []
            let groupingByValue =  answers.flat().reduce((acc, answer) => {
                 //skip empty answers
                if(answer == null || answer == '') {
                    return acc
                }

                if (acc[answer]) {
                    acc[answer]++
                } else {
                    acc[answer] = 1
                }

                return acc
            }, {})
            
            //create ['value', 'total']
            var result = Object.keys(groupingByValue).map((key) => [key, groupingByValue[key]]);

            gChart.push(['', '']) // label google chart
            gChart.push(...result) // data google chart
            
            return gChart
        }
    }
}
</script>