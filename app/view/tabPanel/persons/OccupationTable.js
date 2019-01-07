Ext.define('TheaterTool.view.tabPanel.persons.OccupationTable', {
    extend: 'Ext.grid.Panel',
    
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.PersonData'],
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    flex: 1,
    
    //title: '<b style="color:gray;">'+GUI_NAMES.person_occupation+'</b>',
    //icon: 'resources/images/Time-17.png',
    margin: '0 0 10 0',
    sortableColumns: false,
    
    ocupationList: null,
    
    store: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.title = '<b style="color:gray;">'+GUI_NAMES.person_occupation+'</b>';
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.PersonData',
            data:[]
        });
        
        if (typeof me.ocupationList !== 'undefined') {
            for (i = 0; i < me.ocupationList.length; i++) {
                var eventObj = me.ocupationList[i];
                var datumObj = '';
                if (eventObj[2] !== '') {
                    datumObj = eventObj[2] + '-' + eventObj[3];
                } else if (eventObj[4] !== '') {
                    datumObj = eventObj[4];
                }
                
                var persRole = '';
                
                if (eventObj[1] === 'cmp') {
                    persRole = GUI_NAMES.person_occ_composer;
                } else if (eventObj[1] === 'lbt') {
                    persRole = GUI_NAMES.person_occ_librettist;
                } else if (eventObj[1] === 'lyr') {
                    persRole = GUI_NAMES.person_occ_songwriter;
                } else if (eventObj[1] === 'drt') {
                    persRole = GUI_NAMES.person_occ_director;
                } else if (eventObj[1] === 'msd') {
                    persRole = GUI_NAMES.person_occ_musdirector;
                } else if (eventObj[1] === 'drd') {
                    persRole = 'Schauspieldirektor';
                } else if (eventObj[1] === 'cnd') {
                    persRole = GUI_NAMES.person_occ_conductor;
                } else if (eventObj[1] === 'cpm') {
                    persRole = 'Kapellmeister';
                } else if (eventObj[1] === 'blm') {
                    persRole = 'Ballettmeister';
                } else if (eventObj[1] === 'sgd') {
                    persRole = GUI_NAMES.person_occ_stage_director;
                } else if (eventObj[1] === 'act') {
                    persRole = GUI_NAMES.person_occ_actor;
                } else if (eventObj[1] === 'bld') {
                    persRole = GUI_NAMES.person_occ_b_dancer;
                } else if (eventObj[1] === 'bga') {
                    persRole = GUI_NAMES.person_occ_background_actor;
                } else if (eventObj[1] === 'mus') {
                    persRole = GUI_NAMES.person_occ_musician;
                } else if (eventObj[1] === 'chs') {
                    persRole = GUI_NAMES.person_occ_chorister;
                } else if (eventObj[1] === 'sng') {
                    persRole = GUI_NAMES.person_occ_singer;
                } else if (eventObj[1] === 'sls') {
                    persRole = 'Gesangssolist';
                } else if (eventObj[1] === 'tha') {
                    persRole = 'Theateragent';
                } else if (eventObj[1] === 'stc') {
                    persRole = 'Inspektor';
                } else if (eventObj[1] === 'elg') {
                    persRole = 'Beleuchter';
                } else if (eventObj[1] === 'ptm') {
                    persRole = GUI_NAMES.person_occ_props_manager;
                } else if (eventObj[1] === 'drs') {
                    persRole = GUI_NAMES.person_occ_dresser;
                } else if (eventObj[1] === 'hdr') {
                    persRole = GUI_NAMES.person_occ_hairdresser;
                } else if (eventObj[1] === 'tlr') {
                    persRole = GUI_NAMES.person_occ_dressmaker;
                } else if (eventObj[1] === 'stm') {
                    persRole = 'Bühnenmeister';
                } else if (eventObj[1] === 'sth') {
                    persRole = GUI_NAMES.person_occ_stagehand;
                } else if (eventObj[1] === 'dcp') {
                    persRole = 'Bühnenbildmaler';
                } else if (eventObj[1] === 'csh') {
                    persRole = GUI_NAMES.person_occ_cashier;
                } else if (eventObj[1] === 'lbn') {
                    persRole = GUI_NAMES.person_occ_librarian;
                } else if (eventObj[1] === 'mcp') {
                    persRole = 'Kopist';
                } else if (eventObj[1] === 'bnd') {
                    persRole = GUI_NAMES.person_occ_bookbinder;
                } else if (eventObj[1] === 'ppm') {
                    persRole = 'Papierhersteller';
                } else {
                    persRole = eventObj[1];
                }
                
                var event = Ext.create('TheaterTool.model.PersonData', {
                    occup: eventObj[0],
                    beruf: persRole,
                    datum: datumObj
                });
                me.store.add(event);
            }
        }
        
        this.columns =[ {
            text: GUI_NAMES.person_occupation_date,
            flex: 0.5,
            menuDisabled: true,
            dataIndex: 'datum'
        },
        /*{
        text: 'Beruf',
        flex: 2,
        menuDisabled: true,
        dataIndex: 'beruf'
        
        },*/ {
            text: GUI_NAMES.person_occupation_function,
            flex: 2,
            menuDisabled: true,
            dataIndex: 'occup'
        }];
        
        this.callParent();
    }
});