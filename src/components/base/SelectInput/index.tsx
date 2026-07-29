import { Container, Option, Select } from "./style";

interface SelectInputProps {
  label: string;
  value: string;
  type: object;
  onChange?: (value: string) => void;
}

export function SelectInput(props: SelectInputProps) {
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
      <label htmlFor="select-input">{props.label}</label>
      <Select name="select-input"
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
