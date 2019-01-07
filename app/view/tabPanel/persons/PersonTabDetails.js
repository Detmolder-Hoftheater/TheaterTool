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
                
                var json = jQuery.parseJSON(result.responseText);
                
                me.add({
                    
                    xtype: 'label',
                    html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.person_SectionName + '</b>',
                    margin: '0 0 10 0'
                });
                
                panel_10 = Ext.create('Ext.panel.Panel', {
                    colspan: 1,
                    //type: 'hbox',
                    border: false,
                    bodyBorder: false,
                    margin: '0 10 0 10',
                    //margin: '0 0 0 5',
                    items:[]
                });
                me.add(panel_10);
                
                var name_panel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'table',
                        columns: 1,
                        tdAttrs: {
                            valign: 'top'
                        },
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    // margin: '0 23 0 10',
                    //bodyPadding: 10,
                    bodyBorder: false,
                    border: false,
                    items:[]
                });
                
                panel_10.add(name_panel);
                console.log(json);
                var persNameBlocks = json.persNameBlocks;
                var arr = Object.keys(persNameBlocks).map(function (key) {
                    return persNameBlocks[key];
                });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var persNameBlocks = arr[i];
                        
                        
                        if(persNameBlocks.alt.length > 0){
                            for(var j = 0; j < persNameBlocks.alt.length; j++){
                                var oneReg = persNameBlocks.alt[j];
                                var lang = '';
                            if(oneReg[2] !== undefined){
                                lang = '('+oneReg[2]+')';
                            }
                            var regular = me.createTextField(GUI_NAMES.personNameField_alt + lang);
                            var regText = '';
                            if(oneReg[0] !== undefined){
                                regText = oneReg[0];
                            }
                            if(oneReg[1] !== undefined){
                                regText += ', '+oneReg[1];
                            }
                            regular.setValue(regText);
                            name_panel.add(regular);
                            
                                
                            }
                            
                        }
                        if(persNameBlocks.full.length > 0){
                            for(var j = 0; j < persNameBlocks.full.length; j++){
                                var oneReg = persNameBlocks.full[j];
                                var lang = '';
                            if(oneReg[2] !== ''){
                                lang = '('+oneReg[2]+')';
                            }
                            var regular = me.createTextField(GUI_NAMES.personNameField_full + lang);
                            var regText = '';
                            if(oneReg[0] !== ''){
                                regText = oneReg[0];
                            }
                            if(oneReg[1] !== ''){
                                regText += ', '+oneReg[1];
                            }
                            regular.setValue(regText);
                            name_panel.add(regular);
                            }                           
                        }                        
                        if(persNameBlocks.regs.length > 0){  
                            for(var j = 0; j < persNameBlocks.regs.length; j++){
                                var oneReg = persNameBlocks.regs[j];
                                var lang = '';
                            if(oneReg[2] !== ''){
                                lang = '('+oneReg[2]+')';
                            }
                            var regular = me.createTextField(GUI_NAMES.personNameField_reg + lang);
                            var regText = '';
                            if(oneReg[0] !== ''){
                                regText = oneReg[0];
                            }
                            if(oneReg !== ''){
                                regText += ', '+oneReg[1];
                            }
                            regular.setValue(regText);
                            name_panel.add(regular);
                            }
                            
                        }
                
                    }
                    
               
                if (json.gender.length > 0 || json.birthdates !== undefined || json.deathdates !== undefined || json.occupations.length > 0 || json.residences.length > 0 || json.references.length > 0) {
                    me.add({
                        
                        xtype: 'label',
                        html: '<b style="color:gray; font-size: 12px;">' + GUI_NAMES.person_SectionGenerally + '</b>',
                        margin: '10 0 10 0'
                    });
                    
                    if (json.references.length > 0) {
                        
                        var panel_1011 = Ext.create('Ext.panel.Panel', {
                            layout: {
                                type: 'table',
                                columns: 1,
                                tdAttrs: {
                                    valign: 'top'
                                },
                                tableAttrs: {
                                    style: {
                                        width: '100%'
                                    }
                                }
                            },
                            bodyBorder: false,
                            border: false,
                            
                            items:[]
                        });
                        me.add(panel_1011);
                        if (json.references.length > 0) {
                            
                            for (i = 0; i < json.references.length; i++) {
                                var ref = json.references[i];
                                var refName = ref[0];
                                var gndId = ref[1];
                                
                                var panel_10111 = Ext.create('Ext.panel.Panel', {
                                    colspan: 1,
                                    // type: 'vbox',
                                    border: false,
                                    bodyBorder: false,
                                    // bodyPadding: 10,
                                    margin: '0 0 10 10',
                                    //margin: '0 0 0 5',
                                    items:[]
                                });
                                panel_1011.add(panel_10111);
                                if(refName === 'gnd'){
                                panel_10111.add({
                                    xtype: 'component',
                                    bodyPadding: 10,
                                    margin: '0 0 0 107',
                                    autoEl: {
                                        tag: 'a',
                                        href: 'https://portal.dnb.de/opac.htm?method=simpleSearch&query=' + gndId,
                                        html: 'Datensatz in der Gemeinsamen Normdatei (GND)',
                                        target: "_blank"
                                    }
                                });
                                }else if(refName === 'viaf'){
                                    panel_10111.add({
                                    xtype: 'component',
                                    bodyPadding: 10,
                                    margin: '0 0 0 107',
                                    autoEl: {
                                        tag: 'a',
                                         href: 'http://viaf.org/viaf/search?query=' + gndId + '&sortKeys=holdingscount&recordSchema=BriefVIAF',
                                    html: 'Personinformationen auf der Virtual International Authority File Seite',
                                    target: "_blank"
                                    }
                                });
                                    
                                
                                }
                            }
                        }
                         }
                    
                    panel_011 = Ext.create('Ext.panel.Panel', {
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
                        // margin: '0 23 0 10',
                        bodyPadding: 10,
                        bodyBorder: false,
                        border: false,
                        items:[]
                    });
                    //titel_group.add(panel_0);
                    me.add(panel_011);
                 
                    if (json.gender.length > 0) {
                        var gender = me.createTextFieldWithoutLabel();
                        if (json.gender[0] === 'm') {
                            gender.setValue(GUI_NAMES.person_male);
                        } else if (json.gender[0] === 'f') {
                            gender.setValue(GUI_NAMES.person_female);
                        } else {
                            gender.setValue(GUI_NAMES.person_unknown);
                        }
                        panel_011.add({
                            html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(gender);
                    }
                    
                    if (json.birthdates !== undefined) {
                        var birthdateBlocks = json.birthdates;
                        var arr = Object.keys(birthdateBlocks).map(function (key) {
                            return birthdateBlocks[key];
                        });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var birthdateBlock = arr[i];
                        var dateText = '';
                            if(birthdateBlock.when !== ''){
                                dateText += ' when: ' +birthdateBlock.when;
                            }
                            if(birthdateBlock.notAfter !== ''){
                                dateText += ', notAfter: ' +birthdateBlock.notAfter;
                            }
                            if(birthdateBlock.notBefore !== ''){
                                dateText += ', notBefore: ' +birthdateBlock.notBefore;
                            }
                            if(birthdateBlock.cert !== ''){
                                dateText += ', cert: ' +birthdateBlock.cert;
                            }
                  
                        var birth = me.createTextFieldWithoutLabel();
                        birth.setValue(dateText);
                        panel_011.add({
                            html: '<img src="resources/images/Snowflake.png" style="width:25px;height:25px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(birth);
                        }
                    }
                    
                    if (json.birthplaces !== undefined) {
                        var birthplaceBlocks = json.birthplaces;
                        var arr = Object.keys(birthplaceBlocks).map(function (key) {
                            return birthplaceBlocks[key];
                        });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var birthplaceBlock = arr[i];
                        var dateText = '';
                            if(birthplaceBlock.settlement !== ''){
                                dateText += ' settlement: ' +birthplaceBlock.settlement;
                            }
                            if(birthplaceBlock.ref !== ''){
                                dateText += ', ref: ' +birthplaceBlock.ref;
                            }
                            if(birthplaceBlock.cert !== ''){
                                dateText += ', cert: ' +birthplaceBlock.cert;
                            }
                  
                        var birth = me.createTextFieldWithoutLabel();
                        birth.setValue(dateText);
                        panel_011.add({
                            html: '<img src="resources/images/Snowflake.png" style="width:25px;height:25px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(birth);
                        }
                    }
                    
                    if (json.deathdates !== undefined) {
                    
                         var deathdateBlocks = json.deathdates;
                        var arr = Object.keys(deathdateBlocks).map(function (key) {
                            return deathdateBlocks[key];
                        });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var deathdateBlock = arr[i];
                        var dateText = '';
                            if(deathdateBlock.when !== ''){
                                dateText += ' when: ' +deathdateBlock.when;
                            }
                            if(deathdateBlock.notAfter !== ''){
                                dateText += ', notAfter: ' +deathdateBlock.notAfter;
                            }
                            if(deathdateBlock.notBefore !== ''){
                                dateText += ', notBefore: ' +deathdateBlock.notBefore;
                            }
                            if(deathdateBlock.cert !== ''){
                                dateText += ', cert: ' +deathdateBlock.cert;
                            }
                  
                        var death = me.createTextFieldWithoutLabel();
                        death.setValue(dateText);
                        panel_011.add({
                            html: '<img src="resources/images/Cross.png" style="width:23px;height:19px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(death);
                        }
          
                    }
                    
                    if (json.deathplaces !== undefined) {
                        var deathplaceBlocks = json.deathplaces;
                        var arr = Object.keys(deathplaceBlocks).map(function (key) {
                            return deathplaceBlocks[key];
                        });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var deathplaceBlock = arr[i];
                        var dateText = '';
                            if(deathplaceBlock.settlement !== ''){
                                dateText += ' settlement: ' +deathplaceBlock.settlement;
                            }
                            if(deathplaceBlock.ref !== ''){
                                dateText += ', ref: ' +deathplaceBlock.ref;
                            }
                            if(deathplaceBlock.cert !== ''){
                                dateText += ', cert: ' +deathplaceBlock.cert;
                            }
                  
                        var birth = me.createTextFieldWithoutLabel();
                        birth.setValue(dateText);
                        panel_011.add({
                            html: '<img src="resources/images/Cross.png" style="width:23px;height:19px;">',
                            border: false
                            //margin: '0 0 -11 0'
                        });
                        panel_011.add(birth);
                        }
                    }
                    
                    
                   if(json.residences !== undefined){
                        var residenceBlocks = json.residences;
                var arr = Object.keys(residenceBlocks).map(function (key) {
                    return residenceBlocks[key];
                });
               
                    
                    for (var i = 0; i < arr.length; i++) {
                        
                        var residenceBlock = arr[i];
                        
                        
                       /* if(persNameBlocks.alt.length > 0){
                            for(var j = 0; j < persNameBlocks.alt.length; j++){
                                var oneReg = persNameBlocks.alt[j];
                                var lang = '';
                            if(oneReg[2] !== undefined){
                                lang = '('+oneReg[2]+')';
                            }
                            var regular = me.createTextField(GUI_NAMES.personNameField_alt + lang);
                            var regText = '';
                            if(oneReg[0] !== undefined){
                                regText = oneReg[0];
                            }
                            if(oneReg[1] !== undefined){
                                regText += ', '+oneReg[1];
                            }
                            regular.setValue(regText);
                            name_panel.add(regular);
                            
                                
                            }
                            
                        }*/
                                          
                        
                
                    }
                    
               
                       
                   }
                    if (json.occupations.length > 0) {
                        
                    for (var i = 0; i < json.occupations.length; i++) {
                        
                        var residenceBlock = json.occupations[i];
                        
                        
                        /*if(persNameBlocks.alt.length > 0){
                            for(var j = 0; j < persNameBlocks.alt.length; j++){
                                var oneReg = persNameBlocks.alt[j];
                                var lang = '';
                            if(oneReg[2] !== undefined){
                                lang = '('+oneReg[2]+')';
                            }
                            var regular = me.createTextField(GUI_NAMES.personNameField_alt + lang);
                            var regText = '';
                            if(oneReg[0] !== undefined){
                                regText = oneReg[0];
                            }
                            if(oneReg[1] !== undefined){
                                regText += ', '+oneReg[1];
                            }
                            regular.setValue(regText);
                            name_panel.add(regular);
                            
                                
                            }
                            
                        }*/
                                          
                        
                
                    }
                    
               
                        
                       
                    }
                    
                     /*if (typeof json.summaryText[0] !== 'undefined') {
                        //var summary = me.createTextArea(GUI_NAMES.person_description);
                        var notes = json.summaryText[0];
                        
                        //summary.setValue(notes);
                        //summary.setHeight(150);
                        
                        /\*var annot_panel = Ext.create('Ext.panel.Panel', {
                        border: false,
                        //bodyPadding: 10,
                        margin: '0 10 0 10',
                        items:[]
                        });
                        me.add(annot_panel);
                        annot_panel.add(summary);*\/
                        var right_panel = Ext.create('Ext.panel.Panel', {
                            layout: {
                                type: 'table',
                                columns: 2,
                                tdAttrs: {
                                    valign: 'top'
                                }
                            },
                            margin: '0 0 10 0',
                            autoScroll: true,
                            border: false,
                            items:[ {
                                xtype: 'label',
                                html: '<b style="color:gray; font-size: 10px;">' + GUI_NAMES.person_description + ':</b>'
                            }, {
                                html: notes,
                                margin: '0 0 0 65',
                                border: false
                            }]
                        });
                        me.add(right_panel);
                    }
                    
                    */
                }
              
                }
        });
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