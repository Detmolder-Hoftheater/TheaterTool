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
    
    tableheight: null,
    tablewidth: null,
    
    xmlSection: null,
    
    scheduleTable: null,
    
    selectedMonth: null,
    
    selectedWorkID: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.tbar = {
            style: {
                background: '#dcdcdc'
            },
            border: false,
            height: 30,
            items:[ {
                xtype: 'button',
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
                            // url: 'data/Output_Exist.xql',
                            url: 'resources/xql/getScheduleXML.xql',
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
                                
                                
                                /*var testText = response.responseText;
                                
                                var fragment = document.createDocumentFragment('div');
                                var tempDiv = document.createElement('div');
                                fragment.appendChild(tempDiv);
                                tempDiv.innerHTML = testText;
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';*/
                                var win = new Ext.window.Window({
                                    title: '<font style="color:gray;">XML for ' + me.title + ', ' + me.year + '</font>',
                                    html: htmlVersion,
                                    icon: 'resources/images/Calendar-17.png',
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
            }, {
                xtype: 'button',
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
                            
                            url: 'resources/xql/getScheduleXML.xql',
                            method: 'GET',
                            params: {
                                month: me.monthNumber,
                                year: me.year
                            },
                            success: function (response) {
                                var xmltext = response.responseText;
                                
                                var pom = document.createElement('a');
                                
                                var filename = me.year + '_' + me.monthNumber + ".xml";
                                var pom = document.createElement('a');
                                var bb = new Blob([xmltext], {
                                    type: 'text/plain'
                                });
                                
                                pom.setAttribute('href', window.URL.createObjectURL(bb));
                                pom.setAttribute('download', filename);
                                
                                pom.dataset.downloadurl =[ 'text/plain', pom.download, pom.href].join(':');
                                pom.draggable = true;
                                pom.classList.add('dragout');
                                
                                pom.click();
                            }
                        });
                    }
                }
            }]
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
                
                me.scheduleTable = new TheaterTool.view.tabPanel.playSchedules.ScheduleTable({
                    lineList: json, selectedWorkID: me.selectedWorkID
                });
                if (json.settlement.length > 0) {
                    me.scheduleTable.setTitle('<font style="color:#A87678;">Spielort: ' + json.settlement + '</font>');
                }
                me.scheduleTable.setTablePanel(me);
                
                me.add(me.scheduleTable);
                me.tableheight = me.scheduleTable.height;
                me.tablewidth = me.scheduleTable.width;
                
                if (me.selectedMonth === me.month) {
                    var workToFocus = me.scheduleTable.getWorkToFocus();
                    me.scheduleTable.getSelectionModel().select(workToFocus);
                    me.scheduleTable.getView().focusRow(workToFocus);
                }
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