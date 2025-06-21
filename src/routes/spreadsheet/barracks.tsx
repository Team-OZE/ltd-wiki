import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {ArmorType, AttackType} from "../../types/util";
import styles from './styles.module.css'
import {Ability} from "../../types/Ability";
import React, {useEffect, useState} from "react";
import UnitSummon from "../../types/units/UnitSummon";
import {formatWc3String} from "./helper";

const endpoint = '/assets/data/summons.json'
export default function BarracksSpreadsheet() {
    const [data, setData] = useState<UnitSummon[]>([])
    const [isHm, setHm] = useState<boolean>(false)

    useEffect(()=>{
        fetch(endpoint).then((d)=>d.json()).then(setData)
    },[])

    const AbilityRender: React.FC<{ability: Ability}> = ({ability}) => {
        return <Tooltip className={styles.abbr} title={formatWc3String(ability.description)} placement={'top'}><span>{formatWc3String(ability.name)}</span></Tooltip>
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

    const renderUnit = (x: UnitSummon, col: string) => {
        return <TableRow key={`tr_${x.id}`} className={styles.tr}>
            <TableCell align={'right'}><img src={'/assets/icons/units/'+x.id+'.png'} loading={'lazy'}/></TableCell>
            <TableCell style={{color: col}}>{x.name}</TableCell>
            <TableCell>{x.lumberCost}</TableCell>
            <TableCell>{x.income}</TableCell>
            <TableCell>{x.bounty}</TableCell>
            <TableCell>{x.hp}</TableCell>
            <TableCell>{x.range}</TableCell>
            <TableCell>{x[isHm?'damageHm':'damage'].min} - {x[isHm?'damageHm':'damage'].max}</TableCell>
            <TableCell>{x.attackSpeed.toFixed(2) || 'N/A'}</TableCell>
            <TableCell>{((x[isHm?'damageHm':'damage'].min + x[isHm?'damageHm':'damage'].max) / (2*x.attackSpeed)).toFixed(1)}</TableCell>
            <TableCell>{x.movementSpeed.toFixed(0) || 'N/A'}</TableCell>
            {/*@ts-ignore*/}
            <TableCell><span className={styles.tdContainer}>{(x.attackType) && <img src={`/assets/icons/attack/${x.attackType}.webp`}/>}{x.attackType? AttackType[x.attackType] : 'N/A'}</span></TableCell>
            {/*@ts-ignore*/}
            <TableCell><span className={styles.tdContainer}>{(x.armorType) && <img src={`/assets/icons/armor/${x.armorType}.webp`}/>}{x.armorType? ArmorType[x.armorType] : 'N/A'}</span></TableCell>
            {/*@ts-ignore*/}
            <TableCell colSpan={2}>{
                renderAbilities(x.abilities)
            }</TableCell>
        </TableRow>
    }

    const renderRows = (units: UnitSummon[]) => {
        const palette = [
            '#dcdcdc',
            '#b4b4b4'
        ]
        // @ts-ignore
        let lastMode = null
        // @ts-ignore
        return units.sort((a, b)=>a.mode.localeCompare(b.mode)).map((x, i)=>{
            // @ts-ignore
            const h = lastMode !== x.mode ? <TableRow className={styles.trH} ><TableCell colSpan={'100%'}>{x.mode} mode</TableCell></TableRow> : null
            lastMode = x.mode
            // @ts-ignore
            const col = palette[i % palette.length]
            return <>
                {h}
                {renderUnit(x, col)}
            </>
        })
    }

    return <div>
        <Table>
            <TableHead className={styles.th} sx={{'& > th': {top: '5rem'}}}>
                <TableCell/>
                <TableCell>Name</TableCell>
                <TableCell>Lumber cost</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Bounty</TableCell>
                <TableCell>HP</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Damage</TableCell>
                <TableCell>Att Speed</TableCell>
                <TableCell>DPS</TableCell>
                <TableCell>Mov Speed</TableCell>
                <TableCell>Attack</TableCell>
                <TableCell>Armor</TableCell>
                <TableCell>Abilities</TableCell>
                <TableCell align={'center'}><Checkbox checked={isHm} onChange={(e)=>{
                    setHm(e.target.checked)
                }} color={'primary'}/> Hard Mode</TableCell>
            </TableHead>
            <TableBody>
                {renderRows(data)}
            </TableBody>
        </Table>
    </div>
}