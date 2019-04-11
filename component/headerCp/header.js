// component/headerCp/header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        changeColor:true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        selectCont() {
            this.triggerEvent('myevent',{content:true,help:false});
            this.setData({
                changeColor:true,
            });
        },
        selectInfo() {
            this.triggerEvent('myevent', { content: false, help: true });
            this.setData({
                changeColor: false,
            });
        },
    },
    
})
