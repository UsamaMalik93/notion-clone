"use server"  // for server actions introduced in next 14

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"


export async function createDocument(){
    auth.protect() //this will protect this route and redirect it to signin if not signed in
    const {sessionClaims}=await auth();

    const docCollectionRef=adminDb.collection("documents")//storing doc collection ref where we need to add a doc

    const docRef=await docCollectionRef.add({
        title: "HELLO Pakistan"
    })

   await adminDb.collection("user").doc(sessionClaims?.email!).collection("rooms").doc(docRef.id).set({
    userId:sessionClaims?.email!,
    role:'owner',
    createdA:new Date(),
    roomId:docRef.id
   })

   return {docId:docRef.id}
}