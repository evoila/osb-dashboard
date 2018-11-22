import * as fromBindings from '../actions/binding.action';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { BindingAction } from '../actions/binding.action';
import { ServiceBinding } from '../../../model/service-binding';
import { getOptionsLoading } from './options.reducer';

export interface BindingsState {
  entities: Array<ServiceBinding>;
  loading: boolean;
  loaded: boolean;
}

export const initialState: BindingsState = {
  entities: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromBindings.BindingAction
): BindingsState {
  switch (action.type) {
    case fromBindings.LOAD_BINDINGS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBindings.LOAD_BINDINGS_SUCCESS: {
      const entities = action.payload;
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
    case fromBindings.LOAD_BINDINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getBindingsLoading = (state: BindingsState) => state.loading;
export const getBindingsLoaded = (state: BindingsState) => state.loaded;
export const getBindingsEntities = (state: BindingsState) => state.entities;
