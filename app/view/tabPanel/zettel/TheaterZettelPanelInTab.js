Ext.define('TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTab', {
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
			html: '<img src="resources/images/Info.png" style="width:15px;height:15px;"> In Suchmaske im "Dokumententyp"-Kombobox einen Parameter "Theaterzettel" auswählen!',
			margin: '10 0 0 10',
			border: false

		},
			
			{
    xtype: 'component',
    margin: '10 0 10 10',
    autoEl: {
        tag: 'a',
        href: 'http://www.llb-detmold.de/webOPACClient_lippe/start.do',
        html: 'Theaterzettelsuche in Lippische Landesbibliothek Detmold',
		target: "_blank"
		
    }
    }	
    ]

    	this.callParent();
	}
});