import React, { useEffect, useRef, useState } from 'react'
// import useMessengerLoad from '../../../../hooks/useMessengerLoad';
import './Body.css';
import Bubble from './Bubble/Bubble';

export default function Body({ mess, setMess }) {
    const anchorRef = useRef(null);
    const oldAnchorRef = useRef(null);
    const [oldAnchorIndex, setOldAnchorIndex] = useState(0);
    const [scrolling, setScrolling] = useState(false);
    // const [pageNumber, setPageNumber] = useState(1)

    // const {
    //     hasMore,
    //     loading,
    //     // error
    // } = useMessengerLoad({ pageNumber, setMess })

    useEffect(() => {
        setOldAnchorIndex(mess[0]?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!scrolling) {
            anchorRef.current.scrollIntoView()
        }
        if (scrolling) {
            oldAnchorRef.current.scrollIntoView();
            setOldAnchorIndex(mess[0].id)
            setScrolling(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mess])

    // const lastElementRef = useCallback(node => {
    //     if (loading) return
    //     if (observer.current) observer.current.disconnect()
    //     observer.current = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting && hasMore) {
    //             setScrolling(true);
    //             setPageNumber(prevPageNumber => prevPageNumber + 1)
    //         }
    //     })
    //     if (node) observer.current.observe(node)
    // }, [loading, hasMore])

    return (
        <div className='message-chat-body'>
            {mess.length > 0 && mess.map((m, index) => {
                return <div key={m.id} >
                    {oldAnchorIndex === m.id && <div ref={oldAnchorRef}></div>}
                    <div
                        // ref={(index === 0) ? lastElementRef : null}
                        className={`${m.sender === 'Me' ? 'message-right' : 'message-left'} }`}
                    >
                        <Bubble mess={m} />
                    </div>
                </div>
            })}
            <div className='anchor' ref={anchorRef}></div>
        </div>
    )
}
