Ext.define('TheaterTool.model.Person', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'},       
        {name: 'xml',   type: 'boolean'},
        {name: 'vorname',   type: 'string'},
         {name: 'details',   type: 'boolean'}
    ]
});
