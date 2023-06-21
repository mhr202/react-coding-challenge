import { createSlice } from '@reduxjs/toolkit'

const resolvedQuestionnaireSlice = createSlice({
  name: 'resolvedQuestionnaire',
  initialState: {
    questionnaire: []
  },
  reducers: {
    setResolvedQuestionnaire: (state, action) => {
      state.questionnaire = [...state.questionnaire, action.payload] 
    },
    getResolvedQuestionnaire: (state)=>{
      return state.resolvedQuestionnaire
    }
  }
})

export const { setResolvedQuestionnaire, getResolvedQuestionnaire } = resolvedQuestionnaireSlice.actions

export default resolvedQuestionnaireSlice.reducer