export default function ({ store, redirect  }){
    if(!store.getters['auth/authenticated']) {
        return redirect('/login')

        // bermasalah di kalau baru buka browser
        // return window.$nuxt.$router.push({
        //     name: 'login___' + i18n.locale,
        //     params: { message: 'AUTH_REQUIRED' }
        // })
    }
}