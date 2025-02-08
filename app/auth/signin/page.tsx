import SignIn  from "@/components/Signin"
import { Suspense } from "react"

export default function Signin(){
  return(
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn/>
      </Suspense>
    </div>
  )
}