import listener from "./listener";

class TodoApp {
    init() {
        console.log("Todo app is starting...");
        listener();
    }
}

const todoApp = new TodoApp();

export default todoApp;
