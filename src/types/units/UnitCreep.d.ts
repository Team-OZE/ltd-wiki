import Unit from "./Unit";

export default interface UnitCreep extends Unit {
    wave: number
    damageHm: {
        min: number,
        max: number
    }
}