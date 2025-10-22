import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { AddMember, Close, Container, Field, Wrapper, Members, Options, Option } from "./style";
import { Text } from "../../base/Text";
import { useEffect, useState } from "react";
import Palette from "../../../assets/palette";
import { User } from "../../misc/User";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import { MemberRole } from "../../../service/types/member/role.dto";

interface SearchMemberProps {
  label: string;
  data: ProjectMember[];
  onChange?: (value: string) => void
}

export function SearchMember(props: SearchMemberProps) {
  const owner = props.data.find((user) => user.role === MemberRole.OWNER);

  const [selected, setSelected] = useState<ProjectMember[]>([]);
  const [query, setQuery] = useState<string>('');

  const [hasOnlyOwner, setHasOnlyOwner] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const handleSearching = () => {
    console.log('fechar searchmember');
    setSearching(!searching);
  }

  const [showContent, setShowContent] = useState<boolean>(false);
  const handleShowContent = () => {
    console.log('desativar opções');
    setShowContent(!showContent);
  }

  const options = props.data.filter((user) => user.userkey.includes(query));

  useEffect(() => {
    if (props.data.length === 1 && owner) {
      setHasOnlyOwner(true);
      setSelected([owner]);
      props.onChange!(owner.id);
    }
  }, []);

  const Search = () => {
    return (
      searching
        ? <Wrapper>
          <>
            <Field
              placeholder="Search..."
              onChange={(evt) => setQuery(evt.target.value)}
              onFocus={handleShowContent}
              onBlur={handleShowContent}
            />
            <Close onClick={handleSearching}><XMarkIcon width={24} /></Close>
          </>
          {
            showContent
              ? <Options>
                {
                  options.map(
                    (member) => <Option><User username={member.userkey} /></Option>
                  )
                }
              </Options>
              : <></>
          }
        </Wrapper>
        : <AddMember onClick={handleSearching}>
          <PlusIcon width={24} fill={Palette.gray} />
        </AddMember>
    )
  }

  return (
    <Container>
      <Text>{props.label}</Text>
      <Members>
        {
          selected.map(
            member => <User username={member.userkey} />
          )
        }
        { hasOnlyOwner ? <></> : <Search/> }
      </Members>
    </Container>
  )
}