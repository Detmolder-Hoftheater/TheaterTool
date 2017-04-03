Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesSection', { 
 extend: 'Ext.panel.Panel',
   
/*border: true,
	flex:1,
bodyBorder: true,
autoScroll: true,*/

    title: '<b style="color:gray;">Details</b>',
    
    layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	autoScroll: true,
	border: true,
//bodyPadding:10,
flex:1,
    
	sourceID: null,
	
	titel: null,
	medium: null,
	zustand: null,
	personen: null,
	schreiber: null,
	annot: null,
	abs: null,
	language: null,
	sign: null,
	prov: null,
	
	w_ein_titel: null,
	w_titel: null,
	w_alt_titel: null,
	w_unter_titel: null,
	inventar: null,
	persStore: null,
	overview: null,
	
	source_group: null,

    createContent: function() {

	var me = this;
  Ext.Ajax.request({
				 url: 'resources/xql/getSourceDetails.xql',
				async: false,
				method: 'GET',
				params: {
					sourceID: me.sourceID
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					
					var source_list = json.sources;
					console.log(source_list);



var tableTest = new TheaterTool.view.tabPanel.repertoire.source.SourcesTree({source_list: source_list});
tableTest.setTablePanel(me);
me.add(tableTest);


me.source_group = Ext.create('Ext.panel.Panel', {
			flex:2.5,
border:false,
bodyPadding:15,
autoScroll: true,
			items:[]
		});
		me.add(me.source_group);
        }
			});
        },
        
      
        createTextArea: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.TextArea', {
			name: fieldName,
			fieldLabel: fieldName,		
			readOnly: true,
			//anchor: '100%',
			style: {
				width: '100%'			
				//borderLeft: '5px solid gray',
			}
		});
		
		return textArea;
	},
	
	createTextField: function (fieldName) {
		var me = this;
		var textArea = Ext.create('Ext.form.field.Text', {
			name: fieldName,
			readOnly: true,
			
			// remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
			
			style: {
				width: '100%',
				borderLeft: '5px solid #FFFFFF'
			},
			
			fieldLabel: fieldName,
			anchor: '100%'
		});
		
		return textArea;
	},

setValues: function(selectedSource){
var me = this;
me.source_group.removeAll(true);


me.source_group.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Allgemeine Information</b>',
                        margin: '10 0 10 0'
                    });

/*var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Allgemeine Information</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '0 0 10 0'
		});
		me.source_group.add(info_group);*/
		
		var all_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '10 0 0 10',
			items:[]
		});
        me.source_group.add(all_panel);
        
		me.prov = me.createTextArea('Inhalt');
		//me.prov.setHeight(150);
		all_panel.add(me.prov);
		if(typeof selectedSource[0].data.inhalt !== 'undefined'){
	var inhaltText = '';
	for(i = 0; i < selectedSource[0].data.inhalt.length; i++){
	  inhaltText += selectedSource[0].data.inhalt[i]+'\n'

	}
	this.prov.setValue(inhaltText);
        }
		
		me.annot = me.createTextArea('Anmerkungen');		
		//me.annot.setHeight(200);
		all_panel.add(me.annot);
        if(typeof selectedSource[0].data.s_bemerkungen !== 'undefined'){
	var bem = '';
	for(i = 0; i < selectedSource[0].data.s_bemerkungen.length; i++){
	  bem += selectedSource[0].data.s_bemerkungen[i]+'\n\n'

	}
	this.annot.setValue(bem);
    }
		
        me.language = me.createTextField('Sprache(n)');
        all_panel.add(me.language);
        if(typeof selectedSource[0].data.sprache !== 'undefined'){
	var spr = '';
	for(i = 0; i < selectedSource[0].data.sprache.length; i++){
	  spr += selectedSource[0].data.sprache[i]+'\n'

	}
	this.language.setValue(spr);
}
       
        /*var info_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Geschichte</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		me.source_group.add(info_group);*/
		
		var hist_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 0 0 10',
			items:[]
		});
        me.source_group.add(hist_panel);
		
		me.abs = me.createTextField('Entstehung');
		hist_panel.add(me.abs);
		this.abs.setValue(selectedSource[0].data.creation);
		
		me.overview = me.createTextArea('Beschreibung');
        hist_panel.add(me.overview);
        this.overview.setValue(selectedSource[0].data.hoverview);

        me.source_group.add({
                        
                        xtype: 'label',
                        html: '<img src="resources/images/Time-17.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Aufführungen</b>',
                        margin: '10 0 10 0'
                    });
                    
                     var eventsTable = new TheaterTool.view.tabPanel.repertoire.EventsTable({
                        eventList: selectedSource[0].data.events
                    });
                    
                    var left_panel_11 = Ext.create('Ext.panel.Panel', {
                        //colspan: 1,
                        //type: 'hbox',
                        border: false,
                        margin: '10 10 0 10',
                        //type: 'fit',
                        //bodyPadding: 10,
                        items:[
                        
                        eventsTable]
                    });
                    
                    me.source_group.add(left_panel_11);
        
        
		//me.sign = new TheaterTool.view.tabPanel.repertoire.EventsTable({eventList: selectedSource[0].data.events});
		//me.createTextArea('Aufführungen');
		//hist_panel.add(me.sign);
		if(selectedSource[0].data.inscription.length >0){
me.source_group.add({                      
                        xtype: 'label',
                        html: '<img src="resources/images/Mask-19.png" style="vertical-align:middle;"><b style="color:gray; font-size: 12px;">Personen</b>',
                        margin: '10 0 10 0'
                    });
                    


		for(i = 0; i < selectedSource[0].data.inscription.length; i++){

                        var autor = selectedSource[0].data.inscription[i];                      
                        var autorName = autor[0];                        
                       var dbkey = autor[1];
                        var name = null;
                        if(dbkey !== ''){
                            getPersonContent = function (personId, personName) {
                                    var toolBarGlobal = Ext.getCmp('toolbar');
                                    var historyButton = Ext.getCmp('historyButton');
                                    // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
                                    //if(!isHistoryItemExist){
                                    var menuItem = historyButton.menu.add({
                                        text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                                    });
                                    
                                    //}
                                    
                                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                                    var existItems = navTreeGlobal.items;
                                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                                    if (! isFoundItem) {
                                        
                                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                            title: '<font style="color:gray;">' + personName + '</font>',
                                            icon: 'resources/images/Mask-19.png'
                                        });
                                        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                                            dbkey: personId, icon: 'resources/images/Mask-19.png'
                                        });
                                        personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
                                        repertoireTab.add(personDetails);
                                        
                                        repertoireTab.setActiveMenuItemId(menuItem.id);
                                        repertoireTab.setMenuAdded(true);
                                        
                                        navTreeGlobal.add(repertoireTab);
                                        navTreeGlobal.setActiveTab(repertoireTab);
                                        navTreeGlobal.fireEvent('render', navTreeGlobal);
                                    }
                                };
                            name ={
                            xtype: 'displayfield',
                           // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                            value: '<span><a href="javascript:getPersonContent(\'' + dbkey + '\'' + ', \'' + autorName + '\');">' + autorName + '</a></span>'
                      };
                        }
                        else{
                            name ={
                            xtype: 'displayfield',
                           // fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + persRole + '</b></font>',
                            value: '<span>' + autorName + '</span>'
                      };
                        }
                      
                       var left_panel_1 = Ext.create('Ext.panel.Panel', {
                            colspan: 1,
                            // type: 'vbox',
                            border: false,
                            bodyBorder: false,
                            // bodyPadding: 10,
                            margin: '10 0 10 20',
                            //margin: '0 0 0 5',
                            items:[
                            name
                            ]
                        });
                                    
                    me.source_group.add(left_panel_1);
                    }

}
	
       /* var phys_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Physikalische Daten</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true,
			margin: '10 0 10 0'
		});
		me.source_group.add(phys_group);*/
		
		me.source_group.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">Physikalische Daten</b>',
                        margin: '10 0 10 0'
                    });
		
		var phys_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '10 0 0 10',
			items:[]
		});
 me.source_group.add(phys_panel);
		/*var titel_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '0 10 0 10',
			items:[]
		});
        me.source_group.add(titel_panel);*/

