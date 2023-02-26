import { Icon } from '@chakra-ui/icons';
import { Box, Container, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useRef, type FormEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Input } from './components/Input';
import { TodoItem } from './components/TodoItem';
import { createTodoMutation } from './services/api/mutations';
import { getTodosQuery } from './services/api/queries';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Box
    px={6}
    py={4}
    w="full"
    borderBottomColor="blackAlpha.200"
    borderBottomWidth="thin"
  >
    {children}
  </Box>
);

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
        <Wrapper>
          <HStack as="form" onSubmit={handleSubmitCreateTodo}>
            <Input
              ref={inputRef}
              type="text"
              placeholder="What should be done?"
            />

            <IconButton
              size="md"
              type="submit"
              aria-label="add to-do"
              icon={<Icon as={FiPlus} />}
            />
          </HStack>
        </Wrapper>

        {todos.data?.map((todo) => (
          <Wrapper>
            <TodoItem
              id={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />
          </Wrapper>
        ))}
      </VStack>
    </Container>
  );
};
