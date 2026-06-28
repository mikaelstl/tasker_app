import { Text } from "../../base/Text";
import { Button, Container, SearchContainer } from "./style";
import { ChevronUp, Search, Settings2 } from "@/components/icons";

interface SearchFieldProps {
  filter?: boolean;
  sort?: boolean;
}

export function SearchField(props: SearchFieldProps) {
  return (
    <Container className="search-field">
      <SearchContainer id="search">
        <Search />
        <input type="text" placeholder="Search"/>
      </SearchContainer>
      { props.filter ?? false
          ? <Button type="button" id="filter">
              <Settings2 size={20}/>
              <Text>Filter</Text>
            </Button>
          : <></>
      }
      { props.sort ?? false
          ? <Button type="button" id="sort">
              <ChevronUp />
              <Text>Sort</Text>
            </Button>
          : <></>
      }
    </Container>
  )
}
