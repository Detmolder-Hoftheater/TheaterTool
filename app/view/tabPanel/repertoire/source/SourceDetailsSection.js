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
					
					//console.log(json);
					
					
					panel_101 = Ext.create('Ext.panel.Panel', {
                        colspan: 1,
                        //type: 'hbox',
                        border: false,
                        bodyBorder: false,
                        //bodyPadding: 10,
                        margin: '0 0 10 10',
                        //margin: '0 0 0 5',
                        items:[
                        /*left_panel,
                        right_panel,*/]
                    });
                    me.add(panel_101);
		
		me.titel = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">Titel</b></font>');
		me.titel.setValue(json.titel[0]);
		panel_101.add(me.titel);
		
		
		me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Titel Varianten (Werk)</b>',
                    margin: '0 0 10 0'
                });
		
		
		var panel_0 = null;
		
		panel_0 = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 1,
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

panel_10 = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						//type: 'hbox',
						border: false,
						bodyBorder: false,
						margin: '0 10 0 10',
						items:[]
					});
					panel_0.add(panel_10);

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
						var w_ein_titel = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">' + 'Einheitstitel'+titelKey + '</b></font>');
						w_ein_titel.setValue(el[0]);
						panel_10.items.add(w_ein_titel);
					}
					else if(el[1] === ''){
						var w_titel = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">' + 'Titel'+titelKey + '</b></font>');
						w_titel.setValue(el[0]);
						panel_10.items.add(w_titel);
					}
					else if(el[1] === 'alt'){
						var w_alt_titel = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">' + 'Alternativtitel'+titelKey + '</b></font>');
						w_alt_titel.setValue(el[0]);
						panel_10.items.add(w_alt_titel);
					}
					else if(el[1] === 'sub'){
						var w_unter_titel =  me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">' + 'Untertitel'+titelKey + '</b></font>');
						w_unter_titel.setValue(el[0]);
						panel_10.items.add(w_unter_titel);
					}
}
}			
					/*if(me.w_ein_titel !== null){
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
				me.w_unter_titel = null;*/

		}
		
		 if (json.autoren.length > 0) {
		me.add({                      
                        xtype: 'label',
                        html: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Personen</b>',
                        margin: '10 0 10 0'
                    });
                    
                    for(i = 0; i < json.autoren.length; i++){
                        var autor = json.autoren[i];
                        var persRole = '';
                        if (autor[1] === 'arr') {
                            persRole = 'Arrangeur';
                        } else if (autor[1] === 'aut') {
                            persRole = 'Autor';
                        } else if (autor[1] === 'cmp') {
                            persRole = 'Komponist';
                        } else if (autor[1] === 'cre') {
                            persRole = 'Urheber ';
                        } else if (autor[1] === 'lbt') {
                            persRole = 'Librettist';
                        } else if (autor[1] === 'edt') {
                            persRole = 'Verfasser';
                        } else if (autor[1] === 'lyr') {
                            persRole = 'Textdichter';
                        } else if (autor[1] === 'trl') {
                            persRole = 'Übersetzer';
                        } else if (autor[1] === 'scr') {
                            persRole = 'Schreiber';
                        } else if (autor[1] === 'fmo') {
                            persRole = 'former owner';
                        } else if (autor[1] === 'asn') {
                            persRole = 'associated name';
                        } else if (autor[1] === 'prf') {
                            persRole = 'Schauspieler';
                        } else if (autor[1] === 'clb') {
                            persRole = 'Kollaborator';
                        } else {
                            persRole = autor[1];
                        }
                        if(persRole === '' ){
                            persRole = 'Funktion nicht definiert';
                        }
                        var autorName = autor[0];                        
                       var dbkey = autor[2];
                        var name = null;
                        if(dbkey !== ''){
                            getPersonContent = function (personId, personName) {
                                    var toolBarGlobal = Ext.getCmp('toolbar');
                                    var historyButton = Ext.getCmp('historyButton');
                                    // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
                                    //if(!isHistoryItemExist){
                                    var menuItem = historyButton.menu.add({
                                        text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                                    });
                                    
                                    //}
                                    
                                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                    var existItems = navTreeGlobal.items;
                                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                                    if (! isFoundItem) {
                                        
                                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                            title: '<font style="color:gray;">' + personName + '</font>',
                                            icon: 'resources/images/Mask-19.png'
                                        });
                                        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                                            dbkey: personId, icon: 'resources/images/Mask-19.png'
                                        });
                                        personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
                                        repertoireTab.add(personDetails);
                                        
                                        repertoireTab.setActiveMenuItemId(menuItem.id);
                                        repertoireTab.setMenuAdded(true);
                                        
                                        navTreeGlobal.add(repertoireTab);
                                        navTreeGlobal.setActiveTab(repertoireTab);
                                        navTreeGlobal.fireEvent('render', navTreeGlobal);
                                    }
                                };
                            name ={
                            xtype: 'displayfield',
                            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                            value: '<span><a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                      };
                        }
                        else{
                            name ={
                            xtype: 'displayfield',
                            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                            value: '<span>' + autorName + '</span>'
                      };
                        }
                      
                       var left_panel_1 = Ext.create('Ext.panel.Panel', {
                            colspan: 1,
                            // type: 'vbox',
                            border: false,
                            bodyBorder: false,
                            // bodyPadding: 10,
                            margin: '0 0 10 10',
                            //margin: '0 0 0 5',
                            items:[
                            name
                            ]
                        });
                                    
                    me.add(left_panel_1);
                    }

		}
		
		 if (json.rism[0] !== '' || json.bibliotheken.length > 0 || json.abschriften.length > 0
                    || typeof json.creation[0] !== 'undefined' || typeof json.hoverview[0] !== 'undefined') {
		me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                        margin: '10 0 10 0'
                    });
		if(json.rism[0] !== ''){
		var rismPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 1,
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
                   me.add(rismPanel);
                    
                    
                    //if (json.rism[0].length > 0) {
                        var rismValue = json.rism[0];
                       // for (i = 0; i < gndList.length; i++) {
                            //var rismValue = gndList[i];
                            
                            var panel_10111 = Ext.create('Ext.panel.Panel', {
                                colspan: 1,
                                // type: 'vbox',
                                border: false,
                                bodyBorder: false,
                                // bodyPadding: 10,
                                margin: '0 0 10 10',
                                //margin: '0 0 0 5',
                                items:[]
                            });
                            rismPanel.add(panel_10111);
                            panel_10111.add({
                                xtype: 'component',
                                bodyPadding: 10,
                                margin: '0 0 0 107',
                                autoEl: {
                                    tag: 'a',
                                    href: 'https://opac.rism.info/search?id='+rismValue,
                                    html: 'Informationen auf der Répertoire International des Sources Musicales (RISM) Seite',
                                    target: "_blank"
                                }
                            });
                    
                    }
		var right_panel = Ext.create('Ext.panel.Panel', {
						colspan: 1,
						//type: 'hbox',
						border: false,
						margin: '0 10 0 10',
			//bodyPadding: 10,
						items:[
						//ext_panel,
						//me.rism,
						//rismPanel,
			            /* me.prov,
			             me.sign,
			            me.abs,
		                  me.overview*/
						
						]
					});
	if(json.bibliotheken.length > 0){	
me.sign = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">Bibliotheken</b></font>');
		var bibText = '';
		for(i = 0; i < json.bibliotheken.length; i++){
		    if(i === json.bibliotheken.length-1){
		        bibText += json.bibliotheken[i];
		    }
		    else{
		        bibText += json.bibliotheken[i] + '; ';
		    }
			
		}
		me.sign.setValue(bibText);
		right_panel.add(me.sign);
		}
		
		if(json.abschriften.length > 0){
		me.prov = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">Provenienz</b></font>');
		var provText = '';
		for(i = 0; i < json.abschriften.length; i++){
		  if(i === json.abschriften.length-1){
			 provText += json.abschriften[i];
			}
			else{
			    provText += json.abschriften[i] + '; ';
			}
		}
		me.prov.setValue(provText);
		right_panel.add(me.prov);
        }
       
       
        if(typeof json.creation[0] !== 'undefined'){
        me.abs = me.createTextField('<font size = "1"><b style="color:gray; vertical-align:top;">Entstehung</b></font>');
		//if(typeof json.creation !== 'undefined'){
	       me.abs.setValue(json.creation);
	       right_panel.add(me.abs);
       // }
		}
		
		if(typeof json.hoverview[0] !== 'undefined'){
		me.overview = me.createTextArea('Beschreibung');
		//if(typeof json.hoverview !== 'undefined'){
	       me.overview.setValue(json.hoverview);
	       right_panel.add(me.overview);
       // }
	    }
				
		var panel_01 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 1,
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
			//left_panel,
			right_panel
			]
		});
		
		me.add(panel_01);
}
		
        if (json.events.length > 0) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Time-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Aufführungen</b>',
                        margin: '10 0 10 0'
                    });
                    
                     var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({
                        eventList: json.events
                    });
                    
                    var left_panel_11 = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        eventsTable]
                    });
                    
                    me.add(left_panel_11);
                   
                    }
}
			});
//me.callParent();
        
       // }

	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
			
			//width: 235,
			readOnly: true,
			//cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            //inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            // triggerWrapCls: '',
            // remove the input element's background
            //fieldStyle: 'background:none',
			//anchor: '100%',
			style: {
			//autoWidth: true,
				width: '100%'
				//borderLeft: '5px solid #FFFFFF'
			}
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			//name: fieldName,
			readOnly: true,
			 
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
			style: {
				width: '100%'
				//autoHeight: true
				//borderLeft: '5px solid #FFFFFF'
			},
			//width: 235,
			fieldLabel: fieldName
			//anchor: '100%'
		});
		
		return textArea;
	}


});