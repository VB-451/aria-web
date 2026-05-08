export const sendMessage = async (
    prompt: string,
    onStart: (functionType: string) => void,
    onChunk: (chunk: string) => void,
    onEnd: (meta: any) => void,
    regenerateID?: string,
    regenerateAnswer?: boolean
) => {

    const bodyObject = {
        prompt,
        regenerateSiblingNodeID: regenerateID ?? undefined,
        answerBool: regenerateAnswer
    }

    console.log(bodyObject)

    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const eventBlock of events) {
            const lines = eventBlock.split("\n");

            let eventName = "";
            let data = "";

            for (const line of lines) {
                if (line.startsWith("event:")) {
                    eventName = line.replace("event:", "").trim();
                }
                if (line.startsWith("data:")) {
                    data += line.replace("data:", "").trim();
                }
            }

            if (!eventName) continue;

            try {
                const parsed = JSON.parse(data);

                switch (eventName) {
                    case "start":
                        onStart(parsed.routeFunction);
                        break;

                    case "token":
                        onChunk(parsed);
                        break;

                    case "end":
                        onEnd(parsed);
                        console.log(parsed);
                        return;

                    case "error":
                        console.error("SSE error:", parsed);
                        return;
                }
            } catch (err) {
                console.error("Failed to parse SSE data:", data);
            }
        }
    }
};