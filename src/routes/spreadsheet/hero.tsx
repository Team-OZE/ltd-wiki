import Unit from "../../types/units/Unit";
import {Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {ArmorType, AttackType, Race} from "../../types/util";
import styles from './styles.module.css'
import {Ability} from "../../types/Ability";
import React, {useEffect, useState} from "react";
import {UnitFighter} from "../../types/units/UnitFighter";
const endpoint = '/assets/data/hero.json'
export default function HeroSpreadsheet() {
    const [data, setData] = useState<UnitFighter[]>([])

    useEffect(()=>{
        fetch(endpoint).then((d)=>d.json()).then(setData)
    },[])

    useEffect(()=>{
        console.log(data)
    },[data])

    const formatWc3String = (s: string) => {
        // @ts-ignore
        if(s.includes('|c') || s.includes('|n')) {
            console.log(s)
            s = s.replace(/\|c([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})(.*)\|r/g, '<span style="color: #$1">$3</span>')
            s = s.replace(/\|n/g, '<br/>')
            console.log(s)
            return <span dangerouslySetInnerHTML={{__html: s}}/>
        }
        else return s
    }

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

    const renderUnit = (x: UnitFighter, col: string) => {
        return <TableRow className={styles.tr}>
            <TableCell align={'right'}><img src={'/assets/icons/units/'+x.id+'.png'} loading={'lazy'}/></TableCell>
            <TableCell style={{color: col}}>{formatWc3String(x.name)}</TableCell>
            <TableCell>{x.goldCost}</TableCell>
            <TableCell>{x.hp}</TableCell>
            <TableCell>{x.range}</TableCell>
            <TableCell>{x.damage.min} - {x.damage.max}</TableCell>
            <TableCell>{x.attackSpeed.toFixed(2) || 'N/A'}</TableCell>
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
        return units.filter(x=>!x.name.match(/Level ([4-9]|[0-9]{2})/)).map((x, i)=>{
            // @ts-ignore
            const col = palette[i % palette.length]
            return <>
                {renderUnit(x, col)}
            </>
        })
    }

    return <div>
        <Table stickyHeader={true}>
            <TableHead className={styles.th} sx={{'& > th': {top: '5rem'}}}>
                <TableCell/>
                <TableCell>Name</TableCell>
                <TableCell>Gold cost</TableCell>
                <TableCell>HP</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Damage</TableCell>
                <TableCell>Att Speed</TableCell>
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