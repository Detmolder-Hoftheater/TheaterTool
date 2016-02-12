/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 */
Ext.define('TheaterTool.view.main.Main', {
	extend: 'Ext.panel.Panel',
	requires:[
	'Ext.layout.container.VBox'],
	xtype: 'layout-vertical-box',
	id: 'cemain',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
		
	bodyPadding: 1,
	
	/*defaults: {
		border: false
	},*/
	
//border: false,
	htToolbar: null,
	htPanel: null,
	
	ceToolbar: null,
	cePanel: null,
	
	startMeasure: null,
	endMeasure: null,
	staffNr: null,
	measureid: null,
	verStartId: null,
	verEndId: null,
	card: null,
	elementName: null,
	afterSaveText: null,
	
	initComponent: function () {
		
		//this.ceToolbar = new TheaterTool.view.toolbar.CEToolbar(),
		this.htToolbar = new TheaterTool.view.toolbar.HTToolbar(
		{bodyStyle:{"background-color":"#A80016"}}
		);
		
		
		//this.cePanel = new TheaterTool.view.tabPanel.CEPanel(),
		this.htPanel = new TheaterTool.view.panel.ViewPanel(),
		
		this.items =[
		this.htToolbar,
		this.htPanel
		]
		
		this.callParent()
	},
	
	setStartMeasure: function (startMeasure) {
		this.startMeasure = startMeasure;
	},
	
	setEndMeasure: function (endMeasure) {
		this.endMeasure = endMeasure;
	},
	
	setStaffNr: function (staffNr) {
		this.staffNr = staffNr;
	},
	
	setMeasureId: function (measureid) {
		this.measureid = measureid;
	},
	
	getStartMeasure: function () {
		return this.startMeasure;
	},
	
	getEndMeasure: function () {
		return this.endMeasure;
	},
	
	getStaffNr: function () {
		return this.staffNr;
	},
	
	getMeasureId: function () {
		return this.measureid;
	},
	
	setVerStartId: function (verStartId) {
		this.verStartId = verStartId;
	},
	
	setVerEndId: function (verEndId) {
		this.verEndId = verEndId;
	},
	
	getVerStartId: function () {
		return this.verStartId;
	},
	
	getVerEndId: function () {
		return this.verEndId;
	},
	
	setCard: function (card) {
		this.card = card;
	},
	
	getCard: function () {
		return this.card;
	},
	
	setComponentType: function (elementName) {
		this.elementName = elementName;
	},
	
	getComponentType: function () {
		return this.elementName;
	},
	
	setAfterSaveText: function (afterSaveText) {
		this.afterSaveText = afterSaveText;
	},
	
	getAfterSaveText: function () {
		return this.afterSaveText;
	}
});