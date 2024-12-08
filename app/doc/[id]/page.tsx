"use client"
import Document from '@/components/document.tsx'
import { use } from 'react'

const DocumentPage =({params}:{params:Promise<{id:string}>}) => {
    const {id}=use(params)
    return (
        <div>
            <Document id={id} />
        </div>
    )
}

export default DocumentPage
