import Range from "../range.tsx";
import {useSelector} from "react-redux";

export default function GeneralCategory() {

    const interactionsNumber = useSelector(state => state.settings.numberOfInteractionsContext)

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Number of interactions used for context:</div>
                <Range arrayOfMargins={[1,2,3]} step={1} value={interactionsNumber} valueName={"numberOfInteractionsContext"} />
            </div>
        </div>
    )
}