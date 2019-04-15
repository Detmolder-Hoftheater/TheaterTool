Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree', {
    extend: 'Ext.tree.Panel',
    requires:[
    'Ext.tree.*',
    'TheaterTool.model.FacsimileNavigation'],
    
    reserveScrollbar: true,
    
    useArrows: true,
    rootVisible: false,
    
    bodyPadding: 5,
    
    header: false,
    
    flex: 1,
    border: true,
    
    leafletFacsimile: null,
    pageSpinner: null,
    
    tabPanel: null,
    
    border: true,
    bodyborder: false,
    bodyPadding: 3,
    
    pageNumber: null,
    
    selectedWork: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.listeners = {
            
            itemclick: function (record, item, index, e, eOpts) {
                console.log(record);
                console.log(item);
                console.log(index);
                console.log(e);
                console.log(eOpts);
                me.leafletFacsimile.clear();
                me.leafletFacsimile.loadFacsimile(item.data.xmlid, 1, me.selectedWork);
                var number = me.leafletFacsimile.getPageNumber();
                me.pageSpinner.setStore(number);
                me.pageSpinner.setPage(1);
                me.pageSpinner.setPageID(item.data.xmlid);
            }
        };
        
        me.columns =[ {
            xtype: 'treecolumn',
            header: '<b style="color:gray;">Partituren und Stimmen</b>',
            flex: 1,          
            menuDisabled: true,
            dataIndex: 'name'
        }
       
        ];
        
        me.callParent();
    },
    
    setLeafletFacsimile: function (leafletFacsimile) {
        this.leafletFacsimile = leafletFacsimile;
    },
    
    setPageSpinner: function (pageSpinner) {
        this.pageSpinner = pageSpinner;
    }
});