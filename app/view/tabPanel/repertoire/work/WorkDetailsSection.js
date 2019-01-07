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
            items:[ {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">' + GUI_NAMES.xml_show + '</b></font>',
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
                            
                            url: 'resources/xql/getXML.xql',
                            method: 'GET',
                            params: {
                                /* uri: '/db/apps/theater-data/works/' + me.workID + '.xml',*/
                                type: 'work',
                                dbkey: me.workID,
                                dbPath: dbPathsMap.get('works')
                            },
                            success: function (response) {
                                var testText = response.responseXML;
                                
                               /* var fragment = document.createDocumentFragment('div');
                                var tempDiv = document.createElement('div');
                                fragment.appendChild(tempDiv);
                                tempDiv.innerHTML = testText;
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';*/
                                
                                var tempDiv = document.createElementNS('http://www.music-encoding.org/ns/mei', 'div');
                                var personArr = testText.getElementsByTagName('work');
                                tempDiv.appendChild(personArr[0]);
      
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';
                                
                                var win = new Ext.window.Window({
                                    title: '<font style="color:gray;">' + GUI_NAMES.xml_show_tailtitle + me.workName + '</font>',
                                    html: htmlVersion,
                                    icon: me.workIcon,
                                    bodyStyle: {
                                        "background-color": "white"
                                    },
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
            {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">' + GUI_NAMES.xml_load + '</b></font>',
                disabled: true,
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                }
            }]
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
                workID: me.workID,
                dbPath: dbPathsMap.get('works'),
                dbEinnahmenPath: dbPathsMap.get('revenue'),
                dbJournalPath: dbPathsMap.get('journal'),
                dbAusgabePath: dbPathsMap.get('expenses'),
                playschedule: dbPathsMap.get('playschedule'),
                regie: dbPathsMap.get('regie'),
                role: dbPathsMap.get('rolebook')
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                me.add({
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionName + '</b>',
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
                                var w_ein_titel = me.createTextField(GUI_NAMES.work_NameType_uni + titelKey, el[0]);
                                panel_10.items.add(w_ein_titel);
                                // me.w_ein_titel.setValue(el[0]);
                            } else if (el[1] === '') {
                                var w_titel = me.createTextField(GUI_NAMES.work_NameType + titelKey, el[0]);
                                panel_10.items.add(w_titel);
                                // me.w_titel.setValue(el[0]);
                            } else if (el[1] === 'alt') {
                                var w_alt_titel = me.createTextField(GUI_NAMES.work_NameType_alt + titelKey, el[0]);
                                panel_10.items.add(w_alt_titel);
                                // me.w_alt_titel.setValue(el[0]);
                            } else if (el[1] === 'sub') {
                                var w_unter_titel = me.createTextField(GUI_NAMES.work_NameType_alt + titelKey, el[0]);
                                panel_10.items.add(w_unter_titel);
                                // me.w_unter_titel.setValue(el[0]);
                            }
                        }
                    }
                }
                
                if (json.autoren.length > 0) {
                    
                    me.add({
                        xtype: 'label',
                        html: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionPersons + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    for (i = 0; i < json.autoren.length; i++) {
                        var autor = json.autoren[i];
                        var persRole = '';
                        if (autor[1] === 'arr') {
                            persRole = GUI_NAMES.work_SectionPersons_arr;
                        } else if (autor[1] === 'aut') {
                            persRole = GUI_NAMES.work_SectionPersons_aut;
                        } else if (autor[1] === 'cmp') {
                            persRole = GUI_NAMES.work_SectionPersons_comp;
                        } else if (autor[1] === 'cre') {
                            persRole = GUI_NAMES.work_SectionPersons_cre;
                        } else if (autor[1] === 'lbt') {
                            persRole = GUI_NAMES.work_SectionPersons_lib;
                        } else if (autor[1] === 'edt') {
                            persRole = GUI_NAMES.work_SectionPersons_ed;
                        } else if (autor[1] === 'lyr') {
                            persRole = 'Textdichter';
                        } else if (autor[1] === 'trl') {
                            persRole = GUI_NAMES.work_SectionPersons_tr;
                        } else if (autor[1] === 'scr') {
                            persRole = GUI_NAMES.work_SectionPersons_csr;
                        } else if (autor[1] === 'fmo') {
                            persRole = GUI_NAMES.work_SectionPersons_fmo;
                        } else if (autor[1] === 'asn') {
                            persRole = GUI_NAMES.work_SectionPersons_asn;
                        } else if (autor[1] === 'prf') {
                            persRole = GUI_NAMES.work_SectionPersons_perf;
                        } else if (autor[1] === 'clb') {
                            persRole = GUI_NAMES.work_SectionPersons_clb;
                        } else {
                            persRole = autor[1];
                        }
                        if (persRole === '') {
                            persRole = 'Funktion nicht definiert';
                        }
                        var autorName = autor[0];
                        var dbkey = autor[2];
                        var name = null;
                        if (dbkey !== '') {
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
                            name = {
                                xtype: 'displayfield',
                                margin: '0 0 0 0',
                                fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                                value: '<span><a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                            };
                        } else {
                            name = {
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
                            name]
                        });
                        
                        me.add(left_panel_1);
                    }
                }
                
                
                if (typeof json.sprachen[0] !== 'undefined' || typeof json.instr[0] !== 'undefined' || json.creation[0][0] !== '' 
                || typeof json.hoverview[0] !== 'undefined' || json.gnd[0].length > 0 //|| json.wega.length > 0
                ) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionGenerally + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    
                    
                    if (json.gnd[0].length > 0 //|| json.wega.length > 0
                    ) {
                        
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
                       /* if (json.wega.length > 0) {
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
                        margin: '0 0 10 10',
                        //margin: '0 0 0 5',
                        items:[
                        /*left_panel,
                        right_panel,*/]
                    });
                    panel_011.add(panel_101);
                    
                    
                    if (typeof json.sprachen[0] !== 'undefined') {
                        var spr = json.sprachen[0];
                        for (i = 1; i < json.sprachen.length; i++) {
                            spr += ', ' + json.sprachen[i];
                        }
                        me.language = me.createTextField(GUI_NAMES.work_SectionGenerally_lang, spr);
                        panel_101.items.add(me.language);
                    }
                    
                    if (typeof json.instr[0] !== 'undefined') {
                        var spr = json.instr[0];
                        for (i = 1; i < json.instr.length; i++) {
                            spr += ', ' + json.instr[i];
                        }
                        /*me.instr = me.createTextArea(GUI_NAMES.work_SectionGenerally_instr, spr);
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
                            html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.work_SectionGenerally_instr+':</b>'
                            },
						  {
                            html: spr,
                            margin: '0 0 0 20',
                            border: false,
                            bodyBorder: false
                            }
						]
					   });
                       panel_101.add(right_panel);
                    }
                    
                    
                    if (json.creation[0][0] !== '') {
                        console.log(json.creation[0]);
                        me.abs = me.createTextField(GUI_NAMES.work_SectionGenerally_creat, json.creation);
                        panel_101.items.add(me.abs);
                    }
                    
                    if (typeof json.hoverview[0] !== 'undefined') {
                        /*me.overview = me.createTextArea(GUI_NAMES.work_SectionGenerally_desc, json.hoverview);
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
                            html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.work_SectionGenerally_desc+':</b>'
                            },
						{
                        html: json.hoverview,
                        margin: '0 0 0 45',
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
                        html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionRepresentation + '</b>',
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
                
                   me.add(
                    Ext.create('Ext.form.FieldSet', {
                    //title: '<b style="color:gray; font-size: 13px;">'+GUI_NAMES.root_section+'</b>',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '15 0 10 0' //'15 0 0 0'
                    }));
                    
                    
                
                
                me.add(
                   //refSection
                   {
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">'+GUI_NAMES.root_section+'</b>',
                        margin: '5 0 10 0'
                    }
                  
                    );
                    }
                
                if (json.scheduleRef.length > 0) {
                    /*me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Calendar-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionPlayschedules + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                        scheduleList: json.scheduleRef, selectedWorkID: me.workID
                    });
                    
                    var plan_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        playscheduleTable]
                    });
                    
                    me.add(plan_panel);*/
                    var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                        scheduleList: json.scheduleRef, selectedWorkID: me.workID,
                         title: '<b style="color:gray;">'+ GUI_NAMES.work_SectionPlayschedules+'</b>'
                    });
                    
                    var plan_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[                        
                        playscheduleTable]
                    });
                    
                    me.add(plan_panel);
                }
                
                if (json.revenueRef.length > 0) {
                    /*me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/MoneyBox-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionRevenues + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                        revenueList: json.revenueRef, selectedWorkID: me.workID
                    });
                    
                    var revenue_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        revenueTable]
                    });
                    
                    me.add(revenue_panel);*/
                    var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                        revenueList: json.revenueRef, selectedWorkID: me.workID,
                        title: '<b style="color:gray;">'+GUI_NAMES.work_SectionRevenues+'</b>'
                    });
                   
                    var revenue_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[                      
                        revenueTable]
                    });
                    
                    me.add(revenue_panel);
                }
                
                if (json.journalRef.length > 0) {
                    /*me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Presse-16.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionPress + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef
                    });
                    
                    var journal_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        journalTable]
                    });
                    
                    
                    me.add(journal_panel);*/
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef,
                        title: '<b style="color:gray;">'+GUI_NAMES.work_SectionPress+'</b>'
                    });
                    
                    var journal_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        journalTable]
                    });
                    
                    
                    me.add(journal_panel);
                }
                
                if (json.issueRef.length > 0) {
                    /*me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/MoneyTransfer-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">' + GUI_NAMES.work_SectionExpensess + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                        issueList: json.issueRef, selectedWorkID: me.workID
                    });
                    
                    var issue_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        issueTable]
                    });
                    
                    me.add(issue_panel);*/
                    var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                        issueList: json.issueRef, selectedWorkID: me.workID,
                        title: '<b style="color:gray;">'+GUI_NAMES.work_SectionExpensess+'</b>'
                    });
                    
                    var issue_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        issueTable]
                    });
                    
                    me.add(issue_panel);
                }
                
                if (json.regieRef.length > 0) {
                    
                   /* me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Crown-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Regiebücher</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                        regieList: json.regieRef
                    });
                    
                    var regie_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        regieTable]
                    });
                    
                    me.add(regie_panel);*/
                    var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                        regieList: json.regieRef,
                        title: '<b style="color:gray;">'+GUI_NAMES.direction+'</b>'
                    });
                   
                    var regie_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        regieTable]
                    });
                    
                    me.add(regie_panel);
                }
                
                if (json.roleRef.length > 0) {
                    
                    /*me.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/carnival.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Rollen- & Kostümbücher</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({
                        roleList: json.roleRef
                    });
                    
                    var role_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        roleTable]
                    });
                    
                    me.add(role_panel);*/
                    
                     var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({
                        roleList: json.roleRef,
                        title: '<b style="color:gray;">'+GUI_NAMES.rolebook+'</b>'
                    });
                    
                    var role_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        roleTable]
                    });
                    
                    me.add(role_panel);
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