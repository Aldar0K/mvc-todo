import ITodo from './Interfaces/ITodo';
import { createElement, getElement } from './Utils/Utils';

class View {
    app: HTMLBodyElement;
    title: HTMLHeadingElement;
    form: HTMLFormElement;
    input: HTMLInputElement;
    submitButton: HTMLButtonElement;
    todoList: HTMLUListElement;

    private temporaryTodoText: string;

    constructor() {
        this.app = getElement('body') as HTMLBodyElement;

        this.title = createElement('h1') as HTMLHeadingElement;
        this.title.textContent = 'Todos';

        this.form = createElement('form') as HTMLFormElement;

        this.input = document.createElement('input') as HTMLInputElement;
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';

        this.submitButton = createElement('button') as HTMLButtonElement;
        this.submitButton.textContent = 'Submit';

        this.todoList = createElement('ul', 'todo-list') as HTMLUListElement;

        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.todoList);

        this.initLocalListeners();
    }

    private get todoText(): string {
        return this.input.value;
    }

    private resetInput(): void {
        this.input.value = '';
    }

    private initLocalListeners() {
        this.todoList.addEventListener(('input'), (e) => {
            const target = e.target as HTMLSpanElement;
            if (target.className === 'editable') {
                this.temporaryTodoText = target.innerText;
            }
        });
    }

    render(todos: ITodo[]): void {
        // Delete all nodes.
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        // Show message on empty todo list.
        if (todos.length === 0) {
            const p = createElement('p') as HTMLParagraphElement;
            p.textContent = 'Nothing to do! Add a new task?';
            this.todoList.append(p)
        } 
        
        // Show all todos, if the list is not empty.
        else {
            todos.forEach((todo) => {
                // Create todo li node for each todo.
                const li = createElement('li') as HTMLLIElement;
                li.id = todo.id.toString();

                // Each todo have checkbox, that you can toggle.
                const checkbox = createElement('input') as HTMLInputElement;
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                // The todo li text is a contenteditable span.
                const span = createElement('span') as HTMLSpanElement;
                // TODO не читает булево значение.
                span.contentEditable = 'true';
                span.classList.add('editable');
                span.textContent = todo.text;

                // If todo is complete it have strikethrough.
                if (todo.complete) {
                    span.classList.add('stike');
                }

                // Each todo have delete button
                const deleteButton = createElement('button', 'delete') as HTMLButtonElement;
                deleteButton.textContent = 'Delete';
                
                li.append(checkbox, span, deleteButton);
                this.todoList.append(li);
            })
        }
    }

    bindAddTodo(handler: CallableFunction): void {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.todoText) {
                handler(this.todoText);
                this.resetInput();
            }
        });
    }

    bindDeleteTodo(handler: CallableFunction): void {
        this.todoList.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            if (target.className === 'delete') {
                if (target.parentElement) {
                    const id = parseInt(target.parentElement.id);

                    handler(id);
                }
            }
        });
    }

    bindToggleTodo(handler: CallableFunction): void {
        this.todoList.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.type === 'checkbox') {
                if (target.parentElement) {
                    const id = parseInt(target.parentElement.id);

                    handler(id);
                }
            }
        });
    }

    bindEditTodo(handler: CallableFunction): void {
        this.todoList.addEventListener('focusout', (e) => {
            const target = e.target as HTMLSpanElement;
            if (this.temporaryTodoText) {
                const id = parseInt(target.parentElement.id);

                handler(id, this.temporaryTodoText);
                this.temporaryTodoText = '';
            }
        })
    }
}

export default View;
