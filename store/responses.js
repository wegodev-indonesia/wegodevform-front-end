export const state = () => ({
    responses: []
})

export const mutations = {
    reset(state) {
        state.id = null
        state.title = null
        state.description = null
    },
    setResponses(state, payload) {
        state.responses = payload
    }
}

export const actions = {
    async lists({commit}, formId) {
        const response = await this.$axios.$get(`/responses/${formId}/lists`)
        if(!response) { return false }

        commit('setResponses', response)

        return response
    },
    
    async summaries({commit}, formId) {
        const response = await this.$axios.$get(`/responses/${formId}/summaries`)
        if(!response) { return false }

        commit('setResponses', response)

        return response
    }
}