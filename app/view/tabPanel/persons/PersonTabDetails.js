Ext.define('TheaterTool.view.tabPanel.persons.PersonTabDetails', {
    extend: 'Ext.panel.Panel',
    
    // title: '<b style="color:gray;">Übersicht</b>',
    
    /*layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
    },
    autoScroll: true,
    border: true,
    bodyPadding: 10,
    flex: 1,*/
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    dbkey: null,
    
    personName: null,
    personIcon: null,
    
    initComponent: function () {
        var me = this;
        
        me.callParent();
    },
    
    createContent: function () {
        
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
                
                //console.log(json);
                
                me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Name Varianten</b>',
                    margin: '0 0 10 0'
                });
                
                panel_10 = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    //type: 'hbox',
                    border: false,
                    bodyBorder: false,
                    margin: '0 10 0 10',
                    //margin: '0 0 0 5',
                    items:[]
                });
                me.add(panel_10);
                
                var name_panel = Ext.create('Ext.panel.Panel', {
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
                    // margin: '0 23 0 10',
                    //bodyPadding: 10,
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                
                panel_10.add(name_panel);
                
                
                
                if (typeof json.regs[0] !== 'undefined') {
                    var regular = me.createTextField('Regulär');
                    var regText = '';
                    for (i = 0; i < json.regs.length; i++) {
                        var regs = json.regs[i];
                        for (j = 0; j < regs.length; j++) {
                            if (regs[j] !== '') {
                                if (regText !== '') {
                                    regText += ', ' + regs[j];
                                    /*if (j === 2) {
                                        regText += '; ';
                                    }*/
                                } else {
                                    regText = regs[j];
                                }
                            }
                        }
                    }
                    regular.setValue(regText);
                                  
                    name_panel.add(regular);
                }
                
                if (typeof json.fulls[0] !== 'undefined') {
                    var full = me.createTextField('Vollständig');
                    var regText = '';
                    for (i = 0; i < json.fulls.length; i++) {
                        var regs = json.fulls[i];
                        for (j = 0; j < regs.length; j++) {
                            if (regs[j] !== '') {
                                if (regText !== '') {
                                    regText += ', ' + regs[j];
                                    if (j === 2) {
                                        regText += '; ';
                                    }
                                } else {
                                    regText = regs[j];
                                }
                            }
                        }
                    }
                    full.setValue(regText);
                    name_panel.add(full);
                }
                
                
                if (typeof json.alts[0] !== 'undefined') {
                    var alt = me.createTextField('Alternativ');
                    var regText = '';
                    for (i = 0; i < json.alts.length; i++) {
                        var regs = json.alts[i];
                        if (regs[0] != 'undefined') {
                            if (regText !== '') {
                                regText += '; ' + regs[0];
                            } else {
                                regText = regs[0];
                            }
                        }
                    }
                    alt.setValue(regText);
                    name_panel.add(alt);
                }
                
                if (typeof json.pseuds[0] !== 'undefined') {
                    var pseudo = me.createTextField('Pseudonym(e)');
                    var regText = '';
                    for (i = 0; i < json.pseuds.length; i++) {
                        var regs = json.pseuds[i];
                        if (regs[0] !== 'undefined') {
                            if (regText !== '') {
                                regText += '; ' + regs[0];
                            } else {
                                regText = regs[0];
                            }
                        } else {
                            
                            for (j = 1; j < regs.length; j++) {
                                if (regs[j] !== '') {
                                    if (regText !== '') {
                                        regText += ', ' + regs[j];
                                        if (j === 3) {
                                            regText += '; ';
                                        }
                                    } else {
                                        regText = regs[j];
                                    }
                                }
                            }
                        }
                    }
                    pseudo.setValue(regText);
                    name_panel.add(pseudo);
                }
                
                
                if (typeof json.geschlecht[0][0] !== 'undefined' || typeof json.birth[0][0] !== 'undefined' || typeof json.death[0][0] !== 'undefined' || json.occupation.length > 0 || json.residence.length > 0 || typeof json.summaryText[0] !== 'undefined' || json.gnd[0].length > 0 || json.wega.length > 0 || json.viaf.length > 0) {
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                        margin: '10 0 10 0'
                    });
                    
                    if (typeof json.gnd[0] !== 'undefined' || json.wega.length > 0) {
                        
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
                        if (typeof json.gnd[0] !== 'undefined') {
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
                        if (json.wega.length > 0) {
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
                                    html: 'Personeninformationen auf der Seite der Carl-Maria-von-Weber-Gesamtausgabe',
                                    target: "_blank"
                                }
                            });
                        }
                        if (json.viaf.length > 0) {
                            var viafId = json.viaf[0];
                            
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
                                    href: 'http://viaf.org/viaf/search?query=' + viafId + '&sortKeys=holdingscount&recordSchema=BriefVIAF',
                                    html: 'Personeninformationen in der Virtual International Authority File (VIAF)',
                                    target: "_blank"
                                }
                            });
                        }
                    }
                    
                    panel_011 = Ext.create('Ext.panel.Panel', {
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
                        // margin: '0 23 0 10',
                        bodyPadding: 10,
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    //titel_group.add(panel_0);
                    me.add(panel_011);
                    
                    /* panel_101 = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    //type: 'hbox',
                    border: false,
                    bodyBorder: false,
                    //bodyPadding: 10,
                    margin: '0 0 10 10',
                    //margin: '0 0 0 5',
                    items:[
                    /\*left_panel,
                    right_panel,*\/]
                    });
                    panel_011.add(panel_101);*/
                    
                    if (json.geschlecht[0][0] !== '') {
                        var gender = me.createTextFieldWithoutLabel();
                        if (json.geschlecht[0] === 'm') {
                            gender.setValue('männlich');
                        } else if (json.geschlecht[0] === 'f') {
                            gender.setValue('weiblich');
                        } else {
                            gender.setValue('unbekannt');
                        }
                        panel_011.add({
                            html: '<img src="resources/images/customer-15.png" style="width:15px;height:15px;">',
                            border: false,
                            margin: '5 0 3 5'
                        });
                        panel_011.add(gender);
                    }
                    //console.log(json.birth[0][0]);
                    if (json.birth[0][0] !== '') {
                        var birth = me.createTextFieldWithoutLabel();
                        birth.setValue(json.birth[0]);
                        panel_011.add({
                            html: '<img src="resources/images/Snowflake.png" style="width:25px;height:25px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(birth);
                    }
                    
                    if (json.death[0][0] !== '') {
                        var death = me.createTextFieldWithoutLabel();
                        death.setValue(json.death[0]);
                        panel_011.add({
                            html: '<img src="resources/images/Cross.png" style="width:23px;height:19px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(death);
                    }
                    
                    
                    if (typeof json.summaryText[0] !== 'undefined') {
                        //var summary = me.createTextArea('Beschreibung');
                        var notes = json.summaryText[0];
                        
                        //summary.setValue(notes);
                        //summary.setHeight(150);
                        
                        /*var annot_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        //bodyPadding: 10,
                        margin: '0 10 0 10',
                        items:[]
                        });
                        me.add(annot_panel);
                        annot_panel.add(summary);*/
                        
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
                                html: notes,
                                margin: '0 0 0 45',
                                border: false
                            }]
                        });
                        me.add(right_panel);
                    }
                    
                    
                    if (json.occupation.length > 0) {
                        
                        me.add({
                            
                            xtype: 'label',
                            html: '<b style="color:gray; font-size: 12px;">Tätigkeiten</b>',
                            margin: '10 0 10 0'
                        });
                        
                        var occContentPanel = Ext.create('Ext.panel.Panel', {
                            layout: {
                                type: 'table',
                                columns: 1,
                                tdAttrs: {
                                    valign: 'top'
                                }
                            },
                            bodyBorder: false,
                            border: false,
                            //bodyPadding: 3,
                            items:[]
                        });
                        me.add(occContentPanel);
                        
                        for (var i = 0; i < json.occupation.length; i++) {
                            var occupationBlock = json.occupation[i];
                            
                            var occupationPanel = Ext.create('Ext.panel.Panel', {
                                layout: {
                                    type: 'table',
                                    columns: 4,
                                    tdAttrs: {
                                        valign: 'top'
                                    }
                                },
                                bodyBorder: false,
                                border: false,
                                margin: '5 0 0 3',
                                items:[]
                            });
                            occContentPanel.add(occupationPanel);
                            
                            if (occupationBlock[1] !== undefined && occupationBlock[1] !== '' || occupationBlock[0] !== undefined && occupationBlock[0] !== '') {
                                var occValue = occupationBlock[0];
                                var occType = '';
                                if (occValue === '') {
                                    
                                    if (occupationBlock[1] === 'arr') {
                                        occType = 'Arranger';
                                    } else if (occupationBlock[1] === 'cmp') {
                                        occType = 'Composer';
                                    } else if (occupationBlock[1] === 'lbt') {
                                        occType = 'Librettist';
                                    } else if (occupationBlock[1] === 'cnd') {
                                        occType = 'Conductor';
                                    } else if (occupationBlock[1] === 'act') {
                                        occType = 'Actor';
                                    } else if (occupationBlock[1] === 'itr') {
                                        occType = 'Instrumentalist';
                                    } else if (occupationBlock[1] === 'mcp') {
                                        occType = 'Music copyist';
                                    } else if (occupationBlock[1] === 'msd') {
                                        occType = 'Musical director';
                                    } else if (occupationBlock[1] === 'sng') {
                                        occType = 'Singer';
                                    } else {
                                        occType = occupationBlock[1]
                                    }
                                } else {
                                }
                                
                                var occContent = '';
                                if (occValue !== '') {
                                    occContent = occValue;
                                } else {
                                    occContent = occType;
                                }
                                
                                occupationPanel.add({
                                    xtype: 'label',
                                    html: occContent,
                                    style: 'display:block; padding:0px 0px 5px 15px'
                                });
                            }
                        }
                    }
                    if (json.residence.length > 0) {
                        
                        me.add({
                            
                            xtype: 'label',
                            html: '<b style="color:gray; font-size: 12px;">Wohnsitz(e)</b>',
                            margin: '10 0 10 0'
                        });
                        
                        var residencesPanel = Ext.create('Ext.panel.Panel', {
                            layout: {
                                type: 'table',
                                columns: 1,
                                tdAttrs: {
                                    valign: 'top'
                                }
                            },
                            bodyBorder: false,
                            border: false,
                            //bodyPadding: 3,
                            items:[]
                        });
                        me.add(residencesPanel);
                        var residenceBlocks = json.residence;
                        var arr = Object.keys(residenceBlocks).map(function (key) {
                            return residenceBlocks[key];
                        });
                        for (var i = 0; i < arr.length; i++) {
                            var datePanel = Ext.create('Ext.panel.Panel', {
                                layout: {
                                    type: 'table',
                                    columns: 4,
                                    tdAttrs: {
                                        valign: 'top'
                                    }
                                },
                                bodyBorder: false,
                                border: false,
                                margin: '5 0 0 3',
                                items:[]
                            });
                            
                            residencesPanel.add(datePanel);
                            var residenceBlock = arr[i];
                            
                            if (residenceBlock[0] !== '') {
                                datePanel.add({
                                    xtype: 'label',
                                    html: residenceBlock[0] + ' ',
                                    style: 'display:block; padding:0px 0px 5px 15px'
                                });
                            }
                            
                            if (residenceBlock[3] !== '') {
                                datePanel.add({
                                    xtype: 'label',
                                    html: 'When: ' + residenceBlock[3] + '  ',
                                    style: 'display:block; padding:0px 0px 5px 15px'
                                });
                            }
                            
                            if (residenceBlock[1] !== '') {
                                datePanel.add({
                                    xtype: 'label',
                                    html: 'From: ' + residenceBlock[1] + '  ',
                                    style: 'display:block; padding:0px 0px 5px 15px'
                                });
                            }
                            
                            if (residenceBlock[2] !== '') {
                                datePanel.add({
                                    xtype: 'label',
                                    html: 'To: ' + residenceBlock[2],
                                    style: 'display:block; padding:0px 0px 5px 15px'
                                });
                            }
                        }
                    }
                }
                
                if (json.worksRef.length > 0 || json.sourcesRef.length > 0 || json.journalRef.length > 0 || json.issueRef.length > 0 || json.gagenRef.length > 0 || json.roleRef.length > 0 || json.regieRef.length > 0 || json.rollen.length > 0 || json.taxation.length > 0 || json.dayReport.length > 0 || json.revenueRef.length > 0 || json.scheduleRef.length > 0) {
                    
                    /* var refSection = Ext.create('Ext.panel.Panel', {
                    title: '<b style="color:gray; font-size: 12px;">Spielbetrieb und Verwaltung</b>',
                    bodyBorder: false,
                    border: false,
                    collapsed: true,
                    collapsible: true,
                    margin: '15 0 0 0',
                    bodyPadding:10
                    })*/
                    
                    me.add(
                    
                    Ext.create('Ext.form.FieldSet', {
                        //title: '<b style="color:gray; font-size: 15px;">Spielbetrieb und Verwaltung</b>',
                        bodyBorder: false,
                        collapsible: false,
                        collapsed: true,
                        margin: '15 0 0 0'
                    }));
                    
                    me.add(
                    //refSection
                    {
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Referenzen in Spielbetrieb und Verwaltung</b>',
                        margin: '5 0 10 0'
                    });
                }
                
                if (json.worksRef.length > 0) {
                    /*refSection.add({
                    
                    xtype: 'label',
                    html: '<img src="resources/images/BooksVert-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Werke</b>',
                    margin: '10 0 10 0'
                    });*/
                    
                    var worksTable = new TheaterTool.view.tabPanel.WorksTable({
                        worksList: json.worksRef
                    });
                    
                    var work_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        worksTable]
                    });
                    
                    me.add(work_panel);
                }
                
                /*var worksTable = new TheaterTool.view.tabPanel.WorksTable({
                worksList: json.worksRef
                });
                ref_layout.add(worksTable);*/
                if (json.sourcesRef.length > 0) {
                    /*refSection.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Quellen</b>',
                    margin: '10 0 10 0'
                    });
                     */
                    var sourcesTable = new TheaterTool.view.tabPanel.SourcesTable({
                        sourcesList: json.sourcesRef
                    });
                    
                    var source_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        // margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        sourcesTable]
                    });
                    
                    me.add(source_panel);
                }
                
                /*var sourcesTable = new TheaterTool.view.tabPanel.SourcesTable({
                sourcesList: json.sourcesRef
                });
                ref_layout.add(sourcesTable);*/
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
                    
                    /* refSection.add({
                    
                    xtype: 'label',
                    html: '<img src="resources/images/Calendar-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Spielpläne</b>',
                    margin: '10 0 10 0'
                    });*/
                    
                    var playscheduleTable = new TheaterTool.view.tabPanel.repertoire.work.PlanTable({
                        scheduleList: json.scheduleRef, selectedWorkID: me.dbkey
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
                    
                    me.add(plan_panel);
                }
                
                if (json.rollen.length > 0) {
                    /*refSection.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Quellen</b>',
                    margin: '10 0 10 0'
                    });
                     */
                    var roleTable = new TheaterTool.view.tabPanel.RoleTable({
                        rollenList: json.rollen
                    });
                    
                    var role_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        // margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        roleTable]
                    });
                    
                    me.add(role_panel);
                }
                if (json.revenueRef.length > 0) {
                    
                    var revenueTable = new TheaterTool.view.tabPanel.repertoire.work.RevenueTable({
                        revenueList: json.revenueRef, selectedWorkID: me.dbkey
                    });
                    
                    var revenue_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        revenueTable]
                    });
                    me.add(revenue_panel);
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
                    
                    /* refSection.add({
                    
                    xtype: 'label',
                    html: '<img src="resources/images/Presse-16.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Theaterjournal</b>',
                    margin: '10 0 10 0'
                    });*/
                    
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef, dbkey: me.dbkey
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
                    
                    
                    me.add(journal_panel);
                }
                
                /* var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                journalList: json.journalRef
                });
                ref_layout.add(journalTable);*/
                
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
                    
                    /* refSection.add({
                    
                    xtype: 'label',
                    html: '<img src="resources/images/MoneyTransfer-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Ausgaben</b>',
                    margin: '10 0 10 0'
                    });*/
                    
                    var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                        issueList: json.issueRef, selectedWorkID: me.dbkey
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
                    
                    me.add(issue_panel);
                }
                
                /* var issueTable = new TheaterTool.view.tabPanel.repertoire.work.IssueTable({
                issueList: json.issueRef
                });
                ref_layout.add(issueTable);*/
                
                if (json.gagenRef.length > 0) {
                    /* refSection.add({
                    
                    xtype: 'label',
                    html: '<img src="resources/images/Gift-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Gagen</b>',
                    margin: '10 0 10 0'
                    });*/
                    
                    var gagenTable = new TheaterTool.view.tabPanel.GagenTable({
                        gagenList: json.gagenRef, dbkey: me.dbkey
                    });
                    
                    var gagen_panel = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        //margin: '0 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        gagenTable]
                    });
                    
                    me.add(gagen_panel);
                }
                
                /* var gagenTable = new TheaterTool.view.tabPanel.GagenTable({
                gagenList: json.gagenRef
                });
                ref_layout.add(gagenTable);*/
                if (json.regieRef.length > 0) {
                    
                    var regieTable = new TheaterTool.view.tabPanel.repertoire.work.RegieTable({
                        regieList: json.regieRef, dbkey: me.dbkey
                        //title: '<b style="color:gray;">Regiebücher</b>'
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
                        taxList: json.taxation, dbkey: me.dbkey
                        //title: '<b style="color:gray;">Regiebücher</b>'
                    });
                    
                    var tax_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        taxTable]
                    });
                    
                    me.add(tax_panel);
                }
                
                if (json.dayReport.length > 0) {
                    var dayReportTable = new TheaterTool.view.tabPanel.DayReportTable({
                        dayReportList: json.dayReport, dbkey: me.dbkey
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
                        roleList: json.roleRef, dbkey: me.dbkey
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
    
    createTextArea: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            name: fieldName,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            
            //width: 235,
            readOnly: true,
            //anchor: '100%',
            //cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            //inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            // triggerWrapCls: '',
            // remove the input element's background
            //fieldStyle: 'background:none',
            style: {
                //autoWidth: true,
                width: '100%'
                //height: '100%',
                // borderLeft: '5px solid #FFFFFF'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            border: false,
            //value: fieldValue,
            // cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
                //border: false
                //autoWidth: true,
                //borderLeft: '5px solid #FFFFFF'
            },
            //width: 235,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
            //anchor: '100%'
        });
        
        
        return textArea;
    },
    
    createTextFieldWithoutLabel: function () {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            //name: fieldName,
            readOnly: true,
            border: false,
            margin: '0 0 0 80',
            //value: fieldValue,
            // cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
                //border: false
                //autoWidth: true,
                //borderLeft: '5px solid #FFFFFF'
            }
            //width: 235,
            //fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
            //anchor: '100%'
        });
        
        
        return textArea;
    }
});