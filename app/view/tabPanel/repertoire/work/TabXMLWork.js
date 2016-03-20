/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.TabXMLWork', {
	extend: 'Ext.panel.Panel',

	bodyPadding: 10,

 minHeight: 200,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

//infoText: null,


	//workID: null,
	
/*	initComponent: function () {
var me = this;

me.listeners = {
        	activate: function (eOpts) {
        	console.log("activate");

			$('#'+me.id).html(me.infoText);


  }
    },
	
//$('#'+me.id+'innerCt').html('My content was added during construction.');	
	this.callParent();
	},*/


setTextInfo: function(infoText){

console.log(infoText);

//$('#'+this.id+'-innerCt').html(infoText);



 var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText;



 		var tmp = hljs.highlightAuto($(tempDiv.innerHTML).html()).value;
 
	$('#'+this.id+'-innerCt').html(tmp);

	}
});