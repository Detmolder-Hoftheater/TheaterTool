Ext.define('TheaterTool.store.facsimile.FacsimileNames', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.FacsimileNavigation',
    extraParams: {
        selectedWork: ''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getFacsimileViewNavigation.xql'
    },
    autoLoad: false
});