import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { updateTodo } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTodos } from '../redux/slice';

const TaskState = ({ id, isCompleted }) => {
  const dispatch = useDispatch();
  const listTodos = useSelector(state => state.todos.todos);
  
  const handleCheckbox = async () => {
    try {
      dispatch(updateTodo({ id }));
      const updatedTodos = listTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted }; 
        }
        return todo;
      });
      dispatch(saveTodos(updatedTodos));
    } catch (error) {
      Alert.alert('Error', 'An error occurred while handling the task state.');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleCheckbox}
      style={[
        styles.checkbox,
        isCompleted ? styles.checked : styles.unChecked
      ]}
    >
      {isCompleted && <Entypo name="check" size={18} color="#FAFAFA" /> }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 13,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .3,
    shadowRadius: 5,
    elevation: 5,
  },
  checked: {
    backgroundColor: '#262626',
  },
  unChecked: {
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    shadowOpacity: .1,
  },
});

export default TaskState;

