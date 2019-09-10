Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
    extend: 'Ext.panel.Panel',
    
    sourceID: null,
    werkTitle: null,
    firstTabTitle: null,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    header: {
        style: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none'
            }
    },
    autoScroll: true,
    border: false,
    bodyBorder: false,
    flex: 1,
    
    repertoireTab: null,
    personSection: null,
    planSection: null,
    journalSection: null,
    regieSection: null,
    roleSection: null,
    revenueSection: null,
    issueSection: null,
    titleTab: null,
    iconTab: null,
    
    workID: null,
    
    initComponent: function () {
        
        var me = this;
        
        
        var detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesTabPanel({
            sourceID: me.sourceID, werkTitle: me.werkTitle, firstTabTitle: me.firstTabTitle
        });
        
        
        me.items =[
        detailSection];
        
        me.listeners = {
            
            afterrender: function (panel) {
                this.header.insert(1,[ {
                    xtype: 'button',
                    border: false,
                    glyph: null,
                    icon: 'resources/images/link-16.png',
                    style: 'background:white;',
                    
                    margin: '0 5 0 0',
                    arrowCls: '',
                    showSeparator: false,
                    menu:[ {
                        xtype: 'textarea',
                        value: 'https://dev.hoftheater-detmold.de/index.html#HoftheaterDetmold:quelle_' + me.sourceID,
                        plain: true,
                        readOnly: true,
                        inputWrapCls: '',
                        triggerWrapCls: '',
                        fieldStyle: 'background:white;',
                        border: false,
                        margin: '0 0 0 0',
                        selected: true
                    }]
                }]);
                this.header.insert(2, {
                    xtype: 'button',
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML ansehen</font>',
                    style: 'background:white;',
                    
                    margin: '0 3 0 5',
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getXML.xql',
                                method: 'GET',
                                params: {
                                    uri: '/db/apps/theater-data/sources/' + me.sourceID + '.xml',
                                    type: 'source'
                                },
                                success: function (response) {
                                    
                                    
                                    var testText = response.responseXML;
                                    
                                    var tempDiv = document.createElementNS('http://www.music-encoding.org/ns/mei', 'div');
                                    var personArr = testText.getElementsByTagName('source');
                                    tempDiv.appendChild(personArr[0]);
                                    
                                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                                    
                                    var win = new Ext.window.Window({
                                        title: '<font style="color:gray;">XML for ' + me.title + '</font>',
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
                });
                
                this.header.insert(3, {
                    xtype: 'button',
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML laden</font>',
                    style: 'background:white;',
                    
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getXML.xql',
                                method: 'GET',
                                params: {
                                    uri: '/db/apps/theater-data/sources/' + me.sourceID + '.xml',
                                    type: 'source'
                                },
                                success: function (response) {
                                    var xmltext = response.responseText;
                                    
                                    var pom = document.createElement('a');
                                    
                                    var filename = me.sourceID + ".xml";
                                    var pom = document.createElement('a');
                                    var bb = new Blob([xmltext], {
                                        type: 'text/plain'
                                    });
                                    
                                    pom.setAttribute('href', window.URL.createObjectURL(bb));
                                    pom.setAttribute('download', filename);
                                    
                                    pom.dataset.downloadurl =[ 'text/plain', pom.download, pom.href].join(':');
                                    pom.draggable = true;
                                    pom.classList.add('dragout');
                                    
                                    //apply the click on to download the file
                                    document.body.appendChild(pom);
                                    pom.click();
                                    document.body.removeChild(pom);
                                }
                            });
                        }
                    }
                });
            }
        }
        
        me.callParent();
    }
});