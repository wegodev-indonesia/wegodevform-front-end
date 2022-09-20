<template>
    <v-toolbar flat height="40px" class="px-2" color="white">
        <v-spacer></v-spacer>
        <v-btn plain :ripple="false" :to="`/questions/${id}`">
            Questions
        </v-btn>
        <v-btn plain :ripple="false" :to="`/responses/lists/${id}`"> Response </v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('forms', ['id']),
    },
}
</script>
