import React from 'react';
import { Statistics } from '../../../generated/graphql';
import { withTheme } from 'styled-components';
import { StyledComponentTheme } from '../../General/Bootstrap/Theme';
import { multi, MultiProps } from '../../../lib/MultiLang';
// import am4core from '@amcharts/amcharts4/core';
// import am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
let am4core: any = null;
let am4charts: any = null;
let am4themes_animated: any = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themes_animated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themes_animated.default);
}

export interface DaysOnMarketChartProps extends MultiProps {
  stats: Statistics;
  theme: StyledComponentTheme;
  days: number;
}

class DaysOnMarketChart extends React.Component<DaysOnMarketChartProps> {
  chart = null;

  componentDidMount() {
    this.chart = this.createChart();
  }

  getColorByIndex(index: number) {
    const { theme } = this.props;
    switch (index) {
      case 0:
        return theme.colors.primaryLighter;
      case 1:
        return theme.colors.primary;
      case 2:
        return theme.colors.primaryDarker;
      default:
        return theme.colors.secondaryDarker;
    }
  }

  createChart() {
    const { stats, translations, days } = this.props;
    const { averageTimeOnMarketAPI, averageTimeOnMarketApp } = stats;
    const chart = am4core.create('daysOnMarketChart', am4charts.RadarChart);

    const maxDays =
      averageTimeOnMarketAPI > averageTimeOnMarketApp
        ? averageTimeOnMarketAPI
        : averageTimeOnMarketApp;
    const minDays =
      averageTimeOnMarketAPI < averageTimeOnMarketApp
        ? averageTimeOnMarketAPI
        : averageTimeOnMarketApp;
    const upperBound = maxDays * 1.1;
    const lowerBound = minDays * 0;

    chart.paddingRight = 50;
    chart.paddingLeft = 50;

    chart.data = [
      {
        category: translations.stats.marketAverage,
        value: averageTimeOnMarketAPI,
        full: upperBound,
      },
      {
        category: translations.stats.appAverage,
        value: averageTimeOnMarketApp,
        full: upperBound,
      },
      {
        category: translations.stats.daysOnMarket,
        value: days,
        full: upperBound,
      },
    ];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(40);

    // Set number format
    //chart.numberFormatter.numberFormat = `#.#'${translations.stats.days}'`;

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add(
      'fill',
      (fill: any, target: any) => {
        return target.dataItem.index >= 0
          ? this.getColorByIndex(target.dataItem.index)
          : fill;
      },
    );
    categoryAxis.renderer.minGridDistance = 10;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = lowerBound;
    valueAxis.max = upperBound;
    valueAxis.strictMinMax = true;

    // Create series
    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = 'full';
    series1.dataFields.categoryY = 'category';
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
      'alternativeBackground',
    );
    series1.columns.template.fillOpacity = 0.08;
    // series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    const series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = 'value';
    series2.dataFields.categoryY = 'category';
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = '{category}: [bold]{value}[/]';
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add('fill', (fill: any, target: any) => {
      return this.getColorByIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

    return chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  public render() {
    return (
      <div id="daysOnMarketChart" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default multi(withTheme(DaysOnMarketChart));
