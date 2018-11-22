import { Action } from '@ngrx/store';
import { ServiceBinding } from 'app/monitoring/model/service-binding';

export const LOAD_BINDINGS = '[Configurator] Load Bindings';
export const LOAD_BINDINGS_SUCCESS = '[Configurator] Load Bindings Success';
export const LOAD_BINDINGS_FAIL = '[Configurator] Load Bindings Fail';

export class LoadBindings implements Action {
  readonly type = LOAD_BINDINGS;
}
export class LoadBindingsSuccess implements Action {
  readonly type = LOAD_BINDINGS_SUCCESS;
  constructor(public payload: Array<ServiceBinding>) {}
}
export class LoadBindingsFail implements Action {
  readonly type = LOAD_BINDINGS_FAIL;
  constructor(public payload: any) {}
}

export type BindingAction =
  | LoadBindings
  | LoadBindingsFail
  | LoadBindingsSuccess;
