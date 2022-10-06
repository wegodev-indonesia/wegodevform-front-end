export const state = () => ({
    email: null,
    invites: []
})

export const mutations = {
    reset(state) {
        state.email = null
        state.invites = []
    },
    setInvites(state, invites) {
        state.invites = invites
    },
    addInvite(state, email) {
        state.invites.push(email)
    },
    cancelInvitation(state, email) {
        state.invites = state.invites.filter(invited => invited !== email)
    }
}

export const actions = {
    async index({commit}, formId) {
        const response = await this.$axios.$get(`/forms/${formId}/invites`)
        if(!response) { return false }

        commit('setInvites', response.invites)

        return response
    },
    async store({commit}, payload) {
        const response = await this.$axios.$post(`/forms/${payload.formId}/invites`, { 'email': payload.email })
        if(!response) { return false }
        
        commit('addInvite', payload.email)

        return response
    },
    async remove({commit}, payload) {
        let config = {
            data: {
                'email': payload.email
            }
        }
        const response = await this.$axios.$delete(`/forms/${payload.formId}/invites`, config)
        console.log(response)
        if(!response) { return false }

        commit('cancelInvitation', response.email)

        return response
    }
}