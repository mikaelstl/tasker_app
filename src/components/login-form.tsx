import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { KeyRound, Mail } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">LOGIN</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputGroup align="start">
            <InputGroupInput
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              required
            />
            <InputGroupAddon align="start">
              <Mail className="size-4" aria-hidden="true" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <InputGroup align="start">
            <InputGroupInput
              id="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <InputGroupAddon align="start">
              <KeyRound className="size-4" aria-hidden="true" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            Create your account
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
