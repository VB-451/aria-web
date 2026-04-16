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
    onStart: (functionType: string) => void,
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
    let started = false;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        buffer += chunk;

        if (!started) {
            const startIndex = buffer.indexOf("__START__");

            if (startIndex !== -1) {
                const functionType = buffer.slice(0, startIndex);

                onStart(functionType);

                buffer = buffer.slice(startIndex + "__START__".length);

                started = true;
            }
        }

        const endIndex = buffer.indexOf("__END__");
        if (endIndex !== -1) {
            const metaPart = buffer.slice(endIndex + "__END__".length);

            try {
                const meta = JSON.parse(metaPart);
                onEnd(meta);
            } catch {
                onEnd({});
            }

            return;
        }

        if (started && buffer.length > 0) {
            onChunk(buffer);
            buffer = "";
        }
    }
};