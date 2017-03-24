/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanelTest', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    
    sourceID: null,
    
    abs: null,
    language: null,
    pers: null,
    overview: null,
    instr: null,
    w_ein_titel: null,
    w_titel: null,
    w_alt_titel: null,
    w_unter_titel: null,
    
    setTitelValue: function (sourceStore) {
        
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getWorkOverview.xql',
            async: false,
            method: 'GET',
            params: {
                workID: me.workID
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                console.log(json);
                
                var titel_group = Ext.create('Ext.form.FieldSet', {
                    title: '<b style="color:gray;">Titel Varianten</b>',
                    bodyBorder: false,
                    
                    collapsible: false,
                    //collapsed: false,
                    items:[]
                });
                me.items.add(titel_group);
                
                
                var panel_0 = null;
                
                panel_0 = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    
                    style: {
                        //width: '100%',
                        borderTop: '5px solid #FFFFFF',
                        borderBottom: '5px solid #FFFFFF'
                    },
                    autoScroll: true,
                    border: false,
                    //bodyPadding: 10,
                    items:[]
                });
                titel_group.add(panel_0);
                
                var titelLangArray =[];
                var titelLangArraytemp =[];
                for (i = 0; i < json.workTitel.length; i++) {
                    var el = json.workTitel[i];
                    var titelKey = el[2];
                    if (titelLangArray.indexOf(titelKey) <= -1) {
                        titelLangArray.push(titelKey);
                    }
                }
                
                for (i = 0; i < titelLangArray.length; i++) {
                    var titleKeyLang = titelLangArray[i];
                    for (j = 0; j < json.workTitel.length; j++) {
                        var el = json.workTitel[j];
                        var titelKey_tmp = el[2];
                        
                        var titelKey = '';
                        if (titelKey_tmp !== '') {
                            titelKey = ' (' + titelKey_tmp + ')';
                        }
                        
                        if (titelKey_tmp === titleKeyLang) {
                            if (el[1] === 'uniform') {
                                me.w_ein_titel = me.createTextField('Einheitstitel' + titelKey);
                                me.w_ein_titel.setValue(el[0]);
                            } else if (el[1] === '') {
                                me.w_titel = me.createTextField('Titel' + titelKey);
                                me.w_titel.setValue(el[0]);
                            } else if (el[1] === 'alt') {
                                me.w_alt_titel = me.createTextField('Alternativtitel' + titelKey);
                                me.w_alt_titel.setValue(el[0]);
                            } else if (el[1] === 'sub') {
                                me.w_unter_titel = me.createTextField('Untertitel' + titelKey);
                                me.w_unter_titel.setValue(el[0]);
                            }
                        }
                    }
                    
                    panel_10 = Ext.create('Ext.panel.Panel', {
                        colspan: 1,
                        type: 'hbox',
                        border: false,
                        /*style: {
                        borderBottom: '15px solid #FFFFFF'
                        },*/
                        items:[]
                    });
                    panel_0.add(panel_10);
                    
                    if (me.w_ein_titel !== null) {
                        panel_10.items.add(me.w_ein_titel);
                    }
                    if (me.w_titel !== null) {
                        panel_10.items.add(me.w_titel);
                    }
                    if (me.w_alt_titel !== null) {
                        panel_10.items.add(me.w_alt_titel);
                    }
                    if (me.w_unter_titel !== null) {
                        panel_10.items.add(me.w_unter_titel);
                    }
                    me.w_ein_titel = null;
                    me.w_titel = null;
                    me.w_alt_titel = null;
                    me.w_unter_titel = null;
                }
                
                
                var persStore = Ext.create('Ext.data.Store', {
                    model: 'TheaterTool.model.Person',
                    data:[]
                });
                me.pers = Ext.create('Ext.grid.Panel', {
                    store: persStore,
                    flex: 1,
                    /*style: {
                    width: '100%'
                    },*/
                    columns:[ {
                        header: 'Name', dataIndex: 'name', flex: 2
                    }, {
                        header: 'Role', dataIndex: 'role', flex: 1
                    },
                    Ext.create('Ext.grid.column.Action', {
                        xtype: 'actioncolumn',
                        header: 'Details',
                        flex: 0.5,
                        align: 'center',
                        menuDisabled: true,
                        renderer: function (val, metadata, record) {
                            if (record.data.dbkey !== '') {
                                this.items[0].icon = 'resources/images/Door-24.png';
                            } else {
                                this.items[0].icon = '';
                            }
                            
                            
                            metadata.style = 'cursor: pointer;';
                            return val;
                        },
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            console.log(rec);
                            var dbkey = rec.data.dbkey;
                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                title: '<font style="color:gray;">' + rec.data.name + '</font>',
                                icon: 'resources/images/Mask-19.png'
                            });
                            var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                                dbkey: dbkey, title: '<font style="color:gray;">' + rec.data.name + '</font>',
                                icon: 'resources/images/Mask-19.png'
                            });
                            repertoireTab.add(personDetails);
                            
                            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                            navTreeGlobal.add(repertoireTab);
                            navTreeGlobal.setActiveTab(repertoireTab);
                            navTreeGlobal.fireEvent('render', navTreeGlobal);
                            
                        }
                    })],
                    margin: '0 0 10 55'
                });
                
                for (i = 0; i < json.autoren.length; i++) {
                    var autor = json.autoren[i];
                    var persRole = '';
                    if (autor[1] === 'arr') {
                        persRole = 'arranger';
                    } else if (autor[1] === 'aut') {
                        persRole = 'author';
                    } else if (autor[1] === 'cmp') {
                        persRole = 'composer';
                    } else if (autor[1] === 'cre') {
                        persRole = 'creator';
                    } else if (autor[1] === 'lbt') {
                        persRole = 'librettist';
                    } else if (autor[1] === 'edt') {
                        persRole = 'editor';
                    } else if (autor[1] === 'lyr') {
                        persRole = 'lyricist';
                    } else if (autor[1] === 'trl') {
                        persRole = 'translator';
                    } else if (autor[1] === 'scr') {
                        persRole = 'scribe';
                    } else if (autor[1] === 'fmo') {
                        persRole = 'former owner';
                    } else if (autor[1] === 'asn') {
                        persRole = 'associated name';
                    } else if (autor[1] === 'prf') {
                        persRole = 'performer';
                    } else if (autor[1] === 'clb') {
                        persRole = 'collaborator';
                    } else {
                        persRole = autor[1];
                    }
                    
                    var person = Ext.create('TheaterTool.model.Person', {
                        name: autor[0],
                        role: persRole,
                        dbkey: autor[2]
                    });
                    persStore.add(person);
                }
                
                var pers_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        },
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    autoScroll: true,
                    border: false,
                    items:[ {
                        
                        xtype: 'label',
                        html: 'Personen'
                    },
                    me.pers]
                });
                
                me.abs = me.createTextField('Entstehung');
                
                me.language = me.createTextField('Sprache(n)');
                
                me.overview = me.createTextArea('Beschreibung');
                
                me.instr = me.createTextArea('Besetzung');
                //me.instr.setHight(200);
                
                var ov_panel_left = Ext.create('Ext.panel.Panel', {
                    border: false,
                    items:[
                    pers_panel,
                    me.language,
                    me.abs]
                });
                
                var panel_01 = Ext.create('Ext.panel.Panel', {
                    
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    autoScroll: true,
                    border: false,
                    bodyPadding: 10,
                    items:[
                    ov_panel_left,
                    me.instr]
                });
                
                me.items.add(panel_01);
                
                
                if (typeof json.sprachen !== 'undefined') {
                    var spr = json.sprachen[0];
                    for (i = 1; i < json.sprachen.length; i++) {
                        spr += ', ' + json.sprachen[i]
                    }
                    me.language.setValue(spr);
                }
                
                me.annot = me.createTextArea('Aufführungen');
                me.items.add(me.overview);
                me.items.add(me.annot);
            }
        });
    },
    
    
    createTextArea: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            name: fieldName,
            fieldLabel: fieldName,
            //width: 235,
            readOnly: true,
            anchor: '100%',
            style: {
                width: '100%',
                borderLeft: '5px solid #FFFFFF'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            
            style: {
                width: '100%',
                borderLeft: '5px solid #FFFFFF'
            },
            //width: 235,
            fieldLabel: fieldName,
            anchor: '100%'
        });
        
        return textArea;
    }
    
    
    /*initComponent: function () {
    this.items = [
    
    {
    layout: {
    type: 'vbox',
    pack: 'start',
    
    align: 'stretch'
    },
    
    bodyPadding: 10,
    flex:1,
    defaults: {
    frame: true,
    bodyPadding: 10
    },
    
    border: false,
    items: [
    {
    xtype: 'textfield',
    fieldLabel: "Einheitstitel",
    width: 400,
    value: 'Der Bettelstudent'
    /\*name: "einheit"
    render: function(value){
    return title[1];
    }*\/
    }, {
    fieldLabel: 'Titel (de)',
    width: 400,
    xtype: 'textfield',
    //name: 'title',
    value: 'Der Bettelstudent oder Das Donnerwetter'
    },
    {
    fieldLabel: 'Altenativtitel (de)',
    width: 400,
    xtype: 'textfield',
    //name: 'alternativ',
    value: 'Der reisende Student'
    },
    {
    fieldLabel: 'Untertitel (de)',
    width: 400,
    xtype: 'textfield',
    //name: 'untertitel',
    value: 'Operette in 2 Akten'
    },
    {
    xtype: 'label',
    margin: '10 0 0 0'
    },
    {
    xtype: 'textfield',
    fieldLabel: "Komponist",
    width: 400,
    value: 'Winter, Peter von'
    /\*name: "einheit"
    render: function(value){
    return title[1];
    }*\/
    }, {
    fieldLabel: 'Librettist',
    width: 400,
    xtype: 'textfield',
    //name: 'title',
    value: 'Weidmann, Paul'
    }
    
    
    ]
    },
    
    
    {
    layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
    },
    flex:1,
    bodyPadding: 10,
    
    defaults: {
    frame: true,
    bodyPadding: 10
    },
    
    border: false,
    items: [
    {
    fieldLabel: 'Sprache',
    width: 400,
    xtype: 'textfield',
    //name: 'untertitel',
    value: 'German'
    },
    
    {
    fieldLabel: 'Geschichte',
    width: 400,
    xtype: 'textarea',
    grow: true,
    //name: 'title',
    value: 'First Performance: 17. April 1773, Wien'
    },
    
    {
    fieldLabel: 'Besetzung',
    width: 400,
    xtype: 'textarea',
    grow: true,
    //name: 'alternativ',
    value: 'Brandheim, Hannchen, Jacob, Margareth, Tollberg'
    }
    ]
    }
    
    
    
    
    ]
    
    this.callParent();
    }
     */
});