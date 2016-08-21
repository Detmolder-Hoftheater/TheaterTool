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

sourceID: null,
	
	initComponent: function () {
		
		var me = this;



var initHeight = $(document).height()* 100 / 33;
	 	var initWidth = $(document).width()* 100 / 33;
		
		
		Ext.Ajax.request({
			//url: "data/test.mei",
			 url: "resources/xql/getIncipit.xql",
			method: 'GET',
			params: {
				sourceID: me.sourceID
			},
			success: function (response) {

var text = response.responseText;
var splittest = text.split('<html>');

for(i = 0; i < splittest.length; i++){


var meiE_tmp = splittest[i];
var meiE = meiE_tmp.replace('</html>', '');
if(meiE !== ''){
	var xmlFile = jQuery.parseXML(meiE);
  var meiElements = xmlFile.getElementsByTagName('title');

var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">'+meiElements[0].getAttribute('label')+'</b>'});
 me.add(incipitSection);
incipitSection.setTextInfo(meiE);
}

}


/*var meiE = splittest[1];
var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">1. Ouverture. Allegro </b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
 me.add(incipitSection);
incipitSection.setTextInfo(meiE);

var meiE_2 = splittest[2];
var incipitSection_2 = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({title: '<b style="color:gray;">2. Poco moderato, Incipit Nr. 1-2-1, Incipit Text: "Wir rudern immerfort" </b>'+ '<img src="resources/images/Download.png" style="width:15px;height:15px;">'});
 me.add(incipitSection_2);
incipitSection_2.setTextInfo(meiE_2);

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
incipitSection_3.setTextInfo(meiE_3);*/
		

			}
		});
		
		this.callParent()
	
	}

});