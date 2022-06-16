import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootStateType} from "../store";

export enum SortPropertyEnum {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title',
}

export type SortType = {
    name: string
    sortProperty: SortPropertyEnum
}

interface FilterStateType {
    searchValue: string
    categoryId: number
    sort: SortType
    currentPage: number
}

const initialState: FilterStateType = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING,
    },
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterStateType>) => {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        },
    },
})

export const selectFilter = (state: RootStateType) => state.filter
export const selectSort = (state: RootStateType) => state.filter.sort

export const {setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer
