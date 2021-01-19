Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesSection', {
    extend: 'Ext.panel.Panel',
    
    title: '<b style="color:gray;">Einzelquellen</b>',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyBorder: false,
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
            
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            readOnly: true,
            fieldStyle: 'height:' + numOfRows + ';',
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
            border: false,
            items:[]
        });
        stitle_panel.add(right_panel);
        
        if (selectedSource[0].data.titlecontent !== undefined) {
            for (var i = 0; i < selectedSource[0].data.titlecontent.length; i++) {
                var oneTitle = selectedSource[0].data.titlecontent[i];
                var titleType = oneTitle[1];
                if (titleType === 'short') {
                    titleType = 'Kurztitel';
                } else if (titleType === 'cover') {
                    titleType = 'Umschlagstitel';
                } else {
                    titleType = 'Titel (' + oneTitle[1] + ')';
                }
                
                var titleValues = oneTitle[0];
                
                var pages = '';
                for (var j = 0; j < titleValues.length; j++) {
                    var test_1 = titleValues[j];
                    var oneElem = test_1[0];
                    
                    if (oneElem === 'text') {
                        var textValue = test_1[1];
                        pages = pages + ' ' + textValue;
                    } else if (oneElem === 'br') {
                        pages = pages + '</br>';
                    }
                }
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">' + titleType + ': </b>'
                }, {
                    html: pages,
                    bodyPadding: 10,
                    border: false
                });
            }
        }
        
        if (selectedSource[0].data.signatur !== '') {
            
            right_panel.add({
                bodyPadding: 10,
                border: false,
                html: '<b style="color:gray; font-size: 10px;">Signatur: </b>'
            }, {
                html: selectedSource[0].data.signatur,
                bodyPadding: 10,
                border: false
            });
        }
        
        if (selectedSource[0].data.inventarnummer !== '') {
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Inventarnr. des Hoftheaters:</b>'
                }, {
                    html: selectedSource[0].data.inventarnummer,
                    bodyPadding: 10,
                    border: false
                });
            }
            
        
        
        if (selectedSource[0].data.sourcetype !== '') {
            var sourceType = selectedSource[0].data.sourcetype;
            var sourceTypeTranslated = '';
            if(sourceType === 'ms'){
                sourceTypeTranslated = 'Handschrift';
            }else if(sourceType === 'ms_score'){
                sourceTypeTranslated = 'handgeschriebene Partitur';                
            }else if(sourceType === 'ms_piano_score'){
                sourceTypeTranslated = 'handgeschriebener Klavierauszug';                
            }else if(sourceType === 'ms_vocal_score'){
                sourceTypeTranslated = 'handgeschriebener Klavierauszug';                
            }else if(sourceType === 'ms_solo_part'){
                sourceTypeTranslated = 'handgeschriebene Solostimme';                
            }else if(sourceType === 'ms_choral_part'){
                sourceTypeTranslated = 'handgeschriebene Chorstimme';                
            }else if(sourceType === 'ms_instrumental_part'){
                sourceTypeTranslated = 'handgeschriebene Instrumentalstimme';                
            }else if(sourceType === 'ms_script'){
                sourceTypeTranslated = 'handgeschriebenes Rollenheft';                
            }else if(sourceType === 'ms_prompt_book'){
                sourceTypeTranslated = 'handgeschriebenes Soufflierbuch';                
            }else if(sourceType === 'ms_textbook'){
                sourceTypeTranslated = 'handgeschriebenes Textbuch';                
            }else if(sourceType === 'ms_inner_sheet'){
                sourceTypeTranslated = 'handgeschriebenes Einlageblatt';                
            }else if(sourceType === 'ms_cut_sheet'){
                sourceTypeTranslated = 'handgeschriebenes Einzelblatt';                
            }else if(sourceType === 'pr'){
                sourceTypeTranslated = 'Druck';                
            }else if(sourceType === 'pr_score'){
                sourceTypeTranslated = 'gedruckte Partitur';                
            }else if(sourceType === 'pr_piano_score'){
                sourceTypeTranslated = 'gedruckter Klavierauszug';                
            }else if(sourceType === 'pr_vocal_score'){
                sourceTypeTranslated = 'gedruckter Klavierauszug';                
            }else if(sourceType === 'pr_solo_part'){
                sourceTypeTranslated = 'gedruckte Solostimme';                
            }else if(sourceType === 'pr_choral_part'){
                sourceTypeTranslated = 'gedruckte Chorstimme';                
            }else if(sourceType === 'pr_instrumental_part'){
                sourceTypeTranslated = 'gedruckte Instrumentalstimme';                
            }else if(sourceType === 'pr_script'){
                sourceTypeTranslated = 'gedrucktes Rollenheft';                
            }else if(sourceType === 'pr_prompt_book'){
                sourceTypeTranslated = 'gedrucktes Soufflierbuch';                
            }else if(sourceType === 'pr_textbook'){
                sourceTypeTranslated = 'gedrucktes Textbuch';                
            }else if(sourceType === 'pr_inner_sheet'){
                sourceTypeTranslated = 'gedrucktes Einlageblatt';                
            }else if(sourceType === 'pr_cut_sheet'){
                sourceTypeTranslated = 'gedrucktes Einzelblatt';                
            }
   
            right_panel.add({
                bodyPadding: 10,
                border: false,
                html: '<b style="color:gray; font-size: 10px;">Quellentyp: </b>'
            }, {
                html: sourceTypeTranslated,
                bodyPadding: 10,
                border: false
            });
        }
        
        
        
        if (typeof selectedSource[0].data.titlePages[0] !== 'undefined' || selectedSource[0].data.medium !== '' || typeof selectedSource[0].data.schreiber !== 'undefined' ||
        typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '' || selectedSource[0].data.seitenzahl !== '' || selectedSource[0].data.groesse !== '') {
            
            right_panel.add({
                html: '<b style="color:gray; font-size: 12px;">Physikalische Daten</b>',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
            
            
            if (selectedSource[0].data.titlePages.length > 0) {
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Titelseite(n):</b>',
                    colspan: 2
                });
                
                var titlePage = selectedSource[0].data.titlePages;
                for (var i = 0; i < titlePage.length; i++) {
                    var titlePages = titlePage[i];
                    
                    var pages = '';
                    for(var j = 0; j < titlePages.length; j++){
                        var test_1= titlePages[j];
                         var oneElem = test_1[0];
                    
                    if (oneElem === 'text') {
                        var textValue = test_1[1];
                        pages = pages + textValue;
                    } else if (oneElem === 'br') {
                        pages = pages + '</br>';
                    } else if (oneElem === 'add') {
                        var addValue = test_1[1];
                        
                        pages = pages + '<span style="color:MediumSeaGreen;">' + addValue + '</span>';
                    } else if (oneElem === 'del') {
                        var delValue = test_1[1];                        
                        pages = pages + '<span style="color:Tomato;">' + delValue + '</span>';
                    }
                    else if(oneElem === 'label'){
                        var labelValue = test_1[1];
                        if(labelValue != ''){
                            pages = pages + ' '+labelValue+'</br>';
                        }
                    }
                    }
                    
                    right_panel.add({
                    html: pages,
                    bodyPadding: 10,
                    margin: '0 0 0 95',
                    border: false,
                    colspan: 2
                });
                   
                    
                }
                
                
            }
            
            
            if (selectedSource[0].data.medium !== '') {
                var umschlagValue = selectedSource[0].data.medium;
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Umschlag:</b>'
                }, {
                    html: umschlagValue,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            
            
            if (typeof selectedSource[0].data.condition !== 'undefined' && selectedSource[0].data.condition !== '') {
                var zustandsValue = selectedSource[0].data.condition;
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Zustand:</b>'
                }, {
                    html: zustandsValue,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            
            if (selectedSource[0].data.seitenzahl !== '') {
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Umfang:</b>'
                }, {
                    html: selectedSource[0].data.seitenzahl,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            if (selectedSource[0].data.groesse !== '') {
                
                right_panel.add({
                    bodyPadding: 10,
                    border: false,
                    html: '<b style="color:gray; font-size: 10px;">Format:</b>'
                }, {
                    html: selectedSource[0].data.groesse,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            if (selectedSource[0].data.schreiber.length > 0) {
                
                right_panel.add({
                    html: '<b style="color:gray; font-size: 12px;">Schreiber</b>',
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
                    if (ini = 'true') {
                        ini = 'vollständig';
                    } else {
                        ini = 'teilweise';
                    }
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
                            value: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><span>' + '  ' + '<a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a>; Schreibmittel: Tinte, Anteil: ' + ini + '</span>'
                        };
                    } else {
                        name = {
                            xtype: 'displayfield',
                            margin: '0 0 0 10',
                            value: '<span>' + autorName + '; Schreibmittel: Tinte, Anteil: ' + ini + '</span>'
                        };
                    }
                    
                    right_panel.add({
                        border: false
                    },
                    name);
                }
            }
        }
        
        if (selectedSource[0].data.inscription.length > 0) {
            
            right_panel.add({
                html: '<b style="color:gray; font-size: 12px;">Eintragungen</b>',
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
                        var menuItem = historyButton.menu.add({
                            text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                        });
                        
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
                        value: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><span>' + '  ' + '<a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                    };
                } else {
                    name = {
                        xtype: 'displayfield',
                        margin: '0 0 0 10',
                        value: '<span>' + autorName + '</span>'
                    };
                }
                
                right_panel.add({
                    border: false
                },
                name);
            }
        }
        
        
        if (typeof selectedSource[0].data.inhalt !== 'undefined' || typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined' || typeof selectedSource[0].data.sprache[0] !== 'undefined' || selectedSource[0].data.creation !== '' || selectedSource[0].data.hoverview !== '' || selectedSource[0].data.events.length > 0) {
            
            right_panel.add({
                html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                border: false,
                bodyPadding: 10,
                colspan: 2
            });
            
            if (typeof selectedSource[0].data.inhalt !== 'undefined') {
                var inhaltText = '';
                for (i = 0; i < selectedSource[0].data.inhalt.length; i++) {
                    inhaltText += selectedSource[0].data.inhalt[i] + '<br/><br/>'
                }
                
                right_panel.add({
                    border: false,
                    bodyPadding: 10,
                    html: '<b style="color:gray; font-size: 10px;">Inhalt:</b>'
                }, {
                    html: inhaltText,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            if (typeof selectedSource[0].data.s_bemerkungen[0] !== 'undefined') {
                var bem = '';
                for (i = 0; i < selectedSource[0].data.s_bemerkungen.length; i++) {
                    bem += selectedSource[0].data.s_bemerkungen[i] + '<br/><br/>'
                }
                
                right_panel.add({
                    border: false,
                    bodyPadding: 10,
                    html: '<b style="color:gray; font-size: 10px;">Anmerkungen:</b>'
                }, {
                    html: bem,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            
            if (typeof selectedSource[0].data.sprache[0] !== 'undefined') {
                var spr = '';
                for (i = 0; i < selectedSource[0].data.sprache.length; i++) {
                    spr += selectedSource[0].data.sprache[i] + '\n'
                }
                
                right_panel.add({
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
                
                right_panel.add({
                    border: false,
                    bodyPadding: 10,
                    html: '<b style="color:gray; font-size: 10px;">Entstehung:</b>'
                }, {
                    html: selectedSource[0].data.creation,
                    bodyPadding: 10,
                    border: false
                });
            }
            
            if (selectedSource[0].data.hoverview.length > 0) {
                var beschrValue = selectedSource[0].data.hoverview;
                
                right_panel.add({
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
                    html: '<b style="color:gray; font-size: 12px;">Uraufführung</b>',
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
                        bodyPadding: 10,
                        border: false,
                        html: content,
                        colspan: 2
                    });
                }
            }
        }
    }
});