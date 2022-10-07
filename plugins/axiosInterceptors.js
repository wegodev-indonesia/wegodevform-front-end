export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        //autosaved
        if(config.headers['Autosave']){
            store.commit('saves/start')
        }

        if(store.state.auth.accessToken) {
            const accessToken = store.state.auth.accessToken 
            config.headers['Authorization'] = 'Bearer ' + accessToken
        }
    })

    $axios.onResponse(response => {
        //autosaved
        setTimeout( async () => {
            if(response.config.headers['Autosave']){
                store.commit('saves/success') //save success
            }
            
        }, 1000)
    })

    $axios.onResponseError(error => {
        //autosaved
        if(error.config.headers['Autosave']){
            store.commit('saves/failed') //save success
        }

        //access token expired
        if(error.response.status == 401 && error.response.data.message == 'TOKEN_EXPIRED') {
            if(store.state.auth.refreshToken){
                //request new token by refreshToken
                let refreshToken = store.state.auth.refreshToken 
                return $axios.$post("auth/refresh-token", {'refreshToken': refreshToken})
                            .then(response => { 
                                const originalRequest = error.config;

                                store.commit('auth/setAccessToken', response.accessToken)
                                store.commit('auth/setRefreshToken', response.refreshToken)        
                            
                                //change Authorization
                                originalRequest.headers['Authorization'] = 'Bearer ' + response.accessToken      
                                
                                return $axios(originalRequest);
                            })
                            .catch(error => {
                                if(error.response.data.message == 'REFRESH_TOKEN_EXPIRED' 
                                    || error.response.data.message == 'REFRESH_TOKEN_INVALID'){
                                        store.commit('auth/logout')
                                        return redirect('/login')    
                                }
                            })
            }
        }
    })
}