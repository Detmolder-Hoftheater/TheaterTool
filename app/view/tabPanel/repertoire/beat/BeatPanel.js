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
        var editFile = null;
        console.log(me.selectedWork);
        if (me.selectedWork === 'H020149') {
            selFolder = 'aschenbroedel';
            editFile = 'aschenbroedel/edition-HT_Isouard.xml';
        } else if (me.selectedWork === 'H020263') {
            selFolder = 'bettelstudent';
            editFile = 'bettelstudent/edition-HT_Bettelstudent.xml';
        } else if (me.selectedWork === 'H020048') {
            selFolder = 'desTeufelsAnteil';
            editFile = 'desTeufelsAnteil/edition-Auber_DesTeufelsAnteil.xml';
        } else if (me.selectedWork === 'H020076') {
            selFolder = 'unbekannte';
            editFile = 'unbekannte/edition.xml';
        }else if (me.selectedWork === 'H020166' && me.sourceID !== 'H220246') {
            selFolder = 'edition-HT_Joseph';
             editFile = 'joseph/edition_Joseph_DT.xml';
        }else if (me.selectedWork === 'H020224') {
            selFolder = 'yelvaLortz';
            editFile = 'yelvaLortzing/edition_Yelva_Lortzing.xml';
        }else if (me.selectedWork === 'H021013') {
            selFolder = 'yelvaReissiger';
            editFile = 'yelvaReissiger/edition_Yelva_Reissiger.xml';
        }else if (me.selectedWork === 'H020261') {
            selFolder = 'edition_Der_Mueller';
            editFile = 'muellerBalett/edition_MuellerBalett.xml';
        }else if (me.selectedWork === 'H020090') {
            selFolder = 'kapellmeister';
            editFile = 'derKapellmeister/edition_DerKapellmeister.xml';
        }else if (me.sourceID === 'H220246') {
            selFolder = 'edition_Dresden_Joseph';
            editFile = 'josephDresden/edition_Joseph_Dresden.xml';
        }
        
        var folderForEO = selFolder + '/';
        
        if (me.selectedWork === 'H020090' || me.sourceID === 'H220246') {
           
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 25,
                items:[ {
                    style: {
                        background: 'white'
                    },
                    border: false,
                    fixed: true,
                    height: 30,
                    html: '<i>Die Faksimiles werden noch nicht angezeigt. Die Seite ist noch in Bearbeitung.</i>',
                    style: 'display:block; padding:5px 0px 5px 10px; background: white;'
                },
                {
                    xtype: 'component',
                    margin: '0 0 0 13',
                    autoEl: {
                        tag: 'a',                       
                        href: 'https://edirom.hoftheater-detmold.de/index.html?edition=xmldb:exist:///db/apps/theater-data/vertaktung/' + editFile,
                        html: 'Zur Erschließung mit Edirom Online',
                        target: "_blank"
                    }
                }]
            };
           } 
        else{
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 25,
                items:[ 
                {
                    xtype: 'component',
                    margin: '0 0 0 13',
                    autoEl: {
                        tag: 'a',                       
                        href: 'https://edirom.hoftheater-detmold.de/index.html?edition=xmldb:exist:///db/apps/theater-data/vertaktung/' + editFile,
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