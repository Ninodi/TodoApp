import React, { useState } from 'react'
import { ITodo } from '../interface'

function useRequest() {
    const [loading, setLoading] = useState(false)
    const sendRequest = async (body: ITodo | ITodo[] | any, method: string, endpoint?: string) => {
        let url = `https://crudapi.co.uk/api/v1/todos`

        if (endpoint) {
            url += `/${endpoint}`
        }

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer OIG5JZB2Ij_W3ZixNXldoWOwYAbUNDEWxH-Xd7RG5yd9PL7Ngw`
            },
            body: method !== 'DELETE' ? JSON.stringify(body) : undefined
        })
        const data = await res.json()
        setLoading(false)

        return data
    }

    return {loading, sendRequest}
}

export default useRequest