import ITodo from './Interfaces/ITodo';

class Model {
    todos: ITodo[];

    constructor() {
        this.todos = [
            {id: 1, text: 'Run a marathon', complete: false},
            {id: 2, text: 'Buy bread', complete: false},
        ];
    }

    addTodo(todoText: string): void {
        const todo: ITodo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false
        }

        this.todos.push(todo);
    }

    edidTodo(id: number, updatedText: string): void {
        // this.todos = // Надо ли вообще?!
        this.todos.map((todo) => todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
        );
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    toggleTodo(id: number): void {
        // this.todos = // Надо ли вообще?!
        this.todos.map((todo) => todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
        );
    }
}

export default Model;
