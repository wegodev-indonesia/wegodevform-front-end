export const state = () => ({
    isShowMenu: false
})

export const mutations = {
    hide(state) {
        state.isShowMenu = false
    },
    show(state) {
        state.isShowMenu = true
    },
}
