Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesSection', {
    extend: 'Ext.panel.Panel',
    
    /*border: true,
    flex:1,
    bodyBorder: true,
    autoScroll: true,*/
    
    //title: '<b style="color:gray;">Einzelquellen</b>',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: true,
    bodyPadding: 15,
    flex: 1,
    
    sourceID: null,
    
    titel: null,
    medium: null,
    zustand: null,
    personen: null,
    schreiber: null,
    annot: null,
    abs: null,
    language: null,
    sign: null,
    prov: null,
    
    w_ein_titel: null,
    w_titel: null,
    w_alt_titel: null,
    w_unter_titel: null,
    inventar: null,
    persStore: null,
    overview: null,
    
    source_group: null,
    
    createContent: function () {
        
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getSourceDetails.xql',
            async: false,
            method: 'GET',
            params: {
                sourceID: me.sourceID,
                sourcePath: dbPathsMap.get('sources')
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                me.title = GUI_NAMES.singlesourcesTab_title;
                
                var source_list = json.sources;
                //console.log(source_list);
                
                var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree({
                    source_list: source_list
                });
                tableTest.setTablePanel(me);
                me.add(tableTest);
                
                
                me.source_group = Ext.create('Ext.panel.Panel', {
                    flex: 2.5,
                    border: true,
                    bodyPadding: 15,
                    autoScroll: true,
                    items:[]
                });
                me.add(me.source_group);
            }
        });
    },
    
    
    createTextArea: function (fieldName, numOfRows) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            //name: fieldName,
            
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            readOnly: true,
            fieldStyle: 'height:' + numOfRows + ';',
            //fieldStyle: 'border: 1px solid red; height:'+numOfRows+'; background:none',
            style: {
                width: '100%'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            
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
            
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            anchor: '100%'
        });
        
        return textArea;
    },
    
    setValues: function (selectedSource) {
        var me = this;
        me.source_group.removeAll(true);
        
        if (typeof selectedSource[0].data.titlePages[0] !== 'undefined' || selectedSource[0].data.medium !== '' || typeof selectedSource[0].data.schreiber[0] !== 'undefined' ||
        typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '' || selectedSource[0].data.inventarnummer !== '' || selectedSource[0].data.seitenzahl !== '' || selectedSource[0].data.groesse !== '') {
            
            me.source_group.add({
                
                xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">'+GUI_NAMES.singlesourcesTab_PhysicalSection+'</b>',
                margin: '20 0 10 0'
            });
            
            var phys_panel = Ext.create('Ext.panel.Panel', {
                border: false,
                //bodyPadding: 10,
                margin: '10 0 10 10',
                items:[]
            });
            me.source_group.add(phys_panel);
            
            
            if (typeof selectedSource[0].data.titlePages[0] !== 'undefined') {
                var bemLength = 1;
                var pages = '';
                for (i = 0; i < selectedSource[0].data.titlePages.length; i++) {
                    pages += selectedSource[0].data.titlePages[i] + '\n';
                    bemLength++;
                }
                /*var numOfRows = parseInt(14 * bemLength);
                me.titel = me.createTextArea(GUI_NAMES.singlesourcesTab_PhysicalSection_titlepages, numOfRows);
                phys_panel.add(me.titel);
                this.titel.setValue(pages);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_PhysicalSection_titlepages+':</b>'
    },
						{
                  html: pages,
                  margin: '0 0 0 40',
                  border: false
                }
						]
					});
                phys_panel.add(right_panel);
            }
            
            if (selectedSource[0].data.medium !== '') {
               var umschlagValue = selectedSource[0].data.medium;
                /*var umschlafLength = umschladValue.split("\n").length;
                var numOfUmschlagRows = parseInt(14 * umschlafLength);
                me.medium = me.createTextArea(GUI_NAMES.singlesourcesTab_PhysicalSection_cover, numOfUmschlagRows);
                this.medium.setValue(selectedSource[0].data.medium);
                phys_panel.add(me.medium);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_PhysicalSection_cover+':</b>'
    },
						{
                  html: umschlagValue,
                  margin: '0 0 0 75',
                  border: false
                }
						]
					});
                phys_panel.add(right_panel);
            }
            
            
            if (typeof selectedSource[0].data.schreiber[0] !== 'undefined') {
                me.schreiber = me.createTextField(GUI_NAMES.singlesourcesTab_PhysicalSection_scribe);
                var schr = '';
                for (i = 0; i < selectedSource[0].data.schreiber.length; i++) {
                    if (i === selectedSource[0].data.schreiber.length -1) {
                        schr += selectedSource[0].data.schreiber[i];
                    } else {
                        schr += selectedSource[0].data.schreiber[i] + '; ';
                    }
                }
                this.schreiber.setValue(schr);
                phys_panel.add(me.schreiber);
            }
            
            if (typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '') {
                var zustandsValue = selectedSource[0].data.condition;
                /*var zustandLength = zustandsValue.split("\n").length;
                var numOfZustandRows = parseInt(14 * zustandLength);
                me.zustand = me.createTextArea(GUI_NAMES.singlesourcesTab_PhysicalSection_condition, numOfZustandRows);
                this.zustand.setValue(selectedSource[0].data.condition);
                phys_panel.add(me.zustand);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_PhysicalSection_condition+':</b>'
    },
						{
                  html: zustandsValue,
                  margin: '0 0 0 55',
                  border: false
                }
						]
					});
                phys_panel.add(right_panel);
            }
            
            if (selectedSource[0].data.inventarnummer !== '') {
                me.inventar = me.createTextField(GUI_NAMES.singlesourcesTab_PhysicalSection_inventory_number);
                this.inventar.setValue(selectedSource[0].data.inventarnummer);
                phys_panel.add(me.inventar);
            }
            
            if (selectedSource[0].data.seitenzahl !== '') {
                me.w_ein_titel = me.createTextField(GUI_NAMES.singlesourcesTab_PhysicalSection_page_number);
                this.w_ein_titel.setValue(selectedSource[0].data.seitenzahl);
                phys_panel.add(me.w_ein_titel);
            }
            
            if (selectedSource[0].data.groesse !== '') {
                me.w_titel = me.createTextField(GUI_NAMES.singlesourcesTab_PhysicalSection_dimension);
                this.w_titel.setValue(selectedSource[0].data.groesse);
                phys_panel.add(me.w_titel);
            }
            
            // TODO: not coded in XML
            //me.w_alt_titel = me.createTextField('Stempel');
        }
        
        if (selectedSource[0].data.inscription.length > 0) {
            me.source_group.add({
                xtype: 'label',
                html: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">'+GUI_NAMES.singlesourcesTab_PersonSection+'</b>',
                margin: '20 0 10 0'
            });
            
            for (i = 0; i < selectedSource[0].data.inscription.length; i++) {
                
                var autor = selectedSource[0].data.inscription[i];
                var autorName = autor[0];
                var dbkey = autor[1];
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
                        margin: '0 0 0 10',
                        // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                        value: '<span><a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                    };
                } else {
                    name = {
                        xtype: 'displayfield',
                        margin: '0 0 0 10',
                        // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                        value: '<span>' + autorName + '</span>'
                    };
                }
                var left_panel_1 = Ext.create('Ext.panel.Panel', {
                    //colspan: 2,
                    // type: 'vbox',
                    border: false,
                    bodyBorder: false,
                    // bodyPadding: 10,
                    margin: '0 0 0 10',
                    //margin: '0 0 0 5',
                    items:[
                    name]
                });
                
                me.source_group.add(left_panel_1);
            }
        }
        
        
        if (typeof selectedSource[0].data.inhalt !== 'undefined' || typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined' || typeof selectedSource[0].data.sprache[0] !== 'undefined' || selectedSource[0].data.creation !== '' || selectedSource[0].data.hoverview !== '' || selectedSource[0].data.events.length > 0) {
            me.source_group.add({
                
                xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">'+GUI_NAMES.singlesourcesTab_SectionGenerally+'</b>',
                margin: '10 0 10 0'
            });
            
            
            var all_panel = Ext.create('Ext.panel.Panel', {
                border: false,
                margin: '10 0 0 10',
                items:[]
            });
            me.source_group.add(all_panel);
            
            
            if (typeof selectedSource[0].data.inhalt !== 'undefined') {
                //var bemLength = 1;
                var inhaltText = '';
                for (i = 0; i < selectedSource[0].data.inhalt.length; i++) {
                    inhaltText += selectedSource[0].data.inhalt[i] + '\n'
                    //bemLength++;
                }
                /*var numOfRows = parseInt(14 * bemLength);
                me.prov = me.createTextArea(GUI_NAMES.singlesourcesTab_SectionGenerally_contents, numOfRows);
                all_panel.add(me.prov);
                this.prov.setValue(inhaltText);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_SectionGenerally_contents+':</b>'
    },
						{
                  html: inhaltText,
                  margin: '0 0 0 55',
                  border: false
                }
						]
					});
                all_panel.add(right_panel);
            }
            
            if (typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined') {
                var bem = '';
                for (i = 0; i < selectedSource[0].data.s_bemerkungen.length; i++) {
                    bem += selectedSource[0].data.s_bemerkungen[i] + '\n\n'
                }
                
                /*var beschrLength = bem.split("\n").length;
                var numOfRows = parseInt(14 * beschrLength);
                me.annot = me.createTextArea(GUI_NAMES.singlesourcesTab_SectionGenerally_annotation, numOfRows);
                all_panel.add(me.annot);
                me.annot.setValue(bem);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_SectionGenerally_annotation+':</b>'
    },
						{
                  html: bem,
                  margin: '0 0 0 35',
                  border: false
                }
						]
					});
                all_panel.add(right_panel);
            }
            
            
            if (typeof selectedSource[0].data.sprache[0] !== 'undefined') {
                me.language = me.createTextField(GUI_NAMES.singlesourcesTab_SectionGenerally_lang);
                all_panel.add(me.language);
                var spr = '';
                for (i = 0; i < selectedSource[0].data.sprache.length; i++) {
                    spr += selectedSource[0].data.sprache[i] + '\n'
                }
                this.language.setValue(spr);
            }
            
            if (selectedSource[0].data.creation !== '') {
                me.abs = me.createTextField(GUI_NAMES.singlesourcesTab_SectionGenerally_creation);
                all_panel.add(me.abs);
                this.abs.setValue(selectedSource[0].data.creation);
            }
            
            if (selectedSource[0].data.hoverview !== '') {
                var beschrValue = selectedSource[0].data.hoverview;
                /*var beschrLength = beschrValue.split("\n").length;
                var numOfRows = parseInt(14 * beschrLength);
                me.overview = me.createTextArea(GUI_NAMES.singlesourcesTab_SectionGenerally_description, numOfRows);
                all_panel.add(me.overview);
                this.overview.setValue(selectedSource[0].data.hoverview);*/
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
        html: '<b style="color:gray; font-size: 10px;">'+GUI_NAMES.singlesourcesTab_SectionGenerally_description+':</b>'
    },
						{
                  html: beschrValue,
                  margin: '0 0 0 30',
                  border: false
                }
						]
					});
                all_panel.add(right_panel);
            }
            if (selectedSource[0].data.events.length > 0) {
                me.source_group.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">'+GUI_NAMES.singlesourcesTab_SectionRepresentation+'</b>',
                    margin: '10 0 10 0'
                });
                
                var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({
                    eventList: selectedSource[0].data.events
                });
                
                var left_panel_11 = Ext.create('Ext.panel.Panel', {
                    //colspan: 1,
                    //type: 'hbox',
                    border: false,
                    margin: '10 10 0 10',
                    //type: 'fit',
                    //bodyPadding: 10,
                    items:[
                    
                    eventsTable]
                });
                
                me.source_group.add(left_panel_11);
            }
        }
    }
});