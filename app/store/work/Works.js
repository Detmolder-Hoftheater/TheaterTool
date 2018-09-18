Ext.define('TheaterTool.store.work.Works', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.Werk',
    extraParams: {
        selection: ''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getWorks.xql'
    },
    autoLoad: false
}

);