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
	
	title: '<b style="color:gray;">Berufliche Werdegang</b>',
	//icon: 'resources/images/Time-17.png',
	margin: '0 10 10 120',
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
			var datumObj = '';
			if(eventObj[2] !== ''){
			    datumObj = eventObj[2] + '-' + eventObj[3];
			}
			else if(eventObj[4] !== ''){
			    datumObj = eventObj[4];
			}
			var event = Ext.create('TheaterTool.model.PersonData', {
    			occup : eventObj[0],
    			beruf : eventObj[1],
    			datum  : datumObj
			});
			me.store.add(event);
			}
			}
	
		this.columns =[ 
		{
			text: 'Datum',
			flex: 1,
			menuDisabled: true,
			dataIndex: 'datum'
		},
		{
			text: 'Beruf',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'beruf'
			
		},
		{
			text: 'Tätigkeit',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'occup'
			
		}
		
		];
		
		this.callParent();
	}

});


