import {useParams} from 'react-router-dom'
import BarracksSpreadsheet from "./barracks";
import WavesSpreadsheet from "./waves";
import BuilderSpreadsheet from "./builder";
import HeroSpreadsheet from "./hero";

const choices = {
    barracks: <BarracksSpreadsheet/>,
    waves: <WavesSpreadsheet/>,
    builder: <BuilderSpreadsheet/>,
    heroes: <HeroSpreadsheet/>
}

export default function SpreadsheetPage() {
    const { spreadsheetKey } = useParams()

    return <div>
        {
            // @ts-ignore
            choices?.[spreadsheetKey] || '404'
        }
    </div>

}