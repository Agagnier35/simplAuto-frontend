import { StyledComponentTheme } from '../../General/Bootstrap/Theme';
import { MultiProps, multi } from '../../../lib/MultiLang';
import React from 'react';
import { withTheme } from 'styled-components';
import { AdminCarResearchStatistics } from '../../../generated/graphql';

let am4core: any = null;
let am4charts: any = null;
let am4themes_animated: any = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themes_animated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themes_animated.default);
}

export interface MinMaxAvgPriceChartProps extends MultiProps {
  stats: AdminCarResearchStatistics;
  theme: StyledComponentTheme;
}

class MinMaxAvgPriceChart extends React.Component<MinMaxAvgPriceChartProps> {
  chart = null;

  componentDidMount() {
    this.chart = this.createChart();
  }

  componentDidUpdate() {
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
    const { stats, translations } = this.props;
    const {
      lowestPriceSoldApp,
      lowestPriceSoldAPI,
      averagePriceApp,
      averagePriceAPI,
      highestPriceSoldApp,
      highestPriceSoldAPI,
    } = stats;
    const chart = am4core.create('minMaxAvgPriceChart', am4charts.XYChart);

    chart.data = [
      {
        category: translations.admin.app,
        min: lowestPriceSoldApp,
        max: highestPriceSoldApp,
        avg: averagePriceApp,
      },
      {
        category: translations.admin.api,
        min: lowestPriceSoldAPI,
        max: highestPriceSoldAPI,
        avg: averagePriceAPI,
      },
    ];

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    categoryAxis.renderer.minGridDistance = 10;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.opposite = true;

    this.createSeries(chart, 'min', 'Min', 0);
    this.createSeries(chart, 'avg', 'Avg', 1);
    this.createSeries(chart, 'max', 'Max', 2);

    chart.cursor = new am4charts.RadarCursor();

    return chart;
  }

  createSeries(chart: any, field: string, name: string, seriesIndex: number) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = 'category';
    series.name = name;
    series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
    series.columns.template.height = am4core.percent(100);
    series.sequencedInterpolation = true;

    series.columns.template.adapter.add('fill', (fill: any, target: any) => {
      return this.getColorByIndex(seriesIndex);
    });

    const valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = '{valueX}';
    valueLabel.label.horizontalCenter = 'left';
    valueLabel.label.dx = 10;
    valueLabel.label.hideOversized = false;
    valueLabel.label.truncate = false;

    const categoryLabel = series.bullets.push(new am4charts.LabelBullet());
    categoryLabel.label.text = '{name}';
    categoryLabel.label.horizontalCenter = 'right';
    categoryLabel.label.dx = -10;
    categoryLabel.label.fill = am4core.color('#fff');
    categoryLabel.label.hideOversized = false;
    categoryLabel.label.truncate = false;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  public render() {
    return (
      <div
        id="minMaxAvgPriceChart"
        style={{ width: '100%', height: '400px' }}
      />
    );
  }
}

export default multi(withTheme(MinMaxAvgPriceChart));
