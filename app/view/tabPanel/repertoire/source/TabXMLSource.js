/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.TabXMLSource', {
	extend: 'Ext.panel.Panel',

	bodyPadding: 10,

	//height: 300,				
					
border:true,

autoScroll: true,
		

 minHeight: 500,
   
    //resizable: true,

//autoScroll: true,
//reserveScrollbar: true,

//infoText: null,


	//workID: null,

initComponent: function() {
this.callParent();
        
        },
	

setTextInfo: function(infoText){

//console.log(infoText);


//$('#'+this.id+'-innerCt').html(infoText);

var me = this;
console.log(me.id);

//$('#'+this.id+'-body').html('My content was added during construction.');

 var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText;



 		var tmp = hljs.highlightAuto($(tempDiv).html()).value;
 
	$('#'+me.id+'-body').html('<pre>' + tmp + '</pre>');

	}
});