import { useEffect } from "react"
import MessageCard from "./MessageCard"
import { useUserStore } from "../store/store"
import { useMessageStore } from "../store/UseMessageStore"

const Feed = ({ myOwn = false }) => {
    const { messages, loadMessages } = useMessageStore();
    const { jwt } = useUserStore();

    useEffect(() => {
        const loadData = async() => {
            try{
           await loadMessages();
            } catch(err) {
                console.error(err)
            }
        }
        loadData()
    }, []);

    const filteredMessages = myOwn && jwt 
        ? messages.filter((item) => item.userId === jwt.userId)
        : messages

    return (
        <div className="messages-section">
            <div className="container">
                <h2 className="section-title">Последние сообщения</h2>
                <div className="messages-grid">
                    {filteredMessages && filteredMessages.map((item) => (
                        <MessageCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Feed