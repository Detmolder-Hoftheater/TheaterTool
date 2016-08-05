/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTabPanel', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
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

/*initComponent: function () {
var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree();


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




var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree();
tableTest.createContentForSources(source_list);
tableTest.setTablePanel(me);
me.items.add(tableTest);


var source_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Sources Titel</b>',
			
			items:[]
		});
		me.items.add(source_group);
		
		
		me.personen = me.createTextArea('Personen');
		me.schreiber = me.createTextArea('Schreiber');

me.abs = me.createTextField('Entstehung');
		
		//source_group.add(me.abs);

		me.language = me.createTextField('Sprache(n)');
		
		//source_group.add(me.language);

		me.w_ein_titel = me.createTextField('Umfang');
			me.w_titel = me.createTextField('Größe');
			me.w_alt_titel = me.createTextField('Stamp');
me.titel = me.createTextArea('Titelseite(n)');
		me.medium = me.createTextArea('Medium');
		me.zustand = me.createTextArea('Zustand');

			
			var panel_10 = Ext.create('Ext.panel.Panel', {
				
				type: 'hbox',
				border: false,
				items:[]
			});
			panel_10.items.add(me.language);
			panel_10.items.add(me.abs);

			/*panel_10.items.add(me.w_ein_titel);
			panel_10.items.add(me.w_titel);
			panel_10.items.add(me.w_alt_titel);*/
			

		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2
			},
			autoScroll: true,
			border: false,
			
			items:[
me.medium,
me.zustand,
			me.titel,
me.schreiber,
panel_10,
me.personen
			
//me.abs,
			//me.language
//

//
]
		});
		
		source_group.add(headpanel_1);
		
		
		
		
		
		
		me.annot = me.createTextArea('Bemerkungen');
		me.annot.setHeight(150);
		
		me.sign = me.createTextArea('Aufführungen');
		me.sign.setHeight(150);
		me.prov = me.createTextArea('Inhalt');
		me.prov.setHeight(150);
		
		//source_group.add(me.personen);
source_group.add(me.sign);
//source_group.add(me.prov);
		//source_group.add(me.annot);

var panel_101 = Ext.create('Ext.panel.Panel', {
				layout: {
				type: 'table',
				columns: 2
			},
			autoScroll: true,
			border: false,
				items:[
me.prov,
me.annot
]
			});
source_group.add(panel_101);	
		
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
	  bem += selectedSource[0].data.s_bemerkungen[i]+'\n'

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

if(typeof selectedSource[0].data.inscription !== 'undefined'){
	var pers = '';
	for(i = 0; i < selectedSource[0].data.inscription.length; i++){
	  pers += selectedSource[0].data.inscription[i]+'\n'

	}
	this.personen.setValue(pers);
}
}
				
});