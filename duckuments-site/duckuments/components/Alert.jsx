import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CircleCheck } from "lucide-react"
import { HideMotionSection } from "@/components/MotionSection"

export function AlertDestructive({ title, des, isVisible }) {
  return (
    <HideMotionSection isVisible={isVisible}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="capitalize">{title}</AlertTitle>
        <AlertDescription className="text-xs">
          {des}
        </AlertDescription>
      </Alert>
    </HideMotionSection>
  )
}

export function AlertDemo({ title, des, isVisible }) {
  return (
    <HideMotionSection isVisible={isVisible}>
      <Alert variant="secondary">
        <CircleCheck className="h-4 w-4" />
        <AlertTitle className="capitalize">{title}</AlertTitle>
        <AlertDescription>
          {des}
        </AlertDescription>
      </Alert >
    </HideMotionSection>
  )
}
