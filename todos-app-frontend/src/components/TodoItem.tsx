import { Icon } from '@chakra-ui/icons';
import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FiCheck, FiX, FiTrash } from 'react-icons/fi';
import {
  removeTodoMutation,
  toggleTodoCompletionMutation,
  updateTodoTitleMutation,
} from '../services/api/mutations';
import { Checkbox } from './Checkbox';
import { Input } from './Input';

export type TodoItemProps = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export const TodoItem = ({ id, title, isCompleted }: TodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const queryClient = useQueryClient();
  const removeTodo = useMutation(removeTodoMutation(queryClient)(id));
  const updateTodoTitle = useMutation(updateTodoTitleMutation(queryClient)(id));
  const toggleTodoCompletion = useMutation(
    toggleTodoCompletionMutation(queryClient)(id)
  );

  const handleToggle = (isChecked: boolean) => {
    toggleTodoCompletion.mutate(isChecked);
  };

  const handleEditTitle = (event: FormEvent) => {
    event.preventDefault();

    if (editedTitle !== title) {
      updateTodoTitle.mutate(editedTitle, {
        onSuccess() {
          setIsEditMode(false);
        },
      });
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  return (
    <HStack spacing={8}>
      <Checkbox
        isLoading={toggleTodoCompletion.isLoading}
        isChecked={isCompleted}
        onChange={handleToggle}
      />

      {isEditMode ? (
        <Flex flex="1" as="form" onSubmit={handleEditTitle}>
          <Input
            isDisabled={updateTodoTitle.isLoading}
            flex="1"
            type="text"
            ref={inputRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

          <HStack>
            <IconButton
              isDisabled={updateTodoTitle.isLoading}
              type="submit"
              aria-label={`submit edit ${title} to-do`}
              icon={<Icon as={FiCheck} />}
            />
            <IconButton
              isDisabled={updateTodoTitle.isLoading}
              aria-label={`cancel edit ${title} to-do`}
              icon={<Icon as={FiX} />}
              onClick={() => setIsEditMode(false)}
            />
          </HStack>
        </Flex>
      ) : (
        <Flex flex="1" align="center">
          <Text
            flex="1"
            cursor="pointer"
            onClick={() => setIsEditMode(true)}
            fontSize="lg"
            noOfLines={1}
            textOverflow="ellipsis"
            textDecoration={isCompleted ? 'line-through' : undefined}
          >
            {title}
          </Text>

          <IconButton
            isDisabled={removeTodo.isLoading}
            aria-label={`delete ${title} to-do`}
            icon={<Icon as={FiTrash} />}
            onClick={() => removeTodo.mutate()}
          />
        </Flex>
      )}
    </HStack>
  );
};
