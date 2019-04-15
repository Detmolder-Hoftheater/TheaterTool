Ext.define('TheaterTool.view.tabPanel.persons.PersonNavigationTree', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Person'],
   
    flex: 3.3,
    region: 'east',
    
    collapsible: true,
    header: false,
   
    rowLines: false,
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
                typeValue = 'regulär';
            } else if (person_details[3] === 'alt') {
                typeValue = 'alternativ';
            } else if (person_details[3] === 'full') {
                typeValue = 'vollständig';
            } else if (person_details[3] === 'pseud') {
                typeValue = 'pseudonym';
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
            
            header: '<font style="color:#585858;">Name/Pseudonym</font>',
            flex: 2,
            menuDisabled: true,
            dataIndex: 'name',
            style: {
                paddingLeft: 6,
                paddingTop: 6,
                paddingRight: 6,
                paddingBottom: 6
            }
        }, {
            
            header: '<font style="color:#585858;">Nametype</font>',
            flex: 1.3,
            menuDisabled: true,
            dataIndex: 'type',
            style: {
                paddingLeft: 6,
                paddingTop: 6,
                paddingRight: 6,
                paddingBottom: 6
            }
        }]
        
        
        this.listeners = {
            
            selectionchange: function (selected, eOpts) {
                me.repertoirePanel.removeAll(true);
                me.workPanel = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                    dbkey: eOpts[0].data.persId, icon: 'resources/images/Mask-19.png', title: '<font size="2" face="Tahoma" style="color:#909090;">Person: ' + eOpts[0].data.name + '</font>'
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