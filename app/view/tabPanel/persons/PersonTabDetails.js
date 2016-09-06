/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.persons.PersonTabDetails', {
 extend: 'Ext.panel.Panel',
	
	/*border: false,

	flex:1,

	autoScroll: true,
*/
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

	dbkey: null,

    createContent: function() {

	var me = this;
Ext.Ajax.request({
				 url: 'resources/xql/getPersonOverview.xql',
				async: false,
				method: 'GET',
				params: {
					dbkey: me.dbkey
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					console.log(json);	
					
					
		
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Namen Varianten</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true
		});
		me.add(titel_group);
		
		/*var panel_0 = null;
		
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
			//bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
		//titel_group.add(panel_0);
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
						//margin: '0 0 0 5',
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
*/
				
		var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Allgemeine Information</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 0 0'
		});
		me.add(info_group);
		
		
		
		var gender = me.createTextField('');
		if(typeof json.geschlecht !== 'undefined'){
		 if(json.geschlecht[0] === 'm'){
		      gender.setValue('männlich');
		 }
		 else{
		      gender.setValue('weiblich');
		 }	       
        }
              
		var birth = me.createTextField('');
		if(typeof json.birth !== 'undefined'){
		     birth.setValue(json.birth[0]);       
        }
        
        var death = me.createTextField('');
		if(typeof json.death !== 'undefined'){
		     death.setValue(json.death[0]);       
        }
        
       
        var left_panel = Ext.create('Ext.panel.Panel', {
						layout: {
				type: 'table',
				columns: 2,
				tdAttrs: {
        			valign: 'top'
   				 },
   				  tableAttrs: {
                            style: {
                                width: '50%'
                            }
                        }
                        
			},
			margin: '10 0 0 80',
			//bodyPadding: 10,
			bodyBorder: false,
			border: false,
						items:[
						{
        		html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
				border: false
				//margin: '0 0 -11 0'
			},
						  gender,
						  {
        		html: '<img src="resources/images/Snowflake.png" style="width:25px;height:25px;">',
				border: false
				//margin: '0 0 -11 0'
			},
						  birth,
						  {
        		html: '<img src="resources/images/Cross.png" style="width:23px;height:19px;">',
				border: false
				//margin: '0 0 -11 0'
			},
						  death
						]
					});
					
					var table_layout = Ext.create('Ext.panel.Panel', {
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
			
    //bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(table_layout);
	    var occupationTable = new TheaterTool.view.tabPanel.persons.OccupationTable({ocupationList: json.occupation});
	      table_layout.add(occupationTable);
		
		 var residenceTable = new TheaterTool.view.tabPanel.persons.ResidenceTable({residenseList: json.residence});
		table_layout.add(residenceTable);
		
		var summary = me.createTextArea('Zusammenfassung');
		
		var notes = '';
		if(typeof json.summaryText !== 'undefined'){
	       notes = json.summaryText[0];
	       
	       
        }
		/*if(typeof json.summary[0] !== 'undefined'){
		  if(notes !== ''){
		      notes += '\n\n'+json.summary[0];
		  }
		  else{
		      notes = json.summary[0];
		  }
	       for(i = 1; i < json.summary.length; i++){
	           notes += '\n\n'+json.summary[i];

	       }
        }*/
        if(notes !== ''){
            summary.setValue(notes);
            summary.setHeight(150);
        }
		/*if(typeof json.death !== 'undefined'){
		     death.setValue(json.death[0]);       
        }*/
        
        
					       
       /* var lifeData_panel = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 1,
				tdAttrs: {
        			valign: 'top'
   				 },
   				  tableAttrs: {
                            style: {
                                width: '50%'
                            }
                        }
                        
			},
			//margin: '10 0 10 10',
			bodyBorder: false,
			border: false,
			items:[
			 left_panel
			]
		});*/
		me.add(left_panel);
		
		me.add(summary);
/*var persStore = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Person',
    data:[]
});
me.pers =Ext.create('Ext.grid.Panel', {
    store: persStore,
    sortableColumns: false,
    title: '<b style="color:gray;">Personen</b>',
    icon: 'resources/images/Mask-19.png',
    columnLines: true,
   layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
   /\*viewConfig: {
    forceFit: true
},*\/
                            /\*style: {
                                width: '100%'
                            },*\/
                        
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
*/		
		
		/*me.language = me.createTextField('Sprache(n)');
		if(typeof json.sprachen !== 'undefined'){
	       var spr = json.sprachen[0];
	       for(i = 1; i < json.sprachen.length; i++){
	           spr += ', '+json.sprachen[i];

	       }
	       me.language.setValue(spr);
        }
		    
        me.instr = me.createTextArea('Besetzung');
		if(typeof json.instr !== 'undefined'){
	       var spr = json.instr[0];
	       for(i = 1; i < json.instr.length; i++){
	           spr += '\n'+json.instr[i];

	       }
	       me.instr.setValue(spr);
	       
        }
              
		var right_panel = Ext.create('Ext.panel.Panel', {
						border: false,
						margin: '0 10 0 10',
						items:[
						me.instr
						
						]
					});
					
					var left_panel = Ext.create('Ext.panel.Panel', {
						border: false,
						margin: '0 10 0 10',
						items:[
						me.pers,
						me.language
						
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
			autoScroll: true,
			border: false,
			items:[
			left_panel,
			right_panel
			]
		});
		me.add(panel_01);

		me.instr.setHeight(150);
		*/
		
		/*me.abs = me.createTextField('Entstehung');
		if(typeof json.creation !== 'undefined'){
	       me.abs.setValue(json.creation);
	       
        }
		
		me.overview = me.createTextArea('Beschreibung');
		if(typeof json.hoverview !== 'undefined'){
	       me.overview.setValue(json.hoverview);
	       
        }
        
        var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({eventList: json.events});
      
		var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			margin: '10 10 0 10',
			items:[]
		});
		annot_panel.add(me.abs);
		annot_panel.add(me.overview);
		annot_panel.add(eventsTable);		
		me.add(annot_panel);
		*/
		
		var ext_panel = null;
					if(json.gnd[0].length > 0 || json.wega.length > 0 || json.viaf.length > 0){
		var extGroup = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Referenzen extern</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		me.add(extGroup);
					 ext_panel = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 4,
				tdAttrs: {
        			valign: 'top'
   				 },
   				  tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                        
			},
			
			bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
					me.add(ext_panel);
					}
					
					if(json.gnd.length > 0){
					var gndList = json.gnd[0];
					for(i = 0; i < gndList.length; i++){
					 var   gndId = gndList[i];
					  
					   var textArea = Ext.create('Ext.form.field.Text', {
					   colspan: 1,
			                 //html: 'GND ID'+'<img src="resources/images/info.png" style="width:13px;height:13px;">',
			                 readOnly: true,
			                // icon: 'resources/images/carnival.png',
			             style: {
				                width: '100%',
				                //autoWidth: true,
				        borderLeft: '3px solid #FFFFFF'
				        
			         },
			             fieldLabel: 'GND ID '+'<img src="resources/images/Info.png"  title="Die Gemeinsame Normdatei (GND) ist eine Normdatei für Personen, Körperschaften, Konferenzen, Geografika, Sachschlagwörter und Werktitel." style="float:right;width:13px;height:13px;">'
			            
			             
		                  });
		                  textArea.setValue(gndId);
		                  
		                ext_panel.add(textArea);  
		                ext_panel.add({html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
				border: false,
				colspan: 1,
				bodyPadding: 3,
				autoEl: {
        tag: 'a',
        href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query='+gndId,
		target: "_blank"
    }
				
				});
				
				}
				
		                
				}
				if(json.viaf.length > 0){
					    var viafId = json.viaf[0];
					   
				var textArea_1 = Ext.create('Ext.form.field.Text', {
				colspan: 1,
			                 name: 'VIAF ID',
			                 readOnly: true,
			           
			             style: {
				                width: '100%',
				                
				        borderLeft: '3px solid #FFFFFF'
			         },
			        
			             fieldLabel: 'VIAF ID '+'<img src="resources/images/Info.png" title="Virtual International Authority File" style="float:right;width:13px;height:13px;">'
			             
		                  });
		       
			textArea_1.setValue(viafId);
			 
			 ext_panel.add(textArea_1); 
			 
			ext_panel.add({html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
				border: false,
				colspan: 1,
				bodyPadding: 3,
				
				autoEl: {
        tag: 'a',
        href: 'http://viaf.org/viaf/search?query='+viafId+'&sortKeys=holdingscount&recordSchema=BriefVIAF',
		target: "_blank"
    }
				});  
		}
				
					if(json.wega.length > 0){
					    var wegaId = json.wega[0];
					   
				var textArea_1 = Ext.create('Ext.form.field.Text', {
				colspan: 1,
			                 name: 'WeGA ID',
			                 readOnly: true,
			           
			             style: {
				                width: '100%',
				                
				        borderLeft: '3px solid #FFFFFF'
			         },
			        
			             fieldLabel: 'WeGA ID '+'<img src="resources/images/Info.png" title="Carl-Maria-von-Weber-Gesamtausgabe" style="float:right;width:13px;height:13px;">'
			             
		                  });
		       
			textArea_1.setValue(wegaId);
			 
			 ext_panel.add(textArea_1); 
			 //var searchTitel = json.workTitel[0];
			ext_panel.add({html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
				border: false,
				colspan: 1,
				bodyPadding: 3,
				disabled: true
				/*autoEl: {
        tag: 'a',
        href: 'http://weber-gesamtausgabe.de/de/Suche?d=works&q='+searchTitel[0],
		target: "_blank"
    }*/
				});  
		}
		
		var refGroup = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Daten Relationen (Referenzen intern)</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		me.add(refGroup);
		
		var ref_layout = Ext.create('Ext.panel.Panel', {
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
			
    //bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(ref_layout);
				
		var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({journalList: json.journalRef});
		ref_layout.add(journalTable);
		
		var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({issueList: json.issueRef});
		ref_layout.add(issueTable);
		
		var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({roleList: json.roleRef});
		ref_layout.add(roleTable);
		
		var gagenTable = new TheaterTool.view.tabPanel.GagenTable({gagenList: json.gagenRef});
		ref_layout.add(gagenTable);
		
		var sourcesTable = new TheaterTool.view.tabPanel.SourcesTable({sourcesList: json.isourcesRef});
		ref_layout.add(sourcesTable);
		
		var worksTable = new TheaterTool.view.tabPanel.WorksTable({worksList: json.worksRef});
		ref_layout.add(worksTable);
		
		
		
		
				
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
			//anchor: '100%',
			style: {
			//autoWidth: true,
				width: '100%',
				//height: '100%',
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
				//border: false
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