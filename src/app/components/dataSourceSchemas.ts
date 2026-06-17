/**
 * Data Source Schemas & Sample Data
 * Defines the shape of data returned by different data sources
 * Used for inference and dynamic widget generation
 */

// Service Desk / ITSM data (ServiceNow-like)
export const serviceNowData = {
  type: "service_desk",
  metrics: [
    { name: "Open Tickets", value: 248, unit: "tickets", trend: 12 },
    { name: "Resolution Time", value: 4.5, unit: "hours", trend: -8 },
    { name: "CSAT Score", value: 4.2, unit: "/5", trend: 3 },
    { name: "SLA Compliance", value: 94, unit: "%", trend: 5 },
  ],
  timeSeries: [
    { date: "Week 1", tickets: 245, resolved: 180 },
    { date: "Week 2", tickets: 258, resolved: 195 },
    { date: "Week 3", tickets: 238, resolved: 210 },
    { date: "Week 4", tickets: 248, resolved: 225 },
    { date: "Week 5", tickets: 265, resolved: 240 },
    { date: "Week 6", tickets: 270, resolved: 252 },
  ],
  categories: [
    { name: "High", count: 45, color: "#ef4444" },
    { name: "Medium", count: 128, color: "#f59e0b" },
    { name: "Low", count: 75, color: "#10b981" },
  ],
  details: [
    { id: "INC001", title: "Network Outage - Floor 3", status: "In Progress", priority: "High", assignee: "John Doe" },
    { id: "INC002", title: "Email Server Down", status: "Resolved", priority: "High", assignee: "Jane Smith" },
    { id: "INC003", title: "VPN Connection Issues", status: "Open", priority: "Medium", assignee: "Bob Wilson" },
    { id: "INC004", title: "Printer Configuration", status: "Pending", priority: "Low", assignee: "Alice Brown" },
  ],
};

// HR data (People & Workforce)
export const hrData = {
  type: "hr",
  metrics: [
    { name: "Total Employees", value: 3420, unit: "people", trend: 8 },
    { name: "Active Users", value: 2847, unit: "online", trend: 5 },
    { name: "Utilization Rate", value: 87, unit: "%", trend: 3 },
    { name: "Satisfaction Score", value: 4.6, unit: "/5", trend: 2 },
  ],
  timeSeries: [
    { month: "January", onSite: 2100, remote: 890, hybrid: 430 },
    { month: "February", onSite: 2150, remote: 920, hybrid: 410 },
    { month: "March", onSite: 2200, remote: 850, hybrid: 470 },
    { month: "April", onSite: 2180, remote: 910, hybrid: 450 },
    { month: "May", onSite: 2240, remote: 870, hybrid: 490 },
    { month: "June", onSite: 2280, remote: 920, hybrid: 470 },
  ],
  categories: [
    { name: "Engineering", count: 1120, color: "#3b82f6" },
    { name: "Sales", count: 750, color: "#10b981" },
    { name: "Operations", count: 680, color: "#f59e0b" },
    { name: "Finance", count: 340, color: "#8b5cf6" },
    { name: "HR", count: 287, color: "#ec4899" },
  ],
  details: [
    { name: "Engineering Team", members: 1120, utilization: "94%", satisfaction: 4.8 },
    { name: "Sales Team", members: 750, utilization: "91%", satisfaction: 4.3 },
    { name: "Operations", members: 680, utilization: "82%", satisfaction: 4.5 },
    { name: "Finance Department", members: 340, utilization: "78%", satisfaction: 4.2 },
  ],
};

// CRM data (Salesforce-like)
export const salesforceData = {
  type: "crm",
  metrics: [
    { name: "Total Deals", value: 456, unit: "deals", trend: 15 },
    { name: "Pipeline Value", value: 45.2, unit: "$M", trend: 22 },
    { name: "Win Rate", value: 68, unit: "%", trend: 4 },
    { name: "Avg Deal Size", value: 98.7, unit: "$K", trend: 8 },
  ],
  timeSeries: [
    { month: "Jan", revenue: 2400, forecast: 2300 },
    { month: "Feb", revenue: 2800, forecast: 2800 },
    { month: "Mar", revenue: 3200, forecast: 3100 },
    { month: "Apr", revenue: 2900, forecast: 3000 },
    { month: "May", revenue: 3600, forecast: 3400 },
    { month: "Jun", revenue: 3900, forecast: 3800 },
  ],
  categories: [
    { name: "Closed Won", count: 312, color: "#10b981" },
    { name: "In Negotiation", count: 89, color: "#f59e0b" },
    { name: "Proposal", count: 55, color: "#3b82f6" },
  ],
  details: [
    { deal: "Acme Corp - Enterprise", value: "$450K", stage: "Closed Won", owner: "Sarah Chen" },
    { deal: "TechStart Inc - Startup", value: "$85K", stage: "In Negotiation", owner: "Mike Johnson" },
    { deal: "Global Industries", value: "$320K", stage: "Proposal", owner: "Emma Davis" },
    { deal: "FutureVentures", value: "$125K", stage: "Closed Won", owner: "Alex Rodriguez" },
  ],
};

