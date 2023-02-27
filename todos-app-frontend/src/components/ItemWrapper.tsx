import { Box, type BoxProps } from '@chakra-ui/react';

type ItemWrapperProps = BoxProps;

export const ItemWrapper = ({ children, ...rest }: ItemWrapperProps) => (
  <Box
    px={6}
    py={4}
    w="full"
    borderBottomColor="blackAlpha.200"
    borderBottomWidth="thin"
    {...rest}
  >
    {children}
  </Box>
);
