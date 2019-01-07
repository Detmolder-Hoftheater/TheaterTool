/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.abo.AboTabDetails', {
extend: 'Ext.panel.Panel',
	
   /*  title: '<b style="color:gray;">Übersicht</b>',
    
	border: false,
	flex:1,

bodyPadding:10,
autoScroll: true,*/

layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,


regieName: null,

    initComponent: function() {

	var me = this;
	
	me.tbar = {
        style: {
        background: '#dcdcdc'
        },
       border: false,
        height: 30,
        items:[{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">XML ansehen</b></font>',
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				},
        		margin: '0 3 0 5',
        		listeners: {
					click: function (item, e, eOpts) {
					
                Ext.Ajax.request({
                  
                    url:'resources/xql/getAboXML.xql',
                    method: 'GET',
                    params: {
                        regieName: me.regieName,
                        path: dbPathsMap.get('abo')
                    },
                    success: function (response) {
                    
                    var testText = response.responseXML;
                    
                    var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                    var personArr = testText.getElementsByTagName('TEI');
                    tempDiv.appendChild(personArr[0]);
      
                    var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                    var htmlVersion = '<pre>' + tmp + '</<pre>';
                    
                   /* var testText = response.responseText;
                      
                       var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = testText;
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        var htmlVersion = '<pre>' + tmp + '</<pre>';*/
                        var win = new Ext.window.Window({
					       title: '<font style="color:gray;">XML für ' + me.regieName+'</font>',
					        html: htmlVersion,
					        icon: me.personIcon,
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
        		},
        		{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',
        		disabled: true,
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				}
        		}
        		]
        };
	
	
	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/getAbo.xql',
 			url: 'resources/xql/getAboContent.xql',
            method: 'GET',
            params: {
                regieName: me.regieName,
                path: dbPathsMap.get('abo')
              
            },
            success: function(response){
				var tableInhalt = response.responseText;
           
me.add(

{
    
   html:  tableInhalt,
   border: false
   }

);
				
				
				//me.setTextInfo(response.responseText);
 				
     		}
         
        });


        me.callParent();
        
        },
        
          setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

});