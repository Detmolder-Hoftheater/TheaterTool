Ext.define('TheaterTool.view.tabPanel.roles.RoleTabDetails', {
    extend: 'Ext.panel.Panel',
    
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
        
        getRoleContent = function (personId, personName) {
            
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/theatreB.png', dbkey: personId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + personName + '</font>',
                    icon: 'resources/images/theatreB.png',
                    id: 'rolle_' + personId
                });
                var personDetails = new TheaterTool.view.tabPanel.roles.RolePanelInTab({
                    dbkey: personId, icon: 'resources/images/theatreB.png', title: '<font size="2" face="Tahoma" style="color:#909090;">Rolle: ' + personName + '</font>'
                });
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        }
        
        
       
        me.callParent();
    },
    
    createContent: function () {
        
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getRoleOverview.xql',
            async: false,
            method: 'GET',
            params: {
                dbkey: me.dbkey
            },
            success: function (result) {
                var json = jQuery.parseJSON(result.responseText);
                
                
                if(typeof json.worksRef[0] !== 'undefined'){
                
                
                me.add({                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Werk</b>'
                    //margin: '0 0 10 0'
                });
                
                
                var panel_werk = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    border: false,
                    bodyBorder: false,
                    margin: '0 0 0 10',
                    items:[]
                });
                me.add(panel_werk);
                
                
                var worksRef = json.worksRef[0]; 
                var workName = worksRef[0];
                var workId = worksRef[1];
           getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + workName + '</font>',
                    icon: workIcon,
                    id: 'werk_' + workId
                });
               var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                });
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };
        
        var werk_panel = Ext.create('Ext.panel.Panel', {
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
                    items:[
                    {
                                xtype: 'displayfield',
                                margin: '0 0 0 0',
                               /* fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + workName + '</b></font>',*/
                                value: '<span><a href="javascript:getWorkContent(\'' + workId + '\'' + ', \'' + workName + '\');">' + workName + '</a></span>'
                            }
                    
                    ]
                });
                
                panel_werk.add(werk_panel);
        
                
                }
              
                
                me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Rollenname Varianten</b>',
                    margin: '0 0 0 0'
                });
                
                panel_10 = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    border: false,
                    bodyBorder: false,
                    margin: '0 0 0 10',
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
                    
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                
                panel_10.add(name_panel);
                
                if (typeof json.regs !== 'undefined') {
                    var regular = me.createTextField('Regulär');
                    var regText = json.regs;
                    regular.setValue(regText);
                    
                    name_panel.add(regular);
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
                
                if (typeof json.summaryText[0] !== 'undefined') {
                    me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Rollenbeschreibung</b>',
                    margin: '0 0 7 0'
                });
                
                var panel_beschr = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    border: false,
                    bodyBorder: false,
                    margin: '0 0 0 10',
                    items:[]
                });
                me.add(panel_beschr);
                
                var beschr_panel = Ext.create('Ext.panel.Panel', {
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
                
                panel_beschr.add(beschr_panel);
                
                var rowText = json.summaryText[0];
                        var left_panel_11 = Ext.create('Ext.panel.Panel', {
                        border: false,
                        //margin: '0 10 0 38',
                        html: rowText
                        });
                        beschr_panel.add(left_panel_11);
                
                }
                
                if(typeof json.actors !== 'undefined'){
                    
                     me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">Schauspieler(innen)</b>',
                    margin: '7 0 7 0'
                });
                
                var panel_schau = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    border: false,
                    bodyBorder: false,
                    margin: '0 0 0 10',
                    items:[]
                });
                me.add(panel_schau);
                
                var schau_panel = Ext.create('Ext.panel.Panel', {
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
                
                panel_schau.add(schau_panel);
                
                var rowText = json.actors;
                        var left_panel_11 = Ext.create('Ext.panel.Panel', {
                        border: false,
                        //margin: '0 10 0 38',
                        html: rowText
                        });
                        schau_panel.add(left_panel_11);
                
                
                
                
                }
                
                if (json.sourcesRef.length > 0 || json.journalRef.length > 0 ) {
                    
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
                if (json.sourcesRef.length > 0) {
                    
                    var sourcesTable = new TheaterTool.view.tabPanel.SourcesTable({
                        sourcesList: json.sourcesRef
                    });
                    
                    var source_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        sourcesTable]
                    });
                    
                    me.add(source_panel);
                }
                if (json.journalRef.length > 0) {
                    
                    var journalTable = new TheaterTool.view.tabPanel.repertoire.work.JournalTable({
                        journalList: json.journalRef, dbkey: me.dbkey
                    });
                    
                    var journal_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        items:[
                        
                        journalTable]
                    });
                    
                    
                    me.add(journal_panel);
                }
             
            }
        });
        
        getRoleContentForRole = function (personId, personName) {
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
                    icon: 'resources/images/theatreB.png',
                    id: 'role_' + personId
                });
                var personDetails = new TheaterTool.view.tabPanel.roles.RolePanelInTab({
                    dbkey: personId, title: '<font size="2" face="Tahoma" style="color:#909090;">Role: ' + personName + '</font>', icon: 'resources/images/theatreB.png'
                });
                
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        }
    },
    
    createTextField: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            border: false,
            
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
            },
            
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
        });
        
        
        return textArea;
    }
});