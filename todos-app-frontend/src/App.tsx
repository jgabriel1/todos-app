import { Icon } from '@chakra-ui/icons';
import { Container, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, type FormEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Input } from './components/Input';
import { ItemWrapper } from './components/ItemWrapper';
import { TodoItem } from './components/TodoItem';
import { createTodoMutation } from './services/api/mutations';
import { getTodosQuery } from './services/api/queries';

export const App = () => {
  const todos = useQuery(getTodosQuery());

  const queryClient = useQueryClient();

  const createTodo = useMutation(createTodoMutation(queryClient));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitCreateTodo = (event: FormEvent) => {
    event.preventDefault();

    const inputValue = inputRef.current?.value;

    if (inputValue) {
      createTodo.mutate(
        { title: inputValue },
        {
          onSuccess() {
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          },
        }
      );
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing="0" w="full" shadow="md" bg="whiteAlpha.600">
        <ItemWrapper>
          <HStack
            as="form"
            onSubmit={handleSubmitCreateTodo}
            data-testid="add-todo-form"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="What should be done?"
              data-testid="add-todo-input"
            />

            <IconButton
              size="md"
              type="submit"
              aria-label="add to-do"
              icon={<Icon as={FiPlus} />}
              data-testid="add-todo-button"
            />
          </HStack>
        </ItemWrapper>

        {todos.data?.map((todo) => (
          <ItemWrapper key={`to-dos-list-item-${todo.id}`}>
            <TodoItem
              id={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />
          </ItemWrapper>
        ))}
      </VStack>
    </Container>
  );
};
