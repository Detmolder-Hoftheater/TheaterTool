Ext.define('TheaterTool.view.tabPanel.taxation.TaxPanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    autoScroll: true,
    
    regieName: null,
    count: null,
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
        me.title = '<font size="2" face="Tahoma" style="color:#909090;">' + me.regieName + '</font>';
        me.icon = 'resources/images/tax.png';
        
        me.listeners = {
            
            afterrender: function (panel) {
           
                this.header.insert(1, {
                    xtype: 'button',
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML ansehen</font>',
                    style: 'background:white;',
                    
                    margin: '0 3 0 5',
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getTaxXML.xql',
                                method: 'GET',
                                params: {
                                    regieName: me.regieName
                                },
                                success: function (response) {
                                    
                                    var testText = response.responseXML;
                                    
                                    var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                                    var personArr = testText.getElementsByTagName('TEI');
                                    tempDiv.appendChild(personArr[0]);
                                    
                                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                                    
                                    var win = new Ext.window.Window({
                                        title: '<font style="color:gray;">XML für ' + me.regieName + '</font>',
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
                    text: '<font size="1" face="Tahoma" style="color:#909090;">XML laden</font>',
                    style: 'background:white;',
                    
                    listeners: {
                        click: function (item, e, eOpts) {
                            
                            Ext.Ajax.request({
                                
                                url: 'resources/xql/getTaxXML.xql',
                                method: 'GET',
                                params: {
                                    regieName: me.regieName
                                },
                                success: function (response) {
                                    var xmltext = response.responseText;
                                    
                                    var pom = document.createElement('a');
                                    
                                    var filename = me.regieName + ".xml";
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
        
        var section_details = new TheaterTool.view.tabPanel.taxation.TaxTabDetails({
            regieName: me.regieName, count: me.count, dbkey: me.dbkey
        });
        
        me.items =[
        section_details]
        
        me.callParent();
    }
});