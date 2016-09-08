Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesSection', { 
 extend: 'Ext.panel.Panel',
   
/*border: true,
	flex:1,
bodyBorder: true,
autoScroll: true,*/

    title: '<b style="color:gray;">Details</b>',
    
    layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	autoScroll: true,
	border: true,
//bodyPadding:10,
flex:1,
    
	sourceID: null,
	
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
	overview: null,

    createContent: function() {

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
tableTest.setTablePanel(me);
me.add(tableTest);


var source_group = Ext.create('Ext.panel.Panel', {
			flex:2.5,
border:false,
bodyPadding:15,
autoScroll: true,
			items:[]
		});
		me.add(source_group);
				
		var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Allgemeine Information</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '0 0 10 0'
		});
		source_group.add(info_group);
		
		var all_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 0 0 10',
			items:[]
		});
        source_group.add(all_panel);
        
		me.prov = me.createTextArea('Inhalt');
		me.prov.setHeight(150);
		all_panel.add(me.prov);
		me.annot = me.createTextArea('Anmerkungen');
		me.annot.setHeight(200);
		all_panel.add(me.annot);
        me.language = me.createTextField('Sprache(n)');
        all_panel.add(me.language);
        
        var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Geschichte</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		source_group.add(info_group);
		
		var hist_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 0 0 10',
			items:[]
		});
        source_group.add(hist_panel);
		
		me.abs = me.createTextField('Entstehung');
		hist_panel.add(me.abs);
		me.overview = me.createTextArea('Beschreibung');
        hist_panel.add(me.overview);
		me.sign = new TheaterTool.view.tabPanel.repertoire.EventsTable({eventList: json.events});
		//me.createTextArea('Aufführungen');
		hist_panel.add(me.sign);
	
        var phys_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Physikalische Daten</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		source_group.add(phys_group);
		
		var titel_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 0 0 10',
			items:[]
		});
        source_group.add(titel_panel);

me.titel = me.createTextArea('Titelseite(n)');
titel_panel.add(me.titel);

me.medium = me.createTextArea('Umschlag');
me.schreiber = me.createTextArea('Schreiber');
me.schreiber.setHeight(100);

me.zustand = me.createTextArea('Zustand');
me.inventar = me.createTextField('Inverntarnummer');
me.w_ein_titel = me.createTextField('Umfang');
me.w_titel = me.createTextField('Format');
me.w_alt_titel = me.createTextField('Stempel');		
				
			var panel_10 = Ext.create('Ext.panel.Panel', {				
				//type: 'hbox',
				border: false,
				items:[]
			});
panel_10.items.add(me.medium);			
panel_10.items.add(me.schreiber);

var panel_110 = Ext.create('Ext.panel.Panel', {
				
				//type: 'hbox',
				border: false,
				items:[]
			});

			
panel_110.items.add(me.zustand);
panel_110.items.add(me.inventar);
panel_110.items.add(me.w_ein_titel);
panel_110.items.add(me.w_titel);
panel_110.items.add(me.w_alt_titel);

		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			margin: '0 0 0 10',
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
		
		source_group.add(headpanel_1);

me.persStore = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Person',
    data:[]
});
me.personen =Ext.create('Ext.grid.Panel', {
    store: me.persStore,
     title: '<b style="color:gray;">Personen</b>',
    icon: 'resources/images/Mask-19.png',
    sortableColumns: false,
    columnLines: true,
    layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
    columns: [
        { header: 'Name',  dataIndex: 'name', menuDisabled: true, flex:2 },
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
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: dbkey});
					personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">'+rec.data.name+'</font>');
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	

                }
		})
    ],
margin: '0 0 0 120'
});
source_group.add(me.personen);


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
	this.zustand.setValue(selectedSource[0].data.condition);

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

this.abs.setValue(selectedSource[0].data.creation);
this.overview.setValue(selectedSource[0].data.hoverview);

var eventStore = this.sign.getEventStore();
eventStore.removeAll();
if(typeof selectedSource[0].data.events !== 'undefined'){
for(i = 0; i < selectedSource[0].data.events.length; i++){
			var eventObj = selectedSource[0].data.events[i];
			var event = Ext.create('TheaterTool.model.Event', {
    			event : eventObj[0],
    			datum  : eventObj[1],
    			ort: eventObj[2],
    			stadt: eventObj[3]
			});
			eventStore.add(event);
			}
			
		}		

}


});