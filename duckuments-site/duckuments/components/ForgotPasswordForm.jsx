'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from "next/navigation"

import { BtnSubmit, BtnLoading, BtnBack } from '@/components/Buttons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForgotPassword } from '@/server/server'

import { AlertDestructive } from "@/components/Alert"
import { BlurMotion } from '@/components/MotionSection'
import { useFlashMessage } from "@/components/context/FlashMessageContext";

const ForgotPasswordForm = () => {

  const router = useRouter()
  const { showMessage } = useFlashMessage();

  const [showAlert, setShowAlert] = useState(false)
  const { changePasswordFunc, loading, error, userData } = useForgotPassword()

  useEffect(() => {
    if (error) {
      setShowAlert(true)
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      console.log(userData)
      showMessage(`${userData}`)
      router.push("/login")
    }
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')

    await changePasswordFunc(email)

  }

  return (
    <div className="flex flex-col gap-6">
      <AlertDestructive title="Error" des={error} isVisible={showAlert} />
      <BlurMotion>
        <Card>
          <CardHeader className="text-center">
            <div className='grid justify-start mb-2'>
              <BtnBack href="/login" />
            </div>
            <CardDescription>
              Forgot your password? Type in the email associated with your account and we'll send you link to reset it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  {loading ? < BtnLoading /> : <BtnSubmit title=" Reset password" />}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </BlurMotion>
    </div >
  )
}
export default ForgotPasswordForm 
