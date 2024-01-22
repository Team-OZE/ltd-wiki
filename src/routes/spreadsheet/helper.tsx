export const formatWc3String = (s: string) => {
    s = s.replace(/\|n/g, '<br/>')
    // @ts-ignore
    const textPortions = s.split(/\|c([0-9A-Fa-f]{2})([0-9A-Fa-f]{6})|\|r/g)
    let match
    const matches: string[] = []
    const regex = /\|c([0-9A-Fa-f]{2})([0-9A-Fa-f]{6})|\|r/g
    while ((match = regex.exec(s))) {
        matches.push(match[2] ? '#'+ match[2] : 'unset')
    }
    const strings = s.split(/\|c[0-9A-Fa-f]{2}[0-9A-Fa-f]{6}|\|r/g)
    console.log(matches, strings)
    const res_strings = strings.map((x, i) => i > 0 ? `<span style="color: ${matches[i-1]}">${x}</span>` : x)
    return <span dangerouslySetInnerHTML={{__html: res_strings.join('')}}/>
}

const baseKingDamages = {
    'x1': 100,
    'x3': 200,
    'x4': 200
}

export const calculateKingUpgradesNeededToKillWithHits = (hits: number, creepHp: number, creepArmor: number, mode: 'x1' | 'x3' | 'x4', waveNo: number) => {
    let baseKingDmgModifier = 1
    if(['x3', 'x4'].includes(mode) && waveNo < 5) {
        baseKingDmgModifier = 1.6
    }
    const calc = Math.max(Math.ceil(
        (
            creepHp / (
                1 - (.06*creepArmor/(1+.06*creepArmor))
            ) / hits - (baseKingDamages[mode] * baseKingDmgModifier)
        ) / 10
    ), 0)

    if(calc > 50) return '-'
    else return calc
}