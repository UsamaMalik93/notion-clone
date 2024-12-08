"use client"
import { useTransition } from 'react';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { createDocument } from '@/actions';

const NewDocumentBtn = () => {
  const [isPending , startTransition]=useTransition()
  const router=useRouter()

  const handleNewDoc=()=>{
    startTransition(async ()=>{
      //create a new document & while this function is happening isPending will be true else false
       const {docId}:any=await createDocument() // This is createDocument is service action defined in actions folder
       router.push(`/doc/${docId}`)
    })
  }

  const buttonText= !isPending ? 'New Document' : "Creating..."

  return (
    <Button className='w-full' onClick={handleNewDoc} disabled={isPending}>
      {buttonText}
    </Button>
  )
}

export default NewDocumentBtn
