import * as fromTableActions from '../actions/table.actions';
import { Table } from '../../model/table';

export interface TableModelState {
  tables: Array<Table>;
  saved_table: Table | null;
  tablesLoaded: boolean;
  tablesLoading: boolean;
  tableSaved: boolean;
  tableSaveing: boolean;
  tableDeleted: boolean;
  tableDeleting: boolean;
  
}

export const initialState: TableModelState = {
  tables: [],
  saved_table: null,
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
      console.log('reducer - LOAD TABLES SUCCESS');
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
      const tables = state.tables.concat(action.payload);
      const saved_table = action.payload;
      return {
        ...state,
        saved_table: saved_table,
        tables: tables,
        tableSaveing: false,
        tableSaved: true
      };
    }
    case fromTableActions.SAVE_TABLE_FAIL: {
      return {
        ...state,
        saved_table: null,
        tableSaveing: false,
        tableSaved: false
      };
    }
    case fromTableActions.DELETE_TABLE_SUCCESS: {
      const tables = state.tables.filter(k => k.id != action.payload.id)
      console.log(action.payload);
      console.log(state.tables)
      console.log(tables.length);
      console.log(state.tables.length);
      return {
        ...state,
        tables: tables,
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
export const getSavedTable = (state: TableModelState) => state.saved_table;


