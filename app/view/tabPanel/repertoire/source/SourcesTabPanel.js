Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTabPanel', {
    extend: 'Ext.tab.Panel',
    
    //autoScroll: true,
    
    
    flex: 1,
    border: false,
    
    //bodyPadding:15,
    
    personSection: null,
    detailSection: null,
    sourcesSection: null,
    overviewSection: null,
    detailSection_xml: null,
    
    sourceID: null,
    werkTitle: null,
    firstTabTitle: null,
    
    //headerPosition: 'right',
    
    /*  header:{
    style: {
    backgroundColor:'#FFFFFF',
    backgroundImage:'none',
    borderBottom: '5px solid #F2EEE1'
    }
    },*/
    
    tabBar: {
        style: {
            background: 'white'
            // backgroundImage:'none'
            //borderBottom: '3px solid #A80016'
        }
    },
    cls: 'navigationTabPanel1',
    /*bodyCls: 'navigationTabPanelBody',*/
    
    initComponent: function () {
        
        var me = this;
        
        
        /*var app = TheaterTool.getApplication();
        var sourceStore = app.createStoreForSource();
        sourceStore.getProxy().extraParams.sourceID = this.sourceID;
        sourceStore.load();*/
        
        //this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({
            sourceID: me.sourceID, title: '<b style="color:gray;">' + me.firstTabTitle + '</b>'
        });
        
        me.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({
            sourceID: me.sourceID
        });
        
        
        me.items =[
        me.detailSection,
        me.sourcesSection]
        
        me.detailSection.setTitelValue();
        me.sourcesSection.createContent();
        
        /*me.listeners = {
        render: function () {
        //if (Ext.browser.is('Firefox')) {
        me.items.each(function (itm, idx) {
        itm.tab.on('focus', function (tab) {
        var tabpanel = tab.up('HoftheaterDetmold');
        tabpanel.setActiveTab(idx);
        });
        });
        //}
        }
        };*/
        
        me.listeners = {
            render: function () {
                //if (Ext.browser.is('Firefox')) {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        //var tabpanel = tab.up('HoftheaterDetmold');
                        me.setActiveTab(idx);
                    });
                });
                //}
            }
            /*afterrender: function (panel) {
            var bar = panel.tabBar;
            bar.insert(2, {
            xtype: 'component',
            flex: 1
            });
            bar.insert(3, {
            xtype: 'button',
            text: '<font size="1" face="Tahoma" style="color:#909090;">XML ansehen</font>',
            //  style: 'background:white;',
            style: 'background:white;border:red;',
            // margin: '0 3 0 5',
            listeners: {
            click: function (item, e, eOpts) {
            
            Ext.Ajax.request({
            
            url:'resources/xql/getXML.xql',
            method: 'GET',
            params: {
            uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
            type: 'source'
            },
            success: function (response) {
            
            
            var testText = response.responseXML;
            
            var tempDiv = document.createElementNS('http://www.music-encoding.org/ns/mei', 'div');
            var personArr = testText.getElementsByTagName('source');
            tempDiv.appendChild(personArr[0]);
            
            var tmp = hljs.highlightAuto($(tempDiv).html()).value;
            var htmlVersion = '<pre>' + tmp + '</<pre>';
            
            var win = new Ext.window.Window({
            title: '<font style="color:gray;">XML for ' + me.title+'</font>',
            html: htmlVersion,
            icon: me.workIcon,
            bodyStyle:{"background-color":"white"},
            height: 600,
            width: 800,
            autoScroll: true,
            bodyPadding: 10
            });
            win.show();
            
            }
            });
            
            }
            }
            });
            
            bar.insert(4, {
            xtype: 'button',
            
            /\*text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',*\/
            text: '<font size="1" face="Tahoma" style="color:#909090;">XML laden</font>',
            //style: 'background:white;',
            
            listeners: {
            click: function (item, e, eOpts) {
            
            Ext.Ajax.request({
            
            url:'resources/xql/getXML.xql',
            method: 'GET',
            params: {
            uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
            type: 'source'
            },
            success: function (response) {
            var xmltext = response.responseText;
            
            var pom = document.createElement('a');
            
            var filename = me.sourceID +".xml";
            var pom = document.createElement('a');
            var bb = new Blob([xmltext], {type: 'text/plain'});
            
            pom.setAttribute('href', window.URL.createObjectURL(bb));
            pom.setAttribute('download', filename);
            
            pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
            pom.draggable = true;
            pom.classList.add('dragout');
            
            //apply the click on to download the file
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
            
            }
            });
            
            }
            }
            });
            
            
            }
             */
        }
        
        
        /*this.on({
        delegate: 'tab',
        tap: function(tab) {
        console.log(tab.getText());
        }
        });*/
        
        
        
        /*this.listeners = {
        render: function() {
        this.items.each(function(i){
        i.tab.on('itemclick', function(){
        console.log(i.title);
        });
        });
        }
        }*/
        
        /*this.listeners = {
        render: function() {
        this.items.each(function(panel){
        // Added tabclick event for tabpanel
        panel.tab.on('click', function(){
        console.log(panel.title);
        // panel.addEvents('tabclick');  // addded event to panel
        // panel.fireEvent('tabclick', panel);
        });
        });
        }
        }*/
        me.callParent();
    }
});
/*/\**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 *\/
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
//extend: 'Ext.panel.Panel',

extend: 'Ext.tab.Panel',

xtype: 'navigation-tabs',

ui: 'navigation',
/\* tabBar: {
layout: {
pack: 'center'
},
// turn off borders for classic theme.  neptune and crisp don't need this
// because they are borderless by default
border: false
},*\/

/\*defaults: {
iconAlign: 'top',
bodyPadding: 15
},*\/



/\*defaults: {
autoScroll: true

},
 *\/
personSection: null,
detailSection: null,
overviewSection: null,
detailSection_xml: null,
//flex:1,

/\*layout: {
type: 'vbox',
pack: 'start',
align: 'stretch'
},*\/

//bodyPadding: 15,

/\*defaults: {
frame: true

},*\/

border: false,
//bodyPadding: 15,
sourceID: null,
werkTitle: null,



initComponent: function () {

var me = this;

me.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID});

me.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSectionXML({sourceID: this.sourceID});

if(storeField.indexOf(this.werkTitle) > -1){
me.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
}

me.tbar =  new Ext.Toolbar({
/\*layout: {
pack: 'center'
},*\/
/\*style: {
background: '#FFFFFF'
},*\/
height: 33,
layout: {
pack: 'center'
},
// turn off borders for classic theme.  neptune and crisp don't need this
// because they are borderless by default
border: false,
// items: [{
//xtype: 'segmentedbutton',


items : [{
text: 'Detail',
listeners: {

click: function (item, e, eOpts) {

me.detailSection.show();
me.detailSection.setDisabled(false);
me.detailSection_xml.setDisabled(true);
}
}
//glyph: 72
/\* html: 'TEST1'*\/
}, {
text: 'XML',
listeners: {

click: function (item, e, eOpts) {

me.detailSection_xml.show();
me.detailSection.setDisabled(true);
me.detailSection_xml.setDisabled(false);
}
}
//glyph: 117
/\*html: 'TEST2'*\/
}
]
});

if(this.overviewSection !== null){
this.items = [
/\*{
xtype: 'label',
html: '<b style="color:gray;">Übericht</b>',
margin: '0 0 10 0'

},*\/

this.detailSection,
/\*{
html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
border: false,
margin: '0 0 -11 0'
},*\/
this.detailSection_xml,
this.overviewSection
]
}
else{
this.items = [

this.detailSection,
this.detailSection_xml
/\*{
html: '<img src="resources/images/Download.png" style="width:17px;height:17px;">',
border: false,
margin: '0 0 -11 0'
},*\/


]
}
this.callParent();
}
});*/