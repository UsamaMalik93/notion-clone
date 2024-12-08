
"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className='flex space-x-2 items-center animate-pulse'>
      <ArrowLeftCircle className="w-10 h-10"/>
      <h1 className="font-bold">Get started with crteating a new document</h1>
    </main>
  );
}
