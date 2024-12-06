interface Waiting {
    isWord: boolean;
    stutus: string
}
// Индикатор, статус
const TypingIndicator = ({ stutus }: Waiting) => {
    return <span className="word">{stutus}</span>
}
export default TypingIndicator;