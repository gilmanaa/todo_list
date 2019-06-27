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
                {/* <ToDo/>
                <Done/> */}
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