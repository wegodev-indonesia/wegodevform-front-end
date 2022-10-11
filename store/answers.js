const config = {
    headers : {
        Autosave: 'true',
    }
}

export const state = () => ({
    answers: [
        // {
            // questionId : questionId
            // value: answer / optionsValue
        // }
    ],
})

export const mutations = {
    reset(state) {
        state.answers = []
    },
    update(state, payload) {
        //update every answer user made
        //check if questionId exist
        const index = state.answers.findIndex(answer => answer.questionId === payload.questionId)

        if(index == -1){
            //add new answer
            state.answers.push(payload)
        } else {
            //update answer
            state.answers[index].value = payload.value
        }        
    },
}

export const actions = {
    async store({state}, formId) {
        let form = {
            answers: state.answers
        }

        const response = await this.$axios.$post(`/answers/${formId}`, form)
        if(!response) { return false }
        
        return response
    }
}