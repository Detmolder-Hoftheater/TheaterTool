Ext.define('TheaterTool.model.Werk', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'},  
 		{name: 'componist',   type: 'string'}, 
		{name: 'werkID',   type: 'string'},       
        {name: 'xml',   type: 'boolean'},
        {name: 'details',   type: 'boolean'},
        {name: 'incipits',   type: 'boolean'}
    ]
});