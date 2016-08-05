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

/*var store = Ext.create('Ext.data.TreeStore', {
	model: 'TheaterTool.model.SourceDetails',
    root: {
       
        children: [
           
        ]
    }
});*/

/*var rootNode = store.getRootNode();
var selected_node = null;
for(i = 0; i < source_list.length; i++){
	var source_details = source_list[i];

	var source = Ext.create('TheaterTool.model.SourceDetails', {
				"s_titel": source_details[0].s_title,
				"signatur": source_details[0].signatur,
				"inventarnummer": source_details[0].inventarnummer,
				'titlePages': source_details[0].titlePages,
				'medium': source_details[0].medium,
			'source_hier': source_details[0].source_hier,
			'inscription': source_details[0].inscription,
		's_bemerkungen': source_details[0].s_bemerkungen,
	'seitenzahl': source_details[0].seitenzahl,
	'groesse': source_details[0].groesse,
'condition': source_details[0].condition,
'schreiber': source_details[0].schreiber,
'entstehung': source_details[0].entstehung,
'auffuehrungen': source_details[0].auffuehrungen,
'inhalt': source_details[0].auffuehrungen,
				leaf: true 
			});
	rootNode.appendChild(source);
if(i===0){
	selected_node = source;
console.log(selected_node);	
}
}*/

/*var tableTest = Ext.create('Ext.tree.Panel', {
   selectedSource:null,
sourcesTabPanel: null,
xtype: 'tree-grid',
useArrows: true,
flex:1,
    height: 200,
    store: store,
    rootVisible: false,


columns : [{
                xtype: 'treecolumn', 
                text: 'Titel',
                flex: 2,
                
                dataIndex: 's_titel'
            },{
                text: 'Signatur',
                flex: 1,
                dataIndex: 'signatur'
                
            },{
                text: 'Inventarnummer',
                flex: 1,
                dataIndex: 'inventarnummer'
            }
            ],

		listeners :{
			selectionchange: function (selected, eOpts) {
				console.log(selected);
				//this.setValues(selected);
console.log(this.owner);
				//this.medium.setValue(selected.selected[0].items[0].data.medium);
		}
	},

setValues: function(selected){
    //this.selectedSource = selected;
	//this.sourcesTabPanel.setValues(selected);
this.sourcesTabPanel.setValue(selected.selected[0].items[0].data.medium);
},

setSourcesTabPanel: function(sourcesTabPanel){
	this.sourcesTabPanel = sourcesTabPanel;
}

});*/

var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree();
tableTest.createContentForSources(source_list);
me.items.add(tableTest);

//tableTest.setSelection(selected_node);


var source_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Sources Titel</b>',
			
			items:[]
		});
		me.items.add(source_group);
		
		me.titel = me.createTextArea('Titelseite(n)');
		me.medium = me.createTextArea('Medium');
		me.zustand = me.createTextArea('Zustand');
		me.personen = me.createTextArea('Personen');
		me.schreiber = me.createTextArea('Schreiber');

		me.w_ein_titel = me.createTextField('Umfang');
			me.w_titel = me.createTextField('Größe');
			me.w_alt_titel = me.createTextField('Stamp');
			
			var panel_10 = Ext.create('Ext.panel.Panel', {
				
				type: 'hbox',
				border: false,
				items:[]
			});
			
			
			panel_10.items.add(me.w_ein_titel);
			panel_10.items.add(me.w_titel);
			panel_10.items.add(me.w_alt_titel);
			

		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 3
			},
			autoScroll: true,
			border: false,
			
			items:[
			me.titel,
			me.medium,
			me.zustand,
me.personen,
me.schreiber,
panel_10]
		});
		
		source_group.add(headpanel_1);
		
		
		
		me.abs = me.createTextField('Entstehung');
		
		source_group.add(me.abs);

		me.language = me.createTextField('Sprache(n)');
		
		source_group.add(me.language);
		
		
		me.annot = me.createTextArea('Bemerkungen');
		
		
		me.sign = me.createTextArea('Aufführungen');
		me.prov = me.createTextArea('Inhalt');
		
		
source_group.add(me.sign);
source_group.add(me.prov);
		source_group.add(me.annot);
		
		
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
	this.medium.setValue(selectedSource.selected[0].items[0].data.medium);


}
				
});