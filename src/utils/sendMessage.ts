// export const sendMessage = async (prompt: string) => {
//     const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/message`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             prompt,
//         })
//     })
//     return await response.json()
// }

export const sendMessage = async (
    prompt: string,
    onChunk: (chunk: string) => void,
    onEnd: (meta: any) => void
) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        buffer += chunk;

        // detect END marker
        const endIndex = buffer.indexOf("__END__");

        if (endIndex !== -1) {
            const metaPart = buffer.slice(endIndex + "__END__".length);

            try {
                const meta = JSON.parse(metaPart);
                console.log(meta)
                onEnd(meta);
            } catch {
                onEnd({});
            }

            return;
        }

        onChunk(chunk);
    }
};