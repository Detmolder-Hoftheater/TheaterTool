Ext.define('TheaterTool.model.Person', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'}, 
        {name: 'forename',   type: 'string'}, 
		{name: 'role',   type: 'string'}, 
		{name: 'dbkey',   type: 'auto'},       
        {name: 'xml',   type: 'boolean'},
         {name: 'details',   type: 'boolean'}
    ]
});
