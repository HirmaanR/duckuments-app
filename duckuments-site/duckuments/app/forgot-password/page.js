import ForgotPasswordForm from "@/components/ForgotPasswordForm"
import ModeToggle from "@/components/theme-toggle"

const ForgotPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <ModeToggle />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
export default ForgotPassword
