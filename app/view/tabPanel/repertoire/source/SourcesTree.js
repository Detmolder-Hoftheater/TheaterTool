Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTree', {
    extend: 'Ext.tree.Panel',
    
    xtype: 'tree-grid',
    
    reserveScrollbar: true,
    flex: 1.3,
    style: {
        borderRight: '2px solid lightgray'
    },
    
    border: false,
    autoScroll: true,
    height: 100,
    useArrows: true,
    rootVisible: false,
    store: null,
    
    sortableColumns: false,
   selected_node: null,
    source_list: null,
    tablePanel: null,
    
    header: false,
    
    initComponent: function () {
        var me = this;
        me.store = Ext.create('Ext.data.TreeStore', {
            model: 'TheaterTool.model.SourceDetails',
            root: {
                expanded: true,
                children:[]
            }
        });
        
        var rootNode = me.store.getRootNode();
        for (i = 0; i < me.source_list.length; i++) {
            var source_details = me.source_list[i];
            var isLeaf = true;
            if (source_details[0].source_hier.length > 0) {
                isLeaf = false
            }
            
            var source = Ext.create('TheaterTool.model.SourceDetails', {
                "titel": source_details[0].s_title,
                'sourcetype': source_details[0].sourcetype,
                'titlecontent': source_details[0].s_titlecontent,
                'icon': Ext.BLANK_IMAGE_URL,
                "signatur": source_details[0].signatur,
                "inventarnummer": source_details[0].inventarnummer,
                'titlePages': source_details[0].titlePages,
                'medium': source_details[0].medium,
                'source_hier': source_details[0].source_hier,
                'inscription': source_details[0].inscription,
                's_bemerkungen': source_details[0].s_bemerkungen,
                'seitenzahl': source_details[0].seitenzahl,
                'groesse': source_details[0].groesse,
                'condition': source_details[0].condition,
                'schreiber': source_details[0].schreiber,
                'sprache': source_details[0].sprache,
                'events': source_details[0].events,
                'hoverview': source_details[0].hoverview,
                'stempel': source_details[0].stempel,
                'creation': source_details[0].creation,
                'inhalt': source_details[0].inhalt,
                leaf: isLeaf
            });
            
            if (! isLeaf) {
                for (j = 0; j < source_details[0].source_hier[0].sources_1.length; j++) {
                    var child = source_details[0].source_hier[0].sources_1[j];
                    
                    source.appendChild({
                        "titel": child[0].s_title,
                        'icon': Ext.BLANK_IMAGE_URL,
                        //"iconCls": '',
                        "signatur": child[0].signatur,
                        "inventarnummer": child[0].inventarnummer,
                        'titlePages': child[0].titlePages,
                        'medium': child[0].medium,
                        'source_hier': child[0].source_hier,
                        'inscription': child[0].inscription,
                        's_bemerkungen': child[0].s_bemerkungen,
                        'seitenzahl': child[0].seitenzahl,
                        'groesse': child[0].groesse,
                        'condition': child.condition,
                        'schreiber': child[0].schreiber,
                        'sprache': child[0].sprache,
                        'entstehung': child[0].entstehung,
                        'events': source_details[0].events,
                        'hoverview': source_details[0].hoverview,
                        'creation': source_details[0].creation,
                        'inhalt': child[0].inhalt,
                        leaf: true
                    });
                    
                   
                }
            }
            rootNode.appendChild(source);
        }
        me.columns =[ {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            header: '<font style="color:#585858;">Titel</font>',
            flex: 2.5,
            
            menuDisabled: true,
            dataIndex: 'titel',
            style: {
                paddingLeft: 1,
                paddingTop: 1,
                paddingRight: 1,
                paddingBottom: 1
            }
        }, {
            header: '<font style="color:#585858;">Signatur</font>',
            flex: 1.7,
            menuDisabled: true,
            dataIndex: 'signatur',
            style: {
                paddingLeft: 1,
                paddingTop: 1,
                paddingRight: 1,
                paddingBottom: 1
            }
        }
        ]
        
        me.listeners = {
            selectionchange: function (selected, eOpts) {
                me.tablePanel.setValues(eOpts);
            }
        }
        
        me.callParent();
    },
    
    setTablePanel: function (tablePanel) {
        this.tablePanel = tablePanel;
    }
    
});
