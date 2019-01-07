Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    border: false,
    
    navButton: null,
    selection: null,
    
    initComponent: function () {
        var me = this;
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree();
        var navTreeStore = new TheaterTool.store.work.ExtWork();
        navTreeStore.getProxy().extraParams.workName = this.selection;
        navTreeStore.getProxy().extraParams.dbsourcePath = dbPathsMap.get('sources');
        navTreeStore.getProxy().extraParams.dbPath = dbPathsMap.get('works');
        navTreeStore.getProxy().extraParams.dbexpPath = dbPathsMap.get('expressions');
        navTreeStore.load();       
        navTree.getView().bindStore(navTreeStore);
        navTree.setRepertoirePanel(me);
        navTree.setWorkSelection(me.selection);
        
        me.navButton = me.createButton(navTree);
        navTree.setNavButton(me.navButton);
        
        me.tbar = new Ext.Toolbar({
            style: {
                background: '#dcdcdc'
            },
            height: 33,
            border: false,
            bodyBorder: false,
            items:[me.navButton]
        });
        
        this.callParent();
    },
    
    createButton: function (navTree) {
        var me = this;
        var ceButton = Ext.create('Ext.button.Button', {
            text: '<b style="color:#A87678;">Werk -> Quelle -> RISM/Facsimile/Incipits</b>',
            menuAlign: 'tr-bl?',
            margin: '0 0 0 7',
            
            menu: Ext.create('Ext.menu.Menu', {
                style: {
                    background: '#dcdcdc'
                },
                items:[navTree]
            }),
            
            listeners: {
                afterrender: function () {
                    me.navButton.menu.show();
                    me.navButton.menu.setPosition(35, 100);
                }
            }
        });
        
        return ceButton;
    }
});