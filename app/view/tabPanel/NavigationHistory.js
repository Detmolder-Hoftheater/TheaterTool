Ext.define('TheaterTool.view.tabPanel.NavigationHistory', {
	extend: 'Ext.panel.Panel',
    
	region: 'north',
            flex: 0.12,

layout: {
		type: 'vbox',
		pack: 'start',
		align: 'right'
	},
		
	bodyPadding: 5,
	
border: false,
collapsible: true,
collapsed: true,
	//header: false,
	//split: false,
	title: '<b style="float: right; color:gray;">Verlauf: besuchte Tabs</b>',
	//height:10,
bodyBorder:true,
	
	
	initComponent: function () {
	var me = this;
	
	
	me.items = [{
                    xtype: 'fieldcontainer',
                   // fieldLabel: 'Tabs',
                  // labelWidth: 250,
                   
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'positionBtn',
                        value: 'top',
                        items: [
                            { text: 'Top', value: 'top' },
                            { text: 'Right', value: 'right' },
                            { text: 'Bottom', value: 'bottom' },
                            { text: 'Left', value: 'left' }
                        ]
                    }]
                }
              ]  
    	me.callParent();
	}
});