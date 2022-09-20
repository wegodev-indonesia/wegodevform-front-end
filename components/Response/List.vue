<template>
    <v-row>
        <v-col md="8" offset-md="2" sm="10" offset-sm="1">
            <v-card class="cards-questions card-border-left">
                <v-card-text background="white">
                    <v-row class="mt-0">
                        <v-col cols="12">
                            <v-data-table
                                :headers="headers"
                                :items="items"
                                :items-per-page="10"
                                class="elevation-1"
                            ></v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
    middleware: ['authenticated'],
    props: ['formId'],
    data() {
        return {
            headers: [],
            items: []
        }
    },
    computed: {
        ...mapState('responses', ['responses']),
    },
    methods: {
        setHeaders(){
            this.headers = this.responses.form.questions.map((question) => {
                return {
                    text: question.question,
                    value: question.id,
                    sortable: false,
                }
            })
        },
        setItems(){
            this.items = this.responses.answers
        }
    },
    mounted() {
        this.setHeaders()
        this.setItems()
    }
}
</script>