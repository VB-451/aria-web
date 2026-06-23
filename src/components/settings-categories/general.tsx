import {useSettings} from "../../providers/settings-provider.tsx"
import {useEffect, useState} from "react";
import Range from "../range.tsx";

export default function GeneralCategory() {

    const { settings } = useSettings();

    const [interactionsNumber, setInteractionsNumber] = useState(settings.numberOfInteractionsContext);

    useEffect(() => {
        setInteractionsNumber(settings.numberOfInteractionsContext);
    }, [settings.numberOfInteractionsContext]);

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Number of interactions used for context:</div>
                <Range arrayOfMargins={[1,2,3]} step={1} value={interactionsNumber} valueName={"numberOfInteractionsContext"} onChangeFunction={setInteractionsNumber} />
            </div>
        </div>
    )
}