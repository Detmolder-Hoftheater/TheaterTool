Ext.define('TheaterTool.view.tabPanel.NavigationHistory', {
	extend: 'Ext.panel.Panel',
    
	region: 'north',
            flex: 0.12,

layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
		
	bodyPadding: 5,
	
border: false,
collapsible: true,
collapsed: true,
	//header: false,
	//split: false,
	title: '<b style="float: right; color:gray;">Verlauf</b>',
	//height:10,
bodyBorder:true,
	
	
	initComponent: function () {
	var me = this;
	
	
	me.items = [{
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                    {
                        html: '<img src="resources/images/BooksVert-17.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                    {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                    {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    }
	
	
	
	
	/*{
                    xtype: 'fieldcontainer',
                   
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'positionBtn',
                        value: 'top',
                        items: [
                            {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                            {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                            {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    },
                            {
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    }
                        ]
                    }]
                }
 */             ]  
    	me.callParent();
	}
});


/*{
                        html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                        border: false
                        //margin: '0 0 -11 0'
                    }
                    
                    var imageGNDLink = Ext.create('Ext.Img', {
                            html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
                            
                            autoEl: {
                                tag: 'a',
                                href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query=' + gndId,
                                target: "_blank"
                            }
                        });*/