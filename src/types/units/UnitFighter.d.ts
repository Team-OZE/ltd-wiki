import Unit from "./Unit";

interface UnitFighter extends Unit {
    tier: number | null,
    goldCost: number,
    upgrades: Array[string]
}