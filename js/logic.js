class Task extends React.Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
    }
    deleteTask(){
        this.props.delete(this.props.arrPosition);
    }
    moveTask(){
        this.props.move(this.props.arrPosition);
    }
    render(){
        return(
            <div className={this.props.design}>
                <input type="checkbox" onClick={this.moveTask}/>
                {this.props.text}
                <button className="delete" onClick={this.deleteTask}>Delete</button>
            </div>
        )
    }
}
class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: "",
            key: "",
            add: false,
            completeTask: false
        }
        this.todo = [];
        this.done = [];
        this.adds = 0;
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.moveTaskDone = this.moveTaskDone.bind(this);
        this.moveTaskRedo = this.moveTaskRedo.bind(this);
    }
    moveTaskRedo(taskNumber) {
        var taskPosition = this.done.findIndex(i => i.key === taskNumber);
        var moveTask = this.done.splice(taskPosition,1);
        console.log(moveTask);
        
        this.setState({
            add: true,
            completeTask: false,
            key: moveTask[0].key
        })
        
    }
    moveTaskDone(taskNumber){
        var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
        var moveTask = this.todo.splice(taskPosition,1);
        this.setState({
            add: false,
            completeTask: true,
            input: moveTask[0].props.text,
            key: moveTask[0].props.arrPosition
        })
        console.log(this.state.key)
    }
    deleteTask(taskNumber){
        var taskPosition = this.todo.findIndex(i => i.key === taskNumber);
        this.todo.splice(taskPosition,1);
        this.setState({
            add: false,
            completeTask: false
        })
    }
    addTask(){
        this.adds++;
        this.setState({ 
            add: true,
            completeTask: false,
            input: this.input.value,
            key: `task ${this.adds}`
        });
        $(".add-task-input").val("");
    }
    render(){
        if (this.state.add) {
            this.todo.push(<Task design="todo" text={this.state.input} delete={this.deleteTask} move={this.moveTaskDone} arrPosition={this.state.key} key={this.state.key}/>)
        }
        if (this.state.completeTask) {
            this.done.push(<Task design="done" text={this.state.input} delete={this.deleteTask} move={this.moveTaskRedo} arrPosition={this.state.key} key={this.state.key}/>)
        }
        return(
            <div>
                <div className="input-wrapper">
                    <input className="add-task-input" type="text" ref={x => this.input = x} placeholder="Greatness awaits outside the comfort zone..."/>
                    <button className="add-task" onClick={this.addTask}>+</button>
                </div>
                <div className="to-do-start">Tasks/Goals</div>
                <div>
                    {this.todo}
                </div>
                <div className="to-do-start">Accomplishments</div>
                <div id="doneContainer">
                    {this.done}
                </div>
            </div>
        )
    }
}
class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="header">
                <div >{this.props.text}</div>
                <div className={this.props.class}></div>
            </div>
        )
    }
}
class App extends React.Component {
    render(){
        return(
            <div className="app-wrapper">
                <Header text="Comfort Zone" class="logo"/>
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