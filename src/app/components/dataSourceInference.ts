/**
 * Data Source Inference Engine
 * Analyzes data structure and generates appropriate widgets
 */

export interface DataSourceConfig {
  type: string;
  metrics?: Array<{ name: string; value: number | string; unit: string; trend?: number }>;
  timeSeries?: Array<Record<string, any>>;
  categories?: Array<{ name: string; count: number; color: string }>;
  details?: Array<Record<string, any>>;
}

export interface WidgetConfig {
  type: "metric" | "chart" | "table" | "pie";
  title: string;
  data: any;
  config?: Record<string, any>;
}

/**
 * Infers what widgets should be displayed based on data structure
 */
export function inferWidgets(dataSource: DataSourceConfig | null): WidgetConfig[] {
  if (!dataSource) return [];

  const widgets: WidgetConfig[] = [];

  // Add metric cards if metrics exist
  if (dataSource.metrics && dataSource.metrics.length > 0) {
    dataSource.metrics.forEach((metric) => {
      widgets.push({
        type: "metric",
        title: metric.name,
        data: metric,
      });
    });
  }

  // Add time series chart if data exists
  if (dataSource.timeSeries && dataSource.timeSeries.length > 0) {
    const firstRecord = dataSource.timeSeries[0];
    const keys = Object.keys(firstRecord).filter(k => k !== 'date' && k !== 'month' && k !== 'day' && k !== 'sprint');
    
    widgets.push({
      type: "chart",
      title: `${dataSource.type.replace(/_/g, " ")} Trend`,
      data: dataSource.timeSeries,
      config: {
        dataKeys: keys,
        xAxisKey: Object.keys(firstRecord)[0], // First key is usually the date/time axis
      },
    });
  }

  // Add category distribution chart if categories exist
  if (dataSource.categories && dataSource.categories.length > 0) {
    widgets.push({
      type: "pie",
      title: "Distribution",
      data: dataSource.categories,
    });
  }

  // Add details table if details exist
  if (dataSource.details && dataSource.details.length > 0) {
    widgets.push({
      type: "table",
      title: "Recent Items",
      data: dataSource.details,
      config: {
        columns: Object.keys(dataSource.details[0]),
      },
    });
  }

  return widgets;
}

/**
 * Gets display name for a data source type
 */
export function getDataSourceDisplayName(type: string): string {
  const names: Record<string, string> = {
    service_desk: "Service Desk (ITSM)",
    hr: "Human Resources",
    crm: "CRM (Sales)",
    project_management: "Project Management",
    workplace: "Workplace Management",
  };
  return names[type] || type;
}

/**
 * Analyzes the structure and provides insights
 */
export function analyzeDataStructure(dataSource: DataSourceConfig | null): {
  hasMetrics: boolean;
  hasTimeSeries: boolean;
  hasCategories: boolean;
  hasDetails: boolean;
  metricCount: number;
  timeSeriesLength: number;
} {
  return {
    hasMetrics: !!(dataSource?.metrics && dataSource.metrics.length > 0),
    hasTimeSeries: !!(dataSource?.timeSeries && dataSource.timeSeries.length > 0),
    hasCategories: !!(dataSource?.categories && dataSource.categories.length > 0),
    hasDetails: !!(dataSource?.details && dataSource.details.length > 0),
    metricCount: dataSource?.metrics?.length || 0,
    timeSeriesLength: dataSource?.timeSeries?.length || 0,
  };
}
