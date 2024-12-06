import Message from "./Message";
import { useState, useEffect, useRef, FC } from "react";
import axios from 'axios';
import TypingIndicator from "./TypingIndicator";
import { v4 as uuidv4 } from 'uuid';


const Chat = () => {
    interface Obj {
        id: string,
        data: {
            role: string;
            content: string;
        }
    }
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [listMessage, setListMessage] = useState<Obj[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const [networkError, setNetworkError] = useState(false);
 

    const generatorId = (role: string, prompt: string): Obj => {
        return {
            id: uuidv4(),
            data: {
                role: role,
                content: prompt
            }
        }
    }
    useEffect(() => {
        setListMessage((prew: Obj[]) => [...prew, generatorId('Катя', 'Добро пожаловать в электронный артефакт мудрости! 🌟 Со мной у вас всегда будет чудо-фонарь, освещающий путь к познанию и разумению. 🚀🔦 Давайте вместе отправимся в захватывающее путешествие по миру знаний! 🚀✨😃')])
    }, [audioElementRef])
    useEffect(() => {
        if (isPlaying) {
            audioElementRef.current?.play();
            setIsPlaying(false);
        }
    }, [isPlaying])

    const LiveWord = (text: React.FormEvent<HTMLInputElement>): void => {
        setMessage(text.currentTarget.value)        
    }
    const sendMessage = (prompt: string): void => {
        setIsWaiting(true)
        setListMessage((prew: Obj[]) => [...prew, generatorId('Вы', prompt)])
        axios.post('http://localhost:5000/api', {
            content: message
        })
            .then((response) => {
                setListMessage((prew: Obj[]) => [...prew, generatorId(response.data.role, response.data.content)])
                if (response.status === 200) {
                    setIsPlaying(true);
                    setIsWaiting(false)
                }
            })
            .catch(error => {
                setIsWaiting(false)
                setNetworkError(true);
                console.error('Network Error:', error);
            });
    }
    return (
        <div className="chat">
            <h1>Начало чата</h1>
            <audio ref={audioElementRef}>
                <source src={require('../assets/music.mp3')} type="audio/mpeg" />
            </audio>
            <div className="setMessage">
                {
                    listMessage.map(item => <Message key={item.id} {...item.data} />)
                }
            </div>
            <form className="valueBtn" action="">
                <div className="container">
                    {
                        isWaiting ? <TypingIndicator isWord={isWaiting} stutus="Идет процесс" /> :
                            networkError ? <TypingIndicator isWord={networkError} stutus="Что-то пошло не так =(" /> :
                                (<div className={`valuePrompt ${active ? 'valuePromptMaxSize' : ''}`}
                                    onClick={() => setActive(true)}>
                                    <input
                                        onChange={(text: React.FormEvent<HTMLInputElement>): void => LiveWord(text)} type="text" placeholder="Введите ваш запрос" />
                                    <input
                                        type="submit"
                                        className="btn"
                                        onClick={() => sendMessage(message)} value="Отправить" />
                                </div>)
                    }
                </div>


            </form>
        </div>
    )
}
export default Chat;