import { Spinner } from '@chakra-ui/react';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';
import { Icon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export type CheckboxProps = {
  isChecked?: boolean;
  isLoading?: boolean;
  onChange: (isChecked: boolean) => void;
};

export const Checkbox = ({ isChecked, isLoading, onChange }: CheckboxProps) => (
  <Button
    variant="unstyled"
    display="flex"
    alignItems="center"
    justifyContent="center"
    isDisabled={isLoading}
    onClick={() => onChange(!isChecked)}
    data-testid="checkbox-button"
  >
    {isLoading ? (
      <Spinner h={6} w={6} data-testid="checkbox-loading-spinner" />
    ) : isChecked ? (
      <Icon
        as={FiCheckCircle}
        h={6}
        w={6}
        color="green.400"
        data-testid="checkbox-checked"
      />
    ) : (
      <Icon
        as={FiCircle}
        h={6}
        w={6}
        color="red.400"
        data-testid="checkbox-unchecked"
      />
    )}
  </Button>
);
