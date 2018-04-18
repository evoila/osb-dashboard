import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
import { Chart } from './model/chart';


@Injectable()
export class ChartingService {

  private defaultindex = 0;
  private bucketDelimiter = '.';
  private metricAggregations = ['min', 'max', 'sum',
    'avg', 'stats', 'extended_stats', 'percentiles',
    'value_count'];
  Chart
  private noSeriesCharts = ['pie', 'doughnut'];
  private acceptedDateFormats: Array<any> = ['DD.MM.YYYY'];
  private isNested;

  constructor() { }

  public unwrapForPlotBucket(chart: Chart, query: any, result: any, index?: number, key?: string) {
    this.resetChart(chart);
    query = query['aggs'];
    this.isNested = this.isNestedResult(result);
    this.plotBuckets(chart, query, result, 0);
    this.setCustomNamesForSeries(chart);
    if (this.isNested) {
      this.sortData(chart);
    }
    chart.labels = this.formatLabels(chart.labels);
    return chart;
  }
  private isNestedResult(bucket: any): any {
    /*unnested Aggregations have no Key-Attribute.
    * To Display them Properly we have to add one to add
    * a series later on */
    if (bucket['0'] && bucket['0']['buckets'][0][0]) { //check if Bucket has nested index
      return true;
    } else {
      return false;
    }
  }

  private formatValues(data: any[]): any[] {
    return data.map(dataValue => {
      if (Array.isArray(dataValue)) {
        return this.formatValues(dataValue);
      }

      if (typeof dataValue === 'string') {
        return this.formatPriceValue(dataValue);
      }
      return dataValue;
    });
  }

  private formatPriceValue(price: string): string {
    let replaced = price.replace(/\./g, ',');
    if (replaced.indexOf('00') !== -1) {
      replaced = replaced.replace(/\,00/, '');
    }
    return replaced;
  }

  private formatLabels(labels: any[]): any[] {
    if (!labels || !labels[0] || labels[0].indexOf('-') === -1) { return labels };
    return labels.map(label => {
      const replaced = label.replace(/\.0/g, '');
      return `${replaced} \u20AC`;
    });
  }

  private setCustomNamesForSeries(chart: Chart): boolean {
    if (!chart.esIndex || !chart.series || !chart.series.length) { return false };
    // USING esIndex as a temporary workaround
    const customNames = chart.esIndex.split('<break>');

    if (customNames.length !== chart.series.length) { return false };

    chart.series = [...customNames];
    return true;
  }

  private resetChart(chart: any): void {
    chart.series = [];
    chart.labels = [];
    chart.data = [];
  }

  private plotSingleValue(chart: Chart, value: any, label: string, serie: any): void {
    this.fill(chart['data'], false, [value]);
    this.fill(chart['series'], true, [serie]);
    this.fill(chart['labels'], true, label);
  }

  private checkIfPrices(fieldName: string): boolean {
    const pricesFieldsNames = ['income', 'price'];
    return pricesFieldsNames.some(priceString => {
      if (fieldName.toString().toLowerCase().indexOf(priceString) !== -1) { return true };
      return false;
    });
  }

  private lookForPrices(queryObj): boolean {
    let hasPricesValues = false;
    Object.keys(queryObj).forEach(sub => {
      if (typeof queryObj[sub] === 'string') {
        hasPricesValues = this.checkIfPrices(queryObj[sub]);
        return hasPricesValues;
      }

      if (typeof queryObj[sub] === 'object') {
        hasPricesValues = this.lookForPrices(queryObj[sub]);
      }
    });
    return hasPricesValues
  }

