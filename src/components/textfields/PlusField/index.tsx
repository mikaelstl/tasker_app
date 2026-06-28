import { Plus } from "@/components/icons";
import { Button, Container, Field } from "./style";
import { useState } from "react";

interface PlusFieldProps {
  add: (value: string) => void
}

export function PlusField({ add }: PlusFieldProps) {
  const [ value, setValue ] = useState('');

  const handleAdd = () => {
    add(value);
    setValue('');
  }

  return (
    <Container className="tskr-plus-field">
      <Field id="plus">
        <input
          type="text"
          placeholder="Write something..."
          value={value}
          onChange={(evt) => setValue(evt.target.value)}  
        />
      </Field>
      <Button type="button" id="send" onClick={handleAdd}>
        <Plus />
      </Button>
    </Container>
  )
}