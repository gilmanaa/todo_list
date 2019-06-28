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
                <span>{this.props.text}</span>
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
        this.done = [];
        this.adds = 0;
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
        this.starMove = this.starMove.bind(this);
    }
    starMove(taskNumber) {
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
            var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
            this.todo.splice(taskPosition, 1);
            this.setState({
                add: false,
                completeTask: false,
                star: false
            })
        } else {
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
        $(".add-task-input").val("");
    }
    render() {
        if (this.state.add) {
            this.todo.push(<Task design="todo" text={this.state.input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.state.key} key={this.state.key} />)
        }
        if (this.state.completeTask) {
            this.done.push(<Task design="done" text={this.state.input} delete={this.deleteTask} move={this.moveTask} arrPosition={this.state.key} key={this.state.key} />)
        }
        if (this.state.star) {
            this.todo.unshift(<Task design="todo" text={this.state.input} delete={this.deleteTask} move={this.moveTask} star={this.starMove} arrPosition={this.state.key} key={this.state.key} />)
        }
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
                <Header text="The Do Zone" class="logo" />
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