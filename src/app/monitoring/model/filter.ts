export interface AvailableFiltersObject {
  dateFields?: AvailableFilteringField[],
  flatFields?: AvailableFilteringField[]
}

export interface AvailableFilteringField {
  fieldName: string,
  fieldLabel: string
}


export interface Filter {
  dateFields?: {
    start: any;
    end: any;
    fieldNameToFilterBy: string;
  }
  flatFields?: {
    flatId: string;
    fieldNameToFilterBy: string;
  }
}
