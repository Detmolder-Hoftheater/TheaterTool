/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel', {
	extend: 'Ext.panel.Panel',
    
	autoScroll: true,

/*
width: 850,
height:450,*/

	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				//bodyPadding: 15,
				
				/*defaults: {
					frame: true
				},*/
				
	
/*bodyBorder: false,*/
	//border: false,
	
	initComponent: function () {
		
		var me = this;



var initHeight = $(document).height()* 100 / 33;
	 	var initWidth = $(document).width()* 100 / 33;
		
		
		Ext.Ajax.request({
			//url: "data/test.mei",
			 url: "resources/xql/getIncipit.xql",
			method: 'GET',
			/*params: {
				path: pageNr,
				staffID: measurePath,
				id_prefix: 'hairpinStart___',
				endPageName: pageNr
			},*/
			success: function (response) {

var text = response.responseText;
				var splittest = text.split('<html>');

//for(i = 1; i < splittest.length+1; i++){
var meiE = splittest[1];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection();
 me.add(incipitSection);
incipitSection.setTextInfo(meiE);
//}


var meiE_2 = splittest[2];
var incipitSection_2 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection();
 me.add(incipitSection_2);
incipitSection_2.setTextInfo(meiE_2);

			}
		});
		
		this.callParent()
	
	}
});