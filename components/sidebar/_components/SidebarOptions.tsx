"use client"
import Link from 'next/link'
import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import { usePathname } from 'next/navigation'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const SidebarOptions = ({ href, id }: { href: string, id: string }) => {
  const [data] = useDocumentData(doc(db, "documents", id))
  const pathname = usePathname()
  const isActive = href.includes(pathname) && pathname !== '/'

  if (!data) return null;
  
  return (
    <Link 
    href={href} 
    className={`rounded-md p-2 border ${isActive ? 'border-black bg-gray-300 font-bold' : 'border-gray-200 hover:bg-gray-400'}`}
  >
    <p className='truncate text-center text-black'>{data.title}</p>
  </Link>
  
  )
}

export default SidebarOptions
