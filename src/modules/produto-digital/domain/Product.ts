import { v4 as uuidv4 } from "uuid";
import Sigla from "./Sigla";

export default class Product {
  private _id: string;
  get id() {
    return this._id;
  }
  private _sigla: Sigla;
  get sigla() {
    return this._sigla;
  }
  private _squad: string;
  get squad() {
    return this._squad;
  }
  private _name: string;
  get name() {
    return this._name;
  }
  private _description?: string;
  get description() {
    return this._description;
  }
  private _disabled: boolean;
  get disabled() {
    return this._disabled;
  }
  private _appDynamicsFrontend: boolean = false;
  get appDynamicsFrontend() {
    return this._appDynamicsFrontend;
  }
  private _appDynamicsBackend: boolean = false;
  get appDynamicsBackend() {
    return this._appDynamicsBackend;
  }
  private _googleAnalytics: boolean = false;
  get googleAnalytics() {
    return this._googleAnalytics;
  }
  private _grafanaCloudWatch: boolean = false;
  get grafanaCloudWatch() {
    return this._grafanaCloudWatch;
  }
  private _grafanaPrometheus: boolean = false;
  get grafanaPrometheus() {
    return this._grafanaPrometheus;
  }
  private _sonarqubeCoverage?: string;
  get sonarqubeCoverage() {
    return this._sonarqubeCoverage;
  }
  private _sonarqube?: string;
  get sonarqube() {
    return this._sonarqube;
  }
  private _fortify?: string;
  get fortify() {
    return this._fortify;
  }
  private _iuConfia?: string;
  get iuConfia() {
    return this._iuConfia;
  }

  private constructor(
    id: string,
    sigla: Sigla,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
    appDynamicsFrontend?: boolean,
    appDynamicsBackend?: boolean,
    googleAnalytics?: boolean,
    grafanaCloudWatch?: boolean,
    grafanaPrometheus?: boolean,
    sonarqubeCoverage?: string,
    sonarqube?: string,
    fortify?: string,
    iuConfia?: string,
  ) {
    this._id = id;
    this._sigla = sigla;
    this._squad = squad;
    this._name = name;
    this._description = description ?? "";
    this._disabled = disabled ?? false;
    this._appDynamicsFrontend = appDynamicsFrontend ?? false;
    this._appDynamicsBackend = appDynamicsBackend ?? false;
    this._googleAnalytics = googleAnalytics ?? false;
    this._grafanaCloudWatch = grafanaCloudWatch ?? false;
    this._grafanaPrometheus = grafanaPrometheus ?? false;
    this._sonarqubeCoverage = sonarqubeCoverage ?? "";
    this._sonarqube = sonarqube ?? "";
    this._fortify = fortify ?? "";
    this._iuConfia = iuConfia ?? "";
  }

  updateId(id: string): Product {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    sigla: Sigla,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
    appDynamicsFrontend?: boolean,
    appDynamicsBackend?: boolean,
    googleAnalytics?: boolean,
    grafanaCloudWatch?: boolean,
    grafanaPrometheus?: boolean,
    sonarqubeCoverage?: string,
    sonarqube?: string,
    fortify?: string,
    iuConfia?: string,
  ) {
    if (!sigla || !sigla.id) throw Error("A sigla deve ser informada");
    if (!squad) throw Error("A squad deve ser informada");
    if (!name) throw Error("O nome do produto deve ser informado");
    const id = uuidv4();
    return new Product(
      id,
      sigla,
      squad,
      name,
      description,
      disabled,
      appDynamicsFrontend,
      appDynamicsBackend,
      googleAnalytics,
      grafanaCloudWatch,
      grafanaPrometheus,
      sonarqubeCoverage,
      sonarqube,
      fortify,
      iuConfia,
    );
  }

  static restore(
    id: string,
    sigla: Sigla,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
    appDynamicsFrontend?: boolean,
    appDynamicsBackend?: boolean,
    googleAnalytics?: boolean,
    grafanaCloudWatch?: boolean,
    grafanaPrometheus?: boolean,
    sonarqubeCoverage?: string,
    sonarqube?: string,
    fortify?: string,
    iuConfia?: string,
  ) {
    return new Product(
      id,
      sigla,
      squad,
      name,
      description,
      disabled,
      appDynamicsFrontend,
      appDynamicsBackend,
      googleAnalytics,
      grafanaCloudWatch,
      grafanaPrometheus,
      sonarqubeCoverage,
      sonarqube,
      fortify,
      iuConfia,
    );
  }
}
