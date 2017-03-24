/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTabPanel', {
	extend: 'Ext.panel.Panel',

layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},


	
	bodyPadding: 10,
	
	autoScroll: true,
	
	border: false,
	
	titel: null,
	medium: null,
	zustand: null,
	personen: null,
	schreiber: null,
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,
	inventar: null,
	persStore: null,

/*initComponent: function () {
//var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree();
this.items = [

		{				
				layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 10,
				
				defaults: {
					frame: true,
					bodyPadding: 10
				},
				
				border: false,
				items: [
					]
				}
 ]

 this.callParent();
    

},*/
	
	setTitelValue: function () {
		
		var me = this;

Ext.Ajax.request({
				 url: 'resources/xql/getSourceDetails.xql',
				async: false,
				method: 'GET',
				params: {
					sourceID: me.sourceID
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					
					var source_list = json.sources;
					console.log(source_list);




var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree({source_list: source_list});
//tableTest.createContentForSources(source_list);
tableTest.setTablePanel(me);
me.add(tableTest);

/*me.add({xtype: 'label',
        		html: '<b style="color:#CC9FA7;"></b>',
        		margin: '0 10 0 10'});*/


var source_group = Ext.create('Ext.panel.Panel', {
			//title: '<b style="color:gray;">Sources Titel</b>',
			flex:2,
border:false,
bodyPadding:15,
			items:[]
		});
		me.add(source_group);

var phys_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Physikalische Daten</b>',
			flex:2,
		//border:false,
		//bodyPadding:15,
collapsible: true,
			collapsed: false,
			items:[]
		});
		source_group.add(phys_group);

me.titel = me.createTextArea('Titelseite(n)');
phys_group.add(me.titel);

me.medium = me.createTextArea('Umschlag');
me.zustand = me.createTextArea('Zustand');

me.persStore = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Person',
    data:[]
});
me.personen =Ext.create('Ext.grid.Panel', {
    store: me.persStore,
    columns: [
        { header: 'Name',  dataIndex: 'name', flex:2 },
Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: 'Details',
			flex:0.5,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
					if(record.data.dbkey !== ''){
					this.items[0].icon = 'resources/images/Door-24.png';					
				}				
				else {					
					this.items[0].icon = '';
				}
				
				
				metadata.style = 'cursor: pointer;';
				return val;
			},
handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					console.log(rec);
					var dbkey = rec.data.dbkey;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: dbkey, title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Mask-19.png'});
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	

                }
		})



       // { header: 'Details', dataIndex: 'dbkey', flex:0.5 }
    ],
margin: '0 0 0 50',
height: 150,
width: 200
});
var pers_panel = Ext.create('Ext.panel.Panel', {
colspan: 1,
			layout: {
				type: 'table',
				columns: 2,
			tdAttrs: {
        			valign: 'top'
   				 },
				tableAttrs: {
				style: {
				width: '100%'
				}
				}
			},
height: 150,
width: 330,
			autoScroll: true,
			border: false,
						items:[
{

				xtype: 'label',
        		html: 'Personen',
        		margin: '0 0 0 7'
			},
me.personen

]
		});



//me.personen = me.createTextArea('Personen');
//me.personen.setHeight(170);


	me.inventar = me.createTextField('Inverntarnummer');
me.w_ein_titel = me.createTextField('Umfang');
me.w_titel = me.createTextField('Format');
me.w_alt_titel = me.createTextField('Stempel');
		
		me.schreiber = me.createTextArea('Schreiber');	
		
			
			

			var panel_10 = Ext.create('Ext.panel.Panel', {
				
				type: 'hbox',
				border: false,
				items:[]
			});
panel_10.items.add(me.medium);
panel_10.items.add(me.zustand);
panel_10.items.add(me.inventar);
panel_10.items.add(me.w_ein_titel);
panel_10.items.add(me.w_titel);
panel_10.items.add(me.w_alt_titel);



			
			//panel_10.items.add(me.titel);


