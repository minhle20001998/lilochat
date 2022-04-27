import React, { useEffect, useState } from 'react'

export default function useResponsiveChatSetting() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const chatSubAreaDiv = document.querySelector('.chat-subarea');
        const exitChatListDiv = document.querySelector('.exit-btn');
        if (active) {
            chatSubAreaDiv.classList.add('active');
            exitChatListDiv.classList.add('active');
        } else {
            chatSubAreaDiv.classList.remove('active');
            exitChatListDiv.classList.remove('active');
        }
    }, [active])

    return [setActive]
}
