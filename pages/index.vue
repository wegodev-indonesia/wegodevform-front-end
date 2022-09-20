<template>
    <v-container class="mt-3">
        <v-row>
            <v-col cols="12" class="text-right">
                <BtnCreateNewForm />
            </v-col>
        </v-row>
        
        <Forms />
    </v-container>
</template>

<script>
export default {
    middleware: ['authenticated'],
    head () {
        return {
            title: 'Home',
        }
    },
    beforeMount() {
        this.$store.commit('alerts/reset')
        this.$store.commit('saves/reset')
    },
}
</script>