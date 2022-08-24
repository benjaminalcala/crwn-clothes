import {all, call, put, takeLatest} from 'typed-redux-saga/macro';
import { CATEGORIES_ACTION_TYPES} from './categories.types';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {fetchCategoriesSuccess, fetchCategoriesFailed} from './categories.action'



export function* fetchCategoriesAsync() {
  try{
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray))
  }catch(error){
    yield* put(fetchCategoriesFailed(error as Error))
  }
}

export function* onFetchCategories(){
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)

}

export function* categoriesSaga(){
  yield* all([call(onFetchCategories)])
}