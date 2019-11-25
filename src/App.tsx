import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
} from '@ionic/react';

import './App.css';
import { todo } from './types/index';
import { useTodosMethods, useTodosState } from './contexts/TodosProvider';
import { makeTodoCall, toggleTodoCall, deleteTodoCall } from './apiCalls/index';
import { InputChangeEventDetail, CheckboxChangeEventDetail } from '@ionic/core';

const TodoForm: React.FunctionComponent<{}> = () => {
  const [inputVal, setInputVal] = useState('');
  const { addTodo } = useTodosMethods();

  const handleSubmit = (
    e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!inputVal) return;

    makeTodoCall(inputVal).then(([todo, err]: [todo | null, boolean]): void => {
      if (!err && todo) {
        addTodo(todo);
        setInputVal('');
      }
    });
  };

  return (
    <IonItem>
      <IonInput
        onIonChange={(e: CustomEvent<InputChangeEventDetail>): void => {
          setInputVal(e.detail.value || '');
        }}
        placeholder="Enter a todo..."
        value={inputVal}
      />

      <IonButton onClick={handleSubmit}>Add Todo</IonButton>
    </IonItem>
  );
};

const Todo: React.FunctionComponent<{
  todo: todo;
}> = ({ todo: { id, title, completed } }) => {
  const { toggleComplete, removeTodo } = useTodosMethods();

  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={completed}
        onIonChange={(_: CustomEvent<CheckboxChangeEventDetail>): void => {
          toggleTodoCall(id, completed).then((toggled: boolean): void => {
            if (toggled) toggleComplete(id);
          });
        }}
      />

      <IonButton
        slot="end"
        color="danger"
        style={{ zIndex: '300' }}
        onClick={(
          ev: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
        ): void => {
          console.log('clicked');

          ev.stopPropagation();

          deleteTodoCall(id).then((deleted: boolean): void => {
            if (deleted) removeTodo(id);
          });
        }}
      >
        Delete
      </IonButton>

      <IonLabel>
        <h1 style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          {title}
        </h1>
      </IonLabel>
    </IonItem>
  );
};

const App: React.FunctionComponent<{}> = () => {
  const { todos }: { todos: todo[] } = useTodosState();
  const { addTodos } = useTodosMethods();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res): Promise<todo[]> => res.json())
      .then((data: todo[]): void => {
        addTodos(data);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>A basic to-do list</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div>
        <TodoForm />
      </div>

      <IonContent>
        <IonList>
          {todos.map(
            (t: todo, i: number): JSX.Element => (
              <Todo key={i} todo={t} />
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default App;
