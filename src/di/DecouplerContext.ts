import { createContext, useContext } from "react";

import { ServiceLocator } from "./ServiceLocator";

export const DecouplerContext = createContext<ServiceLocator>(
  new ServiceLocator()
);

export function useService<T>(abstraction: string): T {
  const locator = useContext(DecouplerContext);
  let instance = locator.resolve<T>(abstraction);
  return instance;
}
