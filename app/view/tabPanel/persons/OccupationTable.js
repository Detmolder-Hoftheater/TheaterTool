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
			
			var persRole = '';
		
			if(eventObj[1] === 'cmp'){
				persRole = 'Komponist';
			}
			else if(eventObj[1] === 'lbt'){
				persRole = 'Librettist';
			}
			else if(eventObj[1] === 'lyr'){
				persRole = 'Textdichter';
			}
			else if(eventObj[1] === 'drt'){
				persRole = 'Intendant';
			}
			else if(eventObj[1] === 'msd'){
				persRole = 'Musikdirektor';
			}
			else if(eventObj[1] === 'drd'){
				persRole = 'Schauspieldirektor';
			}
			else if(eventObj[1] === 'cnd'){
				persRole = 'Dirigent';
			}
			else if(eventObj[1] === 'cpm'){
				persRole = 'Kapellmeister';
			}
			else if(eventObj[1] === 'blm'){
				persRole = 'Ballettmeister';
			}
			else if(eventObj[1] === 'sgd'){
				persRole = 'Regisseur';
			}
			else if(eventObj[1] === 'act'){
				persRole = 'Schauspieler';
			}
			else if(eventObj[1] === 'bld'){
				persRole = 'Balletttänzer';
			}
			else if(eventObj[1] === 'bga'){
				persRole = 'Statist/Komparse';
			}
			else if(eventObj[1] === 'mus'){
				persRole = 'Musiker';
			}
			else if(eventObj[1] === 'chs'){
				persRole = 'Chorsänger';
			}
			else if(eventObj[1] === 'sng'){
				persRole = 'Sänger';
			}
			else if(eventObj[1] === 'sls'){
				persRole = 'Gesangssolist';
			}
			else if(eventObj[1] === 'tha'){
				persRole = 'Theateragent';
			}
			else if(eventObj[1] === 'stc'){
				persRole = 'Inspektor';
			}
			else if(eventObj[1] === 'elg'){
				persRole = 'Beleuchter';
			}
			else if(eventObj[1] === 'ptm'){
				persRole = 'Requisiteur';
			}
			else if(eventObj[1] === 'drs'){
				persRole = 'Garderobier/Garderobepersonal';
			}
			else if(eventObj[1] === 'hdr'){
				persRole = 'Friseur';
			}
			else if(eventObj[1] === 'tlr'){
				persRole = 'Schneidermeister/Schneider';
			}
			else if(eventObj[1] === 'stm'){
				persRole = 'Bühnenmeister';
			}
			else if(eventObj[1] === 'sth'){
				persRole = 'Bühnentechniker';
			}
			else if(eventObj[1] === 'dcp'){
				persRole = 'Bühnenbildmaler';
			}
			else if(eventObj[1] === 'csh'){
				persRole = 'Kassierer';
			}
			else if(eventObj[1] === 'lbn'){
				persRole = 'Bibliothekar';
			}
			else if(eventObj[1] === 'mcp'){
				persRole = 'Kopist';
			}
			else if(eventObj[1] === 'bnd'){
				persRole = 'Buchbinder';
			}
			else if(eventObj[1] === 'ppm'){
				persRole = 'Papierhersteller';
			}
			
			else{
				persRole = eventObj[1];
			}
			
			var event = Ext.create('TheaterTool.model.PersonData', {
    			occup : eventObj[0],
    			beruf : persRole,
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
		/*{
			text: 'Beruf',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'beruf'
			
		},*/
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


