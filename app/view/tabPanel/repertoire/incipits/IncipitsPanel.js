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
				
				bodyPadding: 5,
				
				defaults: {
					frame: true
				},
				
	
bodyBorder: false,
	border: false,
	
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
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">1. Ouverture. Allegro</b>'});
 me.add(incipitSection);
incipitSection.setTextInfo(meiE);
//}

var meiE_2 = splittest[2];
var incipitSection_2 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">2. Poco moderato, Incipit Nr. 1-2-1, Incipit Text: "Wir rudern immerfort"</b>'});
 me.add(incipitSection_2);
incipitSection_2.setTextInfo(meiE_2);

			/*	renderer.loadData(meiE);
console.log(meiE);
			var svg_1 = renderer.renderData(meiE, options);
			$('#' + me.id + '-body').html(svg_1);	*/

/*for(i = 1; i < splittest.length; i++){
	var shoe = splittest[1];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection();
incipitSection.setTextInfo(shoe);

}*/



			/*	var options = JSON.stringify({
					
					border: 0,
					scale: 33
				});
				renderer.setOptions(options);

				renderer.loadData(meiE);

				for (i = 1; i < splittest.length; i++) {

							var shoe = splittest[i];
console.log(shoe);
							var svg_1 = renderer.renderData(shoe, options);
$('#' + me.id + '-body').html(svg_1);	

						}*/
				
			
					

			}
		});
		
		this.callParent()
	
	},

saveComponents: function (btn) {
console.log('itemdblclick');
}
});