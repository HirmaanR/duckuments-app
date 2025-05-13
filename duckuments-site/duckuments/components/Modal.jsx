import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export function DialogDemo({ btnTitle, btnStyle, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={btnStyle}>{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="bg-card w-fit h-fit">
        <DialogTitle hidden></DialogTitle>
        {children}
      </DialogContent>
    </Dialog >
  )
}
