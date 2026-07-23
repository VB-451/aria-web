import {useDispatch} from "react-redux";
import {updateSettings} from "../redux/settings/settings-slice.ts";
import {saveSettings} from "../redux/settings/settings-thunks.ts";

type RangeProps = {
    arrayOfMargins: number[];
    step: number,
    value: number,
    valueName: string
}

export default function Range({arrayOfMargins, step, value, valueName}: RangeProps) {

    const dispatch = useDispatch();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSettings({
            [valueName]: Number(e.target.value)
        }))
    }

    const handleOnMouseUp = () => {
        dispatch(saveSettings())
    }

    return (
        <div className="w-1/2 flex flex-col justify-center items-center">
            <input type="range" min={arrayOfMargins[0]} max={arrayOfMargins[arrayOfMargins.length-1]} step={step} value={value} className="h-1.5 w-full mb-2 bg-gray-200 cursor-pointer accent-primary_mauve"
                   onChange={handleOnChange}
                   onMouseUp={handleOnMouseUp}
            />
            <div className="w-98/100 flex justify-between">
                {arrayOfMargins.map((value) => (
                    <span key={value} className="text-xs text-neutral-300">{value}</span>
                ))}
            </div>
        </div>
    )
}