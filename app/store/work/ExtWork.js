Ext.define('TheaterTool.store.work.ExtWork', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.Werk',
    extraParams: {
        workName: '',
        dbPath: '',
        dbsourcePath: '',
        dbexpPath:'',
        eoutPath:''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getWork.xql'
    },
    autoLoad: false
});