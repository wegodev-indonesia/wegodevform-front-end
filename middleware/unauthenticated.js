export default function ({ store, redirect  }){
    if(store.getters['auth/authenticated']) {
        return redirect('/')
    }

    // bermasalah di kalau baru buka browser
    // if(store.getters['auth/authenticated']) {
    //     return window.$nuxt.$router.push({
    //         name: 'index___' + i18n.locale
    //     })
    // }
}