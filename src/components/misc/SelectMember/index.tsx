import { Container, Wrapper, Selected, Options, Option, Field } from "./style";
import { useEffect, useState } from "react";
import { User } from "../User";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import type { UserDTO } from "../../../service/types/user/user.dto";
import { Label } from "../../base/Label";

interface SelectMemberProps {
  label: string;
  data: UserDTO[];
  onChange?: (value: string) => void
}

export function SelectMember({
  label,
  data,
  onChange
}: SelectMemberProps) {
  // const owner = data.find((user) => user.role === MemberRole.OWNER);

  const [selected, setSelected] = useState<UserDTO>(data[0]);
  const handleSelect = (opt: UserDTO) => {
    setSelected(opt);
    handleShowContent();
  }
  
  const [query, setQuery] = useState<string>('');

  const [hasOnlyOwner, setHasOnlyOwner] = useState<boolean>(false);

  const [showContent, setShowContent] = useState<boolean>(false);
  const handleShowContent = () => {
    setQuery('');
    setShowContent(!showContent);
  }

  const options = data.filter((user) => user.username.includes(query));

  useEffect(() => {
    /* if (data.length === 1 && owner) {
      setHasOnlyOwner(true);
      setSelected([owner]);
      onChange!(owner.id);
    } */
  }, []);

  const Card = () => {
    return (
      <Wrapper>
        <Selected onClick={handleShowContent}>
          { showContent 
            ? <Field
                autoFocus
                value={query}
                placeholder="Search..."
                onChange={(evt) => setQuery(evt.target.value)}
              />
            : <User username={selected.username}/>}
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
    <Container className="tskr-search-member">
      <Label htmlFor="search-member">{label}</Label>
      <Card />
    </Container>
  )
}