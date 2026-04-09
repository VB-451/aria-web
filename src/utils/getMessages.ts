export const getMessages = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/last-messages`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const unparsed =  await response.json();
    const parsed = [];
    unparsed.interactions.forEach(element => {
        parsed.push({
            role: "user",
            content: element.user,
            id: element.id,
        });
        parsed.push({
            role: "assistant",
            content: element.assistant,
            id: element.id,
            step1_decision: element.step1_decision
        })
    })
    return {
        messages: parsed,
        counter: unparsed.counter
    }
}