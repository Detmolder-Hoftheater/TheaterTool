Ext.define('TheaterTool.view.tabPanel.persons.OccupationTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.PersonData'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	
	title: '<b style="color:gray;">Tätigkeiten</b>',
	//icon: 'resources/images/Time-17.png',
	margin: '0 0 10 110',
	sortableColumns: false,
	
	ocupationList: null,
		
	store: null,
	
	initComponent: function () {
	
	var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.PersonData',
    data:[]
});

if(typeof me.ocupationList !== 'undefined'){
for(i = 0; i < me.ocupationList.length; i++){
			var eventObj = me.ocupationList[i];
			var event = Ext.create('TheaterTool.model.PersonData', {
    			event : eventObj[0],
    			datum  : eventObj[1],
    			ort: eventObj[2],
    			stadt: eventObj[3]
			});
			me.store.add(event);
			}
			}
	
		this.columns =[ 
		{
			text: 'Beschäftigung',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'beruf'
			
		},
		{
			text: 'Datum',
			flex: 1,
			menuDisabled: true,
			dataIndex: 'datum'
		}
		];
		
		this.callParent();
	}

});


