Ext.define('TheaterTool.view.tabPanel.issue.IssueTextSection', {
 /*extend: 'Ext.panel.Panel',
  requires:[
	'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
	
 title: '<b style="color:gray;">Übersicht</b>',
 
  layout: 'border',
  
	flex: 1,
    bodyBorder: false,
border: false,
 style: {
      borderRight: '7px solid white',
      borderLeft: '7px solid white',
      borderTop: '7px solid white',
     borderBottom: '7px solid white'
    },
    
   
   defaults: {
		autoScroll: true,
		split: true
	},

detailSection: null,

	issueName: null,
	year: null,
	
	imagePath: null,*/
	
	
	extend: 'Ext.panel.Panel',
    collapsible: true,
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    border: false,
    bodyBorder: false,
    flex: 1,
    
    repertoireTab: null,
    
    month: null,
    issueName: null,
    year: null,
    
    tableheight: null,
	tablewidth: null,
    
    xmlSection: null,
    
    revenueTable: null,
    
	selectedIssueName: null,
    
    selectedWorkID: null,
	
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
                    url: 'resources/xql/getIssueXML.xql',
                    method: 'GET',
                    params: {
                        issueName: me.issueName,
                        year: me.year
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
					       title: '<font style="color:gray;">XML for ' + me.title+', '+ me.year+ '</font>',
					        html: htmlVersion,
					        icon: 'resources/images/MoneyTransfer-17.png',
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
            url: 'resources/xql/getIssueTable.xql',
            method: 'GET',
            params: {
                issueName: me.issueName,
                year: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                me.scheduleTable = new TheaterTool.view.tabPanel.issue.IssueTable({
                    lineList: json, selectedWorkID: me.selectedWorkID
                });
                me.scheduleTable.setTablePanel(me);
                me.add(me.scheduleTable);
                 me.tableheight =  me.scheduleTable.height;
	             me.tablewidth =  me.scheduleTable.width;
	             
	              if(me.selectedIssueName === me.issueName){
	                 var workToFocus = me.scheduleTable.getWorkToFocus();
	                 me.scheduleTable.getSelectionModel().select(workToFocus);
	                 me.scheduleTable.getView().focusRow(workToFocus);
	             }
	             
	             
	             if( me.issueName === 'Außerordentliche Ausgaben 1840 (Auszug 1)'){
 				    me.detailSection = new TheaterTool.view.tabPanel.issue.FacsimileView({imagePath: me.imagePath});
 				    me.add(me.detailSection);
 				}
            }
        });
        
        
			/*Ext.Ajax.request({
 			url: 'resources/xql/getIssue.xql',
            method: 'GET',
            params: {
                issueName: me.issueName,
				year: me.year
              
            },
            success: function(response){
				
				var tableView = Ext.create('Ext.panel.Panel', {
						region: 'center',
                        flex: 2,
                        
						setTextInfo: function(infoText){
		                      $('#'+this.id+'-innerCt').html(infoText);

	               }
					});
				me.add(tableView);
 				tableView.setTextInfo(response.responseText);
 				
 				if( me.issueName === 'Außerordentliche Ausgaben 1840 (Auszug 1)'){
 				    me.detailSection = new TheaterTool.view.tabPanel.issue.FacsimileView({imagePath: me.imagePath});
 				    me.add(me.detailSection);
 				}
 				
              
     		}
         
        });*/
	
	
        me.callParent();
        
        }
});