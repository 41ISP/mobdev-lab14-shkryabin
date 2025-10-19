import { removeMessage, likeMessage, reportMessage } from "../api/api"
import { useUserStore } from "../store/store"
import { useMessageStore } from "../store/UseMessageStore"

const MessageCard = ({ content, createdAt, username, userId, id, likes, likedBy}) => {
    const currentUser = useUserStore((state) => state.jwt)
    const {loadMessages} = useMessageStore()
    
    const handleRemove = async () => {
        try{
        await removeMessage(id)
        await loadMessages()
        } catch(error) {
            console.error(error)
        }
    }

    const handleReport = async() => {
        try{
            await reportMessage(id)
            await loadMessages()
        } catch(error) {
            console.error(error)
        }
    }

    const handleLike = async() =>
    {
        try{ 
            await likeMessage(id)
            await getMessages()
        } catch(error) {
            console.error(error)
        }
    }

    const currentUserId = currentUser?.userId
    const isLiked = currentUserId ? likedBy.includes(currentUserId) : false
    const isOwnMessage = currentUserId === userId
   
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                <button
                    onClick={handleLike}
                    className="action-button"
                >
                    <span>{isLiked ? "❤️" : "🤍"}</span>
                    <span>{likes}</span>
                </button>
            </div>
            <div className="message-actions">
                <button
                    onClick={handleReport}
                    className="action-button"
                >
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
            </div>
            {isOwnMessage && (
            <div className="message-actions">
                <button
                    onClick={handleRemove}
                    className="action-button delete"
                >
                    <span>🗑️</span>
                    <span>Удалить</span>
                </button>
            </div>
            )}
        </div>
    )
}

export default MessageCard