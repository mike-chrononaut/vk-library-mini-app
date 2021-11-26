import * as React from 'react'
import {createContext, useContext, useReducer} from "react";

const StateContext = createContext()

const stateTest = {}

function stateReducer(state, action) {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                state: {
                    ...action.payload
                }
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function StateProvider({children}) {
    const [state, dispatch] = useReducer(stateReducer, stateTest)
    const value = {state, dispatch}
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

function useCustomState() {
    const context = useContext(StateContext)
    if (context === undefined) {
        throw new Error('useCustomState must be used within a StateProvider')
    }
    return context
}


export {StateProvider, useCustomState}