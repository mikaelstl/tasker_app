import { useId, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, KeyRound, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

const requirements = [
  { regex: /^.{8,20}$/, text: "8 to 20 characters" },
  { regex: /(?=.*\d)/, text: "At least 1 number" },
  { regex: /(?=.*[@$#])/, text: "At least 1 special character (@, $, #)" },
]

interface InputPasswordStrengthProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, "type"> {
  label?: string
}

const InputPasswordStrength = ({
  label = "Password",
  id,
  value,
  ...props
}: InputPasswordStrengthProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const generatedId = useId()
  const inputId = id ?? generatedId
  const password = typeof value === "string" ? value : ""

  const strength = requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }))

  const strengthScore = strength.filter((req) => req.met).length

  const getColor = (score: number) => {
    if (score === 0) return "bg-border"
    if (score <= 1) return "bg-destructive"
    if (score <= 2) return "bg-warning"
    if (score === 3) return "bg-success"

    return "bg-success"
  }

  const getText = (score: number) => {
    if (score === 0) return "Enter a password"
    if (score <= 1) return "Weak password"
    if (score === 2) return "Strong password"

    return "Very strong password"
  }

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <InputGroup className="relative mb-3">
        <InputGroupInput
          id={inputId}
          type={isVisible ? "text" : "password"}
          value={value}
          {...props}
        />
        <InputGroupAddon align="inline-start">
          <KeyRound className="size-4" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground hover:text-muted-foreground"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="mb-4 flex h-1 w-full gap-1">
        {requirements.map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-500 ease-out",
              index < strengthScore ? getColor(strengthScore) : "bg-border"
            )}
          />
        ))}
      </div>

      <p className="text-secondary-foreground text-sm font-medium">
        {getText(strengthScore)}. Must contain:
      </p>

      <ul className="mb-4 space-y-1.5">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon className="size-4 text-primary dark:text-primary" />
            ) : (
              <XIcon className="size-4 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-xs",
                req.met ? "text-primary dark:text-primary" : "text-muted-foreground"
              )}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InputPasswordStrength
