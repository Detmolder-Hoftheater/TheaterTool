Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection', {
    extend: 'Ext.panel.Panel',
    
   // title: '<b style="color:gray;">Übersicht</b>',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    repertoireTab: null,
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
    
    workName: null,
    workIcon: null,
    
    initComponent: function () {
        var me = this;
    me.tbar = {
        style: {
        background: '#dcdcdc'
        },
       border: false,
        height: 30,
        items:[{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">XML ansehen</b></font>',
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				},
        		margin: '0 3 0 5',
        		listeners: {
					click: function (item, e, eOpts) {
					
                Ext.Ajax.request({
                  
                    url:'resources/xql/getXML.xql',
                    method: 'GET',
                    params: {
                        uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                        type: 'work'
                    },
                    success: function (response) {
                    var testText = response.responseText;
                      
                       var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = testText;
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        var htmlVersion = '<pre>' + tmp + '</<pre>';
                        var win = new Ext.window.Window({
					       title: '<font style="color:gray;">XML for ' + me.workName+'</font>',
					        html: htmlVersion,
					        icon: me.workIcon,
					        bodyStyle:{"background-color":"white"},
					        height: 600,
                            width: 800,
                            autoScroll: true,
                            bodyPadding: 10
					        });
					   win.show();
                     
                    }
                });
				
					   
					}
				}
        		},
        		{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',
        		disabled: true,
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				}
        		}
        		]
        };
        
       
    
        me.callParent();
    },
    
    createComponents: function () {
        
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
               
                me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Titel Varianten</b>',
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
                    //bodyPadding: 10,
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                //titel_group.add(panel_0);
                me.add(panel_0);
                
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
                
                var titelLangArray =[];
                var titelLangArraytemp =[];
                for (i = 0; i < json.workTitel.length; i++) {
                    var el = json.workTitel[i];
                    var titelKey = el[2];
                    if (titelLangArray.indexOf(titelKey) <= -1) {
                        titelLangArray.push(titelKey);
                    }
                }
                
                for (i = 0; i < titelLangArray.length; i++) {
                    var titleKeyLang = titelLangArray[i];
                    for (j = 0; j < json.workTitel.length; j++) {
                        var el = json.workTitel[j];
                        
                        var titelKey = el[2];
                        var titelKey_tmp = el[2];
                        var titelKey = '';
                        if (titelKey_tmp !== '') {
                            titelKey = ' (' + titelKey_tmp + ')';
                        }
                        
                        if (titelKey_tmp === titleKeyLang) {
                            if (el[1] === 'uniform') {
                                var w_ein_titel = me.createTextField('Einheitstitel' + titelKey, el[0]);
                                panel_10.items.add(w_ein_titel);
                                // me.w_ein_titel.setValue(el[0]);
                            } else if (el[1] === '') {
                                var w_titel = me.createTextField('Titel' + titelKey, el[0]);
                                panel_10.items.add(w_titel);
                                // me.w_titel.setValue(el[0]);
                            } else if (el[1] === 'alt') {
                                var w_alt_titel = me.createTextField('Alternativtitel' + titelKey, el[0]);
                                panel_10.items.add(w_alt_titel);
                                // me.w_alt_titel.setValue(el[0]);
                            } else if (el[1] === 'sub') {
                                var w_unter_titel = me.createTextField('Untertitel' + titelKey, el[0]);
                                panel_10.items.add(w_unter_titel);
                                // me.w_unter_titel.setValue(el[0]);
                            }
                        }
                    }
                    
                    /*panel_10 = Ext.create('Ext.panel.Panel', {
                        colspan: 1,
                        //type: 'hbox',
                        border: false,
                        bodyBorder: false,
                        margin: '0 10 0 10',
                        //margin: '0 0 0 5',
                        items:[]
                    });
                    panel_0.add(panel_10);*/
                    
                   /* if (me.w_ein_titel !== null) {
                        panel_10.items.add(me.w_ein_titel);
                    }
                    if (me.w_titel !== null) {
                        panel_10.items.add(me.w_titel);
                    }
                    if (me.w_alt_titel !== null) {
                        panel_10.items.add(me.w_alt_titel);
                    }
                    if (me.w_unter_titel !== null) {
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
                            margin: '0 0 0 0',
                            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                            value: '<span><a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                      };
                        }
                        else{
                            name ={
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
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
                            margin: '0 0 0 10',
                            //margin: '0 0 0 5',
                            items:[
                            name
                            ]
                        });
                                    
                    me.add(left_panel_1);
                    }
                 }
                
                
                if (typeof json.sprachen[0] !== 'undefined' || typeof json.instr[0] !== 'undefined' 
                    || json.creation[0][0] !== '' || typeof json.hoverview[0] !== 'undefined'
                    || json.gnd[0].length > 0 || json.wega.length > 0) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                        margin: '10 0 10 0'
                    });
                    
                    
                    
                    if (json.gnd[0].length > 0 || json.wega.length > 0) {
                    
                    var panel_1011 = Ext.create('Ext.panel.Panel', {
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
                    me.add(panel_1011);
                    
                    
                    if (json.gnd[0].length > 0) {
                        var gndList = json.gnd[0];
                        for (i = 0; i < gndList.length; i++) {
                            var gndId = gndList[i];
                            
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
                            panel_1011.add(panel_10111);
                            panel_10111.add({
                                xtype: 'component',
                                bodyPadding: 10,
                                margin: '0 0 0 107',
                                autoEl: {
                                    tag: 'a',
                                    href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query=' + gndId,
                                    html: 'Datensatz in der Gemeinsamen Normdatei (GND)',
                                    target: "_blank"
                                }
                            });
                        }
                    }
                    /*if (json.wega.length > 0) {
                        var wegaId = json.wega[0];
                        
                        var panel_101111 = Ext.create('Ext.panel.Panel', {
                            colspan: 1,
                            // type: 'vbox',
                            border: false,
                            bodyBorder: false,
                            // bodyPadding: 10,
                            margin: '0 0 10 10',
                            //margin: '0 0 0 5',
                            items:[]
                        });
                        panel_1011.add(panel_101111);
                        panel_101111.add({
                            xtype: 'component',
                            bodyPadding: 10,
                            margin: '0 0 0 107',
                            autoEl: {
                                tag: 'a',
                                href: 'http://weber-gesamtausgabe.de/de/Suche?d=works&q=' + wegaId,
                                html: 'Werkinformationen auf der Seite der Carl-Maria-von-Weber-Gesamtausgabe',
                                target: "_blank"
                            }
                        });
                    }*/
                }
                
                    panel_011 = Ext.create('Ext.panel.Panel', {
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
                        // bodyPadding: 10,
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    //titel_group.add(panel_0);
                    me.add(panel_011);
                    
                    panel_101 = Ext.create('Ext.panel.Panel', {
                        colspan: 1,
                        //type: 'hbox',
                        border: false,
                        bodyBorder: false,
                        //bodyPadding: 10,
                        margin: '0 0 10 10'
                        //margin: '0 0 0 5',
                       /* items:[
                        /\*left_panel,
                        right_panel,*\/]*/
                    });
                    panel_011.add(panel_101);
                    
                    
                    if (typeof json.sprachen[0] !== 'undefined') {
                        var spr = json.sprachen[0];
                        for (i = 1; i < json.sprachen.length; i++) {
                            spr += ', ' + json.sprachen[i];
                        }
                        me.language = me.createTextField('Sprache(n)', spr);
                        panel_101.add(me.language);
                    }
                    
                    if (typeof json.instr[0] !== 'undefined') {
                        var spr = json.instr[0];
                        for (i = 1; i < json.instr.length; i++) {
                            spr += ', ' + json.instr[i];
                        }
                        /*me.instr = me.createTextArea('Besetzung', spr);
                        panel_101.items.add(me.instr);*/
                        
                        var right_panel = Ext.create('Ext.panel.Panel', {
						layout: {
				        type: 'table',
				        columns: 2,
			             tdAttrs: {
        			         valign: 'top'
   				         }
			},
			margin: '0 0 10 0',
			autoScroll: true,
			border: false,
			bodyBorder: false,
						items:[
						{
        xtype: 'label',
        bodyBorder: false,
        html: '<b style="color:gray; font-size: 10px;">Besetzung:</b>'
    },
						{
                  html: spr,
                  margin: '0 0 0 55',
                  border: false,
                  bodyBorder: false
                }
						]
					});
                panel_101.add(right_panel);
                        
                        
                    }
                    
                    
                    if (json.creation[0][0] !== '') {
                        console.log(json.creation[0]);
                        me.abs = me.createTextField('Entstehung', json.creation);
                        panel_101.add(me.abs);
                    }
                    
                    if (typeof json.hoverview[0] !== 'undefined') {
                        /*me.overview = me.createTextArea('Beschreibung', json.hoverview);
                        panel_101.items.add(me.overview);*/
                        
                         var right_panel = Ext.create('Ext.panel.Panel', {
						layout: {
				        type: 'table',
				        columns: 2,
			             tdAttrs: {
        			         valign: 'top'
   				         }
			},
			margin: '0 0 10 0',
			autoScroll: true,
			border: false,
						items:[
						{
        xtype: 'label',
        html: '<b style="color:gray; font-size: 10px;">Beschreibung:</b>'
    },
						{
                  html: json.hoverview,
                  margin: '0 0 0 40',
                  border: false
                }
						]
					});
                panel_101.add(right_panel);
                    }
                    
                    
                }
                
                if (json.events.length > 0) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Uraufführungen</b>',
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
              
                if(json.scheduleRef.length > 0 || json.revenueRef.length > 0 || json.journalRef.length > 0 
                || json.issueRef.length > 0 || json.regieRef.length > 0 || json.roleRef.length > 0){
                 
                 var refSection = Ext.create('Ext.panel.Panel', {
                    title: '<b style="color:gray; font-size: 12px;">Spielbetrieb und Verwaltung</b>',
                    bodyBorder: false,
                    border: false,
                    collapsed: true,
                    collapsible: true,
                    margin: '15 0 0 0',
                    bodyPadding:10
                    })
                 
                   me.add(
                   refSection
                    /*Ext.create('Ext.form.FieldSet', {
                    title: '<b style="color:gray; font-size: 13px;">Spielbetrieb und Verwaltung</b>',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '15 0 10 0'
                    })*/);
                    
                    
                }
                if (json.scheduleRef.length > 0) {
                    /*var plan_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Calendar-17.png" style="vertical-align:middle;"><b style="color:gray;">Spielpläne</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(plan_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Calendar-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Spielpläne</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                        scheduleList: json.scheduleRef, selectedWorkID: me.workID
                    });
                    //ref_layout.add(playscheduleTable);
                    
                    var plan_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        playscheduleTable]
                    });
                    
                    refSection.add(plan_panel);
                }
                
                if (json.revenueRef.length > 0) {
                    /*var revenue_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/MoneyBox-17.png" style="vertical-align:middle;"><b style="color:gray;">Einnahmen</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(revenue_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/MoneyBox-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Einnahmen</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                        revenueList: json.revenueRef, selectedWorkID: me.workID
                    });
                    //ref_layout.add(revenueTable);
                    
                    var revenue_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        revenueTable]
                    });
                    
                    refSection.add(revenue_panel);
                }
                
                if (json.journalRef.length > 0) {
                    /*var journal_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Presse-16.png" style="vertical-align:middle;"><b style="color:gray;">Theaterjournal</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(journal_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Presse-16.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Theaterjournal</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef
                    });
                    //ref_layout.add(journalTable);
                    
                    var journal_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        journalTable]
                    });
                    
                    
                    refSection.add(journal_panel);
                }
                
                if (json.issueRef.length > 0) {
                    /*var issue_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/MoneyTransfer-17.png" style="vertical-align:middle;"><b style="color:gray;">Ausgaben</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(issue_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/MoneyTransfer-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Ausgaben</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                        issueList: json.issueRef, selectedWorkID: me.workID
                    });
                    //ref_layout.add(issueTable);
                    
                    var issue_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        issueTable]
                    });
                    
                    refSection.add(issue_panel);
                }
                
                /*var ref_layout = Ext.create('Ext.panel.Panel', {
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
                 */
                if (json.regieRef.length > 0) {
                    /*var regie_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Crown-17.png" style="vertical-align:middle;"><b style="color:gray;">Regiebücher</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(regie_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Crown-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Regiebücher</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                        regieList: json.regieRef
                    });
                    //ref_layout.add(regieTable);
                    
                    var regie_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                       // margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        regieTable]
                    });
                    
                    refSection.add(regie_panel);
                }
                
                if (json.roleRef.length > 0) {
                    /* var role_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/carnival.png" style="vertical-align:middle;"><b style="color:gray;">Rollen- & Kostümbücher</b>',
                    // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                    });
                    me.add(role_group);*/
                    
                    refSection.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/carnival.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Rollen- & Kostümbücher</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({
                        roleList: json.roleRef
                    });
                    //ref_layout.add(roleTable);
                    
                    var role_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        roleTable]
                    });
                    
                    refSection.add(role_panel);
                }
            }
        });
    },
    
    
    createTextArea: function (fieldName, fieldValue) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            name: fieldName,
            value: fieldValue,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            readOnly: true,
            //cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            //inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            // triggerWrapCls: '',
            // remove the input element's background
           // fieldStyle: 'background:none',
            
            //hideBorders: true,
            style: {
                width: '100%'
                //style: 'border: none;'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName, fieldValue) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            border: false,
            value: fieldValue,
            // cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
                //borderLeft: '5px solid #FFFFFF'
            },
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
        });
        
        return textArea;
    }
    
   
});