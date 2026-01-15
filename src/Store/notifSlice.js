import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    notifTexts: []
}

export const notifSlice = createSlice({
    name:"notifs",
    initialState,
    reducers: {
        toggleOpen: (state) => {
            state.open = !state.open
        },
        setOpen: (state) => {
            state.open = true
        },
        setClose: (state) => {
            state.open = false
        },
        addNotif: (state, action) => {
            const text = action.payload
            if (!state.notifTexts.includes(text)) {
                state.notifTexts = [...state.notifTexts, text]
            }
        },
        clearNotifs: (state) => {
            state.notifTexts = []
        }
    }
})

export const {toggleOpen, setOpen, setClose, addNotif, clearNotifs} = notifSlice.actions

export default notifSlice.reducer