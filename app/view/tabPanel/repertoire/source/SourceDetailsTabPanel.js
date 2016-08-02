/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	
	bodyPadding: 10,
	
	//minHeight: 300,
	//resizable: true,
	//flex:1,
	autoScroll: true,
	//reserveScrollbar: true,
	
	border: false,
	
	titel: null,
	rism: null,
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,
	
	
	/*setTextInfo: function (infoText) {
	$('#' + this.id + '-innerCt').html(infoText);
	},
	 */
	
	/*	initComponent: function () {
	
	this.items =[];
	
	this.callParent();
	},*/
	
	
	setTitelValue: function (value) {
		
		var me = this;
		
		this.titel = this.createTextField('Einheitstitel');
		this.rism = this.createTextField('RISM ID');
		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2
			},
			autoScroll: true,
			border: false,
			//height: 300,
			bodyPadding: 17,
			items:[
			this.titel,
			
			this.rism]
		});
		
		this.items.add(headpanel_1);
		
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Titel Varianten</b>',
			bodyBorder: false,
			
			collapsible: true,
			collapsed: false,
			items:[]
		});
		me.items.add(titel_group);
		
		
		var panel_0 = null;
		
		panel_0 = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 2
				/*tableAttrs: {
				style: {
				width: '100%'
				}
				}*/
			},
			autoScroll: true,
			border: false,
			bodyPadding: 10,
			items:[]
		});
		titel_group.add(panel_0);
		
		for (i = 0; i <= 2; i++) {
			
			me.w_ein_titel = this.createTextField('Einheitstitel');
			me.w_titel = this.createTextField('Titel');
			me.w_alt_titel = this.createTextField('Alternativtitel');
			me.w_unter_titel = this.createTextField('Untertitel');
			
			panel_10 = Ext.create('Ext.panel.Panel', {
				colspan: 1,
				type: 'hbox',
				border: false,
				style: {
					borderBottom: '15px solid #FFFFFF'
				},
				items:[]
			});
			panel_0.add(panel_10);
			
			panel_10.items.add(me.w_ein_titel);
			panel_10.items.add(me.w_titel);
			panel_10.items.add(me.w_alt_titel);
			panel_10.items.add(me.w_unter_titel);
		}
		
		this.abs = this.createTextField('Entstehung');
		var ents_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			bodyPadding: 17,
			items:[]
		});
		
		ents_panel.add(this.abs);
		this.items.add(ents_panel);
		
		
		this.annot = this.createTextArea('Bemerkungen');
		
		
		this.sign = this.createTextArea('Bibliotheken');
		this.prov = this.createTextArea('Provienzen');
		
		var panel_01 = Ext.create('Ext.panel.Panel', {
			
			layout: {
				type: 'table',
				columns: 2
				/*tableAttrs: {
				style: {
				width: '100%'
				}
				}*/
			},
			autoScroll: true,
			border: false,
			//height: 300,
			bodyPadding: 17,
			
			items:[
			this.prov,
			this.sign]
		});
		
		this.items.add(panel_01);
		
		var annot_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			bodyPadding: 17,
			items:[]
		});
		
		annot_panel.add(this.annot);
		this.items.add(annot_panel);
		
		//this.titel.setValue(value);
	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,
			
			//width: 235,
			readOnly: true,
			anchor: '100%',
			style: {
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			}
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			name: fieldName,
			readOnly: true,
			
			style: {
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			},
			//width: 235,
			fieldLabel: fieldName,
			anchor: '100%'
		});
		
		return textArea;
	}
});