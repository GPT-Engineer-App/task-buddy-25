import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Checkbox, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(newTasks);
  };

  const editTask = (index, newText) => {
    const newTasks = tasks.map((task, i) => (i === index ? { ...task, text: newText } : task));
    setTasks(newTasks);
    setEditingIndex(null);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new task" value={task} onChange={(e) => setTask(e.target.value)} />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              {editingIndex === index ? (
                <Editable defaultValue={task.text} onSubmit={(newText) => editTask(index, newText)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              ) : (
                <>
                  <Checkbox isChecked={task.completed} onChange={() => toggleTaskCompletion(index)}>
                    <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                  </Checkbox>
                  <IconButton aria-label="Edit Task" icon={<FaEdit />} onClick={() => setEditingIndex(index)} />
                </>
              )}
              <IconButton aria-label="Delete Task" icon={<FaTrash />} onClick={() => deleteTask(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
