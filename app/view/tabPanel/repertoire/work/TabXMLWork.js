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
border:false,


setTextInfo: function(infoText){

 var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText;
		
 		var tmp = hljs.highlightAuto($(tempDiv.innerHTML).html()).value;
 
		$('#'+this.id+'-innerCt').html(tmp);

	}
});