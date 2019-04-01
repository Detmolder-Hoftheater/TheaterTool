Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesSection', {
    extend: 'Ext.panel.Panel',
    
    /*border: true,
    flex:1,
    bodyBorder: true,
    autoScroll: true,*/
    
    title: '<b style="color:gray;">Einzelquellen</b>',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyBorder: false,
   // bodyPadding: 15,
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
    stypeField: null,
    
    source_group: null,
    
    createContent: function () {
        
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getSourceDetails.xql',
            async: false,
            method: 'GET',
            params: {
                sourceID: me.sourceID
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                
                var source_list = json.sources;
                //console.log(source_list);
                
                var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree({
                    source_list: source_list
                });
                tableTest.setTablePanel(me);
                me.add(tableTest);
                
                
                me.source_group = Ext.create('Ext.panel.Panel', {
                    flex: 2.5,
                    border: false,
                    bodyPadding: 10,
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
            
            fieldLabel: '<b style="color:gray; vertical-align:text-top;">' + fieldName + '</b></font>'
            //anchor: '100%'
        });
        
        return textArea;
    },
    
    setValues: function (selectedSource) {
        var me = this;
        me.source_group.removeAll(true);
        
        var stitle_panel = Ext.create('Ext.panel.Panel', {
            border: false,
            //bodyPadding: 10,
            margin: '0 0 10 0',
            items:[]
        });
        me.source_group.add(stitle_panel);
        
        var right_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                   // margin: '0 0 10 0',
                   //  bodyPadding: 10,
                   // autoScroll: true,
                    border: false,
                    items:[]
                });
                stitle_panel.add(right_panel);
        
        if(selectedSource[0].data.titlecontent !== undefined){
        for (var i = 0; i < selectedSource[0].data.titlecontent.length; i++) {
            var oneTitle = selectedSource[0].data.titlecontent[i];
            var titleType = oneTitle[1];
            if(titleType === 'short'){
                titleType = 'Kurztitel';
            }
            else if(titleType === 'cover'){
                titleType = 'Umschlagstitel';
            }
            else{
                titleType = 'Titel (' + oneTitle[1] + ')';
            }
            
            var titleValues = oneTitle[0];
            
            
            
            var pages = '';
            for (var j = 0; j < titleValues.length; j++) {
                var test_1 = titleValues[j];
                
               // console.log(test_1);
                var oneElem = test_1[0];
                
                if (oneElem === 'text') {
                    var textValue = test_1[1];
                    //console.log(textValue);
                    pages = pages +' ' + textValue;
                } else if (oneElem === 'br') {
                    pages = pages + '</br>';
                    //console.log('br');
                }
            }
            //console.log(pages);
            /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                    html: '<b style="color:gray; vertical-align:text-top;">' + titleType + ': </b>'
                }, {
                    html: pages,
                    margin: '0 0 0 50',
                    border: false
                }]
            });*/
            
            //stitle_panel.add(right_panel);
            right_panel.add({
                    //xtype: 'label',
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">' + titleType + ': </b>'
                }, {
                    html: pages,
                    //margin: '0 0 0 50',
                    bodyPadding: 10,
                    border: false
                });
        }
        }
        
        
        
        
        
        if (selectedSource[0].data.signatur !== '') {
            /*var signaturField = me.createTextField('Signatur');
            signaturField.setValue(selectedSource[0].data.signatur);
            stitle_panel.add(signaturField);*/
            
             right_panel.add({
                    //xtype: 'label',
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Signatur: </b>'
                }, {
                    html: selectedSource[0].data.signatur,
                    //margin: '0 0 0 50',
                    bodyPadding: 10,
                    border: false
                });
        }
        
        
        if (selectedSource[0].data.sourcetype !== '') {
            /*var stype_panel = Ext.create('Ext.panel.Panel', {
                border: false,
                //bodyPadding: 10,
                margin: '0 0 10 0',
                items:[]
            });
            me.source_group.add(stype_panel);
            me.stypeField = me.createTextField('Quellentyp');
            me.stypeField.setValue(selectedSource[0].data.sourcetype);
            stype_panel.add(me.stypeField);*/
            
             right_panel.add({
                    //xtype: 'label',
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Quellentyp: </b>'
                }, {
                    html: selectedSource[0].data.sourcetype,
                    //margin: '0 0 0 50',
                    bodyPadding: 10,
                    border: false
                });
        }
        
        
        
        if (typeof selectedSource[0].data.titlePages[0] !== 'undefined' || selectedSource[0].data.medium !== '' || typeof selectedSource[0].data.schreiber !== 'undefined' ||
        typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '' || selectedSource[0].data.inventarnummer !== '' || selectedSource[0].data.seitenzahl !== '' || selectedSource[0].data.groesse !== '') {
            
            right_panel.add({                
                //xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">Physikalische Daten</b>',
                //margin: '30 0 10 0',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
            
           /* var phys_panel = Ext.create('Ext.panel.Panel', {
                border: false,
                //bodyPadding: 10,
                margin: '10 0 10 10',
                items:[]
            });
            me.source_group.add(phys_panel);*/
            
             /*var right_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                   // margin: '0 0 10 0',
                   //  bodyPadding: 10,
                   // autoScroll: true,
                    border: false,
                    items:[]
                });
                phys_panel.add(right_panel);*/
            
            
            var pages = '';
            if (selectedSource[0].data.titlePages.length > 0) {
                
                var elArray = new Array();
                var titlePage = selectedSource[0].data.titlePages;
                //console.log(titlePage);
                for (i = 0; i < titlePage.length; i++) {
                    var test_1 = titlePage[i];
                    
                    //console.log(test_1);
                    var oneElem = test_1[0];
                    //for(var j=0; j < test_1.length; j++){
                    //var oneElem = test_1[j];
                    
                    if (oneElem === 'text') {
                        var textValue = test_1[1];
                        // console.log(textValue);
                        pages = pages + textValue;
                    } else if (oneElem === 'br') {
                        pages = pages + '</br>';
                        //console.log('br');
                    } else if (oneElem === 'add') {
                        var addValue = test_1[1];
                        //console.log(addValue);
                        pages = pages + '<span style="color:MediumSeaGreen;">' + addValue + '</span>';
                    } else if (oneElem === 'del') {
                        var delValue = test_1[1];
                        //console.log(delValue);
                        pages = pages + '<span style="color:Tomato;">' + delValue + '</span>';
                    }
                    
                }
               
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Titelseite(n):</b>'
                    },
                    // {html: '<span style="color:MediumSeaGreen;">Catalani</span>'} 
                    {
                        html: pages,
                        margin: '0 0 0 40',
                        border: false
                    }]
                });*/
                //phys_panel.add(right_panel);
                right_panel.add({
                        //xtype: 'label',
                          bodyPadding: 10,
                        border: false,
                        html: '<b style="color:gray; font-size: 10px;">Titelseite(n):</b>'
                    },
                    // {html: '<span style="color:MediumSeaGreen;">Catalani</span>'} 
                    {
                        html: pages,
                       // margin: '0 0 0 40',
                         bodyPadding: 10,
                        border: false
                    });
                
            }
            
            //console.log(selectedSource[0].data.schreiber);
            /*if (typeof selectedSource[0].data.schreiber !== 'undefined') {
                me.schreiber = me.createTextField('Schreiber');
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
            }*/
            
            if (selectedSource[0].data.medium !== '') {
                var umschlagValue = selectedSource[0].data.medium;
                /*var umschlafLength = umschladValue.split("\n").length;
                var numOfUmschlagRows = parseInt(14 * umschlafLength);
                me.medium = me.createTextArea('Umschlag', numOfUmschlagRows);
                this.medium.setValue(selectedSource[0].data.medium);
                phys_panel.add(me.medium);*/
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                   // margin: '0 0 10 0',
                   
                    autoScroll: true,
                    border: true,
                    items:[ {
                        //xtype: 'label',
                        bodyPadding: 10,
                        html: '<b style="color:gray; font-size: 10px;">Umschlag:</b>'
                    }, {
                        html: umschlagValue,
                        bodyPadding: 10,
                       // margin: '0 0 0 55',
                        border: false
                    }]
                });*/
               // phys_panel.add(right_panel);
                
                right_panel.add({
                        //xtype: 'label',
                        bodyPadding: 10,
                        border: false,
                        html: '<b style="color:gray; font-size: 10px;">Umschlag:</b>'
                    }, {
                        html: umschlagValue,
                       bodyPadding: 10,
                       // margin: '0 0 0 55',
                        border: false
                    });
            }
            
            
            
            if (typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '') {
                var zustandsValue = selectedSource[0].data.condition;
                /* var zustandLength = zustandsValue.split("\n").length;
                var numOfZustandRows = parseInt(14 * zustandLength);
                me.zustand = me.createTextArea('Zustand', numOfZustandRows);
                this.zustand.setValue(selectedSource[0].data.condition);
                phys_panel.add(me.zustand);*/
                /*var right_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    //margin: '0 0 10 0',
                    autoScroll: true,
                    border: false,
                    items:[ {
                        //xtype: 'label',
                        bodyPadding: 10,
                        html: '<b style="color:gray; font-size: 10px;">Zustand:</b>'
                    }, {
                        html: zustandsValue,
                        //margin: '0 0 0 55',
                        bodyPadding: 10,
                        border: false
                    }]
                });*/
                //phys_panel.add(right_panel);
                
                right_panel.add({
                        //xtype: 'label',
                        bodyPadding: 10,
                        border: false,
                        html: '<b style="color:gray; font-size: 10px;">Zustand:</b>'
                    }, {
                        html: zustandsValue,
                        //margin: '0 0 0 55',
                        bodyPadding: 10,
                        border: false
                    });
            }
            
            if (selectedSource[0].data.inventarnummer !== '') {
                //me.inventar = me.createTextField('Inventarnr. des Hoftheaters');
                //me.inventar.setValue(selectedSource[0].data.inventarnummer);
                //phys_panel.add(me.inventar);
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Inventarnr. des Hoftheaters:</b>'
                    }, {
                        html: selectedSource[0].data.inventarnummer,
                       // margin: '0 0 0 55',
                        border: false
                    }]
                });*/
                //phys_panel.add(right_panel);
                
                right_panel.add({
                       // xtype: 'label',
                       bodyPadding: 10,
                       border: false,
                        html: '<b style="color:gray; font-size: 10px;">Inventarnr. des Hoftheaters:</b>'
                    }, {
                        html: selectedSource[0].data.inventarnummer,
                        bodyPadding: 10,
                       // margin: '0 0 0 55',
                        border: false
                    });
            }
            
            if (selectedSource[0].data.seitenzahl !== '') {
                /*me.w_ein_titel = me.createTextField('Umfang');
                me.w_ein_titel.setValue(selectedSource[0].data.seitenzahl);
                phys_panel.add(me.w_ein_titel);*/
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Umfang:</b>'
                    }, {
                        html: selectedSource[0].data.seitenzahl,
                        //margin: '0 0 0 55',
                        border: false
                    }]
                });*/
                //phys_panel.add(right_panel);
                
                right_panel.add({
                       // xtype: 'label',
                       bodyPadding: 10,
                       border: false,
                        html: '<b style="color:gray; font-size: 10px;">Umfang:</b>'
                    }, {
                        html: selectedSource[0].data.seitenzahl,
                        bodyPadding: 10,
                        //margin: '0 0 0 55',
                        border: false
                    });
            }
            
            if (selectedSource[0].data.groesse !== '') {
                /*me.w_titel = me.createTextField('Format');
                me.w_titel.setValue(selectedSource[0].data.groesse);
                phys_panel.add(me.w_titel);*/
                
                /* var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Format:</b>'
                    }, {
                        html: selectedSource[0].data.groesse,
                        //margin: '0 0 0 55',
                        border: false
                    }]
                });*/
                //phys_panel.add(right_panel);
                
                right_panel.add({
                        //xtype: 'label',
                        bodyPadding: 10,
                        border: false,
                        html: '<b style="color:gray; font-size: 10px;">Format:</b>'
                    }, {
                        html: selectedSource[0].data.groesse,
                        bodyPadding: 10,
                        //margin: '0 0 0 55',
                        border: false
                    });
            }
           
            if (selectedSource[0].data.schreiber.length>0) {
               
                right_panel.add({                
                //xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">Schreiber</b>',
                //margin: '30 0 10 0',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
            
            for (i = 0; i < selectedSource[0].data.schreiber.length; i++) {
                
                var autor = selectedSource[0].data.schreiber[i];
                var autorName = autor[0];
                var dbkey = autor[3];
                var medium = autor[1];
                var ini = autor[2];
                if(ini = 'true'){
                    ini = 'vollständig';
                }
                else{
                    ini = 'teilweise';
                }
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
                        value: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><span>'+'  '+'<a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a>; Schreibmittel: Tinte, Anteil: '+ini+ '</span>'
                    };
                } else {
                    name = {
                        xtype: 'displayfield',
                        margin: '0 0 0 10',
                        // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                        value: '<span>' + autorName +'; Schreibmittel: Tinte, Anteil: '+ini+ '</span>'
                    };
                }
              
                right_panel.add({border: false}, name);
            }
        
            
            
            
            }
            
        
        }
        
        if (selectedSource[0].data.inscription.length > 0) {
            
             right_panel.add({                
                //xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">Darsteller</b>',
                //margin: '30 0 10 0',
                border: false,
                bodyPadding: 10,
                colspan: 2
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
                        value: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><span>'+'  '+'<a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                    };
                } else {
                    name = {
                        xtype: 'displayfield',
                        margin: '0 0 0 10',
                        // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                        value: '<span>' + autorName + '</span>'
                    };
                }
              
                right_panel.add({border: false}, name);
            }
        }
        
        
        if (typeof selectedSource[0].data.inhalt !== 'undefined' || typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined' || typeof selectedSource[0].data.sprache[0] !== 'undefined' || selectedSource[0].data.creation !== '' || selectedSource[0].data.hoverview !== '' || selectedSource[0].data.events.length > 0) {
           
            right_panel.add({                
                //xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                //margin: '30 0 10 0',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
            
            
            /*var all_panel = Ext.create('Ext.panel.Panel', {
                border: false,
                margin: '10 0 0 10',
                items:[]
            });
            me.source_group.add(all_panel);*/
            
            
            if (typeof selectedSource[0].data.inhalt !== 'undefined') {
                //var bemLength = 1;
                var inhaltText = '';
                for (i = 0; i < selectedSource[0].data.inhalt.length; i++) {
                    inhaltText += selectedSource[0].data.inhalt[i] + '<br/><br/>'
                    //bemLength++;
                }
                /*var numOfRows = parseInt(14 * bemLength);
                me.prov = me.createTextArea('Inhalt', numOfRows);
                all_panel.add(me.prov);
                this.prov.setValue(inhaltText);*/
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Inhalt:</b>'
                    }, {
                        html: inhaltText,
                        margin: '0 0 0 75',
                        border: false
                    }]
                });
                all_panel.add(right_panel);*/
                 right_panel.add({
                        //xtype: 'label',
                        border: false,
                        bodyPadding: 10,                       
                        html: '<b style="color:gray; font-size: 10px;">Inhalt:</b>'
                    }, {
                        html: inhaltText,
                        //margin: '0 0 0 75',
                        bodyPadding: 10,
                        border: false
                    });
            }
            
            if (typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined') {
                var bem = '';
                for (i = 0; i < selectedSource[0].data.s_bemerkungen.length; i++) {
                    bem += selectedSource[0].data.s_bemerkungen[i] + '<br/><br/>'
                }
                
                /*var beschrLength = bem.split("\n").length;
                var numOfRows = parseInt(14 * beschrLength);
                me.annot = me.createTextArea('Anmerkungen', numOfRows);
                all_panel.add(me.annot);
                me.annot.setValue(bem);*/
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: '<b style="color:gray; font-size: 10px;">Anmerkungen:</b>'
                    }, {
                        html: bem,
                        margin: '0 0 0 35',
                        border: false
                    }]
                });
                all_panel.add(right_panel);*/
                right_panel.add({
                        //xtype: 'label',
                        border: false,
                        bodyPadding: 10,
                        html: '<b style="color:gray; font-size: 10px;">Anmerkungen:</b>'
                    }, {
                        html: bem,
                        //margin: '0 0 0 35',
                        bodyPadding: 10,
                        border: false
                    });
            }
            
            
            if (typeof selectedSource[0].data.sprache[0] !== 'undefined') {
                /*me.language = me.createTextField('Sprache(n)');
                all_panel.add(me.language);*/
                var spr = '';
                for (i = 0; i < selectedSource[0].data.sprache.length; i++) {
                    spr += selectedSource[0].data.sprache[i] + '\n'
                }
               // this.language.setValue(spr);
                
                right_panel.add({
                        //xtype: 'label',
                        border: false,
                        bodyPadding: 10,
                        html: '<b style="color:gray; font-size: 10px;">Sprache(n):</b>'
                    }, {
                        html: spr,                       
                        bodyPadding: 10,
                        border: false
                    });
            }
            
            if (selectedSource[0].data.creation !== '') {
               /* me.abs = me.createTextField('Entstehung');
                all_panel.add(me.abs);
                this.abs.setValue(selectedSource[0].data.creation);*/
                
                right_panel.add({
                        //xtype: 'label',
                        border: false,
                        bodyPadding: 10,
                        html: '<b style="color:gray; font-size: 10px;">Entstehung:</b>'
                    }, {
                        html: selectedSource[0].data.creation,                       
                        bodyPadding: 10,
                        border: false
                    });
            }
            
            if (selectedSource[0].data.hoverview !== '') {
                var beschrValue = selectedSource[0].data.hoverview;
                /*var beschrLength = beschrValue.split("\n").length;
                var numOfRows = parseInt(14 * beschrLength);
                me.overview = me.createTextArea('Beschreibung', numOfRows);
                all_panel.add(me.overview);
                this.overview.setValue(selectedSource[0].data.hoverview);*/
                
                /*var right_panel = Ext.create('Ext.panel.Panel', {
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
                        html: beschrValue,
                        margin: '0 0 0 30',
                        border: false
                    }]
                });
                all_panel.add(right_panel);*/
                
                right_panel.add({
                        //xtype: 'label',
                        bodyPadding: 10,
                        border: false,
                        html: '<b style="color:gray; font-size: 10px;">Beschreibung:</b>'
                    }, {
                        html: beschrValue,
                        margin: '0 0 0 30',
                        bodyPadding: 10,
                        border: false
                    });
            }
            if (selectedSource[0].data.events.length > 0) {
               
                right_panel.add({                
                //xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">Uraufführung</b>',
                //margin: '30 0 10 0',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
                
                
                    
                    for (i = 0; i < selectedSource[0].data.events.length; i++) {
                        var content = '';
                        var eventObj = selectedSource[0].data.events[i];
                        
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
                        
                        right_panel.add({
                        //xtype: 'label',
                        bodyPadding: 10,
                        border: false,
                        html: content,
                        colspan: 2
                    });
                    }
                
                
                    
                    
                    
               /* var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({
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
                
                me.source_group.add(left_panel_11);*/
            }
        }
    }
});