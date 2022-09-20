export const state = () => ({
    alerts: [
        // {
        //     type: null,
        //     message: null,
        //     status: false,
        // }
    ]

})

export const mutations = {
    reset(state) {
        //remove all alerts
        state.alerts = []
    },
    show(state, payload) {
        payload.status = true //show alert
        state.alerts.push(payload)
    },
    close(state, index) {
        //remove alert by index
        state.alerts.splice(index, 1)
    }
}