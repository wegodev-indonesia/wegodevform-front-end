<template>
    <v-container v-if="id">
        <v-row>
            <v-col color="white" md="8" offset-md="2" sm="10" offset-sm="1">
                <v-card class="mb-3 card-border-top">
                    <v-card-text>
                        <h1 class="mb-3 mt-2" color="black">{{ title }}</h1>
                        <p>Response kamu sudah tersimpan.</p>

                        <v-btn
                            plain
                            text
                            :ripple="false"
                            class="pl-0"
                            color="primary"
                            :to="`/answers/${id}`"
                        >
                            Submit response lainnya
                        </v-btn>
                    </v-card-text>
                </v-card>
                <p class="text-center text-mute">
                    <small
                        >Content ini dibuat menggunakan
                        <strong>wegodevform</strong>.</small
                    >
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    middleware: ['authenticated'],
    head () {
        return {
            title: this.$store.state.forms.title,
        }
    },
    computed: {
        ...mapState('forms', ['id', 'title', 'description']),
    },
    mounted() {
        if (!this.id) {
            this.$router.push('/')
        }
    },
}
</script>