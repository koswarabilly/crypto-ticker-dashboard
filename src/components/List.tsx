// @ts-nocheck
import React, { useContext, useEffect } from 'react';
import {
  // Text,
  HStack,
  VStack,
  // Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
  CircularProgress,
  IconButton,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { cryptoColumns, cryptoContext } from '../App';

function List() {
  const { search, assets, isLoading } = useContext(cryptoContext);

  const initialState: any = {
    pageIndex: 0,
    pageSize: 8,
    sortBy: [{ id: 'rank' }],
    hiddenColumns: ['localFullName'],
  };

  const {
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    state: { pageIndex },
    setGlobalFilter,
  } = useTable(
    {
      columns: cryptoColumns,
      data: assets,
      initialState,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    setGlobalFilter(search);
  }, [search, setGlobalFilter]);

  if (isLoading) {
    return (
      <Center w="100%" h="100vh" maxW="45rem">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <VStack pt="8rem" pb="1rem">
      <Table>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr key={`h${headerGroup.id}`}>
              {headerGroup.headers.map((column) => {
                const headerProp = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <Th
                    key={headerProp.key}
                    role={headerProp.role}
                    onClick={headerProp.onClick}
                    style={headerProp.style}
                  >
                    {column.render('Header')}
                    {!column.isSorted && !column.isSortedDesc ? (
                      <ArrowUpDownIcon w="8px" h="8px" marginLeft=".25rem" />
                    ) : null}
                    {column.isSorted && !column.isSortedDesc ? (
                      <ChevronUpIcon marginLeft=".2rem" />
                    ) : null}
                    {column.isSortedDesc ? <ChevronDownIcon marginLeft=".2rem" /> : null}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <Tr borderBottomWidth="1px" px="1rem" key={row.id}>
                {row.cells.map((cell: any) => {
                  const cellProp = cell.getCellProps();
                  return (
                    <Td key={cellProp.key} role={cellProp.role} borderBottomWidth="0">
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <HStack spacing="1rem" pt="1rem">
        <IconButton
          aria-label="Go to first page"
          icon={<ArrowLeftIcon w=".75rem" h=".75rem" />}
          onClick={() => gotoPage(0)}
        />
        <IconButton
          aria-label="Go to previous page"
          icon={<ChevronLeftIcon w="1.25rem" h="1.25rem" />}
          onClick={previousPage}
        />
        <Text>
          {pageIndex + 1} of {pageCount}
        </Text>
        <IconButton
          aria-label="Go to next page"
          icon={<ChevronRightIcon w="1.25rem" h="1.25rem" />}
          onClick={nextPage}
        />
        <IconButton
          aria-label="Go to last page"
          icon={<ArrowRightIcon w=".75rem" h=".75rem" />}
          onClick={() => gotoPage(pageCount - 1)}
        />
      </HStack>
    </VStack>
  );
}

export default List;