// Project Management data (Jira-like)
export const jiraData = {
  type: "project_management",
  metrics: [
    { name: "Total Issues", value: 847, unit: "issues", trend: 12 },
    { name: "In Progress", value: 56, unit: "active", trend: 3 },
    { name: "Completion Rate", value: 82, unit: "%", trend: 7 },
    { name: "Avg Sprint Velocity", value: 145, unit: "points", trend: 5 },
  ],
  timeSeries: [
    { sprint: "Sprint 1", planned: 150, completed: 142, velocity: 142 },
    { sprint: "Sprint 2", planned: 160, completed: 158, velocity: 158 },
    { sprint: "Sprint 3", planned: 140, completed: 135, velocity: 135 },
    { sprint: "Sprint 4", planned: 155, completed: 152, velocity: 152 },
    { sprint: "Sprint 5", planned: 165, completed: 163, velocity: 163 },
    { sprint: "Sprint 6", planned: 145, completed: 140, velocity: 140 },
  ],
  categories: [
    { name: "Bug", count: 234, color: "#ef4444" },
    { name: "Feature", count: 412, color: "#3b82f6" },
    { name: "Enhancement", count: 201, color: "#8b5cf6" },
  ],
  details: [
    { key: "PROJ-1245", title: "Implement user authentication", status: "In Progress", priority: "High" },
    { key: "PROJ-1246", title: "Dashboard redesign", status: "Review", priority: "High" },
    { key: "PROJ-1247", title: "Database optimization", status: "In Progress", priority: "Medium" },
    { key: "PROJ-1248", title: "API documentation", status: "To Do", priority: "Low" },
  ],
};

// Workplace/Facilities data (Genesis-like)
export const genesisData = {
  type: "workplace",
  metrics: [
    { name: "Occupancy", value: 78, unit: "%", trend: 5 },
    { name: "Meeting Rooms", value: 142, unit: "available", trend: 8 },
    { name: "Workstations", value: 3200, unit: "total", trend: 2 },
    { name: "Energy Usage", value: 82, unit: "efficiency %", trend: -3 },
  ],
  timeSeries: [
    { day: "Monday", occupied: 2100, available: 800, utilized: 72 },
    { day: "Tuesday", occupied: 2350, available: 550, utilized: 81 },
    { day: "Wednesday", occupied: 2450, available: 450, utilized: 84 },
    { day: "Thursday", occupied: 2300, available: 600, utilized: 79 },
    { day: "Friday", occupied: 1950, available: 950, utilized: 67 },
    { day: "Saturday", occupied: 420, available: 2480, utilized: 14 },
  ],
  categories: [
    { name: "Floor 1", count: 620, color: "#3b82f6" },
    { name: "Floor 2", count: 680, color: "#10b981" },
    { name: "Floor 3", count: 720, color: "#f59e0b" },
    { name: "Floor 4", count: 700, color: "#8b5cf6" },
  ],
  details: [
    { location: "Floor 1 - North Wing", status: "Active", utilization: "85%", capacity: 620 },
    { location: "Floor 2 - South Wing", status: "Active", utilization: "78%", capacity: 680 },
    { location: "Floor 3 - Meeting Hub", status: "Active", utilization: "91%", capacity: 720 },
    { location: "Floor 4 - Innovation Lab", status: "Maintenance", utilization: "45%", capacity: 700 },
  ],
};

// Map data source names to their schemas
export const dataSourceMap: Record<string, any> = {
  // "ServiceNow": serviceNowData,
  // "Genesis": genesisData,
  // "Salesforce": salesforceData,
  // "Jira": jiraData,
  // "HR": hrData,

  // Metric-named aliases used in the dropdown
  "Space Utilization": genesisData,
  "Employee Satisfaction": hrData,
  "Energy Efficiency": genesisData,
  "Booking Rate": genesisData,
  "Active Employees": hrData,
  "CSV Upload": null,
};

// Get data by source name
export function getDataBySource(sourceName: string): any {
  return dataSourceMap[sourceName] || null;
}
