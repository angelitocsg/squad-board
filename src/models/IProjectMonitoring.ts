export interface IProjectMonitoring {
  service?: string;
  links?: IProjectMonitoringLinks[];

  projectId?: string;
}

export interface IProjectMonitoringLinks {
  label?: string;
  link?: string;
  environment?: "develop" | "homolog" | "production";
  remarks?: string;
}
