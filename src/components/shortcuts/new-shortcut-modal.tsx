import {useState} from "react";
import Select from "react-select";
import {useModal} from "../../providers/modal-provider.tsx";

export default function NewShortcutModal({add} : {add: (name:string, color: string, prompt: string) => void}) {

    const { closeModal } = useModal();

    const colors = [
        {value: "purple", label: "Purple"},
        {value: "brown", label: "Brown"},
        {value: "cyan", label: "Cyan"},
        {value: "green", label: "Green"},
        {value: "blue", label: "Blue"},
        {value: "mauve", label: "Mauve"},
    ]

    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<{ value: string; label: string } | null>(null);
    const [prompt, setPrompt] = useState<string>("");

    const isNotValidated = !name || !color || !prompt;

    const handleNewShortcut = (e) =>{
        e.preventDefault();
        if(color){
            add(name, color.value, prompt);
            closeModal()
        }
    }

    return (
        <form className="bg-background w-[600px] h-fit rounded-lg flex gap-2 flex-col px-2 py-3" onSubmit={handleNewShortcut}>
            <input type="text" value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Enter new shortcut name:"
                   className="outline-0 placeholder:text-neutral-600 h-9 px-1 rounded transition-colors delay-50 duration-350 hover:bg-white/3"
            />
            <Select unstyled isSearchable={false} value={color} onChange={setColor} options={colors} placeholder={"Select color:"}
                    classNames={{
                        control: () =>
                            `text-primary_${color?.value} px-1 hover:bg-white/3 transition-colors delay-50 duration-350 rounded`,
                        option: (state) =>
                            `px-1 py-1  rounded-md ${
                                state.isFocused
                                    ? "bg-neutral-800 text-white transition-colors"
                                    : `bg-background text-primary_${state.data.value}`
                            }`,
                        placeholder: () =>
                            "text-neutral-600"
                    }}
            />
            <textarea
                className="outline-0 h-40 mb-4 p-1 resize-none placeholder:text-neutral-600 rounded transition-colors delay-50 duration-350 hover:bg-white/3"
                placeholder="Enter prompt:"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <div className="flex justify-around">
                <button className="px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
                        type="button"
                        onClick={closeModal}>Cancel</button>
                <button className={`px-2 py-1 rounded bg-primary_purple hover:bg-primary_purple/80 transition-colors
                disabled:bg-neutral-800`}
                        disabled={isNotValidated}
                        type="submit"
                >Add New Shortcut</button>
            </div>
        </form>
    )
}