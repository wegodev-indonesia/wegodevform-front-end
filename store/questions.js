const config = {
    headers : {
        Autosave: 'true',
    }
}

export const state = () => ({
    questions: []
})


export const mutations = {
    reset(state) {
        state.questions = []
    },
    set(state, questions) {
        state.questions = questions
    },
    add(state, question) {
        state.questions.push(question)
    },
    remove(state, questionId) {
        state.questions = state.questions.filter(question => question.id !== questionId)
    },
    update(state, payload) {
        state.questions = state.questions.map(question => {
            if(question.id === payload.questionId){
                if(payload.form.hasOwnProperty('question')){
                    question.question = payload.form.question
                } else if( payload.form.hasOwnProperty('required') ){
                    question.required = payload.form.required
                } else if( payload.form.hasOwnProperty('type') ){
                    question.type = payload.form.type
                } else if( payload.form.hasOwnProperty('options') ){
                    question.options = payload.form.options
                }
            }
            return question
        })
    },
    addOptions(state, payload) {
        state.questions = state.questions.map(question => {
            if(question.id === payload.questionId){
                question.options.push(payload.option)
            }
            return question
        })
    },
    updateOptions(state, payload) {
        state.questions = state.questions.map(question => {
            if(question.id === payload.questionId){
                question.options = question.options.map(option => {
                    if(option.id === payload.optionId){
                        option.value = payload.form.options
                    }
                    return option
                })
            }
            return question
        })
    },
    removeOptions(state, payload) {
        state.questions = state.questions.map(
            question => ({ ...question, options: question.options.filter(option => option.id !== payload.optionId) })
        )
    }
}

export const actions = {
    async update({commit}, payload) {
        let response = this.$axios.put(`forms/${payload.formId}/questions/${payload.questionId}`, payload.form, config)
        if(!response) { return false }

        commit('update', payload)
        
        return response
    },
    async store({commit}, id) {
        let response =  await this.$axios.$post(`forms/${id}/questions`, {}, config)
        if(!response) { return false }

        commit('add', response.question)

        return response
    },
    async remove({commit}, payload) { 
        const response = await this.$axios.$delete(`forms/${payload.formId}/questions/${payload.questionId}`, config)
        if(!response) { return false }

        commit('remove', payload.questionId)

        return response
    },
    async addOptions({commit}, payload) {
        let response = await this.$axios.$post(`forms/${payload.formId}/questions/${payload.questionId}/options`, 
                                                payload.form, 
                                                config)
        if(!response) { return false }

        let newPayload = { ...payload, ...response }
        commit('addOptions', newPayload)
        
        return response
    },
    async updateOptions({commit}, payload) {
        let response = await this.$axios.$put(`forms/${payload.formId}/questions/${payload.questionId}/options/${payload.optionId}`, 
                                                payload.form, 
                                                config)
        if(!response) { return false }

        commit('updateOptions', payload)
        
        return response
    },
    async removeOptions({commit}, payload) {        
        let response = await this.$axios.$delete(`forms/${payload.formId}/questions/${payload.questionId}/options/${payload.optionId}`, config)
        if(!response) { return false }

        commit('removeOptions', payload)
        
        return response
    },
}