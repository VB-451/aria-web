export const postTTS = async (text: string, volume: number) => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/tts/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.volume = volume;

    await audio.play();
};