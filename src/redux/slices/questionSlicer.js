import { createSlice } from '@reduxjs/toolkit'

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
   questionsList: [
       {id: 1, statement: "what is your hobby?"},
       {id: 2, statement: "what is your name?"},
       {id: 3, statement: "what is your hobby?"},
       {id: 4, statement: "what is your favourite place?"}
    ]
  },
  reducers: {
    addQuestions: (state, action) => {
      state.questionsList = [...state.questionsList, action.payload]
    },
    removeQuestion: (state, action) => {
      const filterList = state.questionsList.filter(question=> question.id !== action.payload)
      state.questionsList = [...filterList]
    },
    updateQuestion: (state,action) => {
      return {
        ...state,
        questionsList: state.questionsList.map(question => question.id === action.payload.id ?
            { ...question, statement: action.payload.statement } : question
        ) 
    };

    },
    getQuestions: (state) => {
      return state.questions
    }
  }
})

export const { addQuestions, getQuestions, removeQuestion, updateQuestion } = questionSlice.actions

export default questionSlice.reducer