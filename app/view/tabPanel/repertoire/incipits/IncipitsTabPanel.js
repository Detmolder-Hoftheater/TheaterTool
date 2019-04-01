Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.panel.Panel',
    
    //autoScroll: true,
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    flex: 1,
    border: false,
    //bodyPadding:15,
    header:{
   style: {
      backgroundColor:'#FFFFFF',
      backgroundImage:'none'
     // borderBottom: '5px solid #F2EEE1'
   }
},
    
    personSection: null,
    detailSection: null,
    sourcesSection: null,
    overviewSection: null,
    detailSection_xml: null,
    
    sourceID: null,
    werkTitle: null,
    titleParameter: null,
    
    
    initComponent: function () {
        
        var me = this;
        
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSection({
            sourceID: me.sourceID, in_panel: me
        });
       
      
        me.items =[        
            me.detailSection
           // me.detailSection_xml
        ]
        
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
                    // url: 'data/Output_Exist.xql',
                    url: 'resources/xql/getIncipitsXML.xql',
                    method: 'GET',
                    params: {
                        sourceID: me.sourceID,
                        incipitName: me.titleParameter
                    },
                    success: function (response) {
                    var testText = response.responseText;
                       var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = testText;
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        var htmlVersion = '<pre>' + tmp + '</<pre>';
                        var win = new Ext.window.Window({
					       title: '<font style="color:gray;">XML for ' + me.titleParameter+'</font>',
					        html: htmlVersion,
					        icon: 'resources/images/Calendar-17.png',
					        bodyStyle:{"background-color":"white"},
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
                
                listeners: {
                    click: function (item, e, eOpts) {
                        
                        Ext.Ajax.request({
                  
                    url:'resources/xql/getIncipitsXML.xql',
                    method: 'GET',
                    params: {
                        sourceID: me.sourceID,
                        incipitName: me.titleParameter
                    },
                    success: function (response) {
                    var xmltext = response.responseText;
                   
                    var pom = document.createElement('a');

                    var filename = me.titleParameter +".xml";
                    var pom = document.createElement('a');
                    var bb = new Blob([xmltext], {type: 'text/plain'});

                    pom.setAttribute('href', window.URL.createObjectURL(bb));
                    pom.setAttribute('download', filename);

                    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
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
    },
    
    setTitleParameter: function(titleParameter){
        this.titleParameter = titleParameter;
    }
});