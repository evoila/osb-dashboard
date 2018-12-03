import * as fromOptions from '../actions/options.action';
import { ChartOptionsEntity } from 'app/monitoring/chart-configurator/model/chart-options-entity';
import { LOAD_OPTIONS_FAIL } from '../actions/options.action';

export interface OptionsState {
  entities: { [id: string]: ChartOptionsEntity };
  loaded: boolean;
  loading: boolean;
}
export const initialState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromOptions.OptionsAction
): OptionsState {
  switch (action.type) {
    case fromOptions.LOAD_OPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromOptions.LOAD_OPTIONS_SUCCESS: {
      // trim null values return by kotlin case chartjs can't compute them
      const data = clean(action.payload);
      const entities = buildObject(data, state);
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
    case fromOptions.LOAD_OPTIONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

const buildObject = function reduceData(
  data: Array<ChartOptionsEntity>,
  state: any
): { [id: string]: ChartOptionsEntity } {
  return data.reduce(
    (
      entities: { [id: string]: ChartOptionsEntity },
      option: ChartOptionsEntity
    ) => {
      return {
        ...entities,
        [option.id]: option
      };
    },
    {
      ...state.entities
    }
  );
};

function clean(entities: Array<ChartOptionsEntity>) {
  return entities.map(entity => {
    return { ...entity, options: cleanObject(entity.options) };
  });
}

function cleanObject(obj: any) {
  const returnVal: any = {};
  for (const propName in obj) {
    if (!(obj[propName] === null)) {
      returnVal[propName] = obj[propName];
    }
  }
  return returnVal;
}
export const getOptionsLoading = (state: OptionsState) => state.loading;
export const getOptionsLoaded = (state: OptionsState) => state.loaded;
export const getOptionsEntities = (state: OptionsState) => state.entities;
