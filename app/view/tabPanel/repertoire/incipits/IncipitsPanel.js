Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'layout-absolute',
    layout: 'absolute',
    defaults: {
        frame: true
    },
    border: false,
    bodyBorder: false,
    autoScroll: true,
    reserveScrollbar: true,
    
    /*style: {
    borderLeft: '3px solid #A80016',
    borderRight: '3px solid #A80016',
    borderTop: '3px solid #A80016',
    borderBottom: '3px solid #A80016'
    },*/
    
    
    /*autoScroll: true,
    reserveScrollbar: true,
    flex: 1,
    /\*
    width: 850,
    height:450,*\/
    
    layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
    },
    
    bodyPadding: 5,
    
    defaults: {
    frame: true
    },
    
    
    bodyBorder: false,
    border: false,*/
    
    bodyStyle: {
        "background-color": "CCCCCC"
    },
    
    sourceID: null,
    in_panel: null,
    
    initComponent: function () {
        
        var me = this;
        
        /*Ext.Ajax.request({
        //url: "data/test.mei",
        url: "resources/xql/getIncipit.xql",
        method: 'GET',
        params: {
        sourceID: me.sourceID
        },
        success: function (response) {
        
        var text = response.responseText;
        var splittest = text.split('<html>');
        for (i = 0; i < splittest.length; i++) {
        var meiE_tmp = splittest[i];
        var meiE = meiE_tmp.replace('</html>', '');
        if (meiE !== '') {
        var xmlFile = jQuery.parseXML(meiE);
        var meiElements = xmlFile.getElementsByTagName('title');
        
        var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({
        title: '<b style="color:gray;">' + meiElements[0].getAttribute('label') + '</b>'
        });
        me.add(incipitSection);
        incipitSection.setTextInfo(meiE);
        }
        }
        }
        });*/
        var messageWindow = Ext.MessageBox.show({
            // title: 'Load Incipits',
            msg: 'Loading...'
            //buttons: Ext.MessageBox.OK
        });
        Ext.Ajax.request({
            //url: "data/test.mei",
            url: "resources/xql/getIncipit.xql",
            method: 'GET',
            params: {
                sourceID: me.sourceID
            },
            success: function (response) {
                
                var text = response.responseText;
                var splittest = text.split('<html>');
                
                var xPosition = 200 *(splittest.length -1);
                var reverseitemObjs = new Array();
                
                
                for (i = splittest.length -1; i > -1; i--) {
                    xPosition = xPosition -200;
                    
                    var meiE_tmp = splittest[i];
                    var meiE = meiE_tmp.replace('</html>', '');
                    if (meiE !== '') {
                        var xmlFile = jQuery.parseXML(meiE);
                        var meiElements = xmlFile.getElementsByTagName('title');
                        
                        
                        var incipitSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection({
                            titlename: /*'<font size="2" face="Arial" style="color:#A87678;">' +*/ meiElements[0].getAttribute('label')/* + '</b>'*/,
                            width: 200,
                            //height: 400,
                            x: xPosition, y: 50,
                            /*items:[ {
                            
                            xtype: 'label',
                            html: '<b style="color:gray;">' + meiElements[0].getAttribute('label') + '</b>',
                            margin: '0 5 0 10'
                            }],*/
                            listeners: {
                                
                                el: {
                                    
                                    mouseenter: {
                                        
                                        fn: function (event, html, eOpts) {
                                            var me_me = this;
                                            var old_index = -1;
                                            var old_id = null;
                                            var image_itemid = null;
                                            for (i = 0; i < me.items.items.length; i++) {
                                                var image_item = me.items.items[i];
                                                if (image_item.id === me_me.id) {
                                                    image_itemid = image_item.id;
                                                    break;
                                                }
                                            }
                                            
                                            for (i = 0; i < reverseitemObjs.length -1; i++) {
                                                var savesItem = reverseitemObjs[i];
                                                if (savesItem.id === image_itemid) {
                                                    old_index = i;
                                                    old_id = savesItem.id;
                                                    break;
                                                }
                                            }
                                            
                                            var newObjItems = reverseitemObjs.slice(old_index, reverseitemObjs.length);
                                            newObjItems.reverse();
                                            
                                            var newReverseObjItems = reverseitemObjs.slice(0, old_index);
                                            
                                            var newItemsArray = newReverseObjItems.concat(newObjItems);
                                            
                                            var elements = html.getElementsByTagName('b');
                                            var one_el = elements[0];
                                            for (i = 0; i < newItemsArray.length; i++) {
                                                var reorderedItem = newItemsArray[i];
                                                me.insert(i, reorderedItem);
                                                if (i === newItemsArray.length -1) {
                                                    reorderedItem.setDisabled(false);
                                                    me.in_panel.setTitle(/*'<font size="2" face="Arial" style="color:#A87678;">' +*/ reorderedItem.titlename/* + '</b>'*/);
                                                } else {
                                                    reorderedItem.setDisabled(true);
                                                }
                                                // console.log(one_el);
                                                //console.log(reorderedItem.titlename);
                                                // console.log('*********************');
                                                // console.log(one_el);
                                                // console.log(one_el.b);
                                                /*console.log('me_me.id');
                                                console.log(incipitSection.titlename);*/
                                                
                                                /* if(reorderedItem.titlename.indexOf(one_el) != -1){
                                                
                                                reorderedItem.setDisabled(false);
                                                }
                                                else
                                                
                                                if(old_id === reorderedItem.id){
                                                
                                                reorderedItem.setDisabled(true);
                                                }*/
                                                //console.log(me_me);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        me.add(incipitSection);
                        
                        
                        
                        incipitSection.setTextInfo(meiE);
                        incipitSection.add({
                            
                            xtype: 'label',
                            html: '<b style="color:gray;">' + meiElements[0].getAttribute('label') + '</b>'
                            //margin: '15 15 15 15'
                        });
                        me.in_panel.setTitle(/*'<font size="2" face="Arial" style="color:#A87678;">' + */meiElements[0].titlename/* + '</b>'*/);
                        reverseitemObjs[splittest.length -1 - i] = incipitSection;
                    }
                    
                    if (i === 0) {
                        messageWindow.close();
                        incipitSection.setDisabled(false);
                    } else {
                        incipitSection.setDisabled(true);
                    }
                }
            }
        });
        
        
        
        /*Ext.Ajax.request({
        url: "resources/xql/getIncipitImages.xql",
        method: 'GET',
        params: {
        sourceID: me.sourceID
        },
        success: function (response) {
        
        var text = jQuery.parseJSON(response.responseText);;
        var imageNames = text.names;
        //console.log(imageNames);
        var xPosition = 50*(imageNames.length+1);
        var reverseitemObjs = new Array();
        
        for(i = imageNames.length-1; i > -1 ; i--){
        xPosition = xPosition-50;
        var imageName = imageNames[i];
        var imagePath = '/exist/rest/db/apps/theater-data/incipitimages/H020263/'+imageName;
        var item_1 = Ext.create('Ext.panel.Panel',
        { width: 200, height: 400,
        title: imageName,
        items: [
        { xtype: 'image', //padding: 3,
        src: imagePath
        }],
        listeners: {
        
        el: {
        /\*mouseover: {
        fn: function (event, html, eOpts) {
        console.log('mouseover');
        }
        },*\/
        
        mouseenter: {
        
        fn: function (event, html, eOpts) {
        var me_me = this;
        var old_index = -1;
        var image_itemid = null;
        for(i = 0; i < me.items.items.length; i++){
        var image_item = me.items.items[i];
        if(image_item.id === me_me.id){
        image_itemid = image_item.id;
        break;
        }
        }
        
        for(i = 0; i < reverseitemObjs.length-1 ; i++){
        var savesItem = reverseitemObjs[i];
        if(savesItem.id === image_itemid){
        old_index = i;
        break;
        }
        }
        
        var newObjItems = reverseitemObjs.slice(old_index, reverseitemObjs.length);
        newObjItems.reverse();
        
        var   newReverseObjItems = reverseitemObjs.slice(0, old_index);
        
        var newItemsArray = newReverseObjItems.concat(newObjItems);
        
        
        for(i = 0; i < newItemsArray.length ; i++){
        var reorderedItem = newItemsArray[i];
        me.insert(i, reorderedItem);
        
        }
        
        }
        
        
        }
        }
        },
        x: xPosition,
        y: 50
        // margin: '0 5 5 5'
        /\*listeners: {
        
        afterrender: function(component) {
        console.log('Y: ' + component.getY() +' X: '+ component.getX());
        component.setPosition(500, 800);
        console.log('Y: ' + component.getY() +' X: '+ component.getX());
        
        }
        }*\/
        });
        
        me.add(item_1);
        reverseitemObjs[imageNames.length-1-i] =item_1;
        }
        
        }
        });*/
        
        
        me.callParent();
    }
});