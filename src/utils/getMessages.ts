export const getMessages = async () => {
    const response = await fetch(`http://localhost:4000/chat`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const unparsed =  await response.json();
    let parsed = [];
    unparsed.interactions.forEach(element => {
        parsed.push({
            role: "user",
            content: element.user,
        });
        parsed.push({
            role: "assistant",
            content: element.assistant,
        })
    })
    return parsed;
}