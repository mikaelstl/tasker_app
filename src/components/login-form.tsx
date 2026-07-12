import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { KeyRound, Mail } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import type { LoginDTO } from "@/service/types/auth/login.dto";

interface LoginFormProps extends React.ComponentProps<"form"> {
  login: (data: LoginDTO) => Promise<void>;
  register: () => void;
}

const schema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty()
}) satisfies z.ZodType<LoginDTO>;


export function LoginForm({
  login,
  register,
  className,
  ...props
}: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: schema
    },
    onSubmit: async ({ value }) => await login(value)
  });

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    form.handleSubmit();
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      noValidate
      onSubmit={onSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">LOGIN</h1>
        </div>
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
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>

                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    type="password"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    required
                  />
                  <InputGroupAddon align="inline-start">
                    <KeyRound className="size-4" aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )
          }}
        />
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <Button variant="secondary" type="button" onClick={register}>
            Create your account
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
