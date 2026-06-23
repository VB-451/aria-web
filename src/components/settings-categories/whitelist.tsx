import WhitelistModal from "../whitelist/whitelist-modal.tsx";
import {useModal} from "../../providers/modal-provider.tsx";
import {useWhitelist} from "../../providers/whitelist-provider.tsx";
import WhitelistNodeModal from "../whitelist/whitelist-node-modal.tsx";

export default function WhitelistCategory() {

    const { whitelist } = useWhitelist()

    const { showModal } = useModal();

    return (
        <div className="px-1 py-2 flex flex-col gap-2">
            <span className="">Apps:</span>
            <div className="flex gap-1 border-b pb-3 border-neutral-900">
                <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                        onClick={() => showModal(<WhitelistModal name="" type={"apps"} />)}
                >+</button>
                {Object.keys(whitelist.apps).map((app) => (
                    <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                            onClick={() => {
                                showModal(<WhitelistModal name={app} type={"apps"} />)
                            }}>
                        {app}
                    </button>
                ))}
            </div>
            <span className="">Links:</span>
            <div className="flex gap-1 border-b pb-3 border-neutral-900">
                <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                        onClick={() => showModal(<WhitelistModal name="" type={"links"} />)}
                >+</button>
                {Object.keys(whitelist.links).map((link) => (
                    <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                            onClick={() => {
                                showModal(<WhitelistModal name={link} type={"links"} />)
                            }}>
                        {link}
                    </button>
                ))}
            </div>
            <span className="">Node:</span>
            <div className="flex gap-1">
                <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                        onClick={() => showModal(<WhitelistNodeModal name="" />)}
                >+</button>
                {Object.keys(whitelist.node).map((node) => (
                    <button className="p-2 text-sm bg-white/3 hover:bg-primary_purple transition-colors rounded-lg"
                            onClick={() => {
                                showModal(<WhitelistNodeModal name={node} />)
                            }}>
                        {node}
                    </button>
                ))}
            </div>
        </div>
    )
}