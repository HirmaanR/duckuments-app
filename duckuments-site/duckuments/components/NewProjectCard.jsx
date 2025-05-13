'use client'
import * as React from "react"
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BtnSubmit, BtnLoading } from "@/components/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useNewProject } from "@/server/server";
import { AlertDestructive, AlertDemo } from "@/components/Alert"

// get access token from cookies
import { getAccessToken } from "@/server/cookies";

export function NewProjectCard() {

  const { NewProjectFunc, loading, error, userData } = useNewProject()

  const [showAlert, setShowAlert] = useState(false)


  useEffect(() => {
    if (error) {
      setShowAlert(true)
      console.log(error)
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      console.log(userData)
    }
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault()
    setShowAlert(false)

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')
    const des = formData.get('description')
    const language = formData.get('language')
    const zip_file = formData.get('zip_file')

    const token = await getAccessToken()
    await NewProjectFunc(title, des, language, zip_file, token["value"])
  }


  return (
    <div className="flex flex-col gap-6">
      <AlertDestructive title="Error" des={error} isVisible={showAlert} />
      <Card className="w-[350px] border-none shadow-none" >
        <CardHeader>
          <CardTitle className="capitalize">Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Name</Label>
                <Input id="title" name="title" placeholder="Name of your project" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="des">Description</Label>
                <Textarea id="des" name="description" placeholder="write your project Description here..." />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language" >Language</Label>
                <Select name="language" required>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value=".py">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Project Source</Label>
                <p className="text-xs text-neutral-400 mb-2">Your file must be in .zip format.</p>
                <Input id="file" type="file" name="zip_file" required />
              </div>
            </div>
            <div className="flex justify-end mt-7">
              {loading ? < BtnLoading /> : <BtnSubmit title="Deploy" />}
            </div>
          </form>
        </CardContent>
      </Card >
    </div>
  )
}
