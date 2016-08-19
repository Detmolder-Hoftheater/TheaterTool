/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel', {
	extend: 'Ext.panel.Panel',
    
	autoScroll: true,
reserveScrollbar: true,
flex:1,
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
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">1. Ouverture. Allegro </b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
 me.add(incipitSection);
incipitSection.setTextInfo(meiE);
//}

var meiE_2 = splittest[2];
var incipitSection_2 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">2. Poco moderato, Incipit Nr. 1-2-1, Incipit Text: "Wir rudern immerfort" </b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
 me.add(incipitSection_2);
incipitSection_2.setTextInfo(meiE_2);

			/*	renderer.loadData(meiE);
console.log(meiE);
			var svg_1 = renderer.renderData(meiE, options);
			$('#' + me.id + '-body').html(svg_1);	*/

/*var meiE_3 = splittest[12];
var incipitSection_3 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+3+'</b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
me.add(incipitSection_3);
incipitSection_3.setTextInfo(meiE_3);*/
//console.log(splittest.length);
for(i = 6; i < 12; i++){
	var shoe = splittest[i];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+i+'</b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
me.add(incipitSection);
incipitSection.setTextInfo(shoe);

}
for(i = 13; i < 15; i++){
	var shoe = splittest[i];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+i+'</b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
me.add(incipitSection);
incipitSection.setTextInfo(shoe);

}


var meiE_3 = splittest[17];
var incipitSection_3 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+17+'</b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
me.add(incipitSection_3);
incipitSection_3.setTextInfo(meiE_3);


/*for(i = 16; i < splittest.length; i++){
	var shoe = splittest[i];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+i+'</b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
me.add(incipitSection);
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