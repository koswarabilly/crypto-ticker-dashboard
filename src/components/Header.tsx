import React from 'react';
import { Input, InputGroup, InputRightElement, Button, HStack, Skeleton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function Header() {
  return (
    <div className="fixed w-screen bg-slate-500">
      <div className="p-4">
        <Skeleton isLoaded>
          <InputGroup>
            <Input placeholder="Search by symbol or name" />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </Skeleton>
      </div>
      <Skeleton isLoaded>
        <HStack className="overflow-auto px-4 pb-4">
          <Button className="block">Tag 11111111111111111</Button>
          <Button>Tag 2</Button>
          <Button>Tag 3</Button>
          <Button>Tag 1</Button>
          <Button>Tag 2</Button>
          <Button>Tag 3</Button>
          <Button>Tag 1</Button>
          <Button>Tag 2</Button>
          <Button>Tag 3</Button>
        </HStack>
      </Skeleton>
    </div>
  );
}

export default Header;
