import { Injectable } from '@angular/core';

@Injectable()
export class AggregationTemplateService {
  constructor() {}

  getChartTypeForAggregation(aggregation: any): Array<string> {
    const aggregationType = Object.keys(aggregation['aggs'][0])[0];
    return this.getAggregations([])
      .filter(element => element!!.type === aggregationType)
      .map(element => element!!.applicableOn as Array<string>)[0];
  }

  getAggregationTypes(fields: Array<any>, filter: string): any {
    return this.getAggregations(fields).filter(
      element => element!!.applicableOn.indexOf(filter) !== -1
    );
  }

  private getAggregations(fields: Array<any>) {
    return [
      {
        name: 'Min',
        type: 'min',
        applicableOn: ['bar', 'line'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'script', label: 'Script', type: 'textarea' }
        ]
      },
      {
        name: 'Max',
        type: 'max',
        applicableOn: ['bar', 'line'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'script', label: 'Script', type: 'textarea' }
        ]
      },
      {
        name: 'Sum',
        type: 'sum',
        applicableOn: ['bar', 'line'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'script', label: 'Script', type: 'textarea' }
        ]
      },
      {
        name: 'Avg',
        type: 'avg',
        applicableOn: ['bar', 'line'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'script', label: 'Script', type: 'textarea' }
        ]
      },
      {
        name: 'Stats',
        type: 'stats',
        applicableOn: ['pie'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          }
        ]
      },
      {
        name: 'Extended Stats',
        type: 'extended_stats',
        applicableOn: ['pie', 'doughnut', 'bar'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'sigma', label: 'Sigma', type: 'number' }
        ]
      },
      {
        name: 'Count',
        type: 'value_count',
        applicableOn: ['metric', 'bar', 'line'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          {
            name: 'value-select',
            label: 'Value to count',
            type: 'value-select',
            options: ['doc_count', 'value']
          }
        ]
      },
      {
        name: 'Percentiles',
        type: 'percentiles',
        applicableOn: ['pie', 'doughnut', 'bar'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'percent', label: 'Percents', type: 'text' }
        ]
      },
      {
        name: 'Cardinality',
        type: 'cardinality',
        applicableOn: ['metric'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          {
            name: 'precision_threshold',
            label: 'Precision Threshold',
            type: 'number',
            expertMode: true
          },
          {
            name: 'rehash',
            label: 'Rehash',
            type: 'checkbox',
            expertMode: true
          },
          {
            name: 'params',
            label: 'Params',
            type: 'field',
            expertMode: true,
            extendable: true,
            subFields: [{ type: 'params', subType: 'text' }]
          }
        ]
      } /** {
      'name': 'Geo Bounds',
      'type': 'geo_bounds',
      'applicableOn': ['pie'],
      'fields': [
        { 'name': 'field', 'label': 'Field', 'type': 'select', 'options': fields, 'required': true },
        { 'name': 'wrap_longitude', 'label': 'Wrap Longitude', 'type': 'checkbox' }
      ]
    }*/,
      ,
      {
        name: 'Filter',
        type: 'filter',
        applicableOn: ['line', 'bar'],
        fields: [
          {
            name: 'term',
            label: 'Term',
            type: 'field',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float',
              'date',
              'boolean',
              'text',
              'long',
              'keyword'
            ],
            extendable: false,
            required: true,
            subFields: [{ type: 'params', subType: 'text' }]
          },
          { name: 'aggs', label: 'Aggs', type: 'aggregation' }
        ]
      },
      {
        name: 'Filters',
        type: 'filters',
        applicableOn: ['line', 'bar'],
        fields: [
          {
            name: 'filters',
            label: 'Filter',
            type: 'field',
            applicableOn: ['date', 'boolean', 'text', 'long', 'keyword'],
            extendable: true,
            options: fields,
            required: true,
            subFields: [{ type: 'filters', subType: 'text' }]
          },
          { name: 'aggs', label: 'Aggs', type: 'aggregation' }
        ]
      },
      {
        name: 'Terms',
        type: 'terms',
        applicableOn: ['line', 'bar', 'pie', 'doughnut'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: ['date', 'text', 'long', 'boolean', 'keyword'],
            options: fields,
            required: true
          },
          { name: 'size', label: 'Size', type: 'number', required: false },
          {
            name: 'include',
            label: 'Include',
            type: 'text',
            expertMode: true,
            required: false
          },
          {
            name: 'exclude',
            label: 'Exclude',
            type: 'text',
            expertMode: true,
            required: false
          },
          {
            name: 'order',
            label: 'Order',
            type: 'field',
            expertMode: true,
            extendable: false,
            subFields: [
              {
                type: 'order'
              }
            ]
          },
          { name: 'aggs', label: 'Aggs', type: 'aggregation' }
        ]
      },
      {
        name: 'Range',
        type: 'range',
        applicableOn: ['pie', 'doughnut'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'keyed', label: 'Keyed', type: 'checkbox', expertMode: true },
          {
            name: 'ranges',
            label: 'Ranges',
            type: 'field',
            extendable: true,
            required: true,
            subFields: [
              {
                type: 'ranges',
                fromType: 'number',
                toType: 'number'
              }
            ]
          }
        ]
      },
      {
        name: 'Date Range',
        type: 'date_range',
        applicableOn: ['pie', 'doughnut', 'line', 'bar'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: ['date'],
            options: fields,
            required: true
          },
          { name: 'format', label: 'Format', type: 'text' },
          {
            name: 'ranges',
            label: 'Ranges',
            type: 'field',
            extendable: true,
            required: true,
            subFields: [
              {
                type: 'ranges',
                fromType: 'text',
                toType: 'text'
              }
            ]
          }
        ]
      } /** {
      'name': 'IP Range',
      'type': 'ip_ranges',
      'applicableOn': ['pie', 'doughnut'],
      'fields': [
        { 'name': 'field', 'label': 'Field', 'type': 'select', 'options': fields, 'required': true },
        {
          'name': 'ranges', 'label': 'Ranges', 'type': 'field', 'extendable': true, 'required': true,
          'subFields': [{
            'type': 'ranges',
            'fromType': 'text',
            'toType': 'text',
            'toPattern': '((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$',
            'fromPattern': '((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$'
          }]
        }]
    }*/,
      ,
      {
        name: 'Histogram',
        type: 'histogram',
        applicableOn: ['line', 'bar'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: [
              'long',
              'integer',
              'short',
              'byte',
              'double',
              'float',
              'half_float',
              'scaled_float'
            ],
            options: fields,
            required: true
          },
          { name: 'interval', label: 'Interval', type: 'number' },
          {
            name: 'extended_bounds',
            label: 'Extended Bounds',
            type: 'field',
            extendable: false,
            required: false,
            subFields: [
              {
                type: 'extended_bounds',
                fromType: 'number',
                toType: 'number'
              }
            ]
          },
          {
            name: 'order',
            label: 'Order',
            type: 'field',
            extendable: false,
            subFields: [
              {
                type: 'order'
              }
            ]
          },
          { name: 'aggs', label: 'Aggs', type: 'aggregation' }
        ]
      },
      {
        name: 'Date Histogram',
        type: 'date_histogram',
        applicableOn: ['line', 'bar'],
        fields: [
          {
            name: 'field',
            label: 'Field',
            type: 'select',
            applicableOn: ['date'],
            options: fields,
            required: true
          },
          { name: 'interval', label: 'Interval', type: 'text', required: true },
          { name: 'format', label: 'Format', type: 'text', required: false },
          {
            name: 'timezone',
            label: 'Timezone',
            type: 'text',
            expertMode: true,
            required: false
          },
          {
            name: 'offset',
            label: 'Offset',
            type: 'text',
            expertMode: true,
            required: false
          },
          { name: 'aggs', label: 'Aggs', type: 'aggregation' }
        ]
      } /**{
      'name': 'Geo Distance',
      'type': 'geo_distance',
      'applicableOn': ['pie', 'doughnut'],
      'fields': [
        { 'name': 'field', 'label': 'Field', 'type': 'select', 'options': fields, 'required': true  },
        { 'name': 'origin', 'label': 'Origin', 'type': 'text' },
        {
          'name': 'unit', 'label': 'Unit', 'type': 'custom-select', 'options': [
            { 'key': 'Miles', 'value': 'mi' },
            { 'key': 'Inch', 'value': 'in' },
            { 'key': 'Yard', 'value': 'yd' },
            { 'key': 'Millimeter', 'value': 'mm' },
            { 'key': 'Centimeter', 'value': 'cm' },
            { 'key': 'Kilometer', 'value': 'km' },
            { 'key': 'Meter', 'value': 'm' }]
        },
        {
          'name': 'distance_type', 'label': 'Distance Type', 'type': 'custom-select', 'options': [
            { 'key': 'Default (sloppy_src)', 'value': 'sloppy_src' },
            { 'key': 'Most Accurate (arc)', 'value': 'arc' },
            { 'key': 'Fastest (plane)', 'value': 'plane' }]
        },
        { 'name': 'keyed', 'label': 'Keyed', 'type': 'checkbox' },
        {
          'name': 'ranges', 'label': 'Ranges', 'type': 'field', 'extendable': true,
          'subFields': [{
            'type': 'ranges',
            'fromType': 'text',
            'toType': 'text',
          }]
        }]
    }*/
    ];
  }
}
