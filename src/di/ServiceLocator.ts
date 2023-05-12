import { BoardRepository } from "../repository/BoardRepository";
import { BoardService } from "../services/BoardService";
import { FaqService } from "../services/FaqService";
import { OverviewService } from "../services/OverviewService";
import { ProjectService } from "../services/ProjectService";
import { SettingsService } from "../services/SettingsService";

const dependencyStore: any = {
  BoardService,
  BoardRepository,
  FaqService,
  OverviewService,
  ProjectService,
  SettingsService,
};

export class ServiceLocator {
  serviceMap: Map<string, string> = new Map<string, string>();
  serviceInstances: Map<string, any> = new Map<string, any>();

  register(abstraction: string, implementation: string) {
    this.serviceMap.set(abstraction, implementation);
  }

  resolve<T>(abstraction: string) {
    if (!this.serviceMap.has(abstraction))
      throw Error("No service of this abstraction has been registered.");

    let type = this.serviceMap.get(abstraction) || "";

    if (!dependencyStore[type])
      throw Error(`Dependency store has no dependency called ${type}`);

    let instance: T;

    if (!this.serviceInstances.has(abstraction)) {
      console.log(">> nova instancia", abstraction);
      this.serviceInstances.set(abstraction, new dependencyStore[type]());
    }

    instance = this.serviceInstances.get(abstraction);
    return instance as T;
  }
}
