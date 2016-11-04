Ext.define('TheaterTool.store.issue.IssueNames', {
    extend: 'Ext.data.TreeStore',
    model: 'TheaterTool.model.IssueName',
    extraParams: {
        selectedYear: ''
    },
    proxy: {
        type: 'ajax',
        url: 'resources/xql/getIssueNames.xql'
    },
    autoLoad: false
});