import { useRef, useEffect, FC } from "react";
interface IUser {
    role: string;
    content: string;
}
const Message = ({ role, content }: IUser) => {
    var replacedText = content.replace(/```([\s\S]*?)```/g, function (match, code) {
        return "<pre>" + code.replace(/'/g, "&apos;") + "</pre>";
    });

    const scroll = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
        <>
            <div ref={scroll} className="message">
                <span>{role}</span>
                <span dangerouslySetInnerHTML={{ __html: replacedText }} />
            </div>
        </>
    )
}
export default Message;