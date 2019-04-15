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
    
    htToolbar: null,
    htPanel: null,
    
    initComponent: function () {
        
        this.htToolbar = new TheaterTool.view.toolbar.HTToolbar();
        
        this.htPanel = new TheaterTool.view.panel.ViewPanel(),
        
        this.htToolbar.setViewPanel(this.htPanel);
        
        this.items =[
        this.htToolbar,
        this.htPanel]
        
        this.callParent()
    }
});