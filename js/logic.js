class Task extends React.Component {
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
        this.starTask = this.starTask.bind(this);
    }
    deleteTask() {
        this.props.delete(this.props.arrPosition, this.props.design);
    }
    moveTask() {
        this.props.move(this.props.arrPosition, this.props.design);
    }
    starTask(event) {
        event.target.classList[0] === "grey-star" ? event.target.classList = "gold-star" : event.target.classList = "grey-star";
        this.props.star(this.props.arrPosition);
    }
    render() {
        var moveText = this.props.design === "todo" ? "Done" : "Undo";
        var star = this.props.design === "todo" ? <span className="grey-star" onClick={this.starTask}></span> : null;
        return (
            <div className={this.props.design}>
                <label className="move-text">{moveText}</label>
                <input type="checkbox" onClick={this.moveTask} />
                {star}
                <span className="task-text">{this.props.text}</span>
                <button className="delete" onClick={this.deleteTask}>Delete</button>
            </div>
        )
    }
}
class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            key: "",
            add: false,
            completeTask: false,
            star: false
        }
        this.todo = [];
        this.todoStates = [];
        this.done = [];
        this.doneStates = [];
        this.adds = 0;
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
        this.starMove = this.starMove.bind(this);
    }
    starMove(taskNumber) {
        var storagePos = this.todoStates.findIndex(i => i.key === taskNumber);
        this.todoStates.splice(storagePos,1);
        var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
        var moveTask = this.todo.splice(taskPosition, 1);
        this.setState({
            add: false,
            completeTask: false,
            star: true,
            input: moveTask[0].props.text,
            key: moveTask[0].props.arrPosition
        })
    }
    moveTask(taskNumber, category) {
        if (category === "done") {
            var storagePos = this.doneStates.findIndex(i => i.key === taskNumber);
            this.doneStates.splice(storagePos,1);
            var taskPosition = this.done.findIndex(i => i.key === taskNumber);
            var moveTask = this.done.splice(taskPosition, 1);
            this.setState({
                add: true,
                completeTask: false,
                star: false,
                input: moveTask[0].props.text,
                key: moveTask[0].key
            })
        } else {
            var storagePos = this.todoStates.findIndex(i => i.key === taskNumber);
            this.todoStates.splice(storagePos,1);
            var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
            var moveTask = this.todo.splice(taskPosition, 1);
            this.setState({
                add: false,
                completeTask: true,
                star: false,
                input: moveTask[0].props.text,
                key: moveTask[0].props.arrPosition
            })
        }
    }
    deleteTask(taskNumber, category) {
        if (category === "todo") {
            var storagePos = this.todoStates.findIndex(i => i.key === taskNumber);
            this.todoStates.splice(storagePos,1);
            var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
            this.todo.splice(taskPosition, 1);
            this.setState({
                add: false,
                completeTask: false,
                star: false
            })
        } else {
            var storagePos = this.doneStates.findIndex(i => i.key === taskNumber);
            this.doneStates.splice(storagePos,1);
            var taskPosition = this.done.findIndex(i => i.key === taskNumber);
            this.done.splice(taskPosition, 1);
            this.setState({
                add: false,
                completeTask: false,
                star: false
            })
        }
    }
    addTask() {
        this.adds++;
        this.setState({
            add: true,
            completeTask: false,
            star: false,
            input: this.input.value,
            key: `task ${this.adds}`
        });
        this.input.value = "";
    }
    componentDidUpdate(prevProps,prevState) {
        localStorage.setItem("todo",JSON.stringify(this.todoStates));
        localStorage.setItem("done",JSON.stringify(this.doneStates));
    }
    componentWillMount() {
        if (localStorage.length > 0) {
            if (typeof JSON.parse(localStorage.todo) != "undefined") {
                this.savedTodo = JSON.parse(localStorage.todo).length > 0 ? JSON.parse(localStorage.todo) : [];
            } else {
                this.savedTodo = [];
            }
            if (typeof JSON.parse(localStorage.done) != "undefined") {
                this.savedDone = JSON.parse(localStorage.done).length > 0 ? JSON.parse(localStorage.done) : [];
            } else {
                this.savedDone = [];
            }   
        } else {
            this.savedTodo = [];
            this.savedDone = [];
        }
    }
    componentDidMount() {
        var maxTaskNumber = 0;
        for (let i = 0; i < this.savedTodo.length; i++) {
            let taskNum = parseInt(this.savedTodo[i].key.split(" ")[1]);
            taskNum > maxTaskNumber ? maxTaskNumber = taskNum : maxTaskNumber;
        }
        for (let i = 0; i < this.savedDone.length; i++) {
            let taskNum = parseInt(this.savedDone[i].key.split(" ")[1]);
            taskNum > maxTaskNumber ? maxTaskNumber = taskNum : maxTaskNumber;
        }
        this.adds = maxTaskNumber;
        this.todoStates = this.savedTodo;
        this.doneStates = this.savedDone;
        this.savedTodo = [];
        this.savedDone = [];
    }
    renderLogic() {
        if (this.savedTodo.length > 0) {
            for (let i = 0; i < this.savedTodo.length; i++) {
                this.todo.push(<Task design="todo" text={this.savedTodo[i].input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.savedTodo[i].key} key={this.savedTodo[i].key}/>)
            }
        }
        if (this.savedDone.length > 0) {
            for (let i = 0; i < this.savedDone.length; i++) {
                this.done.push(<Task design="done" text={this.savedDone[i].input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.savedDone[i].key} key={this.savedDone[i].key}/>)
            }
        }
        if (this.state.add) {
            this.todo.push(<Task design="todo" text={this.state.input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.state.key} key={this.state.key} />)
            this.todoStates.push(this.state);
        }
        if (this.state.completeTask) {
            this.done.push(<Task design="done" text={this.state.input} delete={this.deleteTask} move={this.moveTask} arrPosition={this.state.key} key={this.state.key} />)
            this.doneStates.push(this.state);
        }
        if (this.state.star) {
            this.todo.unshift(<Task design="todo" text={this.state.input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.state.key} key={this.state.key} />)
            this.todoStates.unshift(this.state);
        }
        
    }
    render() {
        this.renderLogic();
        var todoHeader = this.todo.length > 0 ? "Tasks/Goals" : "Add some To Do's or Goals";
        var doneHeader = this.done.length > 0 ? "Accomplishments" : null;
        return (
            <div>
                <div className="input-wrapper">
                    <input className="add-task-input" type="text" ref={x => this.input = x} placeholder="Greatness awaits outside the comfort zone..." />
                    <button className="add-task" onClick={this.addTask}>+</button>
                </div>
                <div className="to-do-start">{todoHeader}</div>
                <div>
                    {this.todo}
                </div>
                <div className="to-do-start">{doneHeader}</div>
                <div id="doneContainer">
                    {this.done}
                </div>
            </div>
        )
    }
}
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div >{this.props.text}</div>
                <div className={this.props.class}></div>
            </div>
        )
    }
}
class App extends React.Component {
    render() {
        return (
            <div className="app-wrapper">
                <Header text="Get It Done" class="logo" />
                <ToDo />
            </div>
        )
    }
}
function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();