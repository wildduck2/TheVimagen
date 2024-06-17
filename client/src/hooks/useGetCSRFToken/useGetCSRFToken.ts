import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useGetCSRFToken = () => {

    const dispatch = useDispatch()
    const [CSRFToken, setCSRFToken] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            // const res = await axios.post(`${process.env.ROOT_URL}/csrf-token`)
            // console.log(res)
            // set setCSRFToken(data.)
        })()
    }, [])
}
