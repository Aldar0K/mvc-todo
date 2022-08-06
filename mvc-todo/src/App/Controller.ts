import ITodo from './Interfaces/ITodo';
import Model from './Model';
import View from './View';

class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;

        this.model.bindTodoListChanged(this.onTodoListChanged);

        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);

        this.onTodoListChanged(this.model.todos);
    }
    
    start = (): void => {
        this.view.render(this.model.todos);
    }

    onTodoListChanged = (todos: ITodo[]): void => {
        this.view.render(todos);
    }

    handleAddTodo = (todoText: string): void => {
        this.model.addTodo(todoText);
    }
    
    handleEditTodo = (id: number, todoText: string): void => {
        this.model.edidTodo(id, todoText);
    }

    handleDeleteTodo = (id: number): void => {
        this.model.deleteTodo(id);
    }

    handleToggleTodo = (id: number): void => {
        this.model.toggleTodo(id);
    }
}

export default Controller;
