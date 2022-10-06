<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn dark class="mr-2" color="primary" v-on="on">Send </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Share Form</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <p class="text-h6 mb-2"><strong>Invite</strong></p>
                        <Invite :formId="id" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <p class="text-h6 mb-2"><strong>Link</strong></p>
                        <v-text-field
                            name="title"
                            class="mt-0 pt-0 text-small"
                            ref="copyUrl"
                            :value="`${this.$config.baseUrl}/answers/${id}`"
                            placeholder="Share Link"
                            readonly
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <SwitchVisibility :formId="id" />
                <v-spacer></v-spacer>
                <v-btn text color="blue darken-1" @click="dialog = false"
                    >Close
                </v-btn>
                <v-btn dark outlined color="green darken-1" @click="copyUrl"
                    >{{ labelCopy }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            dialog: false,
            labelCopy: 'Copy',
        }
    },
    methods: {
        copyUrl() {
            let textToCopy = this.$refs.copyUrl.$el.querySelector('input')
            this.labelCopy = "Copied !"
            textToCopy.select()
            document.execCommand('copy')
        },
    },
    computed: {
        ...mapState('forms', ['id']),
    },
}
</script>