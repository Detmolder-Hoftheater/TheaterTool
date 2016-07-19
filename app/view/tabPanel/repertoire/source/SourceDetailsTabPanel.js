/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel', {
	extend: 'Ext.panel.Panel',
	
 minHeight: 300,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

border: false,

titel: null,

	setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	},


	initComponent: function () {
	
	this.titel = this.createTextArea('Titel');

	this.items = [
		this.titel
	];
		
		this.callParent();
	},


	setTitelValue: function(value){
		this.titel.setValue(value);

	},


	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name      : fieldName,
        	fieldLabel: fieldName,
        	anchor    : '100%'			
		});
		
		return textArea;
	}
});