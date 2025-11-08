import { createMessage } from "../api/api"
import { useMessageStore } from "../store/UseMessageStore"
import Button from "./Button"
import TextArea from "./TextArea"

const MessageField = () => {
    const { loadMessages } = useMessageStore()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const messageData = { content: e.target.content.value }
            await createMessage(messageData)
            await loadMessages()
            e.target.reset()
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <div className="create-message-section">
            <div className="container">
                <div className="create-message-card">
                    <h2 className="create-message-title">Создать сообщение</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="create-message-form"
                    >
                        <TextArea
                            placeholder="Поделитесь мнением"
                            name="content"
                            required
                        />
                        <Button type="submit">Отправить</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MessageField