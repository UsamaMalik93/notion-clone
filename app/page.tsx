
"use client"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
     <h1>Hello to notio clone app</h1>
     <Button onClick={()=>{console.log('clicked')}}>Click me</Button>
    </div>
  );
}
