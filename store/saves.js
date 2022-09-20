export const state = () => ({
    process: false,
    message: null,
})

export const mutations = {
    reset(state) {
        state.process = false
        state.message = null
    },
    start(state) {
        state.process = true
        state.message = 'SAVE_PROCESS'
    },
    success(state) {
        state.message = 'SAVE_SUCCESS'
    },
    failed(state) {
        state.message = 'SAVE_FAILED'
    }
}