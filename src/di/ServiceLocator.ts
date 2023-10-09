export class ServiceLocator {
  serviceMap: Map<string, any> = new Map<string, any>();
  serviceInstances: Map<string, any> = new Map<string, any>();

  register(abstraction: string, implementation: any) {
    this.serviceMap.set(abstraction, implementation);
  }

  resolve<T>(abstraction: string) {
    if (!this.serviceMap.has(abstraction))
      throw Error("No service of this abstraction has been registered.");

    if (!this.serviceInstances.has(abstraction)) {
      console.log(">> new instance", abstraction);
      let implementation = this.serviceMap.get(abstraction);
      this.serviceInstances.set(abstraction, new implementation());
    }

    return this.serviceInstances.get(abstraction) as T;
  }
}
