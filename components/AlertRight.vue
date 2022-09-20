<template>
    <div class="v-alert-right">
        <v-alert
            v-for="(alert, i) in alerts"
            :key="i"
            :type="alert.type"
            outlined
            border="left"
            class="v-bg-white"
        >
            <v-row>
                <v-col class="grow">
                    {{ alert.message }}
                </v-col>
                <v-col class="shrink">
                    <v-btn
                        small
                        icon
                        plain
                        color="error"
                        @click="closeAlert(i)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState('alerts', {
            alerts: 'alerts',
        }),
    },
    methods: {
        closeAlert(index) {
            this.$store.commit('alerts/close', index)
        },
    },
}
</script>

<style scoped>
.v-bg-white {
    background: white !important;
}
.v-alert-right {
    position: fixed;
    max-width: 500px;
    right: 20px;
    bottom: 10px;
    margin: 0 auto;
    z-index: 9;
}
</style>