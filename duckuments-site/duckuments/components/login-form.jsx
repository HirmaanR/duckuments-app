'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { BtnSubmit, BtnLoading } from '@/components/Buttons'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"

import { useLogin } from "@/server/server"
import { AlertDestructive, AlertDemo } from "@/components/Alert"
import { BlurMotion } from '@/components/MotionSection'

import { useFlashMessage } from "@/components/context/FlashMessageContext";
import { setAccessToken } from "@/server/cookies";


const LoginForm = () => {

  const { message, showMessage } = useFlashMessage()
  const route = useRouter()

  const { loginUserFunc, loading, error, userData } = useLogin()
  const [showAlert, setShowAlert] = useState(false)
  const [showMessageAlert, setShowMessageAlert] = useState(false)

  useEffect(() => {
    if (error) {
      setShowAlert(true)
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      setShowMessageAlert(true)
      setTimeout(() => setShowMessageAlert(false), 4500);
    }
  }, [message]);

  useEffect(() => {
    if (userData) {
      setAccessToken(userData["access_token"], userData["refresh_token"])
      showMessage(`Hi ${userData["userName"]}, Welcome`)
      setTimeout(() => route.push("/dashboard"), 5000)
    }
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault()
    setShowAlert(false)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    await loginUserFunc(username, password)
  }

  return (
    <div className="flex flex-col gap-6">
      <AlertDestructive title="Error" des={error} isVisible={showAlert} />
      <AlertDemo title="message" des={message} isVisible={showMessageAlert} />
      <BlurMotion>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your GitHub or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    Login with GitHub
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative bg-card z-10 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">Forgot your password?</Link>
                    </div>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  {loading ? < BtnLoading /> : <BtnSubmit title="Login" />}
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">Sign up</Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </BlurMotion>
    </div >
  )
}
export default LoginForm 
