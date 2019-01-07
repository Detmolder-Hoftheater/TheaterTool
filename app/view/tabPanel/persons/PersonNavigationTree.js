Ext.define('TheaterTool.view.tabPanel.persons.PersonNavigationTree', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Person'],
    
    flex: 3.3,
    region: 'east',
    icon: 'resources/images/Mask-19.png',
    collapsible: true,
    sortableColumns: false,
    rowLines: true,
    columnLines: true,
    
    repertoirePanel: null,
    
    persons_list: null,
    
    store: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Person',
            data:[]
        });
        
        
        for (i = 0; i < me.persons_list.length; i++) {
            var person_details = me.persons_list[i];
            var typeValue = '';
            if (person_details[3] === 'reg') {
                typeValue = GUI_NAMES.personName_reg;
            } else if (person_details[3] === 'alt') {
                typeValue = GUI_NAMES.personName_alt;
            } else if (person_details[3] === 'full') {
                typeValue = GUI_NAMES.personName_full;
            } else if (person_details[3] === 'pseud') {
                typeValue = GUI_NAMES.personName_pseudo;
            }
            
            var person = Ext.create('TheaterTool.model.Person', {
                'name': person_details[0] + ', ' + person_details[2],
                'persId': person_details[1],
                'forename': person_details[2],
                'type': typeValue,
                leaf: true
            });
            me.store.add(person);
        }
        
        me.store.sort('name');
        
        
        me.columns =[ {
            text: GUI_NAMES.personTabTableColumn_1,
            flex: 2,
            menuDisabled: true,
            dataIndex: 'name'
        },
        {
            text: GUI_NAMES.personTabTableColumn_2,
            flex: 1.3,
            menuDisabled: true,
            dataIndex: 'type'
        }]
        
        this.listeners = {
            selectionchange: function (selected, eOpts) {
                me.repertoirePanel.removeAll(true);
                me.workPanel = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                    dbkey: eOpts[0].data.persId, icon: 'resources/images/Mask-19.png', title: '<font size="2" face="Arial" style="color:#A87678;">' + GUI_NAMES.personTabTailTitle_1 + ': ' + eOpts[0].data.name + '</font>'
                });
                me.repertoirePanel.add(me.workPanel);
            }
        };
        
        me.callParent();
    },
    
    setWorkSelection: function (selectedWork) {
        this.selectedWork = selectedWork;
    },
    
    setRepertoirePanel: function (repertoirePanel) {
        
        this.repertoirePanel = repertoirePanel;
    }
});