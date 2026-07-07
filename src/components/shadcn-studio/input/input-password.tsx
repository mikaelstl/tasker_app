import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon, KeyRound } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

interface InputPasswordProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, "type"> {
  label?: string
}

const InputPassword = ({ label = "Password", id, ...props }: InputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <InputGroup>
        <InputGroupInput
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
        <InputGroupAddon align='inline-end'>
          <Button
            type="button"
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible((prevState) => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? (
              <EyeOffIcon />
            ) : (
              <EyeIcon />
            )}
            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </InputGroupAddon>
        <InputGroupAddon align='inline-start'>
          <KeyRound className="size-4" aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default InputPassword
