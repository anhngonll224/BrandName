import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    DossierID: []
}

export const ProfileList = createSlice({
    name: "ProfileList",
    initialState,
    reducers: {
        DossierID: (state, action) => {
            state.DossierID = action.payload
        },
    },
})
export const { DossierID } = ProfileList.actions;

export default ProfileList.reducer
