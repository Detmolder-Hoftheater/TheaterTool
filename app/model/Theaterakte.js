Ext.define('TheaterTool.model.Theaterakte', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'}, 
        {name: 'date',   type: 'string'}, 
 		{name: 'details',   type: 'string'}, 
 		{name: 'workKey',   type: 'string'}, 
 		{name: 'anmerkung',   type: 'string'}
    ]
});