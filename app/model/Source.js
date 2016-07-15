Ext.define('TheaterTool.model.Source', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'titel',  type: 'auto'},
		{name: 'autoren',   type: 'auto'},
		{name: 'abschriften',  type: 'auto'},
		{name: 'provenienzen',  type: 'auto'},
		{name: 'sprachen',  type: 'auto'},
		{name: 'bibliotheken',  type: 'auto'},
		{name: 'bemerkungen',  type: 'auto'}       
    ]
});
