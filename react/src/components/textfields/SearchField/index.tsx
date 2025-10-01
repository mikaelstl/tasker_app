import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button, Container, Search } from "./style";

interface SearchFieldProps {
  filter?: boolean;
  sort?: boolean;
}

export function SearchField(props: SearchFieldProps) {
  return (
    <Container className="search-field">
      <Search id="search">
        <MagnifyingGlassIcon width="24"/>
        <input type="text" placeholder="Search"/>
      </Search>
      { props.filter ?? false
          ? <Button type="button" id="filter">
              <AdjustmentsHorizontalIcon width="20"/>
              <Text>Filter</Text>
            </Button>
          : <></>
      }
      { props.sort ?? false
          ? <Button type="button" id="sort">
              <ArrowUpIcon width="20"/>
              <Text>Sort</Text>
            </Button>
          : <></>
      }
    </Container>
  )
}