/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection', {
    extend: 'Ext.panel.Panel',
   
    title: '<b style="color:gray;">Übersicht</b>',

layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	autoScroll: true,
	border: true,
bodyPadding:10,
flex:1,

    repertoireTab:null,
    
    titel: null,
	rism: null,
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	pers: null,
	overview: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,

	sourceID: null,

    setTitelValue: function() {

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

		/*var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Titel Varianten</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: false,
			items:[]
		});
		me.add(titel_group);*/
		
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Titel Varianten (Werk)</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true
			//margin: '10 0 0 0'
		});
		me.add(titel_group);
		
		
		var panel_0 = null;
		
		panel_0 = Ext.create('Ext.panel.Panel', {
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
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(panel_0);

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
                var titelKey_tmp = el[2];                      
                var titelKey = '';
                        if (titelKey_tmp !== '') {
                            titelKey = ' (' + titelKey_tmp + ')';
                        }
                        
				if(titelKey_tmp === titleKeyLang){
					if(el[1] === 'uniform'){
						me.w_ein_titel = me.createTextField('Einheitstitel'+titelKey);
						me.w_ein_titel.setValue(el[0]);
					}
					else if(el[1] === ''){
						me.w_titel = me.createTextField('Titel'+titelKey);
						me.w_titel.setValue(el[0]);
					}
					else if(el[1] === 'alt'){
						me.w_alt_titel = me.createTextField('Alternativtitel'+titelKey);
						me.w_alt_titel.setValue(el[0]);
					}
					else if(el[1] === 'sub'){
						me.w_unter_titel =  me.createTextField('Untertitel'+titelKey);
						me.w_unter_titel.setValue(el[0]);
					}
}
}

					panel_10 = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						//type: 'hbox',
						border: false,
						bodyBorder: false,
						margin: '0 10 0 10',
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

		me.titel = me.createTextField('Titel (Quelle)');
		me.titel.setValue(json.titel[0]);
		
		var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Allgemeine Information</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 0 0'
		});
		me.add(info_group);
	
		me.rism = me.createTextField('RISM ID'+
		'<img src="resources/images/Info.png"  title="Répertoire International des Sources Musicales" style="float:right;width:13px;height:13px;">');
		var rismValue = json.rism[0]
		me.rism.setValue(rismValue);
		
		 var ext_panel = Ext.create('Ext.panel.Panel', {
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
			
			//margin: '0 10 0 10',
			//bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
		//me.add(ext_panel);
		ext_panel.add(me.rism);
		
		ext_panel.add({html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
				border: false,
				colspan: 1,
				bodyPadding: 3,
				autoEl: {
        tag: 'a',
        href: 'https://opac.rism.info/metaopac/start.do?View=rism&Language=en&searchString[0]='+rismValue,
		target: "_blank"
    }
				
				});
		
		
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
    sortableColumns: false,
    columnLines: true,
   layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	
    title: '<b style="color:gray;">Personen</b>',
    icon: 'resources/images/Mask-19.png',
    columns: [
        { header: 'Name',  dataIndex: 'name', menuDisabled: true, flex:2},
        { header: 'Rolle', dataIndex: 'role', menuDisabled: true, flex:1},
Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: 'Details',
			flex:1,
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



       // { header: 'Details', dataIndex: 'dbkey', flex:0.5 }
    ],
margin: '0 0 15 110'
});

for(i = 0; i < json.autoren.length; i++){
			var autor = json.autoren[i];
			var persRole = '';
			if(autor[1] === 'arr'){
				persRole = 'arranger';
			}
			else if(autor[1] === 'aut'){
				persRole = 'author';
			}
			else if(autor[1] === 'cmp'){
				persRole = 'composer';
			}
			else if(autor[1] === 'cre'){
				persRole = 'creator';
			}
			else if(autor[1] === 'lbt'){
				persRole = 'librettist';
			}
			else if(autor[1] === 'edt'){
				persRole = 'editor';
			}
			else if(autor[1] === 'lyr'){
				persRole = 'lyricist';
			}
			else if(autor[1] === 'trl'){
				persRole = 'translator';
			}
			else if(autor[1] === 'scr'){
				persRole = 'scribe';
			}
			else if(autor[1] === 'fmo'){
				persRole = 'former owner';
			}
			else if(autor[1] === 'asn'){
				persRole = 'associated name';
			}
			else if(autor[1] === 'prf'){
				persRole = 'performer';
			}
			else if(autor[1] === 'clb'){
				persRole = 'collaborator';
			}
			else{
				persRole = autor[1];
			}
//act = actor
//dte = dedicatee
//egr = engraver
//editorial_assistant = editorial assistant
//mcp = music copyist

			var person = Ext.create('TheaterTool.model.Person', {
    			name : autor[0],
    			role  : persRole,
    			dbkey: autor[2]
			});
			persStore.add(person);
		}
		
		
		
		var right_panel = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						//type: 'hbox',
						border: false,
						margin: '0 10 0 10',
			//bodyPadding: 10,
						items:[
						ext_panel,
						//me.rism,
			             me.prov,
			             me.sign
						
						]
					});
					
					var left_panel = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						//type: 'hbox',
						border: false,
						margin: '0 10 0 10',
						
			//bodyPadding: 10,
						items:[
						me.titel,						
						me.pers
						
						//me.abs
						]
					});
					
		var panel_01 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2,
			tdAttrs: {
        			valign: 'top'
   				 }
				
			},
			margin: '10 0 0 0',
			/*defaults: {
                bodyStyle: 'padding:10px'
            },*/
			autoScroll: true,
			border: false,
			//height: 300,
			//bodyPadding: 10,
			
			items:[
			left_panel,
			right_panel
			]
		});
		
		me.add(panel_01);

		
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
		
		var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Geschichte</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 0 0'
		});
		me.add(info_group);
		
		me.abs = me.createTextField('Entstehung');
		if(typeof json.creation !== 'undefined'){
	       me.abs.setValue(json.creation);
	       
        }
		
		me.overview = me.createTextArea('Beschreibung');
		if(typeof json.hoverview !== 'undefined'){
	       me.overview.setValue(json.hoverview);
	       
        }
		
		me.annot = new TheaterTool.view.tabPanel.repertoire.EventsTable({eventList: json.events});
		//me.createTextArea('Aufführungen');
		var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '10 10 0 10',
			items:[]
		});
		annot_panel.add(me.abs);
		annot_panel.add(me.overview);
		annot_panel.add(me.annot);
		me.add(annot_panel);
		
		
		
		
		
		
		//this.titel.setValue(value);
//this.titel.setValue(sourceStore.data[0].item[0].data.row.titel[0]);
}
			});
//me.callParent();
        
       // }

	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,
			
			//width: 235,
			readOnly: true,
			//anchor: '100%',
			style: {
			//autoWidth: true,
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			}
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			//name: fieldName,
			readOnly: true,
			style: {
				width: '100%',
				//autoWidth: true,
				borderLeft: '5px solid #FFFFFF'
			},
			//width: 235,
			fieldLabel: fieldName
			//anchor: '100%'
		});
		
		return textArea;
	}


});