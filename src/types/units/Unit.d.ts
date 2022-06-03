import {ArmorType, AttackType, MinMax, Race} from "../util/index";
import {Ability} from "../Ability";

export default interface Unit {
    id: string
    name: string
    type: string
    damage: MinMax
    attackSpeed: number
    attackType: AttackType
    armorType: ArmorType
    hp: number
    range: number
    movementSpeed: number
    abilities: Ability[]
}