me.titel = me.createTextArea('Titelseite(n)');
phys_panel.add(me.titel);
if(typeof selectedSource[0].data.titlePages !== 'undefined'){
	var pages = '';
	for(i = 0; i < selectedSource[0].data.titlePages.length; i++){
	  pages += selectedSource[0].data.titlePages[i]+'\n'

	}
	this.titel.setValue(pages);
}



 
me.medium = me.createTextArea('Umschlag');
this.medium.setValue(selectedSource[0].data.medium);
phys_panel.add(me.medium);

me.schreiber = me.createTextArea('Schreiber');
//me.schreiber.setHeight(100);
if(typeof selectedSource[0].data.schreiber !== 'undefined'){
	var schr = '';
	for(i = 0; i < selectedSource[0].data.schreiber.length; i++){
	 if(i === selectedSource[0].data.schreiber.length-1){
	     schr += selectedSource[0].data.schreiber[i];
	 }
	 else{
	     schr += selectedSource[0].data.schreiber[i]+'; ';
	 }
	}
	this.schreiber.setValue(schr);
}
phys_panel.add(me.schreiber);

me.zustand = me.createTextArea('Zustand');
this.zustand.setValue(selectedSource[0].data.condition);
phys_panel.add(me.zustand);

me.inventar = me.createTextField('Inverntarnummer');
this.inventar.setValue(selectedSource[0].data.inventarnummer);
phys_panel.add(me.inventar);

me.w_ein_titel = me.createTextField('Umfang');
this.w_ein_titel.setValue(selectedSource[0].data.seitenzahl);
phys_panel.add(me.w_ein_titel);

me.w_titel = me.createTextField('Format');
this.w_titel.setValue(selectedSource[0].data.groesse);
phys_panel.add(me.w_titel);

// TODO: not coded in XML
//me.w_alt_titel = me.createTextField('Stempel');	
			
			/*var panel_10 = Ext.create('Ext.panel.Panel', {				
				//type: 'hbox',
				border: false,
				items:[]
			});
panel_10.items.add(me.medium);			
panel_10.items.add(me.schreiber);

var panel_110 = Ext.create('Ext.panel.Panel', {
				
				//type: 'hbox',
				border: false,
				items:[]
			});

			
panel_110.items.add(me.zustand);
panel_110.items.add(me.inventar);
panel_110.items.add(me.w_ein_titel);
panel_110.items.add(me.w_titel);
panel_110.items.add(me.w_alt_titel);

		var headpanel_1 = Ext.create('Ext.panel.Panel', {
			margin: '0 0 0 10',
			layout: {
				type: 'table',
				columns: 1
			},
			autoScroll: true,
			border: false,
			
			items:[
panel_10,
panel_110
]


		});
		
		me.source_group.add(headpanel_1);
*/

}


});