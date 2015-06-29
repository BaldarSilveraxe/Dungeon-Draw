var DungeonDrawDoors = DungeonDrawDoors || (function(){
    'use strict';
    //version = 3.1
    //lastUpdate = 1430236079 //Unix timestamp
    //schemaVersion = 3.1
    
    var defaultTexture = 'Old School|#18769c',
    
    //light settings
    light_radius_setting = 30,
    light_dimradius_setting = 10,
    
    toggleIcon = 'https://s3.amazonaws.com/files.d20.io/images/8434850/ijzdctgdJpFj_Q2NC9GFvg/thumb.png?1427221316',
    
    currentTiles,
    
    macrosInstall = function() {
        var controller = findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0] || 
                createObj('character', {name: 'Door-And-Torch-Control', avatar: toggleIcon}),
            ability = findObjs({_type: 'ability', name: '⇕-Toggle-Feature', characterid: controller.get('id')})[0] || 
                createObj('ability', {name: '⇕-Toggle-Feature', characterid: controller.get('id'), action: '!DungeonMapperDoorsToggle', istokenaction: true});
        
        return controller.get('id');
    },
    
    checkSelect = function(obj) {
        var token;
        
        if ( obj === undefined ) {return false; }
        if ('graphic' !== obj._type) {return false; }
        
        token = getObj('graphic', obj._id);
        
        if ('objects' !== token.get('layer')) {return false; }
        return true;
    },
    
    dungeonMapperDoorsToggle = function(message) {
        var selected = _.first(message.selected),
            objCheck = checkSelect(selected),
            token,
            name,
            id,
            pack = [],
            packName,
            findPaths,
            a, b;
        
        if ( false === objCheck ) {return; }    
        token = getObj('graphic', selected._id);
        name = token.get('name');
        id = token.get('id');
        
        pack = _.where(currentTiles, {url: token.get('imgsrc')});
        packName = pack[0].pack;
        pack = _.where(currentTiles, {pack: packName});
        
        switch(name) {
            case 'DD_021':
            case 'DD_022':
                a = _.where(pack, {key: 'DD_021'})[0].url;
                b = _.where(pack, {key: 'DD_022'})[0].url;
                token.set({
                    imgsrc: (token.get('imgsrc') === a ? b : a),
                    name: (token.get('name') === 'DD_021' ? 'DD_022' : 'DD_021')
                    });
            break;
            case 'DD_023':
            case 'DD_024':
                a = _.where(pack, {key: 'DD_023'})[0].url;
                b = _.where(pack, {key: 'DD_024'})[0].url;
                token.set({
                    imgsrc: (token.get('imgsrc') === a ? b : a),
                    name: (token.get('name') === 'DD_023' ? 'DD_024' : 'DD_023')
                    });
            break;
            case 'DD_025':
            case 'DD_026':
                a = _.where(pack, {key: 'DD_025'})[0].url;
                b = _.where(pack, {key: 'DD_026'})[0].url;
                token.set({
                    imgsrc: (token.get('imgsrc') === a ? b : a),
                    name: (token.get('name') === 'DD_025' ? 'DD_026' : 'DD_025')
                    });
            break;
            case 'DD_027':
            case 'DD_028':
                a = _.where(pack, {key: 'DD_027'})[0].url;
                b = _.where(pack, {key: 'DD_028'})[0].url;
                token.set({
                    imgsrc: (token.get('imgsrc') === a ? b : a),
                    name: (token.get('name') === 'DD_027' ? 'DD_028' : 'DD_027')
                    });
            break;
            case 'DD_029':
            case 'DD_030':
                a = _.where(pack, {key: 'DD_029'})[0].url;
                b = _.where(pack, {key: 'DD_030'})[0].url;
                token.set({
                    imgsrc: (token.get('imgsrc') === a ? b : a),
                    name: (token.get('name') === 'DD_029' ? 'DD_030' : 'DD_029')
                    });
            break;
        }
        
        refreshGraphic(token);
    },
    
    pathingRotation = function(angle, point,width,height) {
        var pointX = point[0], pointY = point[1], originX = (width/2), originY = (height/2);
        angle = angle * Math.PI / 180.0;
        return [
            Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
            Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
        ];
    },
    
    placeRotatedFlipPaths = function(givenPathData) {
        var temp, i, newX, newY, inputPath, angle, Xoffset, Yoffset, PathArray, maxX, minX, maxY, minY, objectWidth, objectHeight,
            objectTop, objectLeft, pathString, graphicID, newPath; 
        _.each(givenPathData, function(given) {
            temp = [];
            for(i = 0; i < given.path.length; i++) {
                newX = given.path[i][0];
                newY = given.path[i][1];
                if(given.fliph){newX = given.width - given.path[i][0]; }
                if(given.flipv){newY = given.height - given.path[i][1]; }
                temp.push([newX, newY]);
            }
            given.path = temp;
            graphicID = given.forID;
            inputPath = given.path;
            angle = given.rotation;
            Xoffset = given.left - (given.width/2);
            Yoffset = given.top - (given.height/2);
            PathArray = []; 
            if(!angle) {angle = 0; }
            if(!Xoffset) {Xoffset = 0; }
            if(!Yoffset) {Yoffset = 0; }
            maxX = 0;
            minX = false;
            maxY = 0;
            minY = false;
            for(i = 0; i < inputPath.length; i++) {
                PathArray.push([inputPath[i][0], inputPath[i][1]]);
                PathArray[i] = pathingRotation(angle, PathArray[i],given.width,given.height);
                if(PathArray[i][0] > maxX) {maxX = PathArray[i][0]; }
                if(minX === false || Number(PathArray[i][0]) < Number(minX)) {minX = PathArray[i][0]; }
                if(PathArray[i][1] > maxY) {maxY = PathArray[i][1]; }
                if(minY === false || PathArray[i][1] < minY) {minY = PathArray[i][1]; }
            }
            objectWidth = maxX - minX;
            objectHeight = maxY - minY;
            objectTop = minY + (objectHeight/2); 
            objectLeft = minX + (objectWidth/2);
            for(i = 0; i < PathArray.length; i++) {
                PathArray[i][0] = PathArray[i][0] - minX;
                PathArray[i][1] = PathArray[i][1] - minY;
            }
            pathString = "";
            for(i = 0; i < PathArray.length; i++) {
                if(i != 0) {
                    pathString += ",[\"L\"," + PathArray[i][0] + "," + PathArray[i][1] + "]";
                } else {
                    pathString = "[\[\"M\"," + PathArray[i][0] + "," + PathArray[i][1] + "]";  
                }
            }
            pathString += "\]";
            objectTop = objectTop + Yoffset; 
            objectLeft = objectLeft + Xoffset;
            given.path = pathString;
            given.left = objectLeft;
            given.top = objectTop;
            createObj('path',{ 
                pageid: given.page, 
                layer: 'walls', 
                path: given.path,
                left: given.left,
                top: given.top,
                width: objectWidth, 
                height: objectHeight, 
                rotation: 0,
                fliph: false,
                flipv: false,
                stroke: given.stroke,
                stroke_width: given.strokewidth,
                controlledby: graphicID
            });
        });  
    },
    
    checkInstall = function() {
        var installedTextures = [],
            i,
            tempPack = [],
            foundTiles = [];
        
        macrosInstall();
        Object.keys(DungeonDrawTiles).forEach(function(key) {
            installedTextures.push(key);
        });
        
        currentTiles = [];
        for (i = 0; i < installedTextures.length; i++) {
            tempPack = _.clone(DungeonDrawTiles[installedTextures[i]]);
            foundTiles = _.where(tempPack, {value: 255, mask: 0});
            _.each(foundTiles, function(eachTile) {
                currentTiles.push({
                    url: eachTile.url,
                    key: eachTile.key,
                    value: eachTile.value,
                    mask: eachTile.mask,
                    pack: installedTextures[i]
                });
            });
        }
    },
    
    handleGraphicDestroy = function(obj) {
        var foundTiles,
            locatedPaths = findObjs({                                                          
                _type: 'path',
                controlledby: obj.get('_id')
            });
        
        foundTiles = _.where(currentTiles, {key: obj.get('name')});
        if( 0 === foundTiles.length) {
            return;
        }
        if ( (255 !== foundTiles[0].value) && (0 !== foundTiles[0].mask) ){
            return;
        }
        
        _.each(locatedPaths, function(eachPath) {
            if (eachPath.length !== 0) { 
                eachPath.remove();
            }
        });
    },
    
    refreshGraphic = function(obj) {
        var ObjValues,
            foundTiles,
            locatedPaths,
            featurePathArray = [];
            
        ObjValues = _.reduce(['name','pageid','rotation','left','top','flipv','fliph','id', 'imgsrc'],function(m,prop){
            m[prop] = obj.get(prop);
            return m;
        }, {});

        foundTiles = _.where(currentTiles, {url: ObjValues.imgsrc});
        if( 0 === foundTiles.length) {
            return;
        }
        if ( (255 !== foundTiles[0].value) && (0 !== foundTiles[0].mask) ){
            return;
        }
        
        switch(ObjValues.name) {
            case 'DD_031':
            case 'DD_032':
                //stairs
                obj.set({
                    width: 140,
                    height: 140,
                });
                featurePathArray.push({
                    width: 140,
                    height: 140,
                    top: ObjValues.top,
                    left: ObjValues.left,
                    rotation: ObjValues.rotation,
                    fliph: ObjValues.fliph,
                    flipv: ObjValues.flipv,
                    path: [[0,141],[0,0],[140,0],[140,141]],
                    stroke: '#FF0000',
                    strokewidth: 3,
                    forID: ObjValues.id,
                    page: ObjValues.pageid
                });
            break;
            case 'DD_029':
            case 'DD_030':
                //bars
                obj.set({
                    width: 140,
                    height: 140,
                    layer: 'objects',
                    represents: findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0].get('_id')
                });
            break;
            case 'DD_025':
            case 'DD_027':
                //light sources ON
                obj.set({
                    width: 140,
                    height: 140,
                    light_radius: light_radius_setting,
                    light_dimradius: light_dimradius_setting,
                    light_otherplayers: true,
                    layer: 'objects',
                    represents: findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0].get('_id')
                });
            break;
            case 'DD_026':
            case 'DD_028':
                //lights OFF
                obj.set({
                    width: 140,
                    height: 140,
                    light_radius: 0,
                    light_dimradius: light_dimradius_setting,
                    light_otherplayers: true,
                    layer: 'objects',
                    represents: findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0].get('_id')
                });
            break;
            case 'DD_021':
            case 'DD_022':
                obj.set({
                    width: 140,
                    height: 140,
                    layer: 'objects',
                    represents: findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0].get('_id')
                });
                //Door Wall
                featurePathArray.push({
                    width: 140,
                    height: 140,
                    top: ObjValues.top,
                    left: ObjValues.left,
                    rotation: ObjValues.rotation,
                    fliph: ObjValues.fliph,
                    flipv: ObjValues.flipv,
                    path: [[75,65],[141,65],[141,70]],
                    stroke: '#FF0000',
                    strokewidth: 3,
                    forID: ObjValues.id,
                    page: ObjValues.pageid
                });
                
                if( 'DD_021' === ObjValues.name ) {
                    //Door Open
                    featurePathArray.push({
                        width: 140,
                        height: 140,
                        top: ObjValues.top,
                        left: ObjValues.left,
                        rotation: ObjValues.rotation,
                        fliph: ObjValues.fliph,
                        flipv: ObjValues.flipv,
                        path: [[75,65],[65,75],[75,125]],
                        stroke: '#FF0000',
                        strokewidth: 3,
                        forID: ObjValues.id,
                        page: ObjValues.pageid
                    });
                }else{
                    //DoorClosed
                    featurePathArray.push({
                        width: 140,
                        height: 140,
                        top: ObjValues.top,
                        left: ObjValues.left,
                        rotation: ObjValues.rotation,
                        fliph: ObjValues.fliph,
                        flipv: ObjValues.flipv,
                        path: [[0,70],[0,65],[76,65]],
                        stroke: '#FF0000',
                        strokewidth: 3,
                        forID: ObjValues.id,
                        page: ObjValues.pageid
                    });
                }
            break;  
            case 'DD_023':
            case 'DD_024':
                obj.set({
                    width: 140,
                    height: 140,
                    layer: 'objects',
                    represents: findObjs({ _type: 'character', name: 'Door-And-Torch-Control'})[0].get('_id')
                });
                if( 'DD_023' === ObjValues.name) {
                    featurePathArray.push({
                        width: 140,
                        height: 140,
                        top: ObjValues.top,
                        left: ObjValues.left,
                        rotation: ObjValues.rotation,
                        fliph: ObjValues.fliph,
                        flipv: ObjValues.flipv,
                        path: [[140,70],[140,65],[125,65],[115,128]],
                        stroke: '#FF0000',
                        strokewidth: 3,
                        forID: ObjValues.id,
                        page: ObjValues.pageid
                    });  
                    featurePathArray.push({
                        width: 140,
                        height: 140,
                        top: ObjValues.top,
                        left: ObjValues.left,
                        rotation: ObjValues.rotation,
                        fliph: ObjValues.fliph,
                        flipv: ObjValues.flipv,
                        path: [[0,70],[0,65],[15,65],[25,128]],
                        stroke: '#FF0000',
                        strokewidth: 3,
                        forID: ObjValues.id,
                        page: ObjValues.pageid
                    });
                }else{    
                    featurePathArray.push({
                        width: 140,
                        height: 140,
                        top: ObjValues.top,
                        left: ObjValues.left,
                        rotation: ObjValues.rotation,
                        fliph: ObjValues.fliph,
                        flipv: ObjValues.flipv,
                        path: [[0,70],[0,65],[140,65],[140,70]],
                        stroke: '#FF0000',
                        strokewidth: 3,
                        forID: ObjValues.id,
                        page: ObjValues.pageid
                    });
                }
            break;
        }
        locatedPaths = findObjs({                                                          
            _type: 'path',
            controlledby: ObjValues.id
        });
        _.each(locatedPaths, function(eachPath) {
            if (eachPath.length !== 0) { 
                eachPath.remove();
            }
        });
        
        placeRotatedFlipPaths(featurePathArray);
        toFront(obj);
    },
    
    handleGraphicChange = function(obj) {
        var ObjValues,
            foundTiles;
            
        ObjValues = _.reduce(['name','pageid','rotation','left','top','flipv','fliph','id', 'imgsrc'],function(m,prop){
            m[prop] = obj.get(prop);
            return m;
        }, {});

        foundTiles = _.where(currentTiles, {url: ObjValues.imgsrc});
        if( 0 === foundTiles.length) {
            return;
        }
        if ( (255 !== foundTiles[0].value) && (0 !== foundTiles[0].mask) ){
            return;
        }
        
        refreshGraphic(obj);
    },
    
    
    handleInput = function(msg) {
        var message = _.clone(msg), args;
        
        if ( 'api' !== message.type ) {
            return; 
        }
        
        args = msg.content.split(/\s+/);
        
        switch(args[0]) { 
            case '!DungeonMapperDoorsToggle': 
                dungeonMapperDoorsToggle(message); 
            break;
        };
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
        on('change:graphic', handleGraphicChange);
        on('destroy:graphic', handleGraphicDestroy);
        checkInstall();
    };
    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    }; 
}());

on('ready',function(){
    'use strict';
    DungeonDrawDoors.RegisterEventHandlers();
});
