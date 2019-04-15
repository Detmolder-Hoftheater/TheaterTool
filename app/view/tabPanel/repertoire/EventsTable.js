Ext.define('TheaterTool.view.tabPanel.repertoire.EventsTable', {
    extend: 'Ext.grid.Panel',
    
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Event'],
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    flex: 1,
    columnLines: true,
    margin: '0 0 10 0',
    sortableColumns: false,
    hideHeaders: true,
    
    eventList: null,
    
    store: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Event',
            data:[]
        });
        
        if (typeof me.eventList !== 'undefined') {
            for (i = 0; i < me.eventList.length; i++) {
                var eventObj = me.eventList[i];
                var event = Ext.create('TheaterTool.model.Event', {
                    event: eventObj[0],
                    datum: eventObj[1],
                    ort: eventObj[2],
                    stadt: eventObj[3]
                });
                me.store.add(event);
            }
        }
        
        this.columns =[ {
            flex: 2,
            menuDisabled: true,
            dataIndex: 'event'
        }, {
            flex: 1,
            menuDisabled: true,
            dataIndex: 'datum'
        }, {
            flex: 2,
            menuDisabled: true,
            dataIndex: 'ort'
        }, {
            flex: 2,
            menuDisabled: true,
            dataIndex: 'stadt'
        }];
        
        this.callParent();
    },
    
    getEventStore: function () {
        return this.store;
    }
});