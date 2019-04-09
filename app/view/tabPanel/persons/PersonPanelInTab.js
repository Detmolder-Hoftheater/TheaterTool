Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
    /*extend: 'Ext.tab.Panel',
    
    border: false,
    
    flex: 1,
    
    dbkey: null,
    
    section_xml: null,
    section_details: null,*/
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    //bodyBorder: false,
    
    autoScroll: true,
    
    dbkey: null,
    
    header: {
        style: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderBottom: '5px solid #F2EEE1'
        }
    },
    
    
    initComponent: function () {
        
        var me = this;
        
        me.section_details = new TheaterTool.view.tabPanel.persons.PersonTabDetails({
            dbkey: me.dbkey, personName: me.title, 
            personIcon: me.icon
        });
        me.section_details.createContent();
        
        me.items =[
        
        me.section_details];
        me.listeners = {
            
            afterrender: function (panel) {
                /* this.header.insert(1,[ {
                xtype: 'component',
                html: '<font size = "1"><b style="color:gray;">'+me.titleName+'</b></font>'
                //flex: 1
                }]);*/
                this.header.insert(1, {
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
                                
                                url: 'resources/xql/getPersonXML.xql',
                                method: 'GET',
                                params: {
                                    dbkey: me.dbkey
                                },
                                success: function (response) {
                                    var testText = response.responseXML;
                                    console.log(testText);
                                    var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                                    var personArr = testText.getElementsByTagName('person');
                                    tempDiv.appendChild(personArr[0]);
                                    
                                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                                    
                                    var win = new Ext.window.Window({
                                        title: '<font style="color:gray;">XML for ' + me.personName + '</font>',
                                        html: htmlVersion,
                                        icon: me.personIcon,
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
                
                this.header.insert(2, {
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
                                
                                url: 'resources/xql/getPersonXML.xql',
                                method: 'GET',
                                params: {
                                    dbkey: me.dbkey
                                },
                                success: function (response) {
                                    var xmltext = response.responseText;
                                    
                                    var pom = document.createElement('a');
                                    
                                    var filename = me.dbkey + ".xml";
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