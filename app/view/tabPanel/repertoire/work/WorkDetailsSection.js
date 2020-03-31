Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyBorder: false,
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
                path: dbPathsMap. get ('works')
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
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                me.add(panel_0);
                
                panel_10 = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    border: false,
                    bodyBorder: false,
                    margin: '0 10 0 10',
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
                            } else if (el[1] === '') {
                                var w_titel = me.createTextField('Titel' + titelKey, el[0]);
                                panel_10.items.add(w_titel);
                            } else if (el[1] === 'alt') {
                                var w_alt_titel = me.createTextField('Alternativtitel' + titelKey, el[0]);
                                panel_10.items.add(w_alt_titel);
                            } else if (el[1] === 'sub') {
                                var w_unter_titel = me.createTextField('Untertitel' + titelKey, el[0]);
                                panel_10.items.add(w_unter_titel);
                            }
                        }
                    }
                }
                
                if (json.autoren.length > 0) {
                    
                    me.add({
                        xtype: 'label',
                        html: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Personen</b>',
                        margin: '10 0 10 0'
                    });
                    
                    for (i = 0; i < json.autoren.length; i++) {
                        var autor = json.autoren[i];
                        var persRole = '';
                        if (autor[1] === 'arr') {
                            persRole = 'Bearbeiter';
                        } else if (autor[1] === 'marc:aut') {
                            persRole = 'Autor';
                        } else if (autor[1] === 'marc:act') {
                            persRole = 'Schauspieler';
                         } else if (autor[1] === 'marc:ats') {
                            persRole = 'Autor der Textquelle';
                        } else if (autor[1] === 'marc:cmp') {
                            persRole = 'Komponist';
                        } else if (autor[1] === 'marc:cre') {
                            persRole = 'Urheber';
                        } else if (autor[1] === 'marc:egr') {
                            persRole = 'Stecher';
                        } else if (autor[1] === 'marc:dte') {
                            persRole = 'Widmungsträger';
                        } else if (autor[1] === 'marc:lbt') {
                            persRole = 'Librettist';
                        } else if (autor[1] === 'marc:edt') {
                            persRole = 'Editor';
                        } else if (autor[1] === 'marc:lyr') {
                            persRole = 'Textdichter';
                        } else if (autor[1] === 'marc:trl') {
                            persRole = 'Übersetzer';
                        } else if (autor[1] === 'marc:scr') {
                            persRole = 'Schreiber';
                        } else if (autor[1] === 'marc:fmo') {
                            persRole = 'Ehemaliger Besitzer';
                        } else if (autor[1] === 'marc:asn') {
                            persRole = 'Zugehöriger Name';
                        } else if (autor[1] === 'marc:prf') {
                            persRole = 'Darsteller';
                        } else if (autor[1] === 'marc:clb') {
                            persRole = 'Mitarbeiter';
                        } else if (autor[1] === 'marc:mcp') {
                            persRole = 'Kopist';
                        } else if (autor[1] === 'marc:cnd') {
                            persRole = 'Dirigent';
                        } else if (autor[1] === 'marc:msd') {
                            persRole = 'Generalmusikdirektor';
                        } else {
                            persRole = autor[1];
                        }
                        
                        var autorName = autor[0];
                        var dbkey = autor[2];
                        var name = null;
                        if (dbkey !== '') {
                            getPersonContent = function (personId, personName) {
                                var toolBarGlobal = Ext.getCmp('toolbar');
                                var historyButton = Ext.getCmp('historyButton');
                                var menuItem = historyButton.menu.add({
                                    text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                                });
                                
                                var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                var existItems = navTreeGlobal.items;
                                var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                                if (! isFoundItem) {
                                    
                                    var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                        title: '<font style="color:gray;">' + personName + '</font>',
                                        icon: 'resources/images/Mask-19.png',
                                        id: 'person_' + personId
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
                            border: false,
                            bodyBorder: false,
                            margin: '0 0 0 10',
                            items:[
                            name]
                        });
                        
                        me.add(left_panel_1);
                    }
                }
                
                if (json.sprachen.length > 0 || json.instr.length > 0 || json.creation[0][0] !== '' || json.hoverview.length > 0 || json.gnd[0].length > 0 || json.wega[0].length > 0) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                        margin: '10 0 10 0'
                    });
                    
                    
                    
                    if (json.gnd[0].length > 0 || json.wega[0].length > 0 || json.wv.length > 0) {
                        
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
                                    border: false,
                                    bodyBorder: false,
                                    margin: '0 0 10 10',
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
                        
                         if (json.wega[0].length > 0) {
                            var gndList = json.wega[0];
                            for (i = 0; i < gndList.length; i++) {
                                var gndId = gndList[i];
                                
                                var panel_10111 = Ext.create('Ext.panel.Panel', {
                                    colspan: 1,
                                    border: false,
                                    bodyBorder: false,
                                    margin: '0 0 10 10',
                                    items:[]
                                });
                                panel_1011.add(panel_10111);
                                panel_10111.add({
                                    xtype: 'component',
                                    bodyPadding: 10,
                                    margin: '0 0 0 107',
                                    autoEl: {
                                        tag: 'a',
                                        href: 'http://weber-gesamtausgabe.de/de/Suche?d=works&q=' + gndId,
                                        html: 'Werkinformationen auf der Seite der Carl-Maria-von-Weber-Gesamtausgabe',
                                        target: "_blank"
                                    }
                                });
                            }
                        }
                        if (json.wv.length > 0) {
                            var wegaId = json.wv[0];
                            
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
                            xtype: 'label',
                            bodyBorder: false,
                            margin: '0 0 0 107',
                            html: 'Werkverzeichnis: '+ wegaId
                            });
                        }
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
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    me.add(panel_011);
                    
                    panel_101 = Ext.create('Ext.panel.Panel', {
                        colspan: 1,
                        border: false,
                        bodyBorder: false,
                        margin: '0 0 10 10'
                    });
                    panel_011.add(panel_101);
                    
                    
                    if (json.sprachen.length > 0) {
                        var spr = json.sprachen[0];
                        for (i = 1; i < json.sprachen.length; i++) {
                            spr += ', ' + json.sprachen[i];
                        }
                        me.language = me.createTextField('Sprache(n)', spr);
                        panel_101.add(me.language);
                    }
                    
                    if (json.instr.length > 0) {
                        var spr = json.instr[0];
                        for (i = 1; i < json.instr.length; i++) {
                            spr += ', ' + json.instr[i];
                        }
                        
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
                            items:[ {
                                xtype: 'label',
                                bodyBorder: false,
                                html: '<b style="color:gray; font-size: 10px;">Besetzung:</b>'
                            }, {
                                html: spr,
                                margin: '0 0 0 55',
                                border: false,
                                bodyBorder: false
                            }]
                        });
                        panel_101.add(right_panel);
                    }
                    
                    
                    if (json.creation[0][0] !== '') {
                        
                        me.abs = me.createTextField('Entstehung', json.creation);
                        panel_101.add(me.abs);
                    }
                    
                    if (json.hoverview.length > 0) {
                        
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
                            items:[ {
                                xtype: 'label',
                                html: '<b style="color:gray; font-size: 10px;">Beschreibung:</b>'
                            }, {
                                html: json.hoverview[0],
                                margin: '0 0 0 40',
                                border: false
                            }]
                        });
                        panel_101.add(right_panel);
                    }
                }
                
                if (json.events.length > 0) {
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Uraufführung</b>',
                        margin: '10 0 10 0'
                    });
                    
                    var content = '';
                    
                    for (i = 0; i < json.events.length; i++) {
                        
                        var eventObj = json.events[i];
                        
                        if (eventObj[0] !== '') {
                            content = content + eventObj[0] + '  ';
                        }
                        
                        if (eventObj[1] !== '') {
                            content = content + eventObj[1] + '  ';
                        }
                        
                        
                        if (eventObj[2] !== '') {
                            content = content + eventObj[2] + '  ';
                        }
                        
                        if (eventObj[3] !== '') {
                            content = content + eventObj[3];
                        }
                    }
                    
                    var left_panel_11 = Ext.create('Ext.panel.Panel', {
                        border: false,
                        margin: '0 10 0 10',
                        html: content
                    });
                    
                    me.add(left_panel_11);
                }
                
                if (json.scheduleRef.length > 0 || json.revenueRef.length > 0 || json.journalRef.length > 0 || json.issueRef.length > 0 || json.regieRef.length > 0 || json.roleRef.length > 0 || json.taxation.length > 0 || json.dayReport.length > 0) {
                    
                    me.add(
                    
                    Ext.create('Ext.form.FieldSet', {
                        bodyBorder: false,
                        collapsible: false,
                        collapsed: true,
                        margin: '15 0 0 0'
                    }));
                    
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Referenzen in Spielbetrieb und Verwaltung</b>',
                        margin: '5 0 10 0'
                    });
                }
                if (json.scheduleRef.length > 0) {
                    
                    var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                        scheduleList: json.scheduleRef, selectedWorkID: me.workID
                    });
                    
                    var plan_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        playscheduleTable]
                    });
                    
                    me.add(plan_panel);
                }
                
                if (json.revenueRef.length > 0) {
                    
                    var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                        revenueList: json.revenueRef, selectedWorkID: me.workID
                    });
                    
                    var revenue_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        revenueTable]
                    });
                    me.add(revenue_panel);
                }
                
                if (json.journalRef.length > 0) {
                    
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef, dbkey: me.workID
                    });
                    
                    var journal_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        journalTable]
                    });
                    
                    me.add(journal_panel);
                }
                
                if (json.issueRef.length > 0) {
                    
                    var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                        issueList: json.issueRef, selectedWorkID: me.workID
                    });
                    
                    var issue_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        issueTable]
                    });
                    
                    me.add(issue_panel);
                }
                
                if (json.regieRef.length > 0) {
                    
                    var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                        regieList: json.regieRef, dbkey: me.workID
                    });
                    
                    var regie_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        regieTable]
                    });
                    
                    me.add(regie_panel);
                }
                if (json.taxation.length > 0) {
                    
                    var taxTable = new TheaterTool.view.tabPanel.TaxationTable({
                        taxList: json.taxation, dbkey: me.workID
                    });
                    
                    var tax_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        taxTable]
                    });
                    
                    me.add(tax_panel);
                }
                if (json.bestand.length > 0) {
                    
                    var bestandTable = new TheaterTool.view.tabPanel.BestandTable({
                        taxList: json.bestand, dbkey: me.workID
                    });
                    
                    var bestand_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        bestandTable]
                    });
                    
                    me.add(bestand_panel);
                }
                if (json.dayReport.length > 0) {
                    var dayReportTable = new TheaterTool.view.tabPanel.DayReportTable({
                        dayReportList: json.dayReport, dbkey: me.workID
                    });
                    var dayReport_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        dayReportTable]
                    });
                    me.add(dayReport_panel);
                }
                
                if (json.roleRef.length > 0) {
                    
                    var roleTable = new TheaterTool.view.tabPanel.repertoire.work.RoleTable({
                        roleList: json.roleRef, dbkey: me.workID
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
            style: {
                width: '100%'
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