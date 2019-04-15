Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileView', {
    extend: 'Ext.panel.Panel',
    requires:[
    'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 6,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    border: false,
   
    pageSpinner: null,
    
    leafletFacsimile: null,
    
    selectedWork: null,
    xmlId: null,
    
    initComponent: function () {
        
        var me = this;
       
        me.leafletFacsimile = new TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile({
            margin: '0 0 5 0', voiceID: me.xmlId, number: 1, selectedWork: me.selectedWork
        })
        
        me.pageSpinner = Ext.create('TheaterTool.view.tabPanel.repertoire.beat.PageSpinner', {
            leafletFacsimile: me.leafletFacsimile,
            selectedWork: me.selectedWork
        });
       
        this.items =[
        
        me.leafletFacsimile,
        
        me.pageSpinner];
               
        me.leafletFacsimile.setPageSpinner(me.pageSpinner);
        
        this.callParent()
    },
    
    getLeafletFacsimile: function () {
        return this.leafletFacsimile;
    },
    
    getPageSpinner: function () {
        return this.pageSpinner;
    },
    
    click: function () {
        console.log("Click");
    }
});



Ext.define('TheaterTool.view.tabPanel.repertoire.beat.PageSpinner', {
    extend: 'Ext.container.Container',
    
    alias: 'widget.verovioPageSpinner',
    
    layout: 'hbox',
    
    pageID: null,
    
    leafletFacsimile: null,
    
    selectedWork: null,
    
    initComponent: function () {
        
        this.items =[];
        this.callParent();
    },
    
    next: function () {
        var newValue = this.combo.getValue() + 1;
        if (this.store.indexOf(newValue) != -1) {
            
            
            this.leafletFacsimile.clear();
            this.leafletFacsimile.loadFacsimile(this.pageID, newValue, this.selectedWork);
            
            this.setPage(newValue);
        }
    },
    
    prev: function () {
        var newValue = this.combo.getValue() -1;
        if (this.store.indexOf(newValue) != -1) {
            
            this.leafletFacsimile.clear();
            this.leafletFacsimile.loadFacsimile(this.pageID, newValue, this.selectedWork);
            this.setPage(newValue);
        }
    },
    
    setPageID: function (pageID) {
        this.pageID = pageID;
    },
    
    setPage: function (id) {
        this.combo.setValue(id);
    },
    
    setStore: function (test) {
        
        var me = this;
        
        this.removeAll();
        
        var storeField = new Array(test -1);
        var value = 1;
        for (var i = 0; i <= test -1; i++) {
            storeField[i] = value++;
        }
        
        this.store = storeField;
        
        this.combo = Ext.create('Ext.form.ComboBox', {
            width: 40,
            hideTrigger: true,
            queryMode: 'local',
            store: this.store,
            displayField: 'name',
            editable: true,
            valueField: 'id',
            autoSelect: true,
            enableKeyEvents: true,
            listeners: {
                keydown: function (combo, e, eOpts) {
                    if (e.getKey() == 13) {
                        
                        me.leafletFacsimile.clear();
                        me.leafletFacsimile.loadFacsimile(me.pageID, combo.getValue(), this.selectedWork);
                        me.setPage(combo.getValue());
                    }
                }
            }
        });
        
        this.add([ {
            xtype: 'label',
            text: 'Seite',
            margin: '3 5 0 5'
        }, {
            xtype: 'button',
            icon: 'resources/images/page-prev-disabled.gif',
            margin: '0 5 0 5',
            listeners: {
                scope: this,
                click: this.prev
            }
        },
        
        this.combo, {
            xtype: 'button',
            icon: 'resources/images/page-next-disabled.gif',
            margin: '0 5 0 5',
            listeners: {
                scope: this,
                click: this.next
            }
        }, {
            xtype: 'label',
            text: 'von ' + test,
            margin: '3 5 0 5'
        }]);
    }
});