/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	
	bodyPadding: 10,
	
	//minHeight: 300,
	//resizable: true,
	//flex:1,
	autoScroll: true,
	//reserveScrollbar: true,
	
	border: false,
	sourceID: null,
	titel: null,
	rism: null,
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	pers: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,

	setTitelValue: function (sourceStore) {

		var me = this;

		Ext.Ajax.request({
				 url: 'resources/xql/getSource.xql',
				async: false,
				method: 'GET',
				params: {
					sourceID: me.sourceID
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					console.log(json);	

		
		
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Titel Varianten</b>',
			bodyBorder: false,
			
			collapsible: true,
			collapsed: false,
			items:[]
		});
		me.items.add(titel_group);
		
		
		var panel_0 = null;
		
		panel_0 = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 2,
				tdAttrs: {
        			valign: 'top'
   				 }
			},


			autoScroll: true,
			border: false,
			//bodyPadding: 10,
			items:[]
		});
		titel_group.add(panel_0);

		var titelLangArray = [];
		var titelLangArraytemp = [];
		for(i = 0; i < json.workTitel.length; i++){
			var el = json.workTitel[i];
			var titelKey  = el[2]; 
			if(titelLangArray.indexOf(titelKey) <= -1){
				titelLangArray.push(titelKey);
			}
		}

		for (i = 0; i < titelLangArray.length; i++) {
			var titleKeyLang = titelLangArray[i];
			for(j = 0; j < json.workTitel.length; j++){
				var el = json.workTitel[j];
				var titelKey  = el[2]; 

				if(titelKey === titleKeyLang){
					if(el[1] === 'uniform'){
						me.w_ein_titel = me.createTextField('Einheitstitel ('+titelKey+')');
						me.w_ein_titel.setValue(el[0]);
					}
					else if(el[1] === ''){
						me.w_titel = me.createTextField('Titel ('+titelKey+')');
						me.w_titel.setValue(el[0]);
					}
					else if(el[1] === 'alt'){
						me.w_alt_titel = me.createTextField('Alternativtitel ('+titelKey+')');
						me.w_alt_titel.setValue(el[0]);
					}
					else if(el[1] === 'sub'){
						me.w_unter_titel =  me.createTextField('Untertitel ('+titelKey+')');
						me.w_unter_titel.setValue(el[0]);
					}
}
}

					panel_10 = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						type: 'hbox',
						border: false,
						/*style: {
							borderBottom: '15px solid #FFFFFF'
						},*/
						items:[]
					});
					panel_0.add(panel_10);
			
					if(me.w_ein_titel !== null){
						panel_10.items.add(me.w_ein_titel);
					}
					if(me.w_titel !== null){
						panel_10.items.add(me.w_titel);
					}
					if(me.w_alt_titel !== null){
						panel_10.items.add(me.w_alt_titel);
					}
					if(me.w_unter_titel !== null){
						panel_10.items.add(me.w_unter_titel);
					}
				me.w_ein_titel = null;
				me.w_titel = null;
				me.w_alt_titel = null;
				me.w_unter_titel = null;

		}

		me.titel = me.createTextField('Einheitstitel');
		me.titel.setValue(json.titel[0]);

		me.rism = me.createTextField('RISM ID');
		me.rism.setValue(json.rism[0]);
		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2,
			tdAttrs: {
        			valign: 'top'
   				 }
			},
			autoScroll: true,
			border: false,
			//height: 300,
			bodyPadding: 10,
			items:[
			me.titel,			
			me.rism]
		});
		
		me.items.add(headpanel_1);

me.sign = me.createTextArea('Bibliotheken');
		var bibText = '';
		for(i = 0; i < json.bibliotheken.length; i++){
			bibText += json.bibliotheken[i] + '\n';
		}
		me.sign.setValue(bibText);
		me.prov = me.createTextArea('Provenienz');
		var provText = '';
		for(i = 0; i < json.abschriften.length; i++){
			provText += json.abschriften[i] + '\n';
		}
		me.prov.setValue(provText);

var persStore = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Person',
    data:[]
});
me.pers =Ext.create('Ext.grid.Panel', {
    store: persStore,
    columns: [
        { header: 'Name',  dataIndex: 'name', flex:2 },
        { header: 'Role', dataIndex: 'role', flex:1},
        { header: 'Details', dataIndex: 'dbkey', flex:0.5 }
    ],
margin: '0 0 0 50'
});

for(i = 0; i < json.autoren.length; i++){
			var autor = json.autoren[i];
			var user = Ext.create('TheaterTool.model.Person', {
    			name : autor[0],
    			role  : autor[1],
    			dbkey: ''
			});
			persStore.add(user);
		}

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
			autoScroll: true,
			border: false,
						items:[
{

				xtype: 'label',
        		html: 'Personen',
        		margin: '0 0 0 7'
			},
me.pers

]
		});
		
		me.abs = me.createTextArea('Entstehung');
		var panel_01 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2,
			tdAttrs: {
        			valign: 'top'
   				 }
				/*tableAttrs: {
				style: {
				width: '100%'
				}
				}*/
			},
			autoScroll: true,
			border: false,
			//height: 300,
			bodyPadding: 10,
			
			items:[
			me.prov,
			me.sign,
			me.abs,
			pers_panel
			]
		});
		
		me.items.add(panel_01);

		
		/*var pers_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			bodyPadding: 10,
			items:[]
		});
		
		pers_panel.add(me.pers);
		me.items.add(pers_panel);*/
		
		
		/*var ents_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			bodyPadding: 10,
			items:[]
		});
		
		ents_panel.add(me.abs);
		me.items.add(ents_panel);*/
		
		
		me.annot = me.createTextArea('Aufführungen');
		var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			bodyPadding: 10,
			items:[]
		});
		
		annot_panel.add(me.annot);
		me.items.add(annot_panel);
		
		
		
		
		
		
		//this.titel.setValue(value);
//this.titel.setValue(sourceStore.data[0].item[0].data.row.titel[0]);
}
			});


	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,
			
			//width: 235,
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
			//width: 235,
			fieldLabel: fieldName,
			anchor: '100%'
		});
		
		return textArea;
	}
});