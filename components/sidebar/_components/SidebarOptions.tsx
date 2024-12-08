"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const SidebarOptions = ({ href, id }: { href: string, id: string }) => {
  const [data] = useDocumentData(doc(db, "documents", id))
  const pathname = usePathname()
  const isActive = href.includes(pathname) && pathname !== '/'

  if (!data) return null;
  return (
    <Link
      href={href}>
      <Button className={`w-full text-white ${isActive ? 'bg-black ' : 'bg-gray-500'}`}>{data.title}</Button>
    </Link>

  )
}

export default SidebarOptions
