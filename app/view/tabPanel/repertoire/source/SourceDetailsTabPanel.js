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
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,
	
	
	setTextInfo: function (infoText) {
		$('#' + this.id + '-innerCt').html(infoText);
	},
	
	
	initComponent: function () {
		
		this.items =[];
		
		this.callParent();
	},
	
	
	setTitelValue: function (value) {
		
		var me = this;
		
		
		var panel_0 = null;
		for (i = 0; i <= 2; i++) {		
			if (i / 2 === 0 || i / 2 === 1) {
				panel_0 = Ext.create('Ext.panel.Panel', {					
					bodyPadding: 10,
					width: 1000,
					height: 150,
					/* layout: {
					type: 'hbox'
					//align: 'stretch'
					},*/
					layout: {
						type: 'table',
						columns: 2
					},
					border: false,
					//height: 300,
					
					
					items:[]
				});
				me.items.add(panel_0);
			}
			
			me.w_ein_titel = this.createTextField('Einheitstitel');
			me.w_titel = this.createTextField('Titel');
			me.w_alt_titel = this.createTextField('Alternativtitel');
			me.w_unter_titel = this.createTextField('Untertitel');			
			var panel_1 = Ext.create('Ext.Panel', {
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				colspan: 1,
				/*defaults: {
				frame: true,
				bodyPadding: 10
				},*/
				// height: 300,
				width: 400,
				border: false,
				bodyPadding: 10,
				
				items:[
				me.w_ein_titel,
				me.w_titel,
				me.w_alt_titel,
				me.w_unter_titel]
			});
			
			panel_0.items.add(panel_1);
		}
		
		var panel_00 = Ext.create('Ext.panel.Panel', {
			
			bodyPadding: 10,
			width: 1000,
			height: 150,
			/* layout: {
			type: 'hbox'
			//align: 'stretch'
			},*/
			layout: {
				type: 'table',
				columns: 2
			},
			border: false,
			//height: 300,
			
			
			items:[]
		});
		me.items.add(panel_00);
		
		
		me.titel = this.createTextArea('Titel (Quelle)');
		me.language = this.createTextArea('Sprache(n)');
		
		var panel_11 = Ext.create('Ext.Panel', {
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			colspan: 1,
			/*defaults: {
			frame: true,
			bodyPadding: 10
			},*/
			// height: 300,
			width: 1000,
			border: false,
			bodyPadding: 10,
			
			items:[
			me.titel,
			me.language]
		});
		
		panel_00.items.add(panel_11);
		
		this.annot = this.createTextArea('Bemerkungen');
		this.abs = this.createTextArea('Abschriften');
		
		this.sign = this.createTextArea('Bibliotheken');
		this.prov = this.createTextArea('Provienzen');
		
		
		
		//this.items.add(this.titel);
		this.items.add(this.annot);
		this.items.add(this.abs);
		//this.items.add(this.language);
		this.items.add(this.sign);
		this.items.add(this.prov);
		
		this.titel.setValue(value);
	},
	
	
	createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,
			readOnly: true
			//anchor    : '100%'
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			name: fieldName,
			readOnly: true,
			fieldLabel: fieldName
			//anchor    : '100%'
		});
		
		return textArea;
	}
});