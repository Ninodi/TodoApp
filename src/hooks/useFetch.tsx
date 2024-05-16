import { useCallback, useEffect, useState } from 'react'
import { ITodo } from '../interface'

function useFetch({endpoint} : {endpoint: string} ) {
    const [data, setData] = useState<ITodo[] | []>([])

    const fetchData = useCallback(async(custom?: string) => {
        const url = custom ? `https://crudapi.co.uk/api/v1/${endpoint}` + custom : `https://crudapi.co.uk/api/v1/${endpoint}`
        const headers = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer OIG5JZB2Ij_W3ZixNXldoWOwYAbUNDEWxH-Xd7RG5yd9PL7Ngw`
            }
        }
        
        try{
            const res = await fetch(url, headers)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await res.json()
            setData(result.items)
            
            return result
        }catch(err){
            console.error(err)
        }

        return () => {
            setData([])
        }    
    }, [endpoint])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return {fetchData, data}
}

export default useFetch