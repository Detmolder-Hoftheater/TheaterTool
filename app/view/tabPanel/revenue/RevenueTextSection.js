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
    
    repertoireTab: null,
    
    month: null,
    monthNumber: null,
    year: null,
    
    tableheight: null,
	tablewidth: null,
    
    xmlSection: null,
    
    revenueTable: null,
	
    initComponent: function() {

	var me = this;
	
	me.tbar = {
        style: {
        background: '#dcdcdc'
        },
       border: false,
        height: 30,
        items:[{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">Schow XML</b></font>',
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
        		text: '<font size = "1"><b style="color:gray;">Load XML</b></font>',
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
                    lineList: json
                });
                me.scheduleTable.setTablePanel(me);
                me.add(me.scheduleTable);
                 me.tableheight =  me.scheduleTable.height;
	             me.tablewidth =  me.scheduleTable.width;
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