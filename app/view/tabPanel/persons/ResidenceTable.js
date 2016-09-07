Ext.define('TheaterTool.view.tabPanel.persons.ResidenceTable', {
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
	
	title: '<b style="color:gray;">Wohnsitz(e)</b>',
	//icon: 'resources/images/Time-17.png',
	margin: '0 10 10 120',
	sortableColumns: false,
	
	residenseList: null,
		
	store: null,
	
	initComponent: function () {
	
	var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.PersonData',
    data:[]
});

if(typeof me.residenseList !== 'undefined'){
for(i = 0; i < me.residenseList.length; i++){
			var eventObj = me.residenseList[i];
			var datumObj = '';
			if(eventObj[1] !== ''){
			    datumObj = eventObj[1] + '-' + eventObj[2];
			}
			else if(eventObj[2] !== ''){
			    datumObj = eventObj[2];
			}
			var event = Ext.create('TheaterTool.model.PersonData', {
    			stadt : eventObj[0],
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
			text: 'Stadt',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'stadt'
			
		}
		
		];
		
		this.callParent();
	}

});


