import { Container, Wrapper, Selected, Options, Option, Field } from "./style";
import { useEffect, useState } from "react";
import { User } from "../User";
import { Label } from "../../base/Label";

export interface SelectMemberOption {
  id: string;
  username: string;
}

interface SelectMemberProps {
  label: string;
  data: SelectMemberOption[];
  onChange?: (value: string) => void
}

export function SelectMember({
  label,
  data,
  onChange,
}: SelectMemberProps) {
  // const owner = data.find((user) => user.role === MemberRole.OWNER);

  const [selected, setSelected] = useState<SelectMemberOption | undefined>(data[0]);
  const handleSelect = (opt: SelectMemberOption) => {
    setSelected(opt);
    onChange?.(opt.id);
    handleShowContent();
  }
  
  const [query, setQuery] = useState<string>('');

  // const [hasOnlyOwner, setHasOnlyOwner] = useState<boolean>(false);

  const [showContent, setShowContent] = useState<boolean>(false);
  const handleShowContent = () => {
    setQuery('');
    setShowContent(!showContent);
  }

  const options = data.filter((user) => user.username.includes(query));

  useEffect(() => {
    const first = data[0];
    setSelected(first);
    if (first) onChange?.(first.id);
  }, [data, onChange]);

  const Card = () => {
    return (
      <Wrapper className="tskr-select-member">
        <Selected onClick={handleShowContent}>
          { showContent 
            ? <Field
                autoFocus
                value={query}
                placeholder="Pesquisar..."
                onChange={(evt) => setQuery(evt.target.value)}
              />
            : selected ? <User username={selected.username}/> : <span>Nenhum membro</span>}
        </Selected>
        {
          showContent && (
            <Options>
              {
                options.map(
                  opt => <Option key={opt.id} onClick={() => handleSelect(opt)}><User username={opt.username}/></Option>
                )
              }
            </Options>
          )
        }
      </Wrapper>
    )
  }

  return (
    <Container className="tskr-select-member">
      <Label htmlFor="search-member">{label}</Label>
      <Card />
    </Container>
  )
}
