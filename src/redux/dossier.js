import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  dossierTotal: {},
}

export const dossierSlice = createSlice({
  name: "dossier",
  initialState,
  reducers: {
    changeTotalDossier: (state, action) => {
      state.dossierTotal = action.payload
    },
  },
})

export const { changeTotalDossier } = dossierSlice.actions

export default dossierSlice.reducer
