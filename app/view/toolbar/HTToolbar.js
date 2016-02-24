/**
 * Creates class TheaterTool.view.toolbar.CEToolbar that extend from Ext.panel.Panel.
 * @class
 */
 
 
 
Ext.define('TheaterTool.view.toolbar.HTToolbar', {
	extend: 'Ext.panel.Panel',
	
requires:[
	'Ext.tip.*',
    'Ext.Button',
    'Ext.window.MessageBox'],
    
 // xtype: 'basic-toolbar',
   
	//xtype: 'basic-toolbar',
	//xtype: 'basic-panels',
	//xtype: 'layout-horisontal-box',
	//id: 'cetoolbar',
	
	//bodyPadding: 3,
	//flex:1,
	//height: 35,
	
	//bodyStyle:{"background-color":"red"},
	
	//border: true,
    style: {
     // borderRight: '5px solid #A80016',
      borderLeft: '3px solid #A80016',
      borderTop: '5px solid #A80016',
      borderBottom: '3px solid #A80016'
    },
	bodyBorder: false,
	border: false,
	
	//border: false,
    /*style: {
      borderRight: '5px solid #A80016',
      borderLeft: '5px solid #A80016',
      borderTop: '5px solid #A80016',
      borderBottom: '3px solid #A80016'
    },*/
    
    
    //toolbarBackground:{"color":"#A80016"},
	
	/**
	 * Create buttons and icons.
	 * @overrides
	 */
	initComponent: function () {
	
	/*
		var homeButton = this.createCEBox({
			tag: 'img',  glyph: 72, width: 26,
			height: 26
		},
		this.homeOnItemToggle, true);
		
		
		var tip = Ext.create('Ext.tip.ToolTip', {
    target: 'test',
    html: 'Press this button to clear the form'
});*/
		
		/*sourceButton = this.createCEButton('Source', 'source',[ {
			handler: this.sourceOnItemClick
		}], this.sourceClick);
		movementButton = this.createCEButton('Movement', 'movement',[ {
			handler: this.moveOnItemClick
		}], this.movementClick);
		movementButton.setDisabled(true);
		arrowLeft = this.createCEIcon('arrowL', 'resources/images/page-prev-disabled.gif');
		arrowLeft.setDisabled(true);
		pagesButton = this.createCEButton('Pages', 'pages',[ {
			handler: this.pagesOnItemClick
		}], this.pageClick);
		pagesButton.setDisabled(true);
		arrowR = this.createCEIcon('arrowR', 'resources/images/page-next-disabled.gif');
		arrowR.setDisabled(true);
		saveButton = this.createCEIcon('saveButton', 'resources/images/Save.png', this.saveComponents);
		saveButton.setDisabled(true);
		selectToolButton = this.createCEButton('Control Events', 'controlevents',[ {
			text: 'Pitch Tool'
		},
		{
			text: 'Abbrev Resolver'
		}]);
		loginButton = this.createLoginButton('Login');
		loginButton.setDisabled(true);*/
		
		/*searchField = this.createTextField('Suche', 'Suche');
		searchField.setDisabled(true);*/
		
		//this.tbar =[
		/*homeButton,
		'-',
		sourceButton,
		movementButton,
		//arrowLeft,
		pagesButton,
		//arrowR,
		'-',
		saveButton,
		'->',
		selectToolButton,
		'-',
		loginButton],*/
		
	/*	this.tbar =[
		
    '->',
		{
		html: '<p style="font-family: sans-serif; text-align:center;"><FONT SIZE=3">Detmolder Hoftheater 1825-1875</FONT></p>',
        style:{"background-color":"#A80016"},
       
        bodyBorder: false,
		border: false
		},
		
	'->',	

{
    xtype: 'button',
     text: 'Teiferschlißung',
     scale: 'large',
    //style:{"background-color":"#A80016"},
    tip: 'This is a tip',
    listeners: {
        render: function(c) {
            Ext.create('Ext.tip.ToolTip', {
                target: c.getEl(),
                html: c.tip
            });
        }
    }
},
'-',
{
    xtype: 'button',
     text: 'Fenster anordnen',
     scale: 'large'
     //Desktop 173
    
},
'->'
		],*/
		
		
this.tbar = new Ext.Toolbar({

 style: {
      background: '#A80016'
     
      /*borderRight: '5px solid #A80016',
      borderLeft: '5px solid #A80016',
      borderTop: '5px solid #A80016',
      borderBottom: '3px solid #A80016'*/
    },
  

//border-color:#18181a;
//background-color:#393d4e;

//bodyBackground:{"color":"#A80016"},
	items: [
		{
		html: '<i style="color:#A80016; text-align:center;">la vita di teatro</i>',
        style:{"background-color":"#A87678"}
		},
/*		{ xtype: 'tbseparator',
style: {
      borderRight: '1px solid black',
      borderLeft: '1px solid black'
     // borderTop: '1px solid black',
     // borderBottom: '1px solid black'
    }
},*/
{
    xtype: 'button',
     text: 'Teiferschließung',
   // tip: 'This is a tip',
     menu: [{
                        text:'Aschenbrödel: Isouard',
                        icon: 'resources/images/Books1-17.png'
                    },{
                        text:'Der Bettelstudent: v. Winter',
                        icon: 'resources/images/Books1-17.png'
                    },{
                        text:'Des Teufels Anteil: Auber',
                        icon: 'resources/images/Books1-17.png'
                    }]
   /* listeners: {
        render: function(c) {
            Ext.create('Ext.tip.ToolTip', {
                target: c.getEl(),
                html: c.tip
            });
        }
    }*/
},

{ xtype: 'tbseparator',
style: {
      borderRight: '1px solid #A87678',
      borderLeft: '1px solid #A87678'
     // borderTop: '1px solid black',
     // borderBottom: '1px solid black'
    }
},

{
    xtype: 'button',
     text: 'Tabs anordnen',
   menu: [{
                        text:'Horizontal verteilen',
                        icon: 'resources/images/Horizontal-17.png'
                    },{
                        text:'Vertikal verteilen',
                        icon: 'resources/images/Vertical-17.png'
                    },{
                        text:'Stapeln',
                        icon: 'resources/images/Sheets-17.png'
                    }]
     //Desktop 173
    
}






	




	]
});

		
		
		this.callParent()
	},
	
	/**
	 * Create mandatory text field.
	 * @param {string} fieldName - text name and id.
	 * @param {string} fieldLabel - field label.
	 */
	createTextField: function (fieldName, fieldLabel) {
		var me = this;
		var ceTextField = Ext.create('Ext.form.field.Text', {
			//name: fieldName,
			id: fieldName,
			//width: 285,
			//fieldLabel: fieldLabel,
			listeners: {
				focus: function (e, eOpts) {
					me.handleCreateButton();
				},
				render: function (c) {
					c.getEl().on('keyup', function () {
						me.handleCreateButton();
					},
					c);
				}
			}
		});
		
		return ceTextField;
	},
	
	/**
	 * Handler for save elements.
	 * @param {object} btn: save button.
	 */
	saveComponents: function (btn) {
		var store = TheaterTool.getApplication().getHairpinDataStore();
		var modAndCreateElements = store.getUpdatedRecords();
		var deletedElements = store.getRemovedRecords();
		var modHairpins = modAndCreateElements.concat(deletedElements);
		
		var dynamsStore = TheaterTool.getApplication().getDynamDataStore();
		var modAndCreateDynams = dynamsStore.getUpdatedRecords();
		var deletedDynams = dynamsStore.getRemovedRecords();
		var modDynams = modAndCreateDynams.concat(deletedDynams);
		
		var dirsStore = TheaterTool.getApplication().getDirDataStore();
		var modAndCreateDirs = dirsStore.getUpdatedRecords();
		var deletedDirs = dirsStore.getRemovedRecords();
		var modDirs = modAndCreateDirs.concat(deletedDirs);
		
		var modRecTemp = modHairpins.concat(modDynams);
		
		var modRecords = modRecTemp.concat(modDirs);
		
		var objects = $('<div></div>');
		
		for (var i = 0; i < modRecords.length; i++) {
			// dynams or dirs
			if (modRecords[i].data.type === 'dynam' || modRecords[i].data.type === 'dir') {
				
				var typeElement = null;
				if (modRecords[i].data.type === 'dynam') {
					typeElement = '<dynam></dynam>';
				} else {
					typeElement = '<dir></dir>';
				}
				
				if (modRecords[i].data.obvious) {
					var object = $('<div></div>', {
						id: modRecords[i].data.id,
						operation: modRecords[i].data.operation,
						sourcePath: pagesButton.getText(),
						measureid: modRecords[i].data.measureid
					});
					
					var code = $(typeElement, {
						staff: modRecords[i].data.staff2 !== "" ? modRecords[i].data.staff + ' ' + modRecords[i].data.staff2: modRecords[i].data.staff,
						place: modRecords[i].data.place,
						tstamp: modRecords[i].data.tstamp,
						tstamp2: modRecords[i].data.tstamp2 !== "" ? modRecords[i].data.tstamp2 : null,
						'xml:id': modRecords[i].data.id,
						xmlns: "http://www.music-encoding.org/ns/mei",
						sameas: ""
					});
					if (modRecords[i].data.rend !== '') {
						var rend = $('<rend></rend>', {
							rend: modRecords[i].data.rend
						});
						$(rend).append(modRecords[i].data.form);
						$(code).append($(rend));
					} else {
						$(code).append(modRecords[i].data.form);
					}
					
					$(object).append(code);
					$(objects).append($(object));
				} else {
					var head = $('<div></div>', {
						id: modRecords[i].data.id,
						operation: modRecords[i].data.operation,
						sourcePath: pagesButton.getText(),
						measureid: modRecords[i].data.measureid
					});
					
					
					var choice = $('<choice></choice>', {
						'xml:id': modRecords[i].data.id,
						xmlns: "http://www.music-encoding.org/ns/mei"
					});
					
					for (var j = 0; j < modRecords[i].childNodes.length; j++) {
						if (modRecords[i].childNodes[j].data.tag === 'orig') {
							var orig = $('<orig></orig>');
							var hair = $(typeElement, {
								staff: modRecords[i].childNodes[j].data.staff2 !== '' ? modRecords[i].childNodes[j].data.staff + ' ' + modRecords[i].childNodes[j].data.staff2: modRecords[i].childNodes[j].data.staff,
								place: modRecords[i].childNodes[j].data.place,
								tstamp: modRecords[i].childNodes[j].data.tstamp,
								tstamp2: modRecords[i].childNodes[j].data.tstamp2 !== "" ? modRecords[i].childNodes[j].data.tstamp2 : null,
								sameas: ""
							});
							if (modRecords[i].childNodes[j].data.rend !== '') {
								var rend = $('<rend></rend>', {
									rend: modRecords[i].childNodes[j].data.rend
								});
								$(rend).append(modRecords[i].childNodes[j].data.form);
								$(hair).append($(rend));
							} else {
								$(hair).append(modRecords[i].childNodes[j].data.form);
							}
							
							$(orig).append($(hair));
							$(choice).append($(orig));
						}
						if (modRecords[i].childNodes[j].data.tag === 'reg') {
							var reg = $('<reg></reg>');
							var hair = $(typeElement, {
								staff: modRecords[i].childNodes[j].data.staff2 !== '' ? modRecords[i].childNodes[j].data.staff + ' ' + modRecords[i].childNodes[j].data.staff2: modRecords[i].childNodes[j].data.staff,
								place: modRecords[i].childNodes[j].data.place,
								tstamp: modRecords[i].childNodes[j].data.tstamp,
								tstamp2: modRecords[i].childNodes[j].data.tstamp2 !== "" ? modRecords[i].childNodes[j].data.tstamp2 : null,
								sameas: ""
							});
							if (modRecords[i].childNodes[j].data.rend !== '') {
								var rend = $('<rend></rend>', {
									rend: modRecords[i].childNodes[j].data.rend
								});
								$(rend).append(modRecords[i].childNodes[j].data.form);
								$(hair).append($(rend));
							} else {
								$(hair).append(modRecords[i].childNodes[j].data.form);
							}
							$(reg).append($(hair));
							$(choice).append($(reg));
						}
					}
					$(head).append(choice);
					$(objects).append($(head));
				}
			} else {
				// hairpins
				if (modRecords[i].data.obvious) {
					var object = $('<div></div>', {
						id: modRecords[i].data.id,
						operation: modRecords[i].data.operation,
						sourcePath: pagesButton.getText(),
						measureid: modRecords[i].data.measureid
					});
					var code = $('<hairpin></hairpin>', {
						staff: modRecords[i].data.staff2 !== "" ? modRecords[i].data.staff + ' ' + modRecords[i].data.staff2: modRecords[i].data.staff,
						place: modRecords[i].data.place,
						form: modRecords[i].data.form,
						tstamp: modRecords[i].data.tstamp,
						tstamp2: modRecords[i].data.tstamp2,
						'xml:id': modRecords[i].data.id,
						xmlns: "http://www.music-encoding.org/ns/mei",
						sameas: ""
					});
					$(object).append(code);
					$(objects).append($(object));
				} else {
					var head = $('<div></div>', {
						id: modRecords[i].data.id,
						operation: modRecords[i].data.operation,
						sourcePath: pagesButton.getText(),
						measureid: modRecords[i].data.measureid
					});
					
					
					var choice = $('<choice></choice>', {
						'xml:id': modRecords[i].data.id,
						xmlns: "http://www.music-encoding.org/ns/mei"
					});
					
					for (var j = 0; j < modRecords[i].childNodes.length; j++) {
						if (modRecords[i].childNodes[j].data.tag === 'orig') {
							var orig = $('<orig></orig>');
							var hair = $('<hairpin></hairpin>', {
								staff: modRecords[i].childNodes[j].data.staff2 !== '' ? modRecords[i].childNodes[j].data.staff + ' ' + modRecords[i].childNodes[j].data.staff2: modRecords[i].childNodes[j].data.staff,
								place: modRecords[i].childNodes[j].data.place,
								form: modRecords[i].childNodes[j].data.form,
								tstamp: modRecords[i].childNodes[j].data.tstamp,
								tstamp2: modRecords[i].childNodes[j].data.tstamp2,
								sameas: ""
							});
							
							$(orig).append($(hair));
							$(choice).append($(orig));
						}
						if (modRecords[i].childNodes[j].data.tag === 'reg') {
							var reg = $('<reg></reg>');
							var hair = $('<hairpin></hairpin>', {
								staff: modRecords[i].childNodes[j].data.staff2 !== '' ? modRecords[i].childNodes[j].data.staff + ' ' + modRecords[i].childNodes[j].data.staff2: modRecords[i].childNodes[j].data.staff,
								place: modRecords[i].childNodes[j].data.place,
								form: modRecords[i].childNodes[j].data.form,
								tstamp: modRecords[i].childNodes[j].data.tstamp,
								tstamp2: modRecords[i].childNodes[j].data.tstamp2,
								sameas: ""
							});
							$(reg).append($(hair));
							$(choice).append($(reg));
						}
					}
					$(head).append(choice);
					$(objects).append($(head));
				}
			}
		}
		
		objects = $('<div></div>').append($(objects));
		
		$.ajax({
			url: 'resources/xql/saveMEI.xql',
			type: "POST",
			data: $(objects).html(),
			contentType: "application/xml; charset=utf-8",
			dataType: "xml",
			success: function (result) {
				console.log(result);
				var stringXML = (new XMLSerializer()).serializeToString(result);
				Ext.getCmp('cemain').setAfterSaveText(stringXML);
				var win = new TheaterTool.view.toolbar.AfterSaveDialog();
				win.show();
			}
		});
	},
	
	/**
	 * Listener on source click: add items to source menu.
	 */
	sourceClick: function () {
		if (sourceButton.getText() === 'Source') {
			sourceButton.getMenu().removeAll();
			var app = TheaterTool.getApplication();
			var store = app.getSourcesStore();
			var itemsArray = store.data.items;
			for (var i = 0; i < itemsArray.length; i++) {
				var menuItem = Ext.create('Ext.menu.Item', {
					itemId: itemsArray[i].data.sigle,
					text: itemsArray[i].data.sigle,
					handler: this.sourceOnItemClick
				});
				sourceButton.getMenu().add(menuItem);
			}
		}
	},
	
	/**
	 * Listener on movement click: add items to movement menu.
	 */
	movementClick: function () {
		if (movementButton.getText() === 'Movement') {
			movementButton.getMenu().removeAll();
			var app = TheaterTool.getApplication();
			var store = app.getSourcesStore();
			var itemsArray = store.data.items;
			for (var i = 0; i < itemsArray.length; i++) {
				if (sourceButton.getText() === itemsArray[i].data.sigle) {
					for (var j = 0; j < itemsArray[i].data.mdivs.length; j++) {
						var menuItem = Ext.create('Ext.menu.Item', {
							itemId: itemsArray[i].data.mdivs[j].id,
							text: itemsArray[i].data.mdivs[j].id,
							handler: this.moveOnItemClick
						});
						movementButton.getMenu().add(menuItem);
					}
				}
			}
		}
	},
	
	/**
	 * Listener on page click: add items to page menu.
	 */
	pageClick: function () {
		if (pagesButton.getText() === 'Pages') {
			pagesButton.getMenu().removeAll();
			var app = TheaterTool.getApplication();
			var store = app.getSourcesStore();
			var itemsArray = store.data.items;
			
			this.pageMeasuresMap = new Object();
			this.staffNr = new Object();
			
			for (var i = 0; i < itemsArray.length; i++) {
				if (sourceButton.getText() === itemsArray[i].data.sigle) {
					for (var j = 0; j < itemsArray[i].data.mdivs.length; j++) {
						if (movementButton.getText() === itemsArray[i].data.mdivs[j].id) {
							for (var k = 0; k < itemsArray[i].data.mdivs[j].pages.length; k++) {
								var key = itemsArray[i].data.mdivs[j].pages[k].id;
								this.pageMeasuresMap[key] = itemsArray[i].data.mdivs[j].pages[k].measures;
								this.staffNr[key] = itemsArray[i].data.mdivs[j].pages[k].staffs;
								var menuItem = Ext.create('Ext.menu.Item', {
									itemId: itemsArray[i].data.mdivs[j].pages[k].id,
									text: itemsArray[i].data.mdivs[j].pages[k].id,
									handler: this.pagesOnItemClick
								});
								pagesButton.getMenu().add(menuItem);
							}
						}
					}
				}
			}
		}
	},
	
	/**
	 * Handler for selection menu item on source button
	 * @param {object} item: selected source item.
	 */
	sourceOnItemClick: function (item) {
		sourceButton.setText(item.text);
		movementButton.setDisabled(false);
		
		if (movementButton.getText() !== 'Movement') {
			movementButton.setText('Movement');
		}
		if (pagesButton.getText() !== 'Pages') {
			pagesButton.setText('Pages');
		}
		pagesButton.setDisabled(true);
		arrowLeft.setDisabled(true);
		arrowR.setDisabled(true);
		/*  if(!saveButton.isDisabled()){
		// TODO
		alert('save?')
		saveButton.setDisabled(true);
		}
		 */
		 if (typeof Ext.getCmp('facsimileview') !== 'undefined') {
			Ext.getCmp('cepanel').remove('facsimileview');
		}
		if (typeof Ext.getCmp('verovioview') !== 'undefined') {
			Ext.getCmp('hairpinsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('dynamsxmlview') !== 'undefined') {
			Ext.getCmp('dynamsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('dirsxmlview') !== 'undefined') {
			Ext.getCmp('dirsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('slursxmlview') !== 'undefined') {
			Ext.getCmp('slursitem').removeAll(true);
		}
	},
	
	/**
	 * Handler for selection menu item on movement button
	 * @param {object} item: selected movement item.
	 */
	moveOnItemClick: function (item) {
		movementButton.setText(item.text);
		pagesButton.setDisabled(false);
		/*  if(!saveButton.isDisabled()){
		// TODO
		alert('save?')
		saveButton.setDisabled(true);
		} */
		
		if (pagesButton.getText() !== 'Pages') {
			pagesButton.setText('Pages');
		}
		
		if (typeof Ext.getCmp('facsimileview') !== 'undefined') {
			Ext.getCmp('cepanel').remove('facsimileview');
		}
		if (typeof Ext.getCmp('verovioview') !== 'undefined') {
			Ext.getCmp('hairpinsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('dynamsxmlview') !== 'undefined') {
			Ext.getCmp('dynamsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('dirsxmlview') !== 'undefined') {
			Ext.getCmp('dirsitem').removeAll(true);
		}
		if (typeof Ext.getCmp('slursxmlview') !== 'undefined') {
			Ext.getCmp('slursitem').removeAll(true);
		}
	},
	
	/**
	 * Handler for selection menu item on page button.
	 * Create views and tree table.
	 * @param {object} item: selected page item.
	 */
	pagesOnItemClick: function (item) {
		pagesButton.setText(item.text);
		arrowLeft.setDisabled(false);
		arrowR.setDisabled(false);
		
		var app = TheaterTool.getApplication();
		
		// create facsimile view and load facsimile
		if (typeof Ext.getCmp('facsimileview') !== 'undefined') {
			Ext.getCmp('cepanel').remove('facsimileview');
		}
		facsimileView = new TheaterTool.view.facsimileView.FacsimileView();
		Ext.getCmp('cepanel').add(facsimileView);
		
		// create editor for hairpins and load
		if (typeof Ext.getCmp('verovioview') !== 'undefined') {
			Ext.getCmp('hairpinsitem').removeAll(true);
		}
		verovioView = new TheaterTool.view.tabPanel.hairpins.HairpinsButtonPanel();
		controllsView = new TheaterTool.view.tabPanel.hairpins.HairpinsGridPanel();
		xmlView = new TheaterTool.view.tabPanel.XMLView({
			id: 'xmleditorview'
		});
		Ext.getCmp('hairpinsitem').add(controllsView);
		Ext.getCmp('hairpinsitem').add(verovioView);
		Ext.getCmp('hairpinsitem').add(xmlView);
		
		var store = app.getHairpinDataStore();
		store.getProxy().extraParams.path = item.text;
		store.load();
		Ext.getCmp('cegridpanel').getView().bindStore(store);
		
		// dynams
		if (typeof Ext.getCmp('dynamsxmlview') !== 'undefined') {
			Ext.getCmp('dynamsitem').removeAll(true);
		}
		dynamsView = new TheaterTool.view.tabPanel.dynams.DynamsGridPanel();
		Ext.getCmp('dynamsitem').add(dynamsView);
		
		dynamsButtons = new TheaterTool.view.tabPanel.dynams.DynamsButtonsPanel();
		Ext.getCmp('dynamsitem').add(dynamsButtons);
		
		dynamsXmlView = new TheaterTool.view.tabPanel.XMLView({
			id: 'dynamsxmlview'
		});
		Ext.getCmp('dynamsitem').add(dynamsXmlView);
		var dynamsStore = app.getDynamDataStore();
		dynamsStore.getProxy().extraParams.path = item.text;
		dynamsStore.load();
		Ext.getCmp('dynamsgridpanel').getView().bindStore(dynamsStore);
		
		// dirs
		if (typeof Ext.getCmp('dirsxmlview') !== 'undefined') {
			Ext.getCmp('dirsitem').removeAll(true);
		}
		dirsView = new TheaterTool.view.tabPanel.dirs.DirsGridPanel();
		Ext.getCmp('dirsitem').add(dirsView);
		
		dirsButtons = new TheaterTool.view.tabPanel.dirs.DirsButtonsPanel();
		Ext.getCmp('dirsitem').add(dirsButtons);
		
		dirsXmlView = new TheaterTool.view.tabPanel.XMLView({
			id: 'dirsxmlview'
		});
		Ext.getCmp('dirsitem').add(dirsXmlView);
		var dirsStore = app.getDirDataStore();
		dirsStore.getProxy().extraParams.path = item.text;
		dirsStore.load();
		Ext.getCmp('dirsgridpanel').getView().bindStore(dirsStore);
		
		// slurs
		if (typeof Ext.getCmp('slursxmlview') !== 'undefined') {
			Ext.getCmp('slursitem').removeAll(true);
		}
		sursView = new TheaterTool.view.tabPanel.slurs.SlursGridPanel();
		Ext.getCmp('slursitem').add(sursView);
		
		slursButtons = new TheaterTool.view.tabPanel.slurs.SlursButtonPanel();
		Ext.getCmp('slursitem').add(slursButtons);
		
		slursXmlView = new TheaterTool.view.tabPanel.XMLView({
			id: 'slursxmlview'
		});
		Ext.getCmp('slursitem').add(slursXmlView);
		var slursStore = app.getSlurDataStore();
		slursStore.getProxy().extraParams.path = item.text;
		slursStore.load();
		Ext.getCmp('slursgridpanel').getView().bindStore(slursStore);
	},
	
	/**
	 * Handler for get freischuetz home page
	 */
	homeOnItemToggle: function () {
		window.location.href = "http://freischuetz-digital.de";
	},
	
	/**
	 * Create button with menu
	 * @param {string} ceSource: name.
	 * @param {string} ceId.
	 * @param {object} ceMenu.
	 * @param {object} ceHandler.
	 */
	createCEButton: function (ceSource, ceId, ceMenu, ceHandler) {
		var ceButton = Ext.create('Ext.button.Button', {
			xtype: 'button',
			text: ceSource,
			id: ceId,
			scope: this,
			menu: ceMenu,
			scale: 'medium',
			handler: ceHandler
		});
		
		return ceButton;
	},
	
	/**
	 * Create login button
	 * @param {string} ceSource: name.
	 */
	createLoginButton: function (ceSource) {
		var ceButton = Ext.create('Ext.button.Button', {
			xtype: 'button',
			scale: 'medium',
			text: ceSource
		});
		
		return ceButton;
	},
	
	/**
	 * Create button-icon
	 * @param {string} ceId.
	 * @param {string} ceIcon: icon path.
	 * @param {object} ceHandler.
	 */
	createCEIcon: function (ceId, ceIcon, ceHandler) {
		var ceIcon = Ext.create('Ext.button.Button', {
			id: ceId,
			icon: ceIcon,
			scale: 'medium',
			handler: ceHandler
		});
		return ceIcon;
	},
	
	/**
	 * Create button
	 * @param {object} ceAutoEl: icon.
	 * @param {object} ceOnItemToggle: handler.
	 * @param {boolean} ceEnableToggle.
	 */
	createCEBox: function (ceAutoEl, ceOnItemToggle, ceEnableToggle) {
		var ceBox = Ext.create('Ext.button.Button', {
			autoEl: ceAutoEl,
			id: 'test',
			enableToggle: ceEnableToggle,
			toggleHandler: ceOnItemToggle
		});
		return ceBox;
	}
});