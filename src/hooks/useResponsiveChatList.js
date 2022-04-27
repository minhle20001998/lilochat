import { useEffect, useState } from 'react'

export default function useResponsiveChatList() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const chatListDiv = document.querySelector('.chat-list');
        const exitChatListDiv = document.querySelector('.exit-btn');
        if (active) {
            chatListDiv.classList.add('active');
            exitChatListDiv.classList.add('active');
        } else {
            chatListDiv.classList.remove('active');
            exitChatListDiv.classList.remove('active');
        }
    }, [active])

    return [setActive]
}
