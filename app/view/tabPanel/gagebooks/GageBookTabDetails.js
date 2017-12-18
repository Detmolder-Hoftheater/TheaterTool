/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.gagebooks.GageBookTabDetails', {
 extend: 'Ext.panel.Panel',
//	
//    title: '<b style="color:gray;">Übersicht</b>',
//
//	border: false,
//	flex:1,
////bodyBorder: true,
//bodyPadding:10,
//autoScroll: true,

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
                  
                    url:'resources/xql/getGageBookXML.xql',
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
        		//disabled: true,
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				},
				listeners: {
					click: function (item, e, eOpts) {
					
                Ext.Ajax.request({
                  
                    url:'resources/xql/getGageBookXML.xql',
                    method: 'GET',
                    params: {
                        regieName: me.regieName
                    },
                    success: function (response) {
                    var xmltext = response.responseText;
                   
                    var pom = document.createElement('a');

                    var filename = me.regieName +".xml";
                    var pom = document.createElement('a');
                    var bb = new Blob([xmltext], {type: 'text/plain'});

                    pom.setAttribute('href', window.URL.createObjectURL(bb));
                    pom.setAttribute('download', filename);

                    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
                    pom.draggable = true; 
                    pom.classList.add('dragout');

                    pom.click();
                    
                    }
                });
				
					   
					}
				}
        		}
        		]
        };
	
	
	
	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getGageContent.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
              
            },
            success: function(response){
            
            var tableInhalt = response.responseText;
           
me.add(

{
    
   html:  tableInhalt,
   border: false
   }
   );
				getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + workName + '</font>',
                    icon: workIcon
                });
                
                /*var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                selection: workId, isSelected: true
                });*/
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                });
                
               // personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + workName + '</font>');
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };

/**/
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
                    dbkey: personId,  title: '<font size="2" face="Arial" style="color:#A87678;">Person: '+personName+'</font>', icon: 'resources/images/Mask-19.png'
                });
                //personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
}
     		}
         
        });

        me.callParent();
        
        }

});