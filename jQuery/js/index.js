;!(function($){
    'use strict';
    var data = [
        {"id":"1","task":"todoList1","complete":"false"},
        {"id":"2","task":"todoList2","complete":"false"},
        {"id":"3","task":"todoList3","complete":"false"}
    ];
    var init = function(){
        var domElement = {
            $Item : $(".Item"),
            $submitBtn : $(".submitBtn"),
            $ItemContainer : $(".ItemContainer"),
            $checkBtn : $(".checkBtn"),
            $ItemInner : $(".ItemInner"),
            $detailBtn : $(".detailBtn"),
            $deleteBtn : $(".deleteBtn"),
            taskInner : $(".ItemContainer").html()
        };
        showTask(domElement);
        addTask(domElement);
        removeTask(domElement);
    };
    /**
     * 展示已经存在的task
     * @params {object} domElement 要操作的dom元素
     * */
    var showTask = function(domElement){
        var html = [];
        for(var i = 0;i < data.length;i++){
            var _html = domElement.taskInner
                .replace("{{item}}",data[i].task);
            html.push(_html);
        }
        domElement.$ItemContainer.html(html.join(""));
    };
    /**
     * 添加新的task
     * @params {object} domElement 要操作的dom元素
     * */
    var addTask = function(domElement){
        domElement.$submitBtn.click(function(){
            var task = domElement.$Item.val();
            if(!task){
                return false;
            }
            var obj = {};
            obj.id = randomNum();
            obj.task = task;
            obj.complete = false;
            data.push(obj);
            domElement.$Item.val("");
            showTask(domElement);
        });
    };
    /**
     * 删除task
     * @params {object} domElement 要操作的dom元素
     * */
    var removeTask = function(domElement){
        domElement.$deleteBtn[0].onclick = function(){
            alert(2);
            var $this = $(this);
            console.log($this);
        };
    };
    /**
     * 生成随机数
     * */
    var randomNum = function(){
        return Math.floor(Math.random() * 1000 + 3);
    };
    init();
})(jQuery);