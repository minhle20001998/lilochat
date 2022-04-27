// import React from 'react'
import { useEffect, useState } from 'react'
// import axios from 'axios'

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const generate = (num) => {
    const a = []
    for (let i = 0; i < num; i++) {
        a.push({
            id: guidGenerator(),
            sender: (Math.floor(Math.random() * 10)) % 2 === 0 ? "Me" : "Nguyen",
            content: (Math.random() + 1).toString(36).substring(7)
        })
    }
    return a;
}


export default function useMessengerLoad({ setMess, pageNumber }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        //
        setHasMore(true)
        //
        setTimeout(() => {
            setLoading(true)
            setError(false)
            setMess((prevState) => {
                return [...generate(10), ...prevState]
            })
            setLoading(false);
        }, 1000)
    }, [setMess, pageNumber])

    return { loading, error, hasMore };
}
