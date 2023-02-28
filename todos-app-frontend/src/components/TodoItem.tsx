import { Icon } from '@chakra-ui/icons';
import { Flex, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FiCheck, FiX, FiTrash } from 'react-icons/fi';
import {
  removeTodoMutation,
  toggleTodoCompletionMutation,
  updateTodoTitleMutation,
} from '../services/api/mutations';
import { getTodosQuery } from '../services/api/queries';
import { getAxiosErrorMessage } from '../utils/getAxiosErrorMessage';
import { Checkbox } from './Checkbox';
import { Input } from './Input';

export type TodoItemProps = {
  id: string;
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

  const isRevalidatingTodos = useIsFetching(getTodosQuery());

  const toast = useToast();

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
        onError(error) {
          toast({
            status: 'error',
            title: 'Error updating title.',
            description: getAxiosErrorMessage(error),
          });
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
        isLoading={toggleTodoCompletion.isLoading || !!isRevalidatingTodos}
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
            data-testid="edit-todo-title-input"
          />

          <HStack>
            <IconButton
              isDisabled={updateTodoTitle.isLoading}
              type="submit"
              aria-label={`submit edit ${title} to-do`}
              icon={<Icon as={FiCheck} />}
              data-testid="submit-edit-todo-title-button"
            />
            <IconButton
              isDisabled={updateTodoTitle.isLoading}
              aria-label={`cancel edit ${title} to-do`}
              icon={<Icon as={FiX} />}
              onClick={() => setIsEditMode(false)}
              data-testid="cancel-edit-todo-title-button"
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
            data-testid="remove-todo-button"
          />
        </Flex>
      )}
    </HStack>
  );
};
