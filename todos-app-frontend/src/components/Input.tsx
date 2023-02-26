import { forwardRef, type ForwardedRef } from 'react';
import {
  Input as ChakraInput,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';

type InputProps = ChakraInputProps;

const InputBase = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
  <ChakraInput
    ref={ref}
    px="0"
    size="md"
    fontSize="lg"
    border="none"
    _focusVisible={{ outline: 'none' }}
    {...props}
  />
);

export const Input = forwardRef(InputBase);
