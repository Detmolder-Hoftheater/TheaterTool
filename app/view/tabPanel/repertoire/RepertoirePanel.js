/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoirePanel', {
    extend: 'Ext.panel.Panel',
    
    region: 'center',
    flex: 6,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    //bodyPadding: 1,
    
    border: false
    
    
    
    /*	initComponent: function () {
    
    ///this.workPanelDetails = new TheaterTool.view.tabPanel.repertoire.work.workPanelDetails();
    
    
    this.items = [
    
    //this.workPanelDetails
    
    
    
    ]
    this.callParent();
    }*/
});