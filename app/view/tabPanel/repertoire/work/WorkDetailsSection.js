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
    
    
    createComponents: function (workPanel) {
        
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
                                me.w_ein_titel = me.createTextField('Einheitstitel' + titelKey, el[0]);
                               // me.w_ein_titel.setValue(el[0]);
                            } else if (el[1] === '') {
                                me.w_titel = me.createTextField('Titel' + titelKey, el[0]);
                               // me.w_titel.setValue(el[0]);
                            } else if (el[1] === 'alt') {
                                me.w_alt_titel = me.createTextField('Alternativtitel' + titelKey, el[0]);
                               // me.w_alt_titel.setValue(el[0]);
                            } else if (el[1] === 'sub') {
                                me.w_unter_titel = me.createTextField('Untertitel' + titelKey, el[0]);
                               // me.w_unter_titel.setValue(el[0]);
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
                    
                    if (me.w_ein_titel !== null) {
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
                    me.w_unter_titel = null;
                }
                
                
                var info_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray;">Personen</b>',
                   // icon: 'resources/images/Mask-19.png',
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
                me.pers = Ext.create('Ext.grid.Panel', {
                    store: persStore,
                    sortableColumns: false,
                    //title: '<b style="color:gray;">Personen</b>',
                   // icon: 'resources/images/Mask-19.png',
                   // columnLines: true,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    flex: 1,
                    
                    columns:[ {
                        header: 'Name', dataIndex: 'name', menuDisabled: true, flex: 2
                    }, {
                        header: 'Rolle', dataIndex: 'role', menuDisabled: true, flex: 1
                    },
                    Ext.create('Ext.grid.column.Action', {
                        xtype: 'actioncolumn',
                        header: 'Details',
                        flex: 1,
                        align: 'center',
                        menuDisabled: true,
                        renderer: function (val, metadata, record) {
                            if (record.data.dbkey !== '') {
                                this.items[0].icon = 'resources/images/Door-24.png';
                            } else {
                                this.items[0].icon = '';
                            }
                            
                            
                            metadata.style = 'cursor: pointer;';
                            return val;
                        },
                        handler: function (grid, rowIndex, colIndex) {
                            
                            var rec = grid.getStore().getAt(rowIndex);
                            var dbkey = rec.data.dbkey;
                             
                           var toolBarGlobal = Ext.getCmp('toolbar');
                           var historyButton = Ext.getCmp('historyButton'); 
                           //var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, dbkey);
                            //if(!isHistoryItemExist){
                              var menuItem =  historyButton.menu.add({text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: 'resources/images/Mask-19.png', dbkey: dbkey});  

                            //}
                            
                            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                            var existItems = navTreeGlobal.items;
                            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                            if (! isFoundItem) {                                          
                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                title: '<font style="color:gray;">' + rec.data.name + '</font>',
                                icon: 'resources/images/Mask-19.png'
                            });
                            var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                                dbkey: dbkey
                            });
                            personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + rec.data.name + '</font>');
                            repertoireTab.add(personDetails);
                            
                            repertoireTab.setActiveMenuItemId(menuItem.id);
                            repertoireTab.setMenuAdded(true);
                            
                            navTreeGlobal.add(repertoireTab);
                            navTreeGlobal.setActiveTab(repertoireTab);
                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                            }
                        }
                    })
                    
                    
                    
                    // { header: 'Details', dataIndex: 'dbkey', flex:0.5 }
                    ],
                    margin: '0 0 15 0'
                });
                
                for (i = 0; i < json.autoren.length; i++) {
                    var autor = json.autoren[i];
                    var persRole = '';
                    if (autor[1] === 'arr') {
                        persRole = 'arranger';
                    } else if (autor[1] === 'aut') {
                        persRole = 'author';
                    } else if (autor[1] === 'cmp') {
                        persRole = 'composer';
                    } else if (autor[1] === 'cre') {
                        persRole = 'creator';
                    } else if (autor[1] === 'lbt') {
                        persRole = 'librettist';
                    } else if (autor[1] === 'edt') {
                        persRole = 'editor';
                    } else if (autor[1] === 'lyr') {
                        persRole = 'lyricist';
                    } else if (autor[1] === 'trl') {
                        persRole = 'translator';
                    } else if (autor[1] === 'scr') {
                        persRole = 'scribe';
                    } else if (autor[1] === 'fmo') {
                        persRole = 'former owner';
                    } else if (autor[1] === 'asn') {
                        persRole = 'associated name';
                    } else if (autor[1] === 'prf') {
                        persRole = 'performer';
                    } else if (autor[1] === 'clb') {
                        persRole = 'collaborator';
                    } else {
                        persRole = autor[1];
                    }
                    //act = actor
                    //dte = dedicatee
                    //egr = engraver
                    //editorial_assistant = editorial assistant
                    //mcp = music copyist
                    
                    var person = Ext.create('TheaterTool.model.Person', {
                        name: autor[0],
                        role: persRole,
                        dbkey: autor[2]
                    });
                    persStore.add(person);
                }
                var left_panel_1 = Ext.create('Ext.panel.Panel', {
                    //colspan: 1,
                    //type: 'hbox',
                    border: false,
                    margin: '0 10 0 10',
                    //type: 'fit',
                    //bodyPadding: 10,
                    items:[
                    
                    me.pers]
                });
                
                me.add(left_panel_1);
                
                var info_group = Ext.create('Ext.form.FieldSet', {
                    title: '<b style="color:gray;">Allgemeine Information</b>',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(info_group);
                
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
                    //bodyPadding: 10,
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
                        margin: '0 10 0 10',
                        //margin: '0 0 0 5',
                         items:[
                    /*left_panel,
                    right_panel,*/
                   ]
                    });
                    panel_011.add(panel_101);
                
                
                //me.language = me.createTextField('Sprache(n)');
                if (typeof json.sprachen !== 'undefined') {
                    var spr = json.sprachen[0];
                    for (i = 1; i < json.sprachen.length; i++) {
                        spr += ', ' + json.sprachen[i];
                    }
                    me.language = me.createTextField('Sprache(n)', spr);
                    panel_101.items.add(me.language);
                   // me.language.setValue(spr);
                }
                 
                
               // me.instr = me.createTextArea('Besetzung');
                if (typeof json.instr !== 'undefined') {
                    var spr = json.instr[0];
                    //me.instr = me.createTextField('Besetzung', spr);
                    // panel_101.items.add(me.instr);
                   var rowNumber;
                    for (i = 1; i < json.instr.length; i++) {
                        spr += '\n' + json.instr[i];
                       // rowNumber = me.createTextField('   ', spr);
                        //', ' + json.instr[i];
                        //'\n' + json.instr[i];
                        //panel_101.items.add(rowNumber);
                        rowNumber = i;
                    }
                     me.instr = me.createTextArea('Besetzung', spr);
                     panel_101.items.add(me.instr);
                     me.instr.setHeight(rowNumber*17);
                     //me.instr.setHeight(rowNumber*17);
                    //me.instr.setValue(spr);
                }
                
               /* var left_panel = Ext.create('Ext.panel.Panel', {
                    //colspan: 1,
                    //type: 'hbox',
                    border: false,
                    margin: '0 10 0 10',
                    //type: 'fit',
                    //bodyPadding: 10,
                    items:[
                    
                    me.language]
                });
                
                var right_panel = Ext.create('Ext.panel.Panel', {
                    //colspan: 1,
                    //type: 'hbox',
                    border: false,
                    //flex:1,
                    //type: 'fit',
                    //margin: '0 10 0 10',
                    margin: '0 10 0 10',
                    /\*viewConfig: {
                    forceFit: true
                    },*\/
                    //bodyPadding: 10,
                    items:[
                    me.instr]
                });*/
                
               /* var left_panel = Ext.create('Ext.panel.Panel', {
                    //colspan: 1,
                    //type: 'hbox',
                    border: false,
                    margin: '0 10 0 10',
                    //type: 'fit',
                    //bodyPadding: 10,
                    items:[
                    
                    me.language]
                });*/
               
               // me.abs = me.createTextField('Entstehung');
                if (typeof json.creation !== 'undefined') {
                    //me.abs.setValue(json.creation);
                     me.abs = me.createTextField('Entstehung', json.creation);
                      panel_101.items.add(me.abs);
                }
                
                //me.overview = me.createTextArea('Beschreibung');
                if (typeof json.hoverview !== 'undefined') {
                    //me.overview.setValue(json.hoverview);
                     me.overview = me.createTextArea('Beschreibung', json.hoverview);
                     panel_101.items.add(me.overview);
                }
                
                
                
               
                //me.instr.setHeight(150);
                
                
                
                
                
               
                
             
                var ext_panel = null;
                if (json.gnd[0].length > 0 || json.wega.length > 0) {
                    
                    ext_panel = Ext.create('Ext.panel.Panel', {
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
                        
                        margin: '0 10 0 10',
                       // bodyPadding: 10,
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    me.add(ext_panel);
                }
                
                if (json.gnd[0].length > 0) {
                    var gndList = json.gnd[0];
                    for (i = 0; i < gndList.length; i++) {
                        var gndId = gndList[i];
                        
                        var imageGNDLink = Ext.create('Ext.Img', {
                            html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
                            
                            autoEl: {
                                tag: 'a',
                                href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query=' + gndId,
                                target: "_blank"
                            }
                        });
                        ext_panel.add({
                            xtype: 'fieldcontainer',
                            fieldLabel: '<img src="resources/images/Info.png"  title="Die Gemeinsame Normdatei (GND) ist eine Normdatei für Personen, Körperschaften, Konferenzen, Geografika, Sachschlagwörter und Werktitel." style="margin: 0 5 -2 0; width:13px;height:13px;">' + 'GND ID',
                            defaultType: 'textfield',                        
                            layout: {
                                type: 'table', columns: 2,
                                tdAttrs: {
                                    valign: 'top'
                                },
                                tableAttrs: {
                                    style: {
                                        width: '100%'
                                    }
                                }
                            },
                                                       
                            items:[imageGNDLink, {
                                value: gndId,
                                readOnly: true,
                                style: {
                                    width: '100%'
                                    //autoWidth: true,
                                   // borderLeft: '3px solid #FFFFFF'
                                }
                            }]
                        });
                    }
                }
                if (json.wega.length > 0) {
                    var wegaId = json.wega[0];
                    var imageWegaLink = Ext.create('Ext.Img', {
                            html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
                             
                            autoEl: {
                                tag: 'a',
                                href: 'http://weber-gesamtausgabe.de/de/Suche?d=works&q=' + wegaId,
                                target: "_blank"
                            }
                        });
                       
                        ext_panel.add({
                            xtype: 'fieldcontainer',
                            fieldLabel: '<img src="resources/images/Info.png"  title="Carl-Maria-von-Weber-Gesamtausgabe" style="margin: 0 5 -2 10; width:13px;height:13px;">' + 'WeGA ID',
                            defaultType: 'textfield',                        
                            layout: {
                                type: 'table', columns: 2,
                                tdAttrs: {
                                    valign: 'top'
                                },
                                tableAttrs: {
                                    style: {
                                        width: '100%'
                                    }
                                }
                            },
                                                       
                            items:[imageWegaLink, {
                                value: wegaId,
                                readOnly: true,
                               
                                style: {
                                    width: '100%'
                                    //autoWidth: true,
                                   // borderLeft: '3px solid #FFFFFF'
                                }
                            }]
                        });
                }
                
                 var info_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Time-17.png" style="vertical-align:middle;"><b style="color:gray;">Aufführungen</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(info_group);
                
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
                
                /*var refGroup = Ext.create('Ext.form.FieldSet', {
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
                me.add(ref_layout);*/
                
                 var plan_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Calendar-17.png" style="vertical-align:middle;"><b style="color:gray;">Spielpläne</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(plan_group);
                
                  var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                    scheduleList: json.scheduleRef
                });
                //ref_layout.add(playscheduleTable);
                
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
                
                me.add(plan_panel);
               
                var revenue_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/MoneyBox-17.png" style="vertical-align:middle;"><b style="color:gray;">Einnahmen</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(revenue_group);
                
                  var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                    revenueList: json.revenueRef
                });
                //ref_layout.add(revenueTable);
                
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
                
                me.add(revenue_panel);
                
                 var journal_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Presse-16.png" style="vertical-align:middle;"><b style="color:gray;">Theaterjournal</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(journal_group);
                
                  var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                    journalList: json.journalRef
                });
                //ref_layout.add(journalTable);
                
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
                
                me.add(journal_panel);
                
                var issue_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/MoneyTransfer-17.png" style="vertical-align:middle;"><b style="color:gray;">Jährliche Ausgaben</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(issue_group);
                
                 var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                    issueList: json.issueRef
                });
                //ref_layout.add(issueTable);
                
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
                
                me.add(issue_panel);
                
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
                var regie_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/Crown-17.png" style="vertical-align:middle;"><b style="color:gray;">Regiebücher</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(regie_group);
                
                  var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                    regieList: json.regieRef
                });
                //ref_layout.add(regieTable);
                
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
                
                me.add(regie_panel);
                
               
                
                var role_group = Ext.create('Ext.form.FieldSet', {
                    title: '<img src="resources/images/carnival.png" style="vertical-align:middle;"><b style="color:gray;">Rollen- & Kostümbücher</b>',
                   // icon: 'resources/images/Mask-19.png',
                    bodyBorder: false,
                    collapsible: false,
                    collapsed: true,
                    margin: '10 0 0 0'
                });
                me.add(role_group);
                
                 var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({
                    roleList: json.roleRef
                });
                //ref_layout.add(roleTable);
                
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
                
                me.add(role_panel);
                
                
            }
        });
    },
    
    
    createTextArea: function (fieldName, fieldValue) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            name: fieldName,
            value: fieldValue,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">'+fieldName+'</b></font>',
            readOnly: true,
             //cls: Ext.baseCSSPrefix + 'form-clear-trigger',
           // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            
            style: {
                width: '100%'
               
                //borderLeft: '5px solid #FFFFFF'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName, fieldValue) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            border:false,
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
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">'+fieldName+'</b></font>'
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