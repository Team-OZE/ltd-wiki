import Unit from "./Unit";
import {XGameMode, MinMax} from "../util/index";

export default interface UnitSummon extends Unit {
    lumberCost: number
    bounty: number
    income: number
    mode: XGameMode
    damageHm: MinMax,
}