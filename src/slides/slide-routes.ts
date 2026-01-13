import {generateRoutesFromList} from "../utils.ts";
import {numberSystemsRoutes} from "./number-systems/number-systems-routes.ts";
import {bitwiseOpsRoutes} from "./binary-operations/binary-operations.routes.ts";
import {ramAndCartridgeRoutes} from "./ram-and-cartridge/ram-and-cartridge.routes.ts";
import {cpuRoutes} from "./cpu/cpu.routes.ts";
import {gpuRoutes} from "./gpu/gpu.routes.ts";

export const slideRoutes = [
  ...generateRoutesFromList(numberSystemsRoutes),
  ...generateRoutesFromList(bitwiseOpsRoutes),
  ...generateRoutesFromList(ramAndCartridgeRoutes),
  ...generateRoutesFromList(cpuRoutes),
  ...generateRoutesFromList(gpuRoutes),
];
