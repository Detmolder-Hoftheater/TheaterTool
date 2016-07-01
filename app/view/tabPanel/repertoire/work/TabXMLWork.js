/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.TabXMLWork', {
	extend: 'Ext.panel.Panel',

 minHeight: 200,

    resizable: true,

autoScroll: true,
reserveScrollbar: true,
border:false,
xmlText: null,

setTextInfo: function(infoText){
var me = this;

 var fragment = document.createDocumentFragment('div');
		var tempDiv = document.createElement('div');
		fragment.appendChild(tempDiv);
		tempDiv.innerHTML = infoText; 

var tmp = hljs.highlightAuto($(tempDiv).html()).value;
$('#'+me.id+'-innerCt').html('<pre>' + tmp + '</pre>');

	}
});