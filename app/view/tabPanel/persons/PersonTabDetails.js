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
		
		var regular = me.createTextArea('Regulär');
		if(typeof json.regs[0] !== 'undefined'){
		 var regText = '';
		  for (i = 0; i < json.regs.length; i++) {
			var regs = json.regs[i];
			for(j = 0; j < regs.length; j++){
			     if(regs[j] !== ''){
			         if(regText !== ''){
			         regText += ', '+regs[j];
			         if(j === 2){
			             regText += '\n';
			         }
			     }
			     else{
			         regText = regs[j];
			     }	         
			     }		     
			}
			}
		 regular.setValue(regText);
        }
		
		var full = me.createTextArea('Vollständig');
		if(typeof json.fulls[0] !== 'undefined'){
		 var regText = '';
		  for (i = 0; i < json.fulls.length; i++) {
			var regs = json.fulls[i];
			for(j = 0; j < regs.length; j++){
			     if(regs[j] !== ''){
			         if(regText !== ''){
			         regText += ', '+regs[j];
			         if(j === 2){
			             regText += '\n';
			         }
			     }
			     else{
			         regText = regs[j];
			     }	         
			     }		     
			}
			}
		 full.setValue(regText);
        }
        
        
		var alt = me.createTextArea('Alternativ');
		if(typeof json.alts[0] !== 'undefined'){
		 var regText = '';
		  for (i = 0; i < json.alts.length; i++) {
			var regs = json.alts[i];
			     if(regs[0] != 'undefined'){
			         if(regText !== ''){
			         regText += '\n'+regs[0];
			     }
			     else{
			         regText = regs[0];
			     }
			     }
			}
		 alt.setValue(regText);
        }
		
		
		var pseudo = me.createTextArea('Künstlername(n)');
		if(typeof json.pseuds[0] !== 'undefined'){
		 var regText = '';
		  for (i = 0; i < json.pseuds.length; i++) {
			var regs = json.pseuds[i];
			if(regs[0]!== 'undefined'){
			    if(regText !== ''){
			         regText += '\n'+regs[0];
			    }
			    else{
			        regText = regs[0];
			    }
			}
			else{
			
			for(j = 1; j < regs.length; j++){
			     if(regs[j] !== ''){
			         if(regText !== ''){
			         regText += ', '+regs[j];
			         if(j === 3){
			             regText += '\n';
			         }
			     }
			     else{
			         regText = regs[j];
			     }	         
			     }		     
			}
			}
			}
		 pseudo.setValue(regText);
        }
		
		var name_panel = Ext.create('Ext.panel.Panel', {
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
			margin: '0 23 0 10',
			//bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[
			regular,
			alt,
			full,
			pseudo			
			]
		});
		
		me.add(name_panel);
		
		/*Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 10 0 10',
			items:[
			]
		});
		me.add(name_panel);
		name_panel.add(regular);
		name_panel.add(full);
		name_panel.add(alt);
		name_panel.add(pseudo);*/
		
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
		 else if(json.geschlecht[0] === 'f'){
		      gender.setValue('weiblich');
		 }
		 else{
		     gender.setValue('unbekannt');
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
			margin: '10 107 0 90',
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
					
					me.add(left_panel);
					
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
        
        var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 10 0 10',
			items:[]
		});
		me.add(annot_panel);
		annot_panel.add(summary);
				       
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
		
		var ext_panel = null;
					if(json.gnd.length > 0  || json.wega.length > 0 || json.viaf.length > 0){
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
			margin: '0 10 0 10',
			//bodyPadding: 10,
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
		
		var worksTable = new TheaterTool.view.tabPanel.WorksTable({worksList: json.worksRef});
		ref_layout.add(worksTable);
		
		var sourcesTable = new TheaterTool.view.tabPanel.SourcesTable({sourcesList: json.isourcesRef});
		ref_layout.add(sourcesTable);
				
		var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({journalList: json.journalRef});
		ref_layout.add(journalTable);
		
		var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({roleList: json.roleRef});
		ref_layout.add(roleTable);
		
		var gagenTable = new TheaterTool.view.tabPanel.GagenTable({gagenList: json.gagenRef});
		ref_layout.add(gagenTable);
		
		var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({issueList: json.issueRef});
		ref_layout.add(issueTable);
		
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