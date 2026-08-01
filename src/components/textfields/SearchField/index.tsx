import { Tuning2 as AdjustmentsHorizontalIcon, AltArrowUp as ChevronUpIcon, Magnifer as MagnifyingGlassIcon } from "@/components/icons/solar-icons";
import { Text } from "../../base/Text";
import { Button, Container, Search } from "./style";

interface SearchFieldProps {
  filter?: boolean;
  onFilter?: () => void;
  sort?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SearchField(props: SearchFieldProps) {
  const hasFilter = props.filter || Boolean(props.onFilter);

  return (
    <Container className="search-field">
      <Search id="search">
        <MagnifyingGlassIcon width="24"/>
        <input
          type="search"
          value={props.value}
          placeholder={props.placeholder ?? "Pesquisar"}
          onChange={(event) => props.onChange?.(event.target.value)}
        />
      </Search>
      { hasFilter
          ? <Button type="button" id="filter" onClick={props.onFilter}>
              <AdjustmentsHorizontalIcon width="20"/>
              <Text>Filtrar</Text>
            </Button>
          : <></>
      }
      { props.sort ?? false
          ? <Button type="button" id="sort">
              <ChevronUpIcon width="20"/>
              <Text>Ordenar</Text>
            </Button>
          : <></>
      }
    </Container>
  )
}
