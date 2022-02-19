import React from 'react';
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

function Header() {
  return (
    <VStack
      backgroundColor="white"
      width="100vw"
      position="fixed"
      py="1rem"
      alignItems="flex-start"
    >
      <Container px="1rem" maxWidth="auto">
        <Skeleton isLoaded>
          <InputGroup width="100%">
            <Input placeholder="Search by symbol or name" />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </Skeleton>
      </Container>
      <HStack overflowX="auto" px="1rem" pt="0.5rem" width="100vw" className="invisible-scrollbar">
        <Skeleton isLoaded>
          <Button minWidth="fit-content">All</Button>
        </Skeleton>
      </HStack>
    </VStack>
  );
}

export default Header;
