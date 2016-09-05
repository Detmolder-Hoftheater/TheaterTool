Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection', {
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
    personSection: null,
	planSection: null,
    journalSection: null,
	regieSection: null,
	roleSection: null,
	revenueSection: null,
	issueSection: null,

	workID: null,
	
	abs: null,
    language: null,
    pers: null,
    overview: null,
    instr: null,
    w_ein_titel: null,
    w_titel: null,
    w_alt_titel: null,
    w_unter_titel: null,
    
   
     createComponents: function(workPanel) {

	var me = this;

		Ext.Ajax.request({
				 url: 'resources/xql/getWorkOverview.xql',
				async: false,
				method: 'GET',
				params: {
					workID: me.workID
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					console.log(json);	
					
					
		
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Titel Varianten</b>',
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

		/*me.titel = me.createTextField('Einheitstitel');
		me.titel.setValue(json.titel[0]);*/

		/*me.rism = me.createTextField('RISM ID');
		me.rism.setValue(json.rism[0]);*/
		/*var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2,
			tdAttrs: {
        			valign: 'top'
   				 }
			},
			/\*defaults: {
                bodyStyle: 'padding:10px'
            },*\/
			autoScroll: true,
			border: false,
			//height: 300,
			bodyPadding: 10,
			items:[
			me.titel,			
			me.rism]
		});
		
		me.add(headpanel_1);*/

/*me.sign = me.createTextArea('Bibliotheken');
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
		me.prov.setValue(provText);*/
		
		var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Allgemeine Information</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 0 0'
		});
		me.add(info_group);

var persStore = Ext.create('Ext.data.Store', {
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
   /*viewConfig: {
    forceFit: true
},*/
                            /*style: {
                                width: '100%'
                            },*/
                        
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
		
		
		me.language = me.createTextField('Sprache(n)');
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
						//colspan: 1,
						//type: 'hbox',
						border: false,
						//flex:1,
						//type: 'fit',
						//margin: '0 10 0 10',
						margin: '0 10 0 10',
						 /*viewConfig: {
    forceFit: true
},*/
			//bodyPadding: 10,
						items:[
						me.instr
						
						]
					});
					
					var left_panel = Ext.create('Ext.panel.Panel', {
						//colspan: 1,
						//type: 'hbox',
						border: false,
						margin: '0 10 0 10',
						//type: 'fit',
			//bodyPadding: 10,
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

		me.instr.setHeight(150);
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
        
        var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({eventList: json.events});
                
		//me.annot = me.createTextArea('Aufführungen');
		var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '10 10 0 10',
			items:[]
		});
		annot_panel.add(me.abs);
		annot_panel.add(me.overview);
		annot_panel.add(eventsTable);		
		me.add(annot_panel);
		
		var ext_panel = null;
					if(json.gnd[0].length > 0 || json.wega.length > 0){
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
			
			//margin: '0 10 0 10',
			bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
					me.add(ext_panel);
					}
					
					if(json.gnd[0].length > 0){
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
					if(json.wega.length > 0){
					    var wegaId = json.wega[0];
					   
				var textArea_1 = Ext.create('Ext.form.field.Text', {
				colspan: 1,
			                 name: 'WeGA ID',
			                 readOnly: true,
			           
			             style: {
				                width: '100%',
				                
				        borderLeft: '8px solid #FFFFFF'
			         },
			        
			             fieldLabel: 'WeGA ID '+'<img src="resources/images/Info.png" title="Carl-Maria-von-Weber-Gesamtausgabe" style="float:right;width:13px;height:13px;">'
			             
		                  });
		       
			textArea_1.setValue(wegaId);
			 
			 ext_panel.add(textArea_1); 
			 var searchTitel = json.workTitel[0];
			ext_panel.add({html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
				border: false,
				colspan: 1,
				bodyPadding: 3,
				autoEl: {
        tag: 'a',
        href: 'http://weber-gesamtausgabe.de/de/Suche?d=works&q='+searchTitel[0],
		target: "_blank"
    }
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
				
		var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({scheduleList: json.scheduleRef});
		ref_layout.add(playscheduleTable);
		
		var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({revenueList: json.revenueRef});
		ref_layout.add(revenueTable);
		
		var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({journalList: json.journalRef});
		ref_layout.add(journalTable);
		
		var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({issueList: json.issueRef});
		ref_layout.add(issueTable);
		
		var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({regieList: json.regieRef});
		ref_layout.add(regieTable);
		
		var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({roleList: json.roleRef});
		ref_layout.add(roleTable);
		
		
		
		
				
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
				//autoWidth: true,
				borderLeft: '5px solid #FFFFFF'
			},
			//width: 235,
			fieldLabel: fieldName
			//anchor: '100%'
		});
		
		return textArea;
	}

    /*initComponent: function() {

	var me = this;

if(me.workID === 'H020263'){

this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.workID, type:'work'});
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();

this.journalSection = new TheaterTool.view.tabPanel.repertoire.work.WorkJournalSection();

 	this.regieSection  = new TheaterTool.view.tabPanel.repertoire.work.WorkRegieSection();

	this.roleSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRoleSection();

	this.revenueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRevenueSection();

	this.issueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkIssueSection();
	me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanelTest({workID: me.workID});

me.items =[
		me.repertoireTab

/\*Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Referenzen im '+ projectName+'</b>',
			bodyBorder: false,			
			collapsible: true,
			collapsed: false,
layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
			items:[
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Programm</b>',
        		margin: '15 0 15 0'
			},
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Theaterjournal</b>',
        		margin: '15 0 15 0'
			},
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Regiebücher</b>',
        		margin: '15 0 15 0'
			},
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Rollen- & Kostümbücher</b>',
        		margin: '15 0 15 0'
			},
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Ausgaben</b>',
        		margin: '15 0 15 0'
			},
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Einnahmen</b>',
        		margin: '15 0 15 0'
			}*\/

			/\*me.planSection,			
			me.journalSection,
     		me.regieSection,
			me.roleSection,
			me.issueSection,
			me.revenueSection*\/


//]
//		})




		]

me.repertoireTab.setTitelValue();

}
else{
	//me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel({workID: me.workID});

	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
			url: 'resources/xql/getWorkText.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },
            success: function(response){
 				me.setTextInfo(response.responseText);				
     		}        
        });

}


    
   
	
		
	
	



        me.callParent();
        
        },


setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}*/


});