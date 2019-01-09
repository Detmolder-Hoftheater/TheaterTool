Ext.define('TheaterTool.view.tabPanel.persons.PersonTabDetails', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    dbkey: null,
    
    personName: null,
    personIcon: null,
    
    initComponent: function () {
        var me = this;
        me.tbar = {
            style: {
                background: '#dcdcdc'
            },
            border: false,
            height: 30,
            items:[ {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">' + GUI_NAMES.xml_show + '</b></font>',
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                },
                margin: '0 3 0 5',
                listeners: {
                    click: function (item, e, eOpts) {
                        Ext.Ajax.request({
                            url: 'resources/xql/getPersonXML.xql',
                            method: 'GET',
                            params: {
                                dbkey: me.dbkey,
                                dbPath: dbPathsMap. get ('persons')
                            },
                            success: function (response) {
                                var testText = response.responseXML;
                                
                                var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                                var personArr = testText.getElementsByTagName('person');
                                tempDiv.appendChild(personArr[0]);
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';
                                
                                /*var fragment = document.createDocumentFragment('div');
                                var tempDiv = document.createElement('div');
                                fragment.appendChild(tempDiv);
                                tempDiv.innerHTML = testText;
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';*/
                                var win = new Ext.window.Window({
                                    title: '<font style="color:gray;">' + GUI_NAMES.xml_show_tailtitle + me.personName + '</font>',
                                    html: htmlVersion,
                                    icon: me.personIcon,
                                    bodyStyle: {
                                        "background-color": "white"
                                    },
                                    height: 600,
                                    width: 800,
                                    autoScroll: true,
                                    bodyPadding: 10
                                });
                                win.show();
                            }
                        });
                    }
                }
            }, {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">' + GUI_NAMES.xml_load + '</b></font>',
                disabled: true,
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                }
            }]
        };
        
        
        
        me.callParent();
    },
    
    createContent: function () {
        
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getPersonOverview.xql',
            async: false,
            method: 'GET',
            params: {
                dbkey: me.dbkey,
                dbPath: dbPathsMap. get ('persons'),
                dbWorkPath: dbPathsMap. get ('works'),
                dbSourcePath: dbPathsMap. get ('sources'),
                dbGagePath: dbPathsMap. get ('gage'),
                dbAusgabePath: dbPathsMap. get ('expenses'),
                dbJournalPath: dbPathsMap. get ('journal'),
                dbRolePath: dbPathsMap. get ('rolebook'),
                regie: dbPathsMap. get ('regie')
            },
            success: function (result) {
                
                var personData = jQuery.parseJSON(result.responseText);
                
                // References
                if (personData !== null && personData.references.length > 0) {
                    me.createReferenceSection(personData, me);
                }
                
                // name Variations
                if (personData !== null && personData.persNameBlocks.length > 0) {
                    me.createNameVariationSection(personData, me);
                }
                // general information
                if (personData !== null && (personData.gender !== '' || personData.birthdates.length > 0 || personData.deathdates.length > 0 || personData.birthplaces.length > 0 || personData.deathplaces.length > 0)) {
                    var genInfoLabel = {
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">' + 'General Information' + '</b>',
                        margin: '8 0 10 0'
                    };
                    me.add(genInfoLabel);
                    // gender
                    if (personData.gender !== '') {
                        me.createGenderSection(personData, me);
                    }
                    // birth data
                    if (personData.birthdates.length > 0 || personData.birthplaces.length > 0) {
                        me.createBirthSection(personData, me);
                    }
                    // death data
                    if (personData.deathdates.length > 0 || personData.deathplaces.length > 0) {
                        me.createDeathSection(personData, me);
                    }
                    var lineLabel = {
                        xtype: 'label',
                        //html: '<b style="color:gray; font-size: 12px;">' + 'General Information' + '</b>',
                        margin: '5 0 0 0',
                        style: {
                            borderBottom: '1px solid #f0f0f0'
                        }
                    };
                    me.add(lineLabel);
                }
                // occupations
                if (personData !== null && personData.occupations.length > 0) {
                    me.createOccupationsSection(personData, me);
                }
                // residences
                if (personData !== null && personData.residences.length > 0) {
                    me.createResidencesSection(personData, me);
                }
                // affiliations
                if (personData !== null && personData.affiliations.length > 0) {
                    me.createAffiliationsSection(personData, me);
                }
                // relations
                if (personData !== null && personData.relations.length > 0) {
                    me.createRelationsSection(personData, me);
                }
                // notes
                if (personData !== null && personData.notes.length > 0) {
                    me.createNotesSection(personData, me);
                }
            }
        });
    },
    
    createNotesSection(personData, me){
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'Notes' + '</b>',
            margin: '12 0 5 0'
        });
        
        var notesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            margin: '5 0 0 0',
            items:[]
        });
        me.add(notesPanel);
        
        var notes = personData.notes;
            var arrNotes = Object.keys(notes).map(function (key) {
                return notes[key];
            });
            
            for (var i = 0; i < arrNotes.length; i++) {
                var relation = arrNotes[i];
                var titlePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 1,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    margin: '5 0 0 3',
                    items:[]
                });
                
                notesPanel.add(titlePanel);
                
                titlePanel.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">' + relation.notetype + ': </b>',
                    style: 'display:block; padding:0px 0px 5px 0px'
                });
                
                var pars = relation.par;
                for (var j = 0; j < pars.length; j++) {
                    var par = pars[j];
                    
                    notesPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + par + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                var notes = relation.refNotes;
                
                for (var j = 0; j < notes.length; j++) {
                    var oneNote = notes[j];
                    notesPanel.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 11px;">' + 'Reference(s):' + '</b>',
                        style: 'display:block; padding:5px 0px 5px 10px'
                    });
                    var refPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 1,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        //margin: '10 0 0 5',
                        items:[]
                    });
                    notesPanel.add(refPanel);
                    
                    var arrRef = Object.keys(oneNote).map(function (key) {
                        return oneNote[key];
                    });
                    for (var k = 0; k < arrRef.length; k++) {
                        var ref = arrRef[k];
                        refPanel.add({
                            xtype: 'label',
                            html: '<div style="color:gray; font-size: 12px;">' + ref.bibltype + ': ' + ref.biblvalue + '</div>',
                            style: 'display:block; padding:3px 0px 0px 15px'
                        });
                    }
                }
            }     
    },
    
    createRelationsSection(personData, me){
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'Social Relations' + '</b>',
            margin: '12 0 5 0'
        });
        
        var relationPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            //margin: '5 0 0 0',
            style: {
                borderBottom: '1px solid #f0f0f0'
            },
            bodyPadding: 3,
            items:[]
        });
        me.add(relationPanel);
        for (var i = 0; i < personData.relations.length; i++) {
                var relation = personData.relations[i];
                var titlePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 1,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    margin: '5 0 0 3',
                    items:[]
                });
                
                relationPanel.add(titlePanel);
                
                titlePanel.add({
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">' + 'Relation: ' + '</b>',
                    style: 'display:block; padding:0px 0px 5px 0px'
                });
                
                var contentPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                relationPanel.add(contentPanel);
                
                if (relation[1] !== '') {
                    contentPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + relation[1] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                
                if (relation[2] !== '') {
                    contentPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Activ: ' + relation[2] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                
                if (relation[3] !== '') {
                    contentPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Passiv: ' + relation[3] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
            }       
    },
    
    createAffiliationsSection(personData, me) {
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'Affiliations' + '</b>',
            margin: '12 0 5 0'
        });
        
        var affiliationsPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            bodyPadding: 3,
            style: {
                borderBottom: '1px solid #f0f0f0'
            },
            //margin: '5 5 5 5',
            items:[]
        });
        me.add(affiliationsPanel);
        
        var affilistions = personData.affiliations;
        var arrAff = Object.keys(affilistions).map(function (key) {
            return affilistions[key];
        });
        for (var i = 0; i < affilistions.length; i++) {
            var oneAff = affilistions[i];
            
            var titlePanel = Ext.create('Ext.panel.Panel', {
                layout: {
                    type: 'table',
                    columns: 1,
                    tdAttrs: {
                        valign: 'top'
                    }
                },
                bodyBorder: false,
                border: false,
                margin: '10 0 0 5',
                items:[]
            });
            
            affiliationsPanel.add(titlePanel);
            
            var dates = oneAff.dates;
            var org = oneAff.org;
            var notes = oneAff.notes;
            
            titlePanel.add({
                xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">' + 'Affiliation: ' + org[0] + '</b>'
                //margin: '10 0 0 5'
            });
            
            
            var contentPanel = Ext.create('Ext.panel.Panel', {
                layout: {
                    type: 'table',
                    columns: 1,
                    tdAttrs: {
                        valign: 'top'
                    }
                },
                bodyBorder: false,
                border: false,
                // margin: '5 0 0 15',
                items:[]
            });
            affiliationsPanel.add(contentPanel);
            
            /*if (org[1] !== '') {
            contentPanel.add({
            xtype: 'label',
            html: '<div style="color:gray; font-size: 12px;">' + 'Identifier: ' + org[1] + '</div>',
            style: 'display:block; padding:5px 0px 5px 10px'
            });
            }*/
            
            for (var j = 0; j < dates.length; j++) {
                contentPanel.add({
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">' + 'Date:' + '</b>',
                    style: 'display:block; padding:5px 0px 5px 10px'
                    //margin: '0 0 0 10'
                });
                
                var datePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    //margin: '10 0 0 5',
                    items:[]
                });
                contentPanel.add(datePanel);
                
                var oneDate = dates[j];
                
                if (oneDate[0] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'From: ' + oneDate[0] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                    /*var oneDateField = me.createTextField_1('From');
                    oneDateField.setValue(oneDate[0]);
                    affiliationsPanel.add(oneDateField);*/
                }
                if (oneDate[1] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'To: ' + oneDate[2] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                    /*var oneDateField = me.createTextField_1('To');
                    oneDateField.setValue(oneDate[1]);
                    affiliationsPanel.add(oneDateField);*/
                }
                if (oneDate[2] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'When: ' + oneDate[1] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                    /*var oneDateField = me.createTextField_1('When');
                    oneDateField.setValue(oneDate[2]);
                    affiliationsPanel.add(oneDateField);*/
                }
                
                var worksArr = oneDate[3];
                for (var k = 0; k < worksArr.works.length; k++) {
                    var work = worksArr.works[k];
                    
                    var workPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 1,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        //margin: '10 0 0 5',
                        items:[]
                    });
                    contentPanel.add(workPanel);
                    if (work[0] !== '') {
                        workPanel.add({
                            xtype: 'label',
                            html: '<div style="color:gray; font-size: 12px;">' + 'Work: ' + work[0] + '</div>',
                            style: 'display:block; padding:5px 0px 5px 15px'
                        });
                    }
                    
                    /* if (work[2] !== '') {
                    workPanel.add({
                    xtype: 'label',
                    html: '<div style="color:gray; font-size: 12px;">' + 'Workreference: ' + work[2] + '</div>',
                    style: 'display:block; padding:5px 0px 5px 10px'
                    });
                    }*/
                }
                
                var occArr = oneDate[4];
                
                for (var k = 0; k < occArr.occ.length; k++) {
                    var oneOcc = occArr.occ[k];
                    
                    var occValue = '';
                    if (oneOcc[1] === 'marc:arr') {
                        occValue = 'Arranger';
                    } else if (oneOcc[1] === 'marc:cmp') {
                        occValue = 'Composer';
                    } else if (oneOcc[1] === 'marc:lbt') {
                        occValue = 'Librettist';
                    } else if (oneOcc[1] === 'marc:cnd') {
                        occValue = 'Conductor';
                    } else if (oneOcc[1] === 'marc:act') {
                        occValue = 'Actor';
                    } else if (oneOcc[1] === 'marc:itr') {
                        occValue = 'Instrumentalist';
                    } else if (oneOcc[1] === 'marc:mcp') {
                        occValue = 'Music copyist';
                    } else if (oneOcc[1] === 'marc:msd') {
                        occValue = 'Musical director';
                    } else if (oneOcc[1] === 'marc:sng') {
                        occValue = 'Singer';
                    }
                    
                    contentPanel.add({
                        
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Occupation: ' + occValue + '</div>',
                        style: 'display:block; padding:5px 0px 5px 15px'
                    });
                    
                    /*var oneDateField = me.createTextField_1('Occupation');
                    oneDateField.setValue(oneOcc[1]);
                    me.add(oneDateField);*/
                    
                    var occPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 1,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        //margin: '10 0 0 5',
                        items:[]
                    });
                    contentPanel.add(occPanel);
                    
                    if (oneOcc[3] !== undefined) {
                        var oneEl = oneOcc[3];
                        /*if (oneEl.comp[2] !== '') {
                        occPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Component: ' + oneEl.comp[2] + '</div>',
                        style: 'display:block; padding:5px 0px 5px 15px'
                        });
                        }*/
                        for (var l = 0; l < oneEl.comp.length; l++) {
                            var oneComp = oneEl.comp[l];
                            
                            occPanel.add({
                                xtype: 'label',
                                html: '<div style="color:gray; font-size: 12px;">' + 'Componenttitle: ' + oneComp[2] + '</div>',
                                style: 'display:block; padding:5px 0px 5px 15px'
                            });
                        }
                        
                        
                        // for (var l = 0; l < oneEl.comp.length; l++) {
                        //var oneSng  = oneEl.comp[l];
                        /* var oneDateField = me.createTextField_1(oneEl.comp[2]);
                        oneDateField.setValue(oneEl.comp[1]);
                        contentPanel.add(oneDateField);*/
                        //  }
                    }
                    
                    var rolePanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 3,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        //margin: '10 0 0 5',
                        items:[]
                    });
                    contentPanel.add(rolePanel);
                    
                    if (oneOcc[2] !== undefined) {
                        var oneEl = oneOcc[2];
                        if (oneEl.sng[1] !== '') {
                            rolePanel.add({
                                xtype: 'label',
                                html: '<div style="color:gray; font-size: 12px;">' + 'Role: ' + oneEl.sng[1] + '</div>',
                                style: 'display:block; padding:5px 0px 5px 15px'
                            });
                        }
                        
                        if (oneEl.sng[2] !== '') {
                            rolePanel.add({
                                xtype: 'label',
                                html: '<div style="color:gray; font-size: 12px;">' + 'Clef: ' + oneEl.sng[2] + '</div>',
                                style: 'display:block; padding:5px 0px 5px 10px'
                            });
                        }
                        if (oneEl.sng[3] !== '') {
                            rolePanel.add({
                                xtype: 'label',
                                html: '<div style="color:gray; font-size: 12px;">' + 'Ambitus: ' + oneEl.sng[3] + '</div>',
                                style: 'display:block; padding:5px 0px 5px 10px'
                            });
                        }
                    }
                }
                var refArr = oneDate[5];
                
                for (var k = 0; k < refArr.refs.length; k++) {
                    
                    var oneNote = refArr.refs[k];
                    console.log(oneNote);
                    var oneNoteText = '';
                    contentPanel.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">' + 'Reference(s):' + '</b>',
                        style: 'display:block; padding:5px 0px 5px 10px'
                    });
                    var refPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 1,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        //margin: '10 0 0 5',
                        items:[]
                    });
                    contentPanel.add(refPanel);
                    
                    var arrRef = Object.keys(oneNote).map(function (key) {
                        return oneNote[key];
                    });
                    for (var l = 0; l < arrRef.length; l++) {
                        var ref = arrRef[l];
                        refPanel.add({
                            xtype: 'label',
                            html: '<div style="color:gray; font-size: 12px;">' + ref.bibltype + ': ' + ref.biblvalue + '</div>',
                            style: 'display:block; padding:5px 0px 5px 15px'
                        });
                    }
                }
            }
        }
    },
    
    createResidencesSection(personData, me) {
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'Residences' + '</b>',
            margin: '12 0 5 0'
        });
        
        var residencesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            style: {
                borderBottom: '1px solid #f0f0f0'
            },
            bodyPadding: 3,
            items:[]
        });
        me.add(residencesPanel);
        
        var residenceBlocks = personData.residences;
        var arr = Object.keys(residenceBlocks).map(function (key) {
            return residenceBlocks[key];
        });
        for (var i = 0; i < arr.length; i++) {
            var titlePanel = Ext.create('Ext.panel.Panel', {
                layout: {
                    type: 'table',
                    columns: 1,
                    tdAttrs: {
                        valign: 'top'
                    }
                },
                bodyBorder: false,
                border: false,
                margin: '5 0 0 3',
                items:[]
            });
            
            residencesPanel.add(titlePanel);
            var residenceBlock = arr[i];
            titlePanel.add({
                xtype: 'label',
                html: '<b style="color:gray; font-size: 12px;">' + 'Residence: ' + '</b>',
                style: 'display:block; padding:0px 0px 5px 0px'
            });
            
            var dates = residenceBlock.datesTo;
            var settl = residenceBlock.settl;
            var genNote = residenceBlock.genNote;
            var notes = residenceBlock.notes;
            
            for (var j = 0; j < dates.length; j++) {
                var oneDate = dates[j];
                
                var datePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    //margin: '0 0 0 5',
                    items:[]
                });
                residencesPanel.add(datePanel);
                
                if (oneDate[1] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'From: ' + oneDate[1] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                
                if (oneDate[0] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'To: ' + oneDate[0] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                
                if (oneDate[2] !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Certainty: ' + oneDate[2] + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
            }
            for (var j = 0; j < settl.length; j++) {
                var oneSettl = settl[j];
                var settlPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    //margin: '0 0 0 5',
                    items:[]
                });
                residencesPanel.add(settlPanel);
                
                if (oneSettl.settlement !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Settlement: ' + oneSettl.settlement + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                if (oneSettl.ref !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Geoname ID: ' + oneSettl.ref + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
                if (oneSettl.cert !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Cert: ' + oneSettl.cert + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
            }
            
            for (var j = 0; j < genNote.length; j++) {
                var oneGenNote = genNote[j];
                residencesPanel.add({
                    xtype: 'label',
                    html: '<div style="color:gray; font-size: 12px;">' + 'General Note: ' + oneGenNote + '</div>',
                    style: 'display:block; padding:0px 0px 5px 10px'
                });
            }
            
            for (var j = 0; j < notes.length; j++) {
                var oneNote = notes[j];
                residencesPanel.add({
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 11px;">' + 'Reference(s):' + '</b>',
                    style: 'display:block; padding:5px 0px 5px 10px'
                });
                var refPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 1,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                residencesPanel.add(refPanel);
                
                var arrRef = Object.keys(oneNote).map(function (key) {
                    return oneNote[key];
                });
                for (var k = 0; k < arrRef.length; k++) {
                    var ref = arrRef[k];
                    refPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + ref.bibltype + ': ' + ref.biblvalue + '</div>',
                        style: 'display:block; padding:3px 0px 0px 15px'
                    });
                }
            }
        }
    },
    
    createOccupationsSection(personData, me) {
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'Occupations' + '</b>',
            margin: '8 0 10 0'
        });
        
        var occContentPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            bodyPadding: 3,
            style: {
                borderBottom: '1px solid #f0f0f0'
            },
            items:[]
        });
        me.add(occContentPanel);
        for (var i = 0; i < personData.occupations.length; i++) {
            var occupationBlock = personData.occupations[i];
            var occupationPanel = Ext.create('Ext.panel.Panel', {
                layout: {
                    type: 'table',
                    columns: 2,
                    tdAttrs: {
                        valign: 'top'
                    }
                },
                bodyBorder: false,
                border: false,
                margin: '5 0 0 3',
                items:[]
            });
            occContentPanel.add(occupationPanel);
            if (occupationBlock[1] !== undefined && occupationBlock[1] !== '') {
                var occValue = '';
                if (occupationBlock[1] === 'marc:arr') {
                    occValue = 'Arranger';
                } else if (occupationBlock[1] === 'marc:cmp') {
                    occValue = 'Composer';
                } else if (occupationBlock[1] === 'marc:lbt') {
                    occValue = 'Librettist';
                } else if (occupationBlock[1] === 'marc:cnd') {
                    occValue = 'Conductor';
                } else if (occupationBlock[1] === 'marc:act') {
                    occValue = 'Actor';
                } else if (occupationBlock[1] === 'marc:itr') {
                    occValue = 'Instrumentalist';
                } else if (occupationBlock[1] === 'marc:mcp') {
                    occValue = 'Music copyist';
                } else if (occupationBlock[1] === 'marc:msd') {
                    occValue = 'Musical director';
                } else if (occupationBlock[1] === 'marc:sng') {
                    occValue = 'Singer';
                }
                occupationPanel.add({
                    xtype: 'label',
                    html: '<div style="color:gray; font-size: 12px;">' + occValue + '</div>',
                    style: 'display:block; padding:0px 0px 5px 3px'
                });
            }
            if (occupationBlock[2] !== undefined && occupationBlock[2] !== '') {
                occupationPanel.add({
                    xtype: 'label',
                    html: '<div style="color:gray; font-size: 12px;">' + occupationBlock[2] + '</div>',
                    style: 'display:block; padding:0px 0px 5px 3px'
                });
            }
        }
    },
    
    createDeathSection(personData, me) {
        var titleDeathSection = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1
            },
            margin: '0 0 0 10',
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(titleDeathSection);
        
        var crossImage = {
            xtype: 'image',
            src: 'resources/images/Cross1.png',
            width: '23px',
            height: '19px'
        };
        titleDeathSection.add(crossImage);
        
        var deathdatesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(deathdatesPanel);
        
        if (personData.deathdates !== undefined) {
            var deathdateBlocks = personData.deathdates;
            var arr = Object.keys(deathdateBlocks).map(function (key) {
                return deathdateBlocks[key];
            });
            for (var i = 0; i < arr.length; i++) {
                var datePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 4,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                deathdatesPanel.add(datePanel);
                
                var deathdateBlock = arr[i];
                if (deathdateBlock.when !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'When: ' + deathdateBlock.when + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (deathdateBlock.notBefore !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Not before: ' + deathdateBlock.notBefore + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (deathdateBlock.notAfter !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Not after: ' + deathdateBlock.notAfter + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (deathdateBlock.cert !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Certainty: ' + deathdateBlock.cert + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
            }
        }
        if (personData.deathplaces !== undefined) {
            var deathplaceBlocks = personData.deathplaces;
            var arr = Object.keys(deathplaceBlocks).map(function (key) {
                return deathplaceBlocks[key];
            });
            for (var i = 0; i < arr.length; i++) {
                var settlPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                deathdatesPanel.add(settlPanel);
                var deathplaceBlock = arr[i];
                if (deathplaceBlock.settlement !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Settlement: ' + deathplaceBlock.settlement + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                if (deathplaceBlock.ref !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Geoname ID: ' + deathplaceBlock.ref + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                if (deathplaceBlock.cert !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Cert: ' + deathplaceBlock.cert + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
            }
        }
    },
    
    createReferenceSection(personData, me) {
        var referencesBlocksJson = personData.references;
        
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + 'References' + '</b>',
            margin: '0 0 10 0'
        });
        
        var referencesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(referencesPanel);
        for (var i = 0; i < referencesBlocksJson.length; i++) {
            var oneReference = referencesBlocksJson[i];
            if (oneReference[0] === 'viaf') {
                referencesPanel.add({
                    xtype: 'component',
                    style: 'display:block; padding:0px 0px 10px 10px',
                    autoEl: {
                        tag: 'a',
                        href: 'http://viaf.org/viaf/search?query=' + oneReference[1] + '&sortKeys=holdingscount&recordSchema=BriefVIAF',
                        html: 'Personinformation on the Virtual International Authority File (VIAF)',
                        target: "_blank"
                    }
                });
            } else if (oneReference[0] === 'gnd') {
                referencesPanel.add({
                    xtype: 'component',
                    style: 'display:block; padding:0px 0px 10px 10px',
                    autoEl: {
                        tag: 'a',
                        href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query=' + oneReference[1],
                        html: 'Record in the Common Authority File (GND)',
                        target: "_blank"
                    }
                });
            } else if (oneReference[0] === 'isni') {
                referencesPanel.add({
                    xtype: 'component',
                    style: 'display:block; padding:0px 0px 10px 10px',
                    autoEl: {
                        tag: 'a',
                        href: 'http://isni.org/isni/' + oneReference[1],
                        html: 'Personinformation on the International Standard Name Identifier (ISNI)',
                        target: "_blank"
                    }
                });
            }
        }
    },
    
    createNameVariationSection(personData, me) {
        me.add({
            xtype: 'label',
            html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.person_SectionName + '</b>',
            margin: '0 0 10 0'
        });
        
        var namesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(namesPanel);
        var persNameBlocksJson = personData.persNameBlocks;
        for (var i = 0; i < persNameBlocksJson.length; i++) {
            var persNameBlocks = persNameBlocksJson[i];
            if (persNameBlocks.reg.length > 0) {
                
                for (var j = 0; j < persNameBlocks.reg.length; j++) {
                    var regPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 2,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    namesPanel.add(regPanel);
                    var oneReg = persNameBlocks.reg[j];
                    var lang = '';
                    if (oneReg.language !== '') {
                        lang = ' (' + oneReg.language + ')';
                    }
                    var regText = '';
                    for (var k = 0; k < oneReg.names.length; k++) {
                        var oneValue = oneReg.names[k];
                        regText = regText + ' ' + oneValue[1];
                    }
                    regPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Regular' + lang + ': ' + regText + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
            }
            if (persNameBlocks.full.length > 0) {
                for (var j = 0; j < persNameBlocks.full.length; j++) {
                    var fullPanel = Ext.create('Ext.panel.Panel', {
                        layout: {
                            type: 'table',
                            columns: 2,
                            tdAttrs: {
                                valign: 'top'
                            }
                        },
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    namesPanel.add(fullPanel);
                    var oneReg = persNameBlocks.full[j];
                    var lang = '';
                    if (oneReg.language !== '') {
                        lang = ' (' + oneReg.language + ')';
                    }
                    var regText = '';
                    for (var k = 0; k < oneReg.names.length; k++) {
                        var oneValue = oneReg.names[k];
                        regText = regText + ' ' + oneValue[1];
                    }
                    fullPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Full' + lang + ': ' + regText + '</div>',
                        style: 'display:block; padding:0px 0px 5px 10px'
                    });
                }
            }
            for (var j = 0; j < persNameBlocks.alt.length; j++) {
                var altPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                namesPanel.add(altPanel);
                var oneReg = persNameBlocks.alt[j];
                var lang = '';
                if (oneReg.language !== '' && oneReg.language !== undefined) {
                    lang = ' (' + oneReg.language + ')';
                }
                var regText = '';
                for (var k = 0; k < oneReg.names.length; k++) {
                    var oneValue = oneReg.names[k];
                    regText = regText + ' ' + oneValue[1];
                }
                
                if (oneReg.subtype !== '') {
                    regText = regText + ' (' + oneReg.subtype + ')';
                }
                
                altPanel.add({
                    xtype: 'label',
                    html: '<div style="color:gray; font-size: 12px;">' + 'Alternative' + lang + ': ' + regText + '</div>',
                    style: 'display:block; padding:0px 0px 5px 10px'
                });
            }
        }
    },
    
    createGenderSection: function (personData, me) {
        var genderSection = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 2
            },
            margin: '0 0 0 10',
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(genderSection);
        
        var genderImage = {
            xtype: 'image',
            src: 'resources/images/customer-15.png',
            margin: '0 0 0 5',
            width: '14px',
            height: '14px'
        };
        genderSection.add(genderImage);
        var gender = me.createTextFieldWithoutLabel();
        var genderValue = '';
        if (personData.gender[0] === 'm') {
            genderValue = 'male';
        } else if (personData.gender[0] === 'f') {
            genderValue = 'female';
        } else {
            genderValue = 'unknown';
        }
        genderSection.add({
            xtype: 'label',
            html: '<div style="color:gray; font-size: 12px;">' + genderValue + '</div>',
            style: 'display:block; padding:0px 0px 4px 5px'
        });
    },
    
    createBirthSection: function (personData, me) {
        var titleBirthSection = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1
            },
            margin: '0 0 0 10',
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(titleBirthSection);
        
        var birthImage = {
            xtype: 'image',
            src: 'resources/images/Snowflake.png',
            width: '25px',
            height: '25px'
        };
        titleBirthSection.add(birthImage);
        var birthdatesPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'table',
                columns: 1,
                tdAttrs: {
                    valign: 'top'
                }
            },
            bodyBorder: false,
            border: false,
            items:[]
        });
        me.add(birthdatesPanel);
        if (personData.birthdates !== undefined) {
            var birthdateBlocks = personData.birthdates;
            var arr = Object.keys(birthdateBlocks).map(function (key) {
                return birthdateBlocks[key];
            });
            for (var i = 0; i < arr.length; i++) {
                var datePanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 5,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    //margin: '10 0 0 5',
                    items:[]
                });
                birthdatesPanel.add(datePanel);
                
                var birthdateBlock = arr[i];
                
                if (birthdateBlock.type !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Type: ' + birthdateBlock.type + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (birthdateBlock.when !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'When: ' + birthdateBlock.when + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (birthdateBlock.notBefore !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Not before: ' + birthdateBlock.notBefore + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (birthdateBlock.notAfter !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Not after: ' + birthdateBlock.notAfter + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                
                if (birthdateBlock.cert !== '') {
                    datePanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Certainty: ' + birthdateBlock.cert + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
            }
        }
        if (personData.birthplaces !== undefined) {
            var birthplaceBlocks = personData.birthplaces;
            var arr = Object.keys(birthplaceBlocks).map(function (key) {
                return birthplaceBlocks[key];
            });
            
            for (var i = 0; i < arr.length; i++) {
                
                var settlPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 3,
                        tdAttrs: {
                            valign: 'top'
                        }
                    },
                    bodyBorder: false,
                    border: false,
                    //margin: '10 0 0 5',
                    items:[]
                });
                birthdatesPanel.add(settlPanel);
                
                var birthplaceBlock = arr[i];
                
                if (birthplaceBlock.settlement !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Settlement: ' + birthplaceBlock.settlement + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                if (birthplaceBlock.ref !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Geoname ID: ' + birthplaceBlock.ref + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
                if (birthplaceBlock.cert !== '') {
                    settlPanel.add({
                        xtype: 'label',
                        html: '<div style="color:gray; font-size: 12px;">' + 'Cert: ' + birthplaceBlock.cert + '</div>',
                        style: 'display:block; padding:0px 0px 5px 15px'
                    });
                }
            }
        }
    },
    
    createTextArea: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.TextArea', {
            name: fieldName,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>',
            //width: 235,
            readOnly: true,
            //anchor: '100%',
            //cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            //inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            // triggerWrapCls: '',
            // remove the input element's background
            //fieldStyle: 'background:none',
            style: {
                //autoWidth: true,
                width: '100%'
                //height: '100%',
                // borderLeft: '5px solid #FFFFFF'
            }
        });
        
        return textArea;
    },
    
    createTextField: function (fieldName) {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            name: fieldName,
            readOnly: true,
            border: false,
            //value: fieldValue,
            // cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
                //border: false
                //autoWidth: true,
                //borderLeft: '5px solid #FFFFFF'
            },
            //width: 235,
            fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
            //anchor: '100%'
        });
        
        
        return textArea;
    },
    
    createTextFieldWithoutLabel: function () {
        var me = this;
        var textArea = Ext.create('Ext.form.field.Text', {
            //name: fieldName,
            readOnly: true,
            border: false,
            margin: '0 0 0 80',
            //value: fieldValue,
            // cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            // remove default styling for element wrapping the input element
            inputWrapCls: '',
            // remove default styling for div wrapping the input element and trigger button(s)
            triggerWrapCls: '',
            // remove the input element's background
            fieldStyle: 'background:none',
            style: {
                width: '100%'
                //border: false
                //autoWidth: true,
                //borderLeft: '5px solid #FFFFFF'
            }
            //width: 235,
            //fieldLabel: '<font size = "1"><b style="color:gray; vertical-align:top;">' + fieldName + '</b></font>'
            //anchor: '100%'
        });
        
        
        return textArea;
    }
});