import { Container, Option, Select } from "./style";

interface SelectInputProps<T> {
  label: string;
  value: T[keyof T];
  type: T;
  onChange?: (value: T[keyof T]) => void;
}

export function SelectInput<T extends Record<string, string>>(props: SelectInputProps<T>) {
  const options = Object.entries(props.type)
                    .map(([key, value]) => { return {
                                              key,
                                              value,
                                            }
                                          }
                                        );

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = ev.target.value;

    props.onChange!(selected.toUpperCase() as T[keyof T]);
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