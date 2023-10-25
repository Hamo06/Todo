import {createSlice, PayloadAction} from "@reduxjs/toolkit";

 export type Todo = {
    id: string;
    title: string;
    completed: boolean
}

type TodosState = {
    list: Todo[];
    titleValue: string;
    listID: string;
    filterList: string
}

const initialState: TodosState = {
    list: [],
    titleValue: '',
    listID: '',
    filterList : 'all'
}
export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {

        newTileValue(state, action: PayloadAction<string> ) {
            state.titleValue = action.payload
        },
        fillToDOList(state , action: PayloadAction<Todo>) {
            state.list.push(action.payload)
        },

        deleteToDoComp(state){
            state.list = state.list.filter(list => list.completed === false)
        },
        deleteToDoItem(state, action: PayloadAction<string>){
            state.list = state.list.filter(list => list.id !== action.payload)
        },

        updateToDOComp(state, action: PayloadAction<string>) {
            state.list.map(item =>  item.id === action.payload ? item.completed = !item.completed : item.completed = item.completed )
        },

        updateToDOId(state, action: PayloadAction<string>) {
            state.listID = action.payload
        },

        updateToDOItem(state, action: PayloadAction<{ id: string, value: string }>) {
            state.list.map(item =>  item.id === action.payload.id ? item.title = action.payload.value : item.title = item.title )
        },

        filterListToDo(state, action: PayloadAction<string>){
            state.filterList = action.payload
        }

    },

})

export const { newTileValue, fillToDOList, deleteToDoComp, deleteToDoItem, updateToDOComp, updateToDOId, updateToDOItem, filterListToDo } = listSlice.actions
export default listSlice.reducer