var panel_110 = Ext.create('Ext.panel.Panel', {
				
				type: 'hbox',
				border: false,
				items:[]
			});

			panel_110.items.add(me.schreiber);
			panel_110.items.add(pers_panel);



		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2
			},
			autoScroll: true,
			border: false,
			
			items:[
panel_10,
panel_110
]


		});
		
		phys_group.add(headpanel_1);

var panel_source = Ext.create('Ext.panel.Panel', {
				bodyPadding: 8,
				type: 'hbox',
				border: false,
				items:[]
			});
source_group.add(panel_source);

		me.prov = me.createTextArea('Inhalt');
		me.prov.setHeight(150);
		panel_source.add(me.prov);
		me.annot = me.createTextArea('Anmerkungen');
		me.annot.setHeight(150);
		panel_source.add(me.annot);

me.abs = me.createTextField('Entstehung');		
		me.language = me.createTextField('Sprache(n)');
		var panel_101 = Ext.create('Ext.panel.Panel', {
				layout: {
				type: 'table',
				columns: 2
			},
			autoScroll: true,
			border: false,
				items:[
					me.abs,
					me.language
					]
			});
		panel_source.add(panel_101);
		
		me.sign = me.createTextArea('Aufführungen');
		me.sign.setHeight(150);
		panel_source.add(me.sign);
	

}
			});
	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,
			
			
			readOnly: true,
			anchor: '100%',
			style: {
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			}
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			name: fieldName,
			readOnly: true,
			
			style: {
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			},
			
			fieldLabel: fieldName,
			anchor: '100%'
		});
		
		return textArea;
	},

setValues: function(selectedSource){
//console.log(selectedSource.selected[0]);
	this.medium.setValue(selectedSource[0].data.medium);

	
if(typeof selectedSource[0].data.titlePages !== 'undefined'){
	var pages = '';
	for(i = 0; i < selectedSource[0].data.titlePages.length; i++){
	  pages += selectedSource[0].data.titlePages[i]+'\n'

	}
	this.titel.setValue(pages);
}
	
if(typeof selectedSource[0].data.inhalt !== 'undefined'){
	var inhaltText = '';
	for(i = 0; i < selectedSource[0].data.inhalt.length; i++){
	  inhaltText += selectedSource[0].data.inhalt[i]+'\n'

	}
	this.prov.setValue(inhaltText);
}

if(typeof selectedSource[0].data.s_bemerkungen !== 'undefined'){
	var bem = '';
	for(i = 0; i < selectedSource[0].data.s_bemerkungen.length; i++){
	  bem += selectedSource[0].data.s_bemerkungen[i]+'\n\n'

	}
	this.annot.setValue(bem);
}
	//this.zustand.setValue(selectedSource[0].data.condition);

if(typeof selectedSource[0].data.schreiber !== 'undefined'){
	var schr = '';
	for(i = 0; i < selectedSource[0].data.schreiber.length; i++){
	  schr += selectedSource[0].data.schreiber[i]+'\n'

	}
	this.schreiber.setValue(schr);
}

if(typeof selectedSource[0].data.sprache !== 'undefined'){
	var spr = '';
	for(i = 0; i < selectedSource[0].data.sprache.length; i++){
	  spr += selectedSource[0].data.sprache[i]+'\n'

	}
	this.language.setValue(spr);
}

/*if(typeof selectedSource[0].data.inscription !== 'undefined'){
	var pers = '';
	for(i = 0; i < selectedSource[0].data.inscription.length; i++){
	  pers += selectedSource[0].data.inscription[i]+'\n'

	}
	this.personen.setValue(pers);
}*/

this.persStore.removeAll();

if(typeof selectedSource[0].data.inscription !== 'undefined'){
for(i = 0; i < selectedSource[0].data.inscription.length; i++){
			var autor = selectedSource[0].data.inscription[i];
			
			var person = Ext.create('TheaterTool.model.Person', {
    			name : autor[0],
    			dbkey: autor[1]
			});
			this.persStore.add(person);
		}
}

this.w_ein_titel.setValue(selectedSource[0].data.seitenzahl);
this.w_titel.setValue(selectedSource[0].data.groesse);
this.inventar.setValue(selectedSource[0].data.inventarnummer);


}
				
});