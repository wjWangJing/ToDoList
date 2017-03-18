;!(function(){

    /**
     * 设置一个全局变量来保存子组件中的虚拟dom
     * */
    var childrenComponent=[];
    /**
     * 设置todoList初始状态
     * */
    var ToDoInit = React.createClass({
        /**
         * todoList初始数据
         * */
        getInitialState : function(){
            return {
                data : [
                    {"id":"1","task":"todoList1","complete":"false"},
                    {"id":"2","task":"todoList2","complete":"false"},
                    {"id":"3","task":"todoList3","complete":"false"}
                ]
            }
        },
        /**
         * 添加一项新任务
         * */
        addTask: function(task) {
            var data = this.state.data;
            var id = Math.floor(Math.random() * 1000 + 3);
            var complete = "false";
            data = data.concat([{"id" : id, "task" : task, "complete" : complete}]);
            this.setState({data});
        },
        /**
         * 根据id删除一项任务
         * */
        deleteTask: function(taskId) {

            //通过this.state.data获取到初始数据data
            var data = this.state.data;
            data = data.filter(function(task) {
                return task.id !== taskId;
            });
            this.setState({data});
        },
        /**
         * 修改某一项任务的complete
         * */
        toggleComplete : function(taskId){
            var data = this.state.data;
            for(var i in data) {
                if (data[i].id === taskId) {
                    data[i].complete = data[i].complete === "true" ? "false" : "true";
                    if(data[i].complete == "true"){
                        childrenComponent[i].refs.checkBox.style.background = "url('./image/true.png') no-repeat center center";
                        childrenComponent[i].refs.taskInner.style.textDecoration = "line-through";
                        childrenComponent[i].refs.taskInner.style.color = "#d9d9d9";
                    }else{
                        childrenComponent[i].refs.checkBox.style.background = "none";
                        childrenComponent[i].refs.taskInner.style.textDecoration = "none";
                        childrenComponent[i].refs.taskInner.style.color = "#333333";
                    }
                    break;
                }
            }
            this.setState({data});
        },
        /**
         * 渲染函数render
         * */
        render : function(){
            var that = this;
            var task = this.state.data.map(function(listItem){
                return (
                    <ToDoItem task = {listItem.task} key = {listItem.id} deleteTask = {that.deleteTask} toggleComplete = {that.toggleComplete} taskId = {listItem.id} complete={listItem.complete}/>
                )
            });
            return (
                <div className="todo-box">
                    <h1 className="task-title">ToDoList</h1>
                    <NewToDoItem addTask = {this.addTask}/>
                    <ul className="task-box">{task}</ul>
                </div>

            )
        }
    });
    /**
     * 设置todoList每一项的鼠标事件以及complete事件
     * */
    var ToDoItem = React.createClass({
        /**
         * 删除某一个ToDoItem
         **/
        deleteItem : function(){
            this.props.deleteTask(this.props.taskId);
        },
        /**
         * 修改某一个ToDoItem的complete状态
         **/
        changeItemState : function(){
            this.props.toggleComplete(this.props.taskId);
        },
        /**
         * 鼠标移入显示删除按钮，以及当前item背景变色
         **/
        mouseOver : function(){
            ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
            ReactDOM.findDOMNode(this.refs.deleteBtn).style.backgroundColor = "#DFF0D9";
            ReactDOM.findDOMNode(this.refs.listItem).style.backgroundColor = "#DFF0D9";
        },
        /**
         * 鼠标移出隐藏删除按钮，当前item背景变色
         **/
        mouseOut : function(){
            ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
            ReactDOM.findDOMNode(this.refs.deleteBtn).style.backgroundColor = "#F5F5F5";
            ReactDOM.findDOMNode(this.refs.listItem).style.backgroundColor = "#F5F5F5";
        },
        /*
         * 将组件最后的react实例保存下来，方便在父组件中调用其属性和方法。
         * */
        componentDidMount: function (){
            childrenComponent.push(this);
        },
        render : function(){
            return (
                <li  ref="listItem" onMouseOut={this.mouseOut} onMouseOver={this.mouseOver}>
                    <input type="checkbox" className="toggle" ref = "checkBox" onChange={this.changeItemState}/>
                    <span ref="taskInner">{this.props.task}</span>
                    <button className="deleteBtn" ref="deleteBtn" onClick={this.deleteItem}>×</button>
                </li>
            )
        }
    });

    /**
     * 添加新的item
     * */
    var NewToDoItem = React.createClass({
        /**
         * 点击提交按钮提交新的item
         * */
        submitTask: function(e) {
            // 事件对象以及阻止浏览器默认行为的兼容处理
            e = event || window.event;
            e.preventDefault()?e.preventDefault() : e.returnValue = false;

            var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
            if (!task) {
                return;
            }
            this.props.addTask(task);
            ReactDOM.findDOMNode(this.refs.task).value = "";
        },
        /**
         * 按回车键提交新的item
         * */
        enterTask: function(e) {
            var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
            if(e.keyCode==13){ // enter 键
                if (!task) {
                    return;
                }
                this.props.addTask(task);
                ReactDOM.findDOMNode(this.refs.task).value = "";
            }
        },
        render : function(){
            return (
                <div className="addTask-box">
                    <input type="text" className="addTask" placeholder="想做点什么呢？" ref = "task" onKeyDown={this.enterTask}/>
                    <input type="button" className="submitBtn" value = "添加" onClick={this.submitTask}/>
                </div>
            )
        }
    });

    ReactDOM.render(
        <ToDoInit />,
        document.getElementById("content")
    );
})();


