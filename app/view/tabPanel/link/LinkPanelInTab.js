Ext.define('TheaterTool.view.tabPanel.link.LinkPanelInTab', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},

	//border: true,

	flex:1,
	bodyPadding:7,

	initComponent: function () {

	this.items = [
			
			{
    xtype: 'component',
    margin: '10 0 10 10',
    autoEl: {
        tag: 'a',
        href: 'http://s2w.hbz-nrw.de/llb/content/titleinfo/3305985',
        html: 'Ein Rückblick auf das Fürstliche Theater in Detmold von 1825-1886',
		target: "_blank"
		
    }
    },
    
		{
    xtype: 'component',
    margin: '10 0 10 10',
    autoEl: {
        tag: 'a',
        href: 'http://s2w.hbz-nrw.de/llb/urn/urn:nbn:de:hbz:51:1-3415',
        html: 'Gesetzliche Ordnungen für das Hochfürstl. Lippesche Hoftheater',
		target: "_blank"
		
    }
    }	
			
    ]

    	this.callParent();
	}
});