export class ServiceLocator {
  serviceMap: Map<string, any> = new Map<string, any>();
  serviceInstances: Map<string, any> = new Map<string, any>();

  register(abstraction: string, implementation: any) {
    this.serviceMap.set(abstraction, implementation);
  }

  resolve<T>(abstraction: string) {
    if (!this.serviceMap.has(abstraction))
      throw Error("No service of this abstraction has been registered.");

    let implementation = this.serviceMap.get(abstraction) || "";

    let instance: T;

    if (!this.serviceInstances.has(abstraction)) {
      console.log(">> nova instancia", abstraction);
      this.serviceInstances.set(abstraction, new implementation());
    }

    instance = this.serviceInstances.get(abstraction);
    return instance as T;
  }
}
