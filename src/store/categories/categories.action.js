import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { createAction } from '../../utils/reducer/reducer.utils';


const fetchCategoriesStart = () => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

const fetchCategoriesSuccess = (categories) => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)

const fetchCategoriesFailed = (error) => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
  

export const fecthCategoriesAsync = () => async(dispatch) => {
  dispatch(fetchCategoriesStart())
  try{
    const categoriesArray = await getCategoriesAndDocuments('categories');
    dispatch(fetchCategoriesSuccess(categoriesArray))
  }catch(error){
    dispatch(fetchCategoriesFailed(error))
  }
}