  private plotBuckets(chart: Chart, query: any, bucket: any, bucketIndex: number, key?: string, seriesIndex?: number) {
    if (this.noSeriesCharts.indexOf(chart.type) > -1) { delete chart.series; }

    const currentQuery = query[bucketIndex];
    const queryType = Object.keys(currentQuery)[0];
    //const hasPriceValues = this.lookForPrices(query);

    let subIndex = 0;
    const nestedIndex = bucketIndex + 1;

    if (bucketIndex === 0 && bucket[0] && !bucket[0].buckets && bucket[0].value !== undefined) {
      //const value = hasPriceValues ? `${parseFloat(bucket[0].value).toFixed(2)}` : bucket[0].value;
      const value = bucket[0].value;
      this.plotSingleValue(chart, bucket[0].value, `${queryType} ${query[0][queryType].field}`, 1);
      return true;
    }

    if (!bucket[bucketIndex].buckets) {
      console.log('Error filling chart - No buckets in given data - cancelling.')
      return false;
    }
    if (!this.isNested) {
      this.fill(chart['series'], true, 'query');
    }
    bucket[bucketIndex].buckets.forEach((bucket: any, index: number) => {
      if (bucket[nestedIndex] != null && bucket[nestedIndex].buckets != null &&
        bucket[nestedIndex].buckets.length > 0) {
        this.plotBuckets(chart, currentQuery['aggs'], bucket, nestedIndex, bucket.key, subIndex);
        subIndex++;
      } else if (bucket[nestedIndex] == null) {
        if (seriesIndex != null) {
          if (!key) { key = bucket.key }

          this.fill(chart['series'], true, key);

          this.insertIntoSubIndex(chart['data'], seriesIndex, bucket.doc_count);
        } else {
          this.fill(chart['data'], false, bucket.doc_count);
        }

        let label = bucket.key;
        if (bucket.key_as_string) { label = bucket.key_as_string; }

        this.fill(chart['labels'], true, label.toString().toLowerCase());

        // console.log("series: " + key, "data: " + bucket.doc_count, "labels: " + bucket.key);

        label = null;
      } else if (bucket[nestedIndex].value != null) {
        this.fill(chart['series'], true, 'selected-field');

        let label = bucket.key;
        if (bucket.key_as_string) { label = bucket.key_as_string; }

        this.fill(chart['labels'], true, label);
        const doc_count = bucket.doc_count;
        //const value = hasPriceValues ? `${parseFloat(bucket[nestedIndex].value).toFixed(2)}` : bucket[nestedIndex].value;
        const value = bucket[nestedIndex].value;
        const valueToUse = chart.fieldToCount === 'doc_count' ? doc_count : value;

        this.insertIntoSubIndex(chart['data'], subIndex, valueToUse);
      }
    });
    console.log(chart);
  }


  private sortData(chart: Chart): Chart {
    const { labels, data, series } = chart;
    const useMonthNames = chart.aggregations[0].aggs.toString().indexOf(`"interval":"month"`) > -1;
    let sortedData: any = {};

    // if no labels/series or labels are not dates - do not sort
    if (!series || !series.length ||
      !labels || !moment(labels[0], this.acceptedDateFormats, true).isValid()) {
      return chart;
    }

    sortedData = this.sortByDate(this.destructureForSorting(labels, series, data), this.acceptedDateFormats);
    this.resetChart(chart);
    this.bringBackStructureForChart(chart, sortedData);
    if (useMonthNames) {
      chart.labels = this.isolateMonthNames(chart.labels);
    }
    return chart;
  }

  private isolateMonthNames(labelsArray: string[]): string[] {
    return labelsArray.map(dateLabel => {
      return dateLabel.split('.')[1];
    })
  }


  private destructureForSorting(labels: Array<any>, series: Array<any>, data: Array<any>): any {
    const forSorting = {};
    labels.forEach((date, dateIndex) => {
      if (!forSorting[date]) { forSorting[date] = { date }; }
      series.forEach((serieName, serieIndex) => {
        forSorting[date][serieName] = data[serieIndex] && data[serieIndex][dateIndex];
      });
    });
    return forSorting;
  }

  private sortByDate(objToSort: any, dateFormats: Array<any>): Array<any> {
    // when ES6 use object values
    const arrayToSort = Object.keys(objToSort).map(key => objToSort[key]);
    arrayToSort.sort((objA, objB) => {
      const dateA: any = moment(objA.date, dateFormats).format('X')
      const dateB: any = moment(objB.date, dateFormats).format('X');
      return dateA - dateB;
    });
    return arrayToSort;
  }

  private bringBackStructureForChart(chart: Chart, sortedData: any): void {
    // get all series names from object keys except for 'date' [was used as a helper]
    chart.series = Object.keys(sortedData[0]).filter(serieName => serieName !== 'date');

    sortedData.forEach((byDateObj, dateIndex) => {
      chart.labels.push(byDateObj.date);
      chart.series.forEach((serieName, serieIndex) => {
        if (!chart.data[serieIndex]) { chart.data[serieIndex] = []; }
        chart.data[serieIndex].push(byDateObj[serieName]);
      });
    });
  }

  /**
   * We have the following types:
   * - min
   * - max
   * - sum
   * - avg
   * - stats
   * - extended_stats
   * - percentiles
   * - value_count
   *
   * - histogram
   * - date_histogram
   * - geo_distance
   * - filter
   * - filters
   * - terms
   * - range
   * - date_range
   * {
        "aggs":{
            "0":{
              "date_histogram":{
                  "field":"created",
                  "interval":"3d"
              }
            }
         }
      }
   */

  insertIntoSubIndex(property: Array<any>, index: number, value: any): void {
    if (!property[index]) { property[index] = []; }

    this.fill(property[index], false, value);
  }

  fill(property: Array<any>, check: boolean, value: any) {
    if (check && property.indexOf(value) === -1) { property.push(value); }
    if (!check) { property.push(value); }
  }

}
