import { Container, Wrapper, Selected, Options, Option, Field } from "./style";
import { useEffect, useRef, useState } from "react";
import { User } from "../User";
import { Label } from "./style";

export interface SelectMemberOption {
  id: string;
  // username: string;
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
    setQuery('');
    setShowContent(false);
  }
  
  const [query, setQuery] = useState<string>('');

  // const [hasOnlyOwner, setHasOnlyOwner] = useState<boolean>(false);

  const [showContent, setShowContent] = useState<boolean>(false);
  const handleShowContent = () => {
    setQuery('');
    setShowContent((isVisible) => !isVisible);
  }

  const lastNotifiedId = useRef<string | undefined>();
  const options = data.filter((user) => user.id.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const first = data[0];
    setSelected(first);
    if (first && lastNotifiedId.current !== first.id) {
      lastNotifiedId.current = first.id;
      onChange?.(first.id);
    }
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
            : selected ? <User affiliationId={selected.id} /> : <span>Nenhum membro</span>}
        </Selected>
        {
          showContent && (
            <Options>
              {
                options.map(
                  opt => <Option key={opt.id} onClick={() => handleSelect(opt)}><User affiliationId={opt.id}/></Option>
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
      <Label>{label}</Label>
      <Card />
    </Container>
  )
}
