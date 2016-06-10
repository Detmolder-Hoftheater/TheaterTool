/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel', {
	extend: 'Ext.panel.Panel',
    
	
	detailSection: null,
	detailSection_xml: null,
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 15,
				
				/*defaults: {
					frame: true
				},*/
				
	
/*bodyBorder: false,*/
	border: false,
	
	initComponent: function () {
		
		var me = this;
		
		
		Ext.Ajax.request({
			url: "data/test.mei",
			 //url: "resources/xql/getExtendedStaff.xql",
			method: 'GET',
			/*params: {
				path: pageNr,
				staffID: measurePath,
				id_prefix: 'hairpinStart___',
				endPageName: pageNr
			},*/
			success: function (response) {
				
				var text = response.responseText;
				
				var options = JSON.stringify({
					pageHeight: 450,
					pageWidth: 850,
					ignoreLayout: 25,
					border: 0,
					scale: 33
				});
				renderer.setOptions(options);
				renderer.loadData(text);
				// var svg = renderer.renderPage( 1, options );
				var svg = renderer.renderData(text, options);
				
				$('#' + me.id + '-body').html(svg);
				
			}
		});
		
		this.callParent()
	
	}
});