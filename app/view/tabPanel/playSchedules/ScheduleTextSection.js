/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection', {
    extend: 'Ext.panel.Panel',
    //title: '<b style="color:gray;">Übersicht</b>',
    collapsible: true,
    /*border: true,
    flex:1,
    bodyBorder: true,
    bodyPadding:10,
    autoScroll: true,*/
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    //autoScroll: true,
    border: false,
    bodyBorder: false,
    //bodyPadding:10,
    flex: 1,
    //autoScroll: true,
    
    repertoireTab: null,
    
    month: null,
    monthNumber: null,
    year: null,
    
    xmlSection: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.tbar = {
        style: {
        background: '#dcdcdc'
        },
        height: 33,
        items:[{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">Schow XML</b></font>',
        		//'<b style="color:gray;">Schow XML</b>',
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				},
        		margin: '0 3 0 5'
        		},
        		{xtype: 'button',
        		text: '<font size = "1"><b style="color:gray;">Load XML</b></font>',
        		disabled: true,
        		//'<b style="color:gray;">Load XML</b>',
        		style: {
					borderRight: '1px solid gray',
					borderLeft: '1px solid gray',
					 borderTop: '1px solid gray',
					 borderBottom: '1px solid gray'
				}
        		//margin: '0 5 0 10'
        		}
        		]
        };
        
        /*me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel();*/
        
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
            // url: 'data/Output_Exist.xql',
            url: 'resources/xql/getScheduleTable.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
                year: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                var scheduleTable = new TheaterTool.view.tabPanel.playSchedules.ScheduleTable({
                    lineList: json
                });
                scheduleTable.setTablePanel(me);
                me.add(scheduleTable);
               // me.xmlSection.setSectionSize(me.getHeight());
                //console.log( me.getHeight());
                //me.setTextInfo(response.responseText);
            }
        });
        
        
        /*me.items =[
        this.repertoireTab
        ],*/
        
        
        
        
        me.callParent();
    },
    
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});