<template>
    <v-toolbar flat class="px-md-2 px-1 align-center" color="white">
        <v-btn text plain :ripple="false" class="pl-0 v-btn--active" to="/">
            <p class="text-h5 mb-0"><strong>wegodev</strong>form</p>
        </v-btn>
        <p class="ml-3 mb-0 muted save-info" v-if="process">
            {{ $t(message) }}
        </p>
        <v-spacer></v-spacer>
        <HeaderSend v-if="isShowMenu" />

        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    text
                    plain
                    :ripple="false"
                    class="v-btn--active"
                    v-on="on"
                >
                    <v-icon color="purple" large>mdi-account-circle </v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :to="item.link"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isQuestionPage: false,
            items: [
                {
                    title: 'Logout',
                    link: '/logout',
                },
            ],
        }
    },
    computed: {
        ...mapState('saves', ['process', 'message']),
        ...mapState('menus', ['isShowMenu']),
    },
}
</script>

<style scoped>
.save-info {
    font-size: 0.8rem;
}
</style>