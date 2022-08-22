import {AnyAction} from 'redux';
import {Category} from './categories.types';


import {fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} from './categories.action'


export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: null | Error;
}

const INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer= (state = INITIAL_STATE, action = {} as AnyAction ): CategoryState  => {


  if(fetchCategoriesStart.match(action)){
    return {
      ...state,
      isLoading: true
    }
  }
  if(fetchCategoriesSuccess.match(action)){
    return {
      ...state,
      isLoading: false,
      categories: action.payload
    }
  }
  if(fetchCategoriesFailed.match(action)){
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
  }
  return state;
  
}

