const config = {
    headers : {
        Autosave: 'true',
    }
}

export const state = () => ({
    forms: [],
    id: null,
    title: null,
    description: null
})

export const mutations = {
    reset(state) {
        state.id = null
        state.title = null
        state.description = null
    },
    setForms(state, forms) {
        state.forms = forms
    },
    setState(state, form) {
        if(form._id){ state.id = form._id }
        if(form.title){ state.title = form.title }
        if(form.description){ state.description = form.description }
    },
    remove(state, formId) {
        state.forms.docs = state.forms.docs.filter(form => form._id !== formId)
    }
}

export const actions = {
    async index({commit}) {
        const response = await this.$axios.$get(`/forms`)
        if(!response) { return false }

        commit('setForms', response.forms)

        return response
    },
    async show({commit}, id) {
        const response = await this.$axios.$get(`/forms/${id}`)
        if(!response) { return false }

        commit('setState', response.form)

        return response
    },
    async store() {
        const response = await this.$axios.$post(`/forms`)
        if(!response) { return false }
        
        return response
    },
    async update({}, payload) {
        //update title & description
        const response = await this.$axios.$put(`/forms/${payload.formId}`, payload, config)
        if(!response) { return false }

        return response
    },
    async remove({commit}, formId) {
        //update title & description
        const response = await this.$axios.$delete(`/forms/${formId}`, config)
        if(!response) { return false }

        commit('remove', formId)

        return response
    }
}