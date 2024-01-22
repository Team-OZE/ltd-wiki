import Unit from "../../types/units/Unit";
import {Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {ArmorType, AttackType, Race} from "../../types/util";
import styles from './styles.module.css'
import {Ability} from "../../types/Ability";
import React, {useEffect, useState} from "react";
import {UnitFighter} from "../../types/units/UnitFighter";
import {calculateKingUpgradesNeededToKillWithHits, formatWc3String} from "./helper";
const endpoint = '/assets/data/fighter.json'
export default function BuilderSpreadsheet() {
    const [data, setData] = useState<UnitFighter[]>([])

    useEffect(()=>{
        fetch(endpoint).then((d)=>d.json()).then(setData)
    },[])

    const AbilityRender: React.FC<{ability: Ability}> = ({ability}) => {
        return <Tooltip className={styles.abbr} title={formatWc3String(ability.description)} placement={'top'}>
            <span>{formatWc3String(ability.name)}</span>
        </Tooltip>
    }

    const renderAbilities = (abilities: Ability[] | undefined) => {
        // @ts-ignore
        return abilities && abilities.length ? abilities.reduce((prev, cur) => {
            if(prev.length) {
                return [...prev, <span>, </span>, <AbilityRender ability={cur}/>]
            }
            else return [<AbilityRender ability={cur}/>]
        }, []) : '-'
    }

    const renderUnit = (x: UnitFighter, col: string) => {
        return <TableRow key={`tr_${x.id}`} className={styles.tr}>
            <TableCell align={'right'}><img src={'/assets/icons/units/'+x.id+'.png'} loading={'lazy'}/></TableCell>
            <TableCell style={{color: col}}>{x.name}</TableCell>
            <TableCell>{x.goldCost}</TableCell>
            <TableCell>{x.hp}</TableCell>
            <TableCell>{x.range}</TableCell>
            <TableCell>{x.damage.min} - {x.damage.max}</TableCell>
            <TableCell>{x.attackSpeed.toFixed(2) || 'N/A'}</TableCell>
            <TableCell>{((x.damage.min + x.damage.max) / (2*x.attackSpeed)).toFixed(1)}</TableCell>
            <TableCell>{x.movementSpeed.toFixed(0) || 'N/A'}</TableCell>
            {/*@ts-ignore*/}
            <TableCell><span className={styles.tdContainer}>{(x.attackType) && <img src={`/assets/icons/attack/${x.attackType}.webp`}/>}{x.attackType? AttackType[x.attackType] : 'N/A'}</span></TableCell>
            {/*@ts-ignore*/}
            <TableCell><span className={styles.tdContainer}>{(x.armorType) && <img src={`/assets/icons/armor/${x.armorType}.webp`}/>}{x.armorType? ArmorType[x.armorType] : 'N/A'}</span></TableCell>
            {/*@ts-ignore*/}
            <TableCell>{
                renderAbilities(x.abilities)
            }</TableCell>
        </TableRow>
    }

    const renderRows = (units: UnitFighter[]) => {
        const palette = [
            '#dcdcdc',
            '#b4b4b4'
        ]
        // @ts-ignore
        let lastTier = null
        // @ts-ignore
        return units.filter(x=>!!x.tier).sort((a, b)=>a.tier - b.tier).map((x, i)=>{
            // @ts-ignore
            const h = lastTier !== x.tier ? <TableRow className={styles.trH} ><TableCell colSpan={'100%'}>Tier {x.tier}</TableCell></TableRow> : null
            lastTier = x.tier
            // @ts-ignore
            const col = palette[i % palette.length]
            return <>
                {h}
                {renderUnit(x, col)}
                {/* @ts-ignore */}
                {x.upgrades.map(y=><>
                    {/* @ts-ignore */}
                    {renderUnit(units.find(k=>k.id === y), col)}
                    {/* @ts-ignore */}
                    {units.find(k=>k.id === y).upgrades.map(z=>renderUnit(units.find(k=>k.id === z), col))}
                </>)}
            </>
        })
    }

    return <div>
        <Table>
            <TableHead className={styles.th} sx={{'& > th': {top: '5rem'}}}>
                <TableCell/>
                <TableCell>Name</TableCell>
                <TableCell>Gold cost</TableCell>
                <TableCell>HP</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Damage</TableCell>
                <TableCell>Att Speed</TableCell>
                <TableCell>DPS</TableCell>
                <TableCell>Mov Speed</TableCell>
                <TableCell>Attack</TableCell>
                <TableCell>Armor</TableCell>
                <TableCell>Abilities</TableCell>
            </TableHead>
            <TableBody>
                {renderRows(data)}
            </TableBody>
        </Table>
    </div>
}