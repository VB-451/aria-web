import {useSettings} from "../providers/settings-provider.tsx";

type RangeProps = {
    arrayOfMargins: number[];
    step: number,
    value: number,
    valueName: string,
    onChangeFunction: (value: number) => void
}

export default function Range({arrayOfMargins, step, value, valueName, onChangeFunction}: RangeProps) {

    const { updateSettings } = useSettings();

    const changeSetting = (setting: string, value: number) =>{
        updateSettings({
            [setting]: value
        })
    }

    return (
        <div className="w-1/2 flex flex-col justify-center items-center">
            <input type="range" min={arrayOfMargins[0]} max={arrayOfMargins[arrayOfMargins.length-1]} step={step} value={value} className="h-1.5 w-full mb-2 bg-gray-200 cursor-pointer accent-primary_mauve"
                   onChange={(e)=>{onChangeFunction(Number(e.target.value))}}
                   onMouseUp={()=>{changeSetting(valueName, value)}}
            />
            <div className="w-98/100 flex justify-between">
                {arrayOfMargins.map((value) => (
                    <span key={value} className="text-xs text-neutral-300">{value}</span>
                ))}
            </div>
        </div>
    )
}