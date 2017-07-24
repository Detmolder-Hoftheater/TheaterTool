Ext.define('TheaterTool.view.toolbar.DatenRelationWindow', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Relation Diagram</b>',
 
	border: false,
	
	autoScroll: true,

	height: 500, 
    flex:1,

layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
	
	defaults: {
		bodyPadding: 10
	},
	
	text: null,
	
	initComponent: function () {
	
		
		this.items =[ {
			html: '<img src="resources/images/Diagram.png" style="width:1154px;height:708px;">'

		}],
		
		
		this.callParent()
	}
});