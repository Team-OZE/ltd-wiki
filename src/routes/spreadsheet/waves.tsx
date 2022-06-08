import {
    Checkbox,
    FormControl, InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {ArmorType, AttackType} from "../../types/util";
import styles from './styles.module.css'
import {Ability} from "../../types/Ability";
import React, {useEffect, useState} from "react";
import UnitCreep from "../../types/units/UnitCreep";
import {calculateKingUpgradesNeededToKillWithHits, formatWc3String} from "./helper";

const endpoint = '/assets/data/creep.json'
export default function WavesSpreadsheet() {
    const [data, setData] = useState<UnitCreep[]>([])
    const [plus5Arm, setPlus5Arm] = useState<boolean>(false)
    const [mode, setMode] = useState<'x1'|'x3'|'x4'>('x1')

    useEffect(()=>{
        fetch(endpoint).then((d)=>d.json()).then(setData)
    },[])

    const AbilityRender: React.FC<{ability: Ability}> = ({ability}) => {
        return <Tooltip className={styles.abbr} title={formatWc3String(ability.description)} placement={'top'}><span>{ability.name}</span></Tooltip>
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

    const renderUnit = (x: UnitCreep, col: string) => {
        return <TableRow key={`tr_${x.id}`} className={styles.tr}>
            <TableCell align={'right'}><img src={'/assets/icons/units/'+x.id+'.png'} loading={'lazy'}/></TableCell>
            <TableCell>{x.wave}</TableCell>
            <TableCell style={{color: col}}>{x.name}</TableCell>
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
            <TableCell colSpan={2} align={'center'}>
                {calculateKingUpgradesNeededToKillWithHits(3, x.hp, 8+(plus5Arm?5:0), mode)}
            </TableCell>
            <TableCell colSpan={2} align={'center'}>
                {calculateKingUpgradesNeededToKillWithHits(2, x.hp, 8+(plus5Arm?5:0), mode)}
            </TableCell>
            <TableCell colSpan={2} align={'center'}>
                {calculateKingUpgradesNeededToKillWithHits(1, x.hp, 8+(plus5Arm?5:0), mode)}
            </TableCell>
        </TableRow>
    }

    const renderRows = (units: UnitCreep[]) => {
        const palette = [
            '#dcdcdc',
            '#b4b4b4'
        ]
        // @ts-ignore
        return units.map((x, i)=>{
            // @ts-ignore
            const col = palette[i % palette.length]
            return <>
                {renderUnit(x, col)}
            </>
        })
    }

    return <div>
        <Table>
            <TableHead className={styles.th} sx={{'& > th': {top: '5rem'}}}>
                <TableRow>
                    <TableCell rowSpan={2}/>
                    <TableCell rowSpan={2}>Wave</TableCell>
                    <TableCell rowSpan={2}>Name</TableCell>
                    <TableCell rowSpan={2}>HP</TableCell>
                    <TableCell rowSpan={2}>Range</TableCell>
                    <TableCell rowSpan={2}>Damage</TableCell>
                    <TableCell rowSpan={2}>Att Speed</TableCell>
                    <TableCell rowSpan={2}>DPS</TableCell>
                    <TableCell rowSpan={2}>Mov Speed</TableCell>
                    <TableCell rowSpan={2}>Attack</TableCell>
                    <TableCell rowSpan={2}>Armor</TableCell>
                    <TableCell rowSpan={2}>Abilities</TableCell>
                    <TableCell colSpan={2} align={'center'}>King dmg upgrades</TableCell>
                    <TableCell colSpan={2} align={'center'}>
                        <FormControl>
                            <InputLabel>Mode</InputLabel>
                            <Select onChange={(e)=>{
                                // @ts-ignore
                                setMode(e.target.value)
                            }} sx={{'& > fieldset > legend >span': {color: 'white'}}} color={'primary'} value={mode}>
                                <MenuItem value={'x1'}>x1</MenuItem>
                                <MenuItem value={'x3'}>x3</MenuItem>
                                <MenuItem value={'x4'}>x4</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell colSpan={2} align={'center'}><Checkbox checked={plus5Arm} onChange={(e)=>{
                        setPlus5Arm(e.target.checked)
                    }} color={'primary'}/> +5 arm</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align={'center'} colSpan={2}>3 hits</TableCell>
                    <TableCell align={'center'} colSpan={2}>2 hits</TableCell>
                    <TableCell align={'center'} colSpan={2}>1 hit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {renderRows(data)}
            </TableBody>
        </Table>
    </div>
}