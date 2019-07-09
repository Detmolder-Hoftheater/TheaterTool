//Ausgaben
Ext.define('TheaterTool.view.tabPanel.dailyreport.FacsimileView', {
    extend: 'Ext.panel.Panel',
    requires:[
    'TheaterTool.view.tabPanel.dailyreport.LeafletFacsimile'],
    
    flex: 1,
    
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
    imagePath: null,
    
    imageData: null,
    
    height: 650,
    
    initComponent: function () {
        
        var me = this;
        
        me.leafletFacsimile = new TheaterTool.view.tabPanel.dailyreport.LeafletFacsimile({
            margin: '0 0 5 0', imageData: me.imageData
        });
        
        if (me.imageData.length > 1) {
            me.pageSpinner = Ext.create('TheaterTool.view.tabPanel.dailyreport.PageSpinner', {
                leafletFacsimile: me.leafletFacsimile,
                imageData: me.imageData
            });
            me.pageSpinner.setStore(me.imageData.length);
            me.pageSpinner.setPage(1);
            
            this.items =[
            me.leafletFacsimile,
            
            me.pageSpinner];
            
            me.leafletFacsimile.setPageSpinner(me.pageSpinner);
        } else {
            
            this.items =[
            me.leafletFacsimile];
        }
        
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



Ext.define('TheaterTool.view.tabPanel.dailyreport.PageSpinner', {
    extend: 'Ext.container.Container',
    
    layout: 'hbox',
    
    pageID: null,
    
    leafletFacsimile: null,
    
    //selectedWork: null,
    
    imageData: null,
    
    initComponent: function () {
        
        this.items =[];
        this.callParent();
    },
    
    next: function () {
        var newValue = this.combo.getValue() + 1;
        if (this.store.indexOf(newValue) != -1) {
            
            
            this.leafletFacsimile.clear();
            this.leafletFacsimile.loadFacsimile(this.imageData, newValue);
            
            this.setPage(newValue);
        }
    },
    
    prev: function () {
        var newValue = this.combo.getValue() -1;
        if (this.store.indexOf(newValue) != -1) {
            
            this.leafletFacsimile.clear();
            this.leafletFacsimile.loadFacsimile(this.imageData, newValue);
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
                        me.leafletFacsimile.loadFacsimile(this.imageData, combo.getValue());
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
/*Ext.define('TheaterTool.view.tabPanel.issue.FacsimileView', {
extend: 'Ext.panel.Panel',
requires:[
'TheaterTool.view.tabPanel.issue.LeafletFacsimile'],

flex: 1,

layout: {
type: 'vbox',
pack: 'start',
align: 'stretch'
},
region: 'east',

border: true,

pageSpinner: null,

leafletFacsimile: null,

selectedWork: null,
imagePath: null,

initComponent: function () {

var me = this;


me.leafletFacsimile = new TheaterTool.view.tabPanel.issue.LeafletFacsimile({margin: '0 0 5 0', imagePath: me.imagePath})


me.items =[
me.leafletFacsimile



];


this.callParent()
},

getLeafletFacsimile: function(){
return this.leafletFacsimile;
},

getPageSpinner: function(){
return this.pageSpinner;
},

click: function () {
console.log("Click");
}
});



Ext.define('TheaterTool.view.tabPanel.issue.PageSpinner', {
extend: 'Ext.container.Container',

alias: 'widget.verPageSpinner',

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

setPageID: function(pageID){
this.pageID = pageID;
},

setPage: function (id) {
this.combo.setValue(id);
},

setStore: function (test) {

var me = this;

//test=25;

this.removeAll();

var storeField = new Array(test-1);
var value = 1;
for (var i = 0; i <= test-1; i++) {
storeField[i] = value++;
}

this.store = storeField;

this.combo = Ext.create('Ext.form.ComboBox', {
width: 40,
//flex:1,
hideTrigger: true,
queryMode: 'local',
store: this.store,
//fieldLabel: 'Seite',
displayField: 'name',
editable: true,
valueField: 'id',
//cls: 'pageInputBox',
autoSelect: true,
enableKeyEvents: true,
listeners: {
keydown:function (combo, e, eOpts) {
if (e.getKey() == 13) {

me.leafletFacsimile.clear();
me.leafletFacsimile.loadFacsimile(me.pageID, combo.getValue(), this.selectedWork);
me.setPage(combo.getValue());

}
}
}
});

this.add([
{
xtype: 'label',
text: 'Seite',
margin: '3 5 0 5'
},

{
xtype: 'button',
icon: 'resources/images/page-prev-disabled.gif',
margin: '0 5 0 5',


//cls: 'prev toolButton',
listeners: {
scope: this,
click: this.prev
}
},

this.combo,

{
xtype: 'button',
icon: 'resources/images/page-next-disabled.gif',
margin: '0 5 0 5',
//cls: 'next toolButton',
listeners: {
scope: this,
click: this.next
}
},
{
xtype: 'label',
text: 'von '+ test,
margin: '3 5 0 5'
}


]);
}
});


 */