/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.revenue.RevenueTextSection', {
/*extend: 'Ext.panel.Panel',
 title: '<b style="color:gray;">Übersicht</b>',

border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,

    repertoireTab:null,

	month: null,
	monthNumber: null,
	year: null,*/
	
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
    
    minHeight: 500,
    
    repertoireTab: null,
    
    month: null,
    monthNumber: null,
    year: null,
    
    tableheight: null,
	tablewidth: null,
    
    xmlSection: null,
    
    revenueTable: null,
	
	selectedMonth: null,
    
    selectedWorkID: null,
    messageWindow: null,
    rev_index: -1,
    rev_length: -1,
    
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
					
					if (me.month === 'Januar') {
                    me.monthNumber = '01';
                } else if (me.month === 'Februar') {
                    me.monthNumber = '02';
                } else if (me.month === 'März') {
                    me.monthNumber = '03';
                } else if (me.month === 'April') {
                    me.monthNumber = '04';
                } else if (me.month === 'Mai') {
                    me.monthNumber = '05';
                } else if (me.month === 'Juni') {
                    me.monthNumber = '06';
                } else if (me.month === 'Juli') {
                    me.monthNumber = '07';
                } else if (me.month === 'August') {
                    me.monthNumber = '08';
                } else if (me.month === 'September') {
                    me.monthNumber = '09';
                } else if (me.month === 'Oktober') {
                    me.monthNumber = '10';
                } else if (me.month === 'November') {
                    me.monthNumber = '11';
                } else if (me.month === 'Dezember') {
                    me.monthNumber = '12';
                }
                
                Ext.Ajax.request({
                    url: 'resources/xql/getRevenueXML.xql',
                    method: 'GET',
                    params: {
                        month: me.monthNumber,
                        year: me.year
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
					       title: '<font style="color:gray;">XML for ' + me.title+', '+ me.year+ '</font>',
					        html: htmlVersion,
					        icon: 'resources/images/MoneyBox-17.png',
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
                  
                    url:'resources/xql/getRevenueXML.xql',
                    method: 'GET',
                    params: {
                        month: me.monthNumber,
                        year: me.year
                    },
                    success: function (response) {
                    var xmltext = response.responseText;
                   
                    var pom = document.createElement('a');

                    var filename = me.year+'_'+me.monthNumber+".xml";
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
        		}
        		]
        };
       
        if (me.month === 'Januar') {
            me.monthNumber = '01';
        } else if (me.month === 'Februar') {
            me.monthNumber = '02';
        } else if (me.month === 'März') {
            me.monthNumber = '03';
        } else if (me.month === 'April') {
            me.monthNumber = '04';
        } else if (me.month === 'Mai') {
            me.monthNumber = '05';
        } else if (me.month === 'Juni') {
            me.monthNumber = '06';
        } else if (me.month === 'Juli') {
            me.monthNumber = '07';
        } else if (me.month === 'August') {
            me.monthNumber = '08';
        } else if (me.month === 'September') {
            me.monthNumber = '09';
        } else if (me.month === 'Oktober') {
            me.monthNumber = '10';
        } else if (me.month === 'November') {
            me.monthNumber = '11';
        } else if (me.month === 'Dezember') {
            me.monthNumber = '12';
        }
        
        
        Ext.Ajax.request({
            url: 'resources/xql/getRevenueTable.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
                year: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                me.scheduleTable = new TheaterTool.view.tabPanel.revenue.RevenueTable({
                    lineList: json, selectedWorkID: me.selectedWorkID
                });
                me.scheduleTable.setTablePanel(me);
                me.add(me.scheduleTable);
                 me.tableheight =  me.scheduleTable.height;
	             me.tablewidth =  me.scheduleTable.width;
	             
	             if(me.selectedMonth === me.month){
	                 var workToFocus = me.scheduleTable.getWorkToFocus();
	                 me.scheduleTable.getSelectionModel().select(workToFocus);
	                 me.scheduleTable.getView().focusRow(workToFocus);
	             }
	            // console.log(json.graphics.length);
	             if( json.graphics.length > 0){
 				    me.detailSection = new TheaterTool.view.tabPanel.revenue.FacsimileView({imageData: json.graphics});
 				    me.add(me.detailSection);
 				}
 				if(me.rev_index === me.rev_length){
                        me.messageWindow.close();
                        
                    }
            }
        });
    
    
        /*if(me.month === 'Januar'){
				me.monthNumber = '01';
			}
			else if(me.month === 'Februar'){
				me.monthNumber = '02';
			}
			else if(me.month === 'März'){
				me.monthNumber = '03';
			}
			else if(me.month === 'April'){
				me.monthNumber = '04';
			}
			else if(me.month === 'Mai'){
				me.monthNumber = '05';
			}
			else if(me.month === 'Juni'){
				me.monthNumber = '06';
			}
			else if(me.month === 'Juli'){
				me.monthNumber = '07';
			}
			else if(me.month === 'August'){
				me.monthNumber = '08';
			}
			else if(me.month === 'September'){
				me.monthNumber = '09';
			}
			else if(me.month === 'Oktober'){
				me.monthNumber = '10';
			}
			else if(me.month === 'November'){
				me.monthNumber = '11';
			}
			else if(me.month === 'Dezember'){
				me.monthNumber = '12';
			}

			Ext.Ajax.request({
 			url: 'resources/xql/getRevenue.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
				year: me.year
              
            },
            success: function(response){
 				me.setTextInfo(response.responseText);
     		}
         
        });*/
	
	
 	
        me.callParent();
        
        },

setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}


});