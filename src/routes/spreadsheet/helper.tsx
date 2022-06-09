export const formatWc3String = (s: string) => {
    // @ts-ignore
    if(s.includes('|c') || s.includes('|n')) {
        s = s.replace(/\|c([0-9A-Fa-f]{2})([0-9A-Fa-f]{6})(.*)\|r/g, '<span style="color: #$2">$3</span>')
        s = s.replace(/\|n/g, '<br/>')
        return <span dangerouslySetInnerHTML={{__html: s}}/>
    }
    else return s
}

const baseKingDamages = {
    'x1': 100,
    'x3': 200,
    'x4': 150
}

export const calculateKingUpgradesNeededToKillWithHits = (hits: number, creepHp: number, creepArmor: number, mode: 'x1' | 'x3' | 'x4') => {
    const calc = Math.max(Math.ceil(
        (
            creepHp / (
                1 - (.06*creepArmor/(1+.06*creepArmor))
            ) / hits - baseKingDamages[mode]
        ) / 10
    ), 0)

    if(calc > 50) return '-'
    else return calc
}