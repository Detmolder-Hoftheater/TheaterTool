Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'layout-absolute',
    layout: 'absolute',
    defaults: {
        frame: true
    },
    border: false,
    bodyBorder: false,
    autoScroll: true,
    reserveScrollbar: true,
    
    bodyStyle: {
        "background-color": "white"
    },
    
    sourceID: null,
    in_panel: null,
    
    initComponent: function () {
        
        var me = this;
        
        var messageWindow = Ext.MessageBox.show({
            msg: 'Loading...'
            });
        Ext.Ajax.request({
            url: "resources/xql/getIncipit.xql",
            method: 'GET',
            params: {
                sourceID: me.sourceID
            },
            success: function (response) {
                
                var text = response.responseText;
                var splittest = text.split('<html>');
                
                var xPosition = 200 *(splittest.length -1);
                var reverseitemObjs = new Array();
                
                
                for (i = splittest.length -1; i > -1; i--) {
                    xPosition = xPosition -200;
                    
                    var meiE_tmp = splittest[i];
                    var meiE = meiE_tmp.replace('</html>', '');
                    if (meiE !== '') {
                        var xmlFile = jQuery.parseXML(meiE);
                        var meiElements = xmlFile.getElementsByTagName('title');
                  
                        var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({
                            titlename: meiElements[0].getAttribute('label'),
                            width: 200,
                            x: xPosition, y: 25,
                           
                            listeners: {
                                
                                el: {
                                    
                                    mouseenter: {
                                        
                                        fn: function (event, html, eOpts) {
                                            
                                            var elements = html.getElementsByTagName('b');
                                            var one_el = elements[0];
                                            var one_value = one_el.innerHTML;
                                            
                                            for (var m = 0; m < me.items.items.length; m++) {
                                                var oneItem = me.items.items[m];
                                                var titlename = oneItem.titlename;
                                                if (titlename === one_value) {
                                                    oneItem.setDisabled(false);
                                                    me.in_panel.setTitleParameter(titlename);
                                                } else {
                                                    oneItem.setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        
                        var position = me.items.length;
                        if (position === undefined) {
                            position = 0;
                        } else {
                            position--
                        }
                        me.insert(position,[incipitSection]);
                        
                        incipitSection.setTextInfo(meiE);
                        incipitSection.add({
                            
                            xtype: 'label',
                            html: '<b style="color:gray;">' + meiElements[0].getAttribute('label') + '</b>'
                           
                        });
                        me.in_panel.setTitleParameter(meiElements[0].getAttribute('label'));
                    }
                    
                    if (i === 0) {
                        messageWindow.close();
                        incipitSection.setDisabled(false);
                    } else {
                        incipitSection.setDisabled(true);
                    }
                }
            }
        });
    
        me.callParent();
    }
});