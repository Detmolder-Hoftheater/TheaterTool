Ext.define('TheaterTool.model.Plan', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'jahr',   type: 'string'},       
        {name: 'xml',   type: 'boolean'},
        {name: 'monat',   type: 'string'},
         {name: 'details',   type: 'boolean'}
    ]
});