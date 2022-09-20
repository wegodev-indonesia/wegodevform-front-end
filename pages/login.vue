<template>
    <v-row>
        <v-col cols="10" offset="1" md="4" offset-md="4">
            <v-card class="mb-2">
                <v-toolbar color="primary" dark>Login</v-toolbar>
                <v-card-text>
                    <v-alert v-if="isError" color="red lighten-2" dark>
                        {{ $t(message) }}
                    </v-alert>

                    <v-form>
                        <v-text-field
                            name="email"
                            label="Email"
                            type="email"
                            v-model="form.email"
                        />
                        <v-text-field
                            name="password"
                            label="Password"
                            type="password"
                            v-model="form.password"
                            @keydown.enter="onSubmit"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :loading="isDisable"
                        color="primary"
                        @click="onSubmit"
                    >
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
            <div>
                <p class="d-flex align-baseline">
                    Kamu sudah punya akun ?
                    <v-btn
                        to="/register"
                        class="pl-2 btn-no-height btn-auth"
                        plain
                        text
                        :ripple="false"
                        >Register</v-btn
                    >
                </p>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    layout: 'auth',
    middleware: ['unauthenticated'],
    data() {
        return {
            isDisable: false,
            isError: false,
            message: '',
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async onSubmit() {
            try {
                this.isDisable = true

                const auth = await this.$store.dispatch('auth/login', this.form)

                this.isDisable = false

                this.$router.push('/')
            } catch (err) {
                this.isError = true
                this.isDisable = false

                this.message = err.response
                    ? err.response.data.message
                    : 'SERVER_ERROR'
            }
        },
    },
    mounted() {
        if (this.$route.params.message == 'AUTH_REQUIRED') {
            this.message = this.$route.params.message
            this.isError = true
        }
    },
}
</script>