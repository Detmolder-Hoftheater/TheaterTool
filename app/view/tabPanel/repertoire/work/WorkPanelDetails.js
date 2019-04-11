Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    //bodyBorder: false,
    
    autoScroll: true,
    
    header: {
        style: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderBottom: '5px solid #F2EEE1'
        }
    },
    
    /*extend: 'Ext.tab.Panel',
    
    flex: 1,
    border: false,
    
    detailSection: null,
    detailSection_1: null,*/
    
    workID: null,
    
    workName: null,
    workIcon: null,
    //style: 'display:block; background-color:white; padding:8px 0px 5px 17px',
    
    initComponent: function () {
        
        var me = this;
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection({
            workID: me.workID, workName: me.title, workIcon: me.icon
        });
        
        // me.detailSection_1 = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSectionXML({workID: me.workID});
        
        me.detailSection.createComponents();
        
        me.items =[
        
        me.detailSection]
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
               menu:[ 
               {
               xtype: 'textarea',
                    value: 'https://edirom.hoftheater-detmold.de/exist/apps/TheaterTool/index.html#HoftheaterDetmold:werk_'+me.workID,
                    plain: true,
                    readOnly: true,
                    inputWrapCls: '',
                    triggerWrapCls: '',
            fieldStyle: 'background:white;',
           border: false,
            margin: '0 0 0 0',
            selected: true
                }]
                
                }
                ]);
                
                this.header.insert(2, {
                    xtype: 'button',
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML ansehen</font>',
                    style: 'background:white;',
                    /*style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                    },*/
                    margin: '0 3 0 5',
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getXML.xql',
                                method: 'GET',
                                params: {
                                    uri: '/db/apps/theater-data/works/' + me.workID + '.xml',
                                    type: 'work'
                                },
                                success: function (response) {
                                    
                                    var testText = response.responseXML;
                                    
                                    var tempDiv = document.createElementNS('http://www.music-encoding.org/ns/mei', 'div');
                                    var personArr = testText.getElementsByTagName('work');
                                    tempDiv.appendChild(personArr[0]);
                                    
                                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                                    
                                    
                                    /*var testText = response.responseText;
                                    
                                    var fragment = document.createDocumentFragment('div');
                                    var tempDiv = document.createElement('div');
                                    fragment.appendChild(tempDiv);
                                    tempDiv.innerHTML = testText;
                                    
                                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                    var htmlVersion = '<pre>' + tmp + '</<pre>';*/
                                    var win = new Ext.window.Window({
                                        title: '<font style="color:gray;">XML for ' + me.workName + '</font>',
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
                    /*text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',*/
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML laden</font>',
                    style: 'background:white;',
                    //disabled: true,
                    /*style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                    },*/
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getXML.xql',
                                method: 'GET',
                                params: {
                                    uri: '/db/apps/theater-data/works/' + me.workID + '.xml',
                                    type: 'work'
                                },
                                success: function (response) {
                                    var xmltext = response.responseText;
                                    
                                    var pom = document.createElement('a');
                                    
                                    var filename = me.workID + ".xml";
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