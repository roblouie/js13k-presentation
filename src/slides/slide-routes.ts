import {howSmallIs13kRoutes} from "./how-small-is-13k/how-small-is-13k.routes.ts";
import {generateRoutesFromList} from "../utils.ts";
import {demoVideoRoutes} from "./demo-video/demo-video.routes.ts";
import {howTexturesWorkRoutes} from "./how-textures-work/how-textures-work.routes.ts";
import {threeDModelingRoutes} from "./3d-modeling/3d-modeling.routes.ts";
import {audioRoutes} from "./audio/audio.routes.ts";
import {buildProcessRoutes} from "./build-process/build-process.routes.ts";
import {numberSystemsRoutes} from "./number-systems/number-systems-routes.ts";
import {bitwiseOpsRoutes} from "./binary-operations/binary-operations.routes.ts";
import {ramAndCartridgeRoutes} from "./ram-and-cartridge/ram-and-cartridge.routes.ts";

export const slideRoutes = [
  ...generateRoutesFromList(numberSystemsRoutes),
  ...generateRoutesFromList(bitwiseOpsRoutes),
  ...generateRoutesFromList(ramAndCartridgeRoutes),
];
