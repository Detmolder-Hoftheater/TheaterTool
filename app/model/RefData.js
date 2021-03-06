Ext.define('TheaterTool.model.RefData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'}, 
        {name: 'id',   type: 'string'},
        {name: 'refId',   type: 'string'},
        {name: 'refName',   type: 'string'},
        {name: 'iconExtend',   type: 'string'}, 
        {name: 'selLocation',   type: 'string'},        
        {name: 'jahr',   type: 'string'},
        {name: 'monat',   type: 'string'}
    ]
});