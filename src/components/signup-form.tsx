import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useForm } from "@tanstack/react-form"
import { IdCard, Mail, UserRound } from "lucide-react"
import * as z from "zod"
import InputPassword from "./shadcn-studio/input/input-password"
import InputPasswordStrength from "./shadcn-studio/input/input-password-strength"

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  name: string
  username: string
}

interface SignupFormProps extends React.ComponentProps<"div"> {
  register: (data: RegisterData) => Promise<void>
}

const schema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty().min(8).max(20).regex(/(?=.*\d)/).regex(/(?=.*[@$#])/),
  confirmPassword: z.string().nonempty().min(8).max(20),
  name: z.string().nonempty(),
  username: z.string().nonempty(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match.",
      path: ["password"],
    })

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    })
  }
}) satisfies z.ZodType<RegisterData>

export function SignupForm({
  register,
  className,
  ...props
}: SignupFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => await register(value),
  })

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    form.handleSubmit()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="tskr-singup-form" noValidate onSubmit={onSubmit}>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          type="text"
                          placeholder="John Doe"
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          required
                        />
                        <InputGroupAddon align="inline-start">
                          <UserRound className="size-4" aria-hidden="true" />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )
                }}
              />
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          type="text"
                          placeholder="john.doe"
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          required
                        />
                        <InputGroupAddon align="inline-start">
                          <IdCard className="size-4" aria-hidden="true" />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          type="email"
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="m@example.com"
                          autoComplete="email"
                          required
                        />
                        <InputGroupAddon align="inline-start">
                          <Mail className="size-4" aria-hidden="true" />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <InputPasswordStrength
                        id={field.name}
                        name={field.name}
                        value={field.state.value as string}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                        required
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <InputPassword
                        id={field.name}
                        name={field.name}
                        label="Confirm Password"
                        value={field.state.value as string}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                        required
                      />
                    </Field>
                  )
                }}
              />
              <form.Subscribe
                selector={(state) => ({
                  submissionAttempts: state.submissionAttempts,
                  hasPasswordMismatch:
                    state.fieldMeta.confirmPassword?.errors?.some(
                      (error) => error?.message === "Passwords do not match."
                    ) ?? false,
                })}
              >
                {({ submissionAttempts, hasPasswordMismatch }) =>
                  submissionAttempts > 0 && hasPasswordMismatch ? (
                    <FieldDescription className="text-overdue">
                      Passwords do not match.
                    </FieldDescription>
                  ) : (
                    <></>
                  )
                }
              </form.Subscribe>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  )
}
