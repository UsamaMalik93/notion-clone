"use client"
import NewDocumentBtn from './_components/NewDocumentBtn'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'
import { collectionGroup,query,where } from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore';
import { db } from '@/firebase'
import { useEffect, useState } from 'react'
import { RoomDocument } from '@/types'

const Sidebar = () => {

  const {user}=useUser();
  const [groupedData,setGroupedData]=useState<{owner:RoomDocument[],editor:RoomDocument[]}>({
    owner:[],
    editor:[]
  })
  console.log("🚀 ~ Sidebar ~ groupedData:", groupedData)
  const [data,loading, error]=useCollection(
    user && (
      query(collectionGroup(db,'rooms'), where('userId',"==",user.emailAddresses[0].toString()))
    ))
    console.log("🚀 ~ Sidebar ~ error:", error)

    useEffect(()=>{
      if(!data) return;

      const grouped=data.docs.reduce<{owner:RoomDocument[], editor:RoomDocument[]}>(
        (acc,curr)=>{
          const roomData=curr.data() as RoomDocument
          if(roomData.role="owner"){
            acc.owner.push({
              id:curr.id,
              ...roomData
            })
          }
          else {
            acc.editor.push({
              id:curr.id,
              ...roomData
            })
          }
          return acc
        }
        ,{
          owner:[],
          editor:[]
        }
      )
      setGroupedData(grouped)
    },[data])
    
  const menuOptions = (
    <>
      <NewDocumentBtn />
    </>
  )

  return (

    <div className='p-2 md:p-5 bg-gray-300 relative '>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className='p-2 hover:opacity-30 rounded-lg' size={40} /></SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className='hidden md:inline'>
        {menuOptions}
      </div>
    </div>
  )
}

export default Sidebar
