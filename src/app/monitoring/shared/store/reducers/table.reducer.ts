import * as fromTableActions from '../actions/table.actions';
import { SearchResponse } from '../../../model/search-response';
import { AggregationRequestObject } from '../../../chart-configurator/model/aggregationRequestObject';
import { QueryAndResponse } from '../../model/query-and-response';
import { DELETE_TABLE_FAIL } from '../actions/table.actions';
import { Table } from '../../model/table';

export interface TableModelState {
  tables: Array<Table>;
  tablesLoaded: boolean;
  tablesLoading: boolean;
  tableSaved: boolean;
  tableSaveing: boolean;
  tableDeleted: boolean;
  tableDeleting: boolean;
  
}

export const initialState: TableModelState = {
  tables: [],
  tablesLoading: false,
  tablesLoaded: false,
  tableSaved: false,
  tableSaveing: false,
  tableDeleted: false,
  tableDeleting: false
};

export function reducer(
  state = initialState,
  action: fromTableActions.TableAction
) {
  switch (action.type) {
    case fromTableActions.LOAD_TABLES: {
      return {
        ...state,
        tablesLoading: true,
        tablesLoaded: false
      };
    }
    case fromTableActions.LOAD_TABLES_SUCCESS: {
      return {
        ...state,
        tables: action.payload,
        tablesLoading: false,
        tablesLoaded: true
      };
    }
    case fromTableActions.LOAD_TABLES_FAIL: {
      return {
        ...state,
        tablesLoading: false,
        tablesLoaded: false
      };
    }
    case fromTableActions.SAVE_TABLE: {
      return {
        ...state,
        tableSaveing: true,
        tableSaved: false
      };
    }
    case fromTableActions.SAVE_TABLE_SUCCESS: {
      return {
        ...state,
        tableSaveing: false,
        tableSaved: true
      };
    }
    case fromTableActions.SAVE_TABLE_FAIL: {
      return {
        ...state,
        tableSaveing: false,
        tableSaved: false
      };
    }
    case fromTableActions.DELETE_TABLE_SUCCESS: {
      const tables = state.tables.filter(k => k.id != action.payload.id)
      return {
        ...state,
        tables,
        tableDeleted: true,
        tableDeleting: false
      }
    }
    case fromTableActions.DELETE_TABLE_FAIL: {
      return {
        ...state,
        tableDeleted: false,
        tableDeleting: false
      }
    }
    case fromTableActions.DELETE_TABLE: {
      return {
        ...state,
        tableDeleted: false,
        tableDeleting: true
      }
    }
    
  }
}

export const getTables = (state: TableModelState) => state.tables;
export const getTablesLoaded = (state: TableModelState) => state.tablesLoaded;
export const getTablesLoading = (state: TableModelState) => state.tablesLoading;

export const getTableDeleted = (state: TableModelState) => state.tableDeleted;
export const getTableDeleting = (state: TableModelState) => state.tableDeleting;

export const getTableSaveing = (state: TableModelState) => state.tableSaveing;
export const getTableSaved = (state: TableModelState) => state.tableSaved;


