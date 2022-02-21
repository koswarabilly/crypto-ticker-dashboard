import React, { useContext } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Skeleton,
  VStack,
  Container,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useAsyncDebounce } from 'react-table';
import { cryptoContext } from '../App';

function Header() {
  const { setSearch, searchTag, setSearchTag, tags, isLoading } = useContext(cryptoContext);

  const onChange = useAsyncDebounce((value: string) => {
    setSearch(value || '');
  }, 500);

  const onTagClick = (tag: string) => {
    setSearchTag(tag);
  };

  return (
    <VStack
      backgroundColor="white"
      width="100%"
      maxWidth="44.875rem"
      position="fixed"
      py="1rem"
      alignItems="flex-start"
      zIndex="999"
    >
      <Container px="1rem" maxWidth="auto">
        <Skeleton isLoaded={!isLoading}>
          <InputGroup width="100%">
            <Input
              placeholder="Search by symbol or name"
              onChange={(e) => onChange(e.target.value)}
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </Skeleton>
      </Container>
      <HStack
        overflowX="auto"
        px="1rem"
        pt="0.5rem"
        pb="0.25rem"
        width="100%"
        maxWidth="45rem"
        className="invisible-scrollbar"
      >
        <Skeleton isLoaded={!isLoading}>
          <Button
            minWidth="fit-content"
            variant={!searchTag ? 'solid' : 'outline'}
            onClick={() => onTagClick('')}
          >
            All
          </Button>
        </Skeleton>
        {tags.map((info) => (
          <Button
            minWidth="fit-content"
            variant={searchTag === info.tag ? 'solid' : 'outline'}
            key={info.tag}
            onClick={() => onTagClick(info.tag)}
          >
            {info.display}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}

export default Header;
