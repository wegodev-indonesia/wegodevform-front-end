<template>
    <div class="my-3">
        <v-row v-if="forms.totalDocs > 0">
            <v-col
                cols="12"
                sm="6"
                md="3"
                hover
                v-for="(form, index) in forms.docs"
                :key="index"
            >
                <v-card class="v-card-style" :to="`questions/${form._id}`">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        class="v-card-image"
                    ></v-img>

                    <v-card-title class="overflow">
                        <h5>{{ form.title || '&nbsp;' }}</h5>
                    </v-card-title>

                    <v-card-subtitle class="overflow">
                        {{ form.description || '&nbsp;' }}
                    </v-card-subtitle>

                    <div class="card-options">
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            text
                            plain
                            small
                            class="pr-0"
                            :ripple="false"
                            color="white"
                            @click.prevent="remove(form._id)"
                        >
                            <v-icon left>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-card>
                    <v-card-text>
                        <h3 class="text-center">
                            {{ $t('NO_DATA_YET', { title: 'form' }) }}
                        </h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState('forms', ['forms']),
    },
    methods: {
        async fetch() {
            try {
                const response = await this.$store.dispatch('forms/index')
            } catch (err) {
                if (err.response) {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
            }
        },
        async remove(formId) {
            try {
                await this.$store.dispatch('forms/remove', formId)
            } catch (err) {
                if (err.response) {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
            }
        }
    },
    mounted() {
        this.fetch()
    },
}
</script>

<style scoped>
.overflow {
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.v-card-image {
    height: 200px;
    filter: grayscale(100%);
}

.v-card-style {
    position: relative;
    border: 1px solid transparent;
}

.card-options{
    position: absolute;
    top: 0.5rem;
    right: 0;
    opacity: 0;
}

.v-card-style:hover,
.v-card-style:hover > .v-card-image,
.v-card-style:hover > .card-options {
    opacity: 1;
    border-color: #3f51b5;
    filter: grayscale(30%);
    transition: filter 0.4s ease-in;
}
</style>