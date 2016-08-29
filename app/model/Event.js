Ext.define('TheaterTool.model.Event', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'event',   type: 'string'},       
        {name: 'datum',   type: 'string'},
        {name: 'ort',   type: 'string'},
         {name: 'stadt',   type: 'string'}
    ]
});