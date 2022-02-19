import React from 'react';
import { Box, Text, HStack, VStack, Image } from '@chakra-ui/react';

function List() {
  return (
    <VStack pt="8rem" px="1rem" pb="1rem">
      <Box p="1rem" shadow="sm" borderWidth="1px" borderRadius="md" width="100%">
        <Image src="https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg" />
        <HStack>
          <Text>BTC</Text>
          <Text>Bitcoin</Text>
        </HStack>
        <VStack>
          <HStack justifyContent="space-between" width="100%">
            <Text>Last price</Text>
            <Text>Last price</Text>
          </HStack>
          <HStack justifyContent="space-between" width="100%">
            <Text>Last price</Text>
            <Text>Last price</Text>
          </HStack>
          <HStack justifyContent="space-between" width="100%">
            <Text>Last price</Text>
            <Text>Last price</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}

export default List;
