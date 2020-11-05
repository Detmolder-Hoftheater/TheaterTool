Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
    
    extend: 'Ext.panel.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,
    bodyBorder: false,
    
    header: {
        style: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none'
        }
    },
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        frame: true,
        bodyPadding: 10
    },
    
    detailSection: null,
    xmlSection: null,
    navTree: null,
    selectedWork: null,
    
    xmlId: null,
    sourceID: null,
    
    initComponent: function () {
        
        var me = this;
        
        var selFolder = null;
        console.log(me.selectedWork);
        if (me.selectedWork === 'H020149') {
            selFolder = 'aschenbroedel';
        } else if (me.selectedWork === 'H020263') {
            selFolder = 'bettelstudent';
        } else if (me.selectedWork === 'H020048') {
            selFolder = 'desTeufelsAnteil';
        } else if (me.selectedWork === 'H020076') {
            selFolder = 'unbekannte';
        }else if (me.selectedWork === 'H020166') {
            selFolder = 'edition-HT_Joseph';
        }else if (me.selectedWork === 'H020224') {
            selFolder = 'yelvaLortz';
        }else if (me.selectedWork === 'H021013') {
            selFolder = 'yelvaReissiger';
        }else if (me.selectedWork === 'H021013') {
            selFolder = 'edition_Der_Mueller';
        }
        
        var folderForEO = selFolder + '/';
        
        if (me.selectedWork === 'H020166' || me.selectedWork === 'H020224' || me.selectedWork === 'H021013' || me.selectedWork === 'H020261' || me.selectedWork === 'H020090' /*|| me.sourceID === 'H220246'*/) {
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 30,
                html: '<i>Die Faksimiles werden noch nicht angezeigt. Die Seite ist noch in Bearbeitung.</i>',
                style: 'display:block; padding:5px 0px 5px 10px; background: white;'
            };
        } else {
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 25,
                items:[ /*{
                    style: {
                        background: 'white'
                    },
                    border: false,
                    fixed: true,
                    height: 30,
                    html: '<i>Edirom Online ist wegen des Datenbankumzugs noch nicht verfügbar, ist aber in Kürze wieder erreichbar.</i>',
                    style: 'display:block; padding:5px 0px 5px 10px; background: white;'
                },*/ {
                    xtype: 'component',
                    margin: '0 0 0 13',
                    autoEl: {
                        tag: 'a',                       
                        href: 'https://edirom.hoftheater-detmold.de/' + folderForEO,
                        html: 'Zur Erschließung mit Edirom Online',
                        target: "_blank"
                    }
                }]
            };
        }
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView({
            selectedWork: me.selectedWork, xmlId: me.xmlId, sourceID: me.sourceID
        });
        
        var leafletFacsimile = me.detailSection.getLeafletFacsimile();
        var pageSpinner = me.detailSection.getPageSpinner();
        
        me.items =[
        
        me.detailSection];
        
        me.callParent();
    }
});