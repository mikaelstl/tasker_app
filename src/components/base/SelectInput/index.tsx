import { useState } from "react";
import { TaskPriorityOption, type TaskPriorityOptionDesign } from "../../../service/types/task/priority.dto";
import { Container, Option, Select } from "./style";
import Palette from "../../../assets/palette";

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
                                              design: TaskPriorityOption[value]
                                            }
                                          }
                                        );

  const [ design, setDesign ] = useState<TaskPriorityOptionDesign>({
    backgroud: Palette.items,
    details: Palette.gray
  });

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = ev.target.value;

    props.onChange!(selected.toUpperCase() as T[keyof T]);

    setDesign(options.find((opt) => opt.value === selected )?.design!);
  }

  return (
    <Container>
      <label htmlFor="select-input">{props.label}</label>
      <Select name="select-input"
        value={props.value}
        onChange={handleChange}
        background={design.backgroud}
        details={design.details}
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