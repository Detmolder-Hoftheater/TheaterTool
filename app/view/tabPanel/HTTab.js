/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.HTTab', {
	extend: 'Ext.panel.Panel',

requires:[
	'Ext.layout.container.VBox'],
	xtype: 'layout-vertical-box',
	flex: 1,
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	
	defaults: {
		frame: true,
		autoScroll: true
	},
	bodyPadding: 10,
	autoScroll: true,
/*requires:[
	'Ext.layout.container.VBox'],
	flex: 1,
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},*/


//bodyPadding: 10,

//border:false,
//bodyBorder: true,
	
	closable: true,
	
	//autoScroll: true,
	
	repertoireNavigation: null,
	repertoireDetails: null,
	
	initComponent: function () {
	
	//this.repertoireNavigation = new TheaterTool.view.tabPanel.repertoire.RepertoireAlphNavigation();
	
	//this.repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel();
		
	//	this.items =[
		//this.repertoireNavigation,
	//	this.repertoireDetails
	//	];
	
		
		this.callParent();
	}
});