"use client"

import {Crisp} from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = ()=> {
    useEffect(()=> {
        Crisp.configure("5b9a82f5-5d95-4447-93ca-a0bfdd8bbb7a");
    },[])

    return null;
}