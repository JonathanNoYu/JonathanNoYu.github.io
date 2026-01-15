export const toggleOpen = () => {
    return { type: "toggleOpen" }
}

export const setOpen = () => {
    return { type: "setOpen" }
}

export const addNotif = (payload) => {
    return { type: "addNotif",
             payload: payload}
}

export const clearNotifs = () => {
    return { type: "setOpen" }
}