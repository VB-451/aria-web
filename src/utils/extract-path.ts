export const extractPath = (s: string) => {
    const match = s.match(/[A-Za-z]:\\[^"]*/);
    return match ? match[0] : null;
};