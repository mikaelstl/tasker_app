import { useId } from "react";
import { Container, Label, Option, Select } from "./style";

interface SelectInputProps {
  label: string;
  value: string;
  type: Record<string, string>;
  onChange?: (value: string) => void;
}

export function SelectInput(props: SelectInputProps) {
  const inputId = useId();
  const options = Object.entries(props.type)
                    .map(([key, value]) => { return {
                                              key,
                                              value,
                                            }
                                          }
                                        );

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = ev.target.value;

    props.onChange?.(selected.toUpperCase());
  }

  return (
    <Container>
      <Label htmlFor={inputId}>{props.label}</Label>
      <Select id={inputId} name={inputId}
        value={props.value}
        onChange={handleChange}
      >
        {
          options.map(
            (opt) => <Option key={opt.key} value={opt.value}>{opt.value}</Option>
          )
        }
      </Select>
    </Container>
  )
}
