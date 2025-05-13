import { Button } from "@/components/ui/button"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"

const BtnSubmit = ({ title }) => {
  return (
    <>
      <Button type="submit" className="text-black font-medium hover:bg-card hover:text-primary hover:border-primary hover:border active:border active:border-primary active:text-primary active:bg-card">
        {title}
      </Button>
    </>
  )
}

const BtnLoading = () => {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}

const BtnBack = ({ href }) => {
  return (
    <>
      <Link href={href}>
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
    </>
  )
}

export { BtnSubmit, BtnLoading, BtnBack }
