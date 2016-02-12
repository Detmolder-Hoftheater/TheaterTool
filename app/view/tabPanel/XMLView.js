/**
 * Creates class TheaterTool.view.tabPanel.XMLView that extend from Ext.form.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.XMLView for show xml-fragment for element.
 */
Ext.define('TheaterTool.view.tabPanel.XMLView', {
	extend: 'Ext.form.Panel',
	
	layout: 'absolute',
	border: true,
	flex: 2,
	
	defaults: {
		bodyPadding: 15,
		height: 100,
		frame: true
	}
});