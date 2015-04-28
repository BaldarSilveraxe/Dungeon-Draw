var DungeonDraw = DungeonDraw || (function(){
    'use strict';
 
    var version = 2.0,
    lastUpdate = 1430236079, //Unix timestamp
    schemaVersion = 2.0,
    
    //settings
    deferred={
        batchSize: 30,
        initialDefer: 10,
        batchDefer: 10
    },
    defaultTexture = 'Old School|#18769c',
    
    //stytem
    seq = (function(seed) {
        var count = seed;
        return function(){
            return ++seed;
        };
    }(0)),
    objExtractKeys = ['id','pageid','stroke','rotation','layer','width','height','top','left','controlledby'],
    
    //seetup and ready
    installedTextures = [], //Keys for all installed textures.
    currentPageId = [],     //Player's bookmark tab.
    currentTiles = [],      //Current pack loaded.
    currentTextureName,     //Current pack name.
    allTexturesTiles = [],  //All Textures with pack name.
    bitTiles = [],          //All Tiles spun with value and mask
    
    //Operational
    pathUndo = [],
    DungeonDrawProcessing = false,
    placementTiles = [],
    placeSeek = [],
    featurePathArray = [],
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Utility fucntions.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DungeonDrawMenu = function() {
        var i = 0,
            tilesDataUniq,
            tableText = DungeonDrawDirect['TopMenu'],
            menuText = '/direct ';
            
        tilesDataUniq = _.chain(currentTiles)
            .reduce(function(m,e){
            m[e.key+e.url.split(/\?/)[0]]={key: e.key, url: e.url};
            return m;
        },{})
        .values()
        .value();
        
        sendChat('Dungeon Draw Tools', ' ');
        
        tableText += '</div>';
        
        while (i < tilesDataUniq.length) {
            tableText += DungeonDrawDirect['RowMenu'];
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + tilesDataUniq[i].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + tilesDataUniq[i].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + tilesDataUniq[i + 1].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + tilesDataUniq[i + 1].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + tilesDataUniq[i + 2].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + tilesDataUniq[i + 2].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + tilesDataUniq[i + 3].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + tilesDataUniq[i + 3].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += '</div>';
            i = i + 4;
        }
        
        sendChat("Current Tiles", '/direct ' + tableText);
        
        menuText += DungeonDrawDirect['!DungeonDrawUndo'];
        menuText += DungeonDrawDirect['!DungeonDrawClear'];
        menuText += DungeonDrawDirect['!DungeonDrawMap'];
        menuText += DungeonDrawDirect['!DungeonDrawColor']; 
        menuText += DungeonDrawDirect['!DungeonDrawChange'];
        if( true === state.DungeonDraw.drawMode ){
            menuText += DungeonDrawDirect['DungeonDrawModeTrue'];
        }else{
            menuText += DungeonDrawDirect['DungeonDrawModeFalse'];
        }
        sendChat('Main Menu', menuText);
    },
    
    directTokenAdd = function (key) {
        var page,
            pageId,
            thisTile,
            center,
            middle,
            keyArguments,
            newObj,
            widthHeight = 70;
            
        pageId = Campaign().get('playerpageid');
        page = getObj('page', pageId);
        center = page.get('width') * 35;
        middle = page.get('height') * 35;
        
        thisTile = _.where(currentTiles, {key: key});
        if( _.isEmpty(thisTile) ) {
            keyArguments = key.split('_');
            if(-1 !== 'GM,Label,Level'.indexOf(keyArguments[0])){
                thisTile = _.where(gmSpecial, {key: key});
                newObj = createObj('graphic', {
                    type: 'graphic', 
                    subtype: 'token', 
                    pageid: pageId, 
                    layer: 'map', 
                    width: 70, 
                    height: 70,
                    left: center, 
                    top: middle, 
                    imgsrc: thisTile[0].url,
                    name: key,
                    controlledby: 'DungeonDrawGraphic'
                });
            setTimeout(function() {toFront(newObj); }, 500);
            }
            return; 
        }
        if ( (255 === thisTile[0].value) && (0 === thisTile[0].mask) ) {
            widthHeight = 140;
            if( ('DD_017' === thisTile[0].key) || ('DD_018' === thisTile[0].key) || ('DD_019' === thisTile[0].key) || ('DD_020' === thisTile[0].key)  )
                widthHeight = 70;
            }
        newObj = createObj('graphic', {
            type: 'graphic', 
            subtype: 'token', 
            pageid: pageId, 
            layer: 'map', 
            width: widthHeight, 
            height: widthHeight,
            left: widthHeight === 140 ? (center + 35) : center,
            top: widthHeight === 140 ? (middle + 35) : middle,
            imgsrc: thisTile[0].url, 
            name: key,
            controlledby: 'DungeonDrawGraphic'
        });
        setTimeout(function() {toFront(newObj); }, 500);
        newObj.set('gmnotes', newObj.get('id'));
    },
    
    colorMap = function() {
        var page = getObj('page', Campaign().get('playerpageid')),
            args = state.DungeonDraw.currentTextureName.split('|');
            
        if( _.isEmpty(page) ){return; }
        if( (false === /^#[0-9A-F]{6}$/.test(args[1])) && (2 !== args.length) ){return; }
        page.set('background_color', args[1]);
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
            objectTop, objectLeft, pathString, graphicID; 
            
        _.each(givenPathData, function(given) {
            temp = [];
            for(i = 0; i < given.path.length; i = i + 1) {
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
            for(i = 0; i < inputPath.length; i = i + 1) {
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
            for(i = 0; i < PathArray.length; i = i + 1) {
                PathArray[i][0] = PathArray[i][0] - minX;
                PathArray[i][1] = PathArray[i][1] - minY;
            }
            pathString = "";
            for(i = 0; i < PathArray.length; i = i + 1) {
                if(i !== 0) {
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
                pageid: Campaign().get('playerpageid'), 
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
    
    forceProperPlacementAddDL = function(obj,left,top,rotation,id,foundTile) {
        var newTop = (Math.round((top - 35)/70)*70) + 35,
            newLeft = (Math.round((left - 35)/70)*70) + 35,
            newRotation = (Math.round(rotation/90)*90)%360 + (rotation<0 ? 360 : 0),
            bitCount,
            pathValue;
            
        obj.set({
            rotation: newRotation,
            flipv: false,
            fliph: false,
            width: 70,
            height: 70,
            top: newTop,
            left: newLeft
        });
        _.each( findObjs({_type: 'path', controlledby: id}), function(eachPath) {
            eachPath.remove();
        });
        featurePathArray = [];
            for (bitCount = 0; bitCount < 8; bitCount = bitCount + 1) {
                if (!(foundTile.dlBits & (1<<bitCount))) {
                    switch(bitCount + 1) {
                        case 1: pathValue = [[0,-1],[0,71]];  break;
                        case 2: pathValue = [[0,68],[0,70],[2,70]]; break;
                        case 3: pathValue = [[-1,70],[71,70]]; break;
                        case 4: pathValue = [[70,68],[70,70],[68,70]]; break;
                        case 5: pathValue = [[70,-1],[70,71]]; break;
                        case 6: pathValue = [[70,2],[70,0],[68,0]]; break;
                        case 7: pathValue = [[-1,0],[71,0]]; break;
                        case 8: pathValue = [[0,2],[0,0],[2,0]]; break;
                    }
                    if(pathValue){
                        if( false === foundTile.diag ) {
                            featurePathArray.push({
                                width: 70,
                                height: 70,
                                top: newTop,
                                left: newLeft,
                                rotation: newRotation,
                                fliph: false,
                                flipv: false,
                                path: pathValue,
                                stroke: '#FF0000',
                                strokewidth: 3,
                                forID: id
                            });
                        }
                    }
                }
            }
            if( true === foundTile.diag ) {
                featurePathArray.push({
                    width: 70,
                    height: 70,
                    top: newTop,
                    left: newLeft,
                    rotation: newRotation,
                    fliph: false,
                    flipv: false,
                    path: [[0,0],[-1,4],[66,71],[70,70]],
                    stroke: '#FF0000',
                    strokewidth: 3,
                    forID: id
                });
            }
            placeRotatedFlipPaths(featurePathArray);
            setTimeout(function() {toFront(obj); }, 500);
    },
    
    deferredCreateObj = (function(){
        var queue = [],
            creator,
        
        doCreates = function(){
            var done = 0,
                request;
                
            while(queue.length && ++done < deferred.batchSize ){
                request = queue.shift();
                createObj(request.type,request.properties);
            }
            if( queue.length ){
                creator = setTimeout(doCreates, deferred.batchDefer );
            } else {
            creator = false;
            }
        };
        return function(type,properties){
        queue.push({type: type, properties: properties});
        if(!creator){
            creator = setTimeout(doCreates, deferred.initialDefer );
        }
    };
    }()),
    
    setTexture = function(message) {
        var pack = message.replace('!DungeonDrawSetTexture ', ''),
            switchPack = defaultTexture,
            messageArguments;
        
        _.each(installedTextures, function(eachTextures) {
            messageArguments = eachTextures.split('|');
            if( messageArguments[0] === pack ) {switchPack = eachTextures; } 
        });
        
        state.DungeonDraw = {
                version: schemaVersion,
                currentTextureName: switchPack,
                drawMode: (state.DungeonDraw.drawMode === true ? true : false)
            };
            
        currentTiles = _.clone(DungeonDrawTiles[state.DungeonDraw.currentTextureName]);
        currentTextureName = state.DungeonDraw.currentTextureName;
        
        DungeonDrawMenu();
    },
    
    selectTexture = function() {
        var text = '/direct ',
            args;
        
        if( 0 === installedTextures.length) {return; }
        
        _.each(installedTextures, function(eachTextures) {
            args = eachTextures.split('|');
            if( 2 !== args.length){return; }
        });
        _.each(installedTextures, function(eachTextures) {
            args = eachTextures.split('|');
            text += '<br><a href="!DungeonDrawSetTexture ' + args[0] + '"><span  style="color: white; font-weight: normal; display: block; width: 150px;" >▹ ' + args[0] + '</span></a>';
        });
        sendChat('Select Texture', text);
    },
    
    eigthBitClockwise = function(value, degree) {
        var shift = (degree/90) * 2;
        return (((value | (value << 8)) >> shift) & 255);
    },
    
    getObjValue = function(obj, keys) {
        return _.reduce( keys || objExtractKeys, function(m,prop){
            m[prop] = obj.get(prop);
            return m;
        }, {});
    },
    
    pathChecker = function (obj){ 
        var ObjValues = getObjValue(obj, ['layer', 'path']),
            check = true,
            firstX = false, 
            firstY = false,
            lastX, lastY;
        
        _.each(JSON.parse(ObjValues.path), function(eachPoint) {
            if( false === firstX ) {
                firstX = eachPoint[1];
                firstY = eachPoint[2];
            }
            lastX = eachPoint[1];
            lastY = eachPoint[2];
            if( 3 !== eachPoint.length ) {
                check = false;
                return false;
            }
        });
        if ( (lastX !== firstX) || (lastY !== firstY) ) {
            check = false;
        }
        if ( ('map' !== ObjValues.layer) ) {
            check = false;
        }
        return check;
    },
    
    clearMap = function(y) {
        if( 'Y' !== y.toUpperCase() ){return; }
        
        _.each(findObjs({_pageid: Campaign().get('playerpageid'), _type: 'graphic', layer: 'map', controlledby: 'DungeonDrawGraphic'}), function(eachPath) {
            getObj('graphic', eachPath.id).remove();
        });
        
        _.each(findObjs({_pageid: Campaign().get('playerpageid'), _type: 'path', layer: 'map', controlledby: 'DungeonDrawPath'}), function(eachPath) {
            getObj('path', eachPath.id).remove();
        });
        
        pathUndo = [];
    },
    
    drawUndo = function() {
        var lastPathSequence,
            undoThisPath;
            
        if( _.isEmpty(pathUndo) ){
            return;
        }
        lastPathSequence = Math.max.apply(Math,pathUndo.map(function(o){return o.sequence;}));
        undoThisPath = _.where(pathUndo, {sequence: lastPathSequence});
        pathUndo = _.reject(pathUndo,function(o){
                    return undoThisPath[0].id === o.id;
                });  
        getObj('path', undoThisPath[0].id).remove();
    },
    
    snapPathing = function(obj) {
        var ObjValues = getObjValue(obj, ['pageid','layer','path','width','height','top','left']),
            pathResult = '[',
            atX,
            atY,
            largestX = 0,
            largestY = 0,
            top,
            left,
            width,
            height,
            middle,
            center,
            newPathData;
            
        _.each(JSON.parse(ObjValues.path), function(eachPoint) {
            atX = Math.round(eachPoint[1] /70) * 70;
            atY = Math.round(eachPoint[2] /70) * 70;
            if( atX > largestX ) { largestX = atX; }
            if( atY > largestY ) { largestY = atY; }
            pathResult = pathResult + '["' + eachPoint[0] + '",' + atX + ',' + atY + '],';
        });
        pathResult = pathResult.substring(0, pathResult.length - 1);
        pathResult = pathResult + ']';
        width = largestX;
        height = largestY;
        top = Math.ceil(ObjValues.top/35) * 35;
        left = Math.ceil(ObjValues.left/35) * 35;
        
        middle = (Math.round((top - (height / 2))/35) * 35) / 70;
        middle = middle - Math.floor(middle);
        if( 0.5 === middle ) {
            top = top - 35;
        }
        center = (Math.round((left - (width / 2))/35) * 35) / 70;
        center = center - Math.floor(center);
        if( 0.5 === center ) {
            left = left - 35;
        }
        
        newPathData = {
            width: width,
            height: height,
            top: top,
            left: left,
            path: pathResult
        };
        
        return newPathData;
    },
    
    macrosInstall = function() {
        var controller = findObjs({ _type: 'character', name: 'Dungeon-Draw-Connection'})[0] || 
            createObj('character', {name: 'Dungeon-Draw-Connection', avatar: 'https://s3.amazonaws.com/files.d20.io/images/8821111/fBVwB1f2_t7U3k8XrmbKxw/thumb.png?1428953603'}),
            ability = findObjs({_type: 'ability', name: '⇗▀⇘▄-Remove-Replace', characterid: controller.get('id')})[0] || 
            createObj('ability', {name: '⇗▀⇘▄-Remove-Replace', characterid: controller.get('id'), action: '!DungeonRemoveReplace', istokenaction: true});
        
        return controller.get('id');
    },

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Utility fucntions.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Rasie/Lower functions.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getUnderRaise = function(token) {
        var squares = [],
            foundSuqare,
            foundBits,
            theseTiles = [],
            thisPageId = token.get('pageid'),
            tile1,
            tile2,
            tile3,
            tile4,
            currentTileBits,
            seekBits,
            seekPack = 'none',
            seekDegree,
            checkTiles,
            i,
            maskedMapSquare,
            changeTarget;
            
        bitTiles = [];
        getAllBitTiles();
        
        //AND Logic
        squares = [
            {sqr: 1,  left: -70,  top: -70,  outer: false, mask: 247},
            {sqr: 2,  left: 0,    top: -70,  outer: false, mask: 251},
            {sqr: 3,  left: +70,  top: -70,  outer: false, mask: 253},
            {sqr: 4,  left: +70,  top: 0,    outer: false, mask: 254},
            {sqr: 5,  left: +70,  top: +70,  outer: false, mask: 127},
            {sqr: 6,  left: 0,    top: +70,  outer: false, mask: 191},
            {sqr: 7,  left: -70,  top: +70,  outer: false, mask: 223},
            {sqr: 8,  left: -70,  top: 0,    outer: false, mask: 239},
            {sqr: 9,  left: 0,  top: 0,      outer: false, mask: 0  }
        ];
        
        _.each(squares, function(atSquares) {
            foundSuqare = findObjs({                              
                _pageid: thisPageId,                              
                _type: 'graphic',
                layer: 'map',
                width: 70,
                height: 70,
                left: parseInt(token.get('left')) + parseInt(atSquares.left),
                top: parseInt(token.get('top')) + parseInt(atSquares.top),
            });
            foundBits = _.where(bitTiles, {
                url: foundSuqare.length ? foundSuqare[0].get('imgsrc') : 'none',
                degree: foundSuqare.length ? foundSuqare[0].get('rotation') : 'none'
            });                           
            theseTiles.push({
                sqr: atSquares.sqr,
                sqrMask: atSquares.mask,
                updateId: foundSuqare.length ? foundSuqare[0].get('id') : 'none',
                UpdateName: foundSuqare.length ? foundSuqare[0].get('name') : 'none',
                updateRotation: foundSuqare.length ? foundSuqare[0].get('rotation') : 'none',
                updateImgsrc: foundSuqare.length ? foundSuqare[0].get('imgsrc') : 'none',
                updateLeft: foundSuqare.length ? (parseInt(token.get('left')) + atSquares.left) : 'none',
                updateTop: foundSuqare.length ? (parseInt(token.get('top')) + atSquares.top) : 'none',
                value: foundBits.length ? foundBits[0].value : 'none',
                mask: foundBits.length ? foundBits[0].mask : 'none',
                pack: foundBits.length ? foundBits[0].pack : 'none',
            });
        });
        _.each(theseTiles, function(eachTileFlatten) {
            if( 'none' !== eachTileFlatten.UpdateName) {
                currentTileBits = eachTileFlatten.value & eachTileFlatten.mask;
                seekBits = currentTileBits & eachTileFlatten.sqrMask;
                seekPack = eachTileFlatten.pack;
                seekDegree = eachTileFlatten.updateRotation; 
                
                checkTiles = _.where(bitTiles, {pack: seekPack});
                i=0;
                while (i < checkTiles.length) {
                    maskedMapSquare = seekBits & checkTiles[i].mask;
                    if(checkTiles[i].value === maskedMapSquare){
                        getObj('graphic', eachTileFlatten.updateId).remove();
                        changeTarget = createObj('graphic', {
                            _type: 'graphic',
                            subtype: 'token', 
                            pageid: thisPageId, 
                            layer: 'map', 
                            width: 70, 
                            height: 70,
                            left: eachTileFlatten.updateLeft, 
                            top: eachTileFlatten.updateTop,
                            rotation: checkTiles[i].degree,
                            imgsrc: checkTiles[i].url,
                            name: checkTiles[i].key,
                            controlledby: 'DungeonDrawGraphic'
                        });
                        setTimeout(function() {toBack(changeTarget); }, 500);
                        break;
                    }
                i = i + 1;
                }
            }
        });
    },
    
    getUnderFlatten = function(token) {
        var squares = [],
            foundSuqare,
            foundBits,
            theseTiles = [],
            thisPageId = token.get('pageid'),
            tile1,
            tile2,
            tile3,
            tile4,
            currentTileBits,
            seekBits,
            seekPack = 'none',
            seekDegree,
            checkTiles,
            i,
            maskedMapSquare,
            changeTarget;
            
        bitTiles = [];
        getAllBitTiles();
        
        //OR Logic
        squares = [
            {sqr: 1,  left: -35,  top: -35,  outer: false, mask: 28},
            {sqr: 2,  left: +35,  top: -35,  outer: false, mask:  7},
            {sqr: 3,  left: +35,  top: +35,  outer: false, mask: 193},
            {sqr: 4,  left: -35,  top: +35,  outer: false, mask: 112}
        ];
        
        _.each(squares, function(atSquares) {
            foundSuqare = findObjs({                              
                _pageid: thisPageId,                              
                _type: 'graphic',
                layer: 'map',
                width: 70,
                height: 70,
                left: parseInt(token.get('left')) + parseInt(atSquares.left),
                top: parseInt(token.get('top')) + parseInt(atSquares.top),
            });
            foundBits = _.where(bitTiles, {
                url: foundSuqare.length ? foundSuqare[0].get('imgsrc') : 'none',
                degree: foundSuqare.length ? foundSuqare[0].get('rotation') : 'none'
            });                           
            theseTiles.push({
                sqr: atSquares.sqr,
                sqrMask: atSquares.mask,
                updateId: foundSuqare.length ? foundSuqare[0].get('id') : 'none',
                UpdateName: foundSuqare.length ? foundSuqare[0].get('name') : 'none',
                updateRotation: foundSuqare.length ? foundSuqare[0].get('rotation') : 'none',
                updateImgsrc: foundSuqare.length ? foundSuqare[0].get('imgsrc') : 'none',
                updateLeft: foundSuqare.length ? (parseInt(token.get('left')) + atSquares.left) : 'none',
                updateTop: foundSuqare.length ? (parseInt(token.get('top')) + atSquares.top) : 'none',
                value: foundBits.length ? foundBits[0].value : 'none',
                mask: foundBits.length ? foundBits[0].mask : 'none',
                pack: foundBits.length ? foundBits[0].pack : 'none',
            });
        });
        _.each(theseTiles, function(eachTileFlatten) {
            if( 'none' !== eachTileFlatten.UpdateName) {
                currentTileBits = eachTileFlatten.value & eachTileFlatten.mask;
                seekBits = currentTileBits | eachTileFlatten.sqrMask;
                seekPack = eachTileFlatten.pack;
                seekDegree = eachTileFlatten.updateRotation; 
                
                checkTiles = _.where(bitTiles, {pack: seekPack});
                i=0;
                while (i < checkTiles.length) {
                    maskedMapSquare = seekBits & checkTiles[i].mask;
                    if(checkTiles[i].value === maskedMapSquare){
                        getObj('graphic', eachTileFlatten.updateId).remove();
                        changeTarget = createObj('graphic', {
                            _type: 'graphic',
                            subtype: 'token', 
                            pageid: thisPageId, 
                            layer: 'map', 
                            width: 70, 
                            height: 70,
                            left: eachTileFlatten.updateLeft, 
                            top: eachTileFlatten.updateTop,
                            rotation: checkTiles[i].degree,
                            imgsrc: checkTiles[i].url,
                            name: checkTiles[i].key,
                            controlledby: 'DungeonDrawGraphic'
                        });
                        setTimeout(function() {toBack(changeTarget); }, 500);
                        break;
                    }
                i = i + 1;
                }
            }
        });
    },
    
    useRemoveReplace = function(message) {
        var token = getObj('graphic', message.selected[0]._id);
        
        if( 'flatten' === token.get('name') ) {
            getUnderFlatten(token);
        }else{
            getUnderRaise(token);
        }
    },
    
    fixFlattenRaiseTool = function(obj) {
        if( 'flatten' === obj.get('name') ) {
            obj.set({
                rotation: 0,
                width: 140, 
                height: 140,
                left: Math.floor(obj.get('left') / 70) * 70, 
                top: Math.floor(obj.get('top') / 70) * 70
            });
        }else{
            obj.set({
                rotation: 0,
                width: 210, 
                height: 210,
                left: (Math.floor(obj.get('left') / 70) * 70) + 35, 
                top: (Math.floor(obj.get('top') / 70) * 70) + 35
            });
        }
    },
    
    addToolRaise = function() {
        var pageId,
            page,
            center,
            middle,
            whichTool,
            newTool;
            
        pageId = Campaign().get('playerpageid');
        page = getObj('page', pageId);
        center = (Math.floor(page.get('width') / 2) * 70) - 35;
        middle = (Math.floor(page.get('height') / 2) * 70) - 35;
        
        newTool = createObj('graphic', {
            type: 'graphic', 
            subtype: 'token', 
            pageid: pageId, 
            layer: 'map', 
            width: 210, 
            height: 210,
            left: center, 
            top: middle, 
            imgsrc: 'https://s3.amazonaws.com/files.d20.io/images/8908018/CX3Y6F5LJmI84N5dJP7CUg/thumb.png?1429400112',
            represents: macrosInstall(),
            name: 'raise'
        });
        setTimeout(function() {toFront(newTool); }, 500);
    },
    
    addToolFlatten = function() {
        var pageId,
            page,
            center,
            middle,
            whichTool,
            newTool;
            
        pageId = Campaign().get('playerpageid');
        page = getObj('page', pageId);
        center = Math.floor(page.get('width') / 2) * 70;
        middle = Math.floor(page.get('height') / 2) * 70;
        
        newTool = createObj('graphic', {
            type: 'graphic', 
            subtype: 'token', 
            pageid: pageId, 
            layer: 'map', 
            width: 140, 
            height: 140,
            left: center, 
            top: middle, 
            imgsrc: 'https://s3.amazonaws.com/files.d20.io/images/8907984/mi2Vl6tWu8JsGM0LpCmYNg/thumb.png?1429400030',
            represents: macrosInstall(),
            name: 'flatten'
        });
        setTimeout(function() {toFront(newTool); }, 500);
    },
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Rasie/Lower functions.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Main Script.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getBits = function(left,top) {
        var i,
            checkTiles,
            maskedMapSquare,
            seekBits = 0,
            bit1 = _.isEmpty(placementTiles[ (parseInt(left,10) - 70).toString()  + ':' + top.toString() ]) ? 0 : 1,
            bit2 = _.isEmpty(placementTiles[ (parseInt(left,10) - 70).toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 2,
            bit3 = _.isEmpty(placementTiles[ left.toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 4,
            bit4 = _.isEmpty(placementTiles[ (parseInt(left,10) + 70).toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 8,
            bit5 = _.isEmpty(placementTiles[ (parseInt(left,10) + 70).toString()  + ':' + top.toString() ]) ? 0 : 16,
            bit6 = _.isEmpty(placementTiles[ (parseInt(left,10) + 70).toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 32,
            bit7 = _.isEmpty(placementTiles[ left.toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 64,
            bit8 = _.isEmpty(placementTiles[ (parseInt(left,10) - 70).toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 128;
            
        seekBits = bit1 | bit2 | bit3 | bit4 | bit5 | bit6 | bit7 | bit8;
        
        checkTiles = _.where(bitTiles, {pack: currentTextureName});
        
        i=0;
        while (i < checkTiles.length) {
            maskedMapSquare = seekBits & checkTiles[i].mask;
            if(checkTiles[i].value === maskedMapSquare){
                deferredCreateObj('graphic', {
                    subtype: 'token', 
                    pageid: currentPageId, 
                    layer: 'map', 
                    width: 70, 
                    height: 70,
                    left: left, 
                    top: top,
                    rotation: checkTiles[i].degree,
                    imgsrc: checkTiles[i].url,
                    name: checkTiles[i].key,
                    controlledby: 'DungeonDrawGraphic'
                });
                
                break;
            }
            i = i + 1;
        }
    },
    
    evelauateTiles = function() {
        var left_top,
            bitValue;
            
        placeSeek = [];
        Object.keys(placementTiles).forEach(function(key) {
            left_top = key.split(':');
            bitValue = getBits(parseInt(left_top[0]),parseInt(left_top[1]));
            placeSeek.push({
                left: parseInt(left_top[0]),
                top: parseInt(left_top[1]),
                bits: bitValue
            });
        });
    },
    
    isPointInPoly = function (poly, pt){
        var c, i, l, j;
        for(c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
    		&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
    		&& (c = !c);
        }
    	return c;
    },
    
    getStepsInBoxBound  = function(getBoxBound) {
        var rowStart,
            rowEnd = getBoxBound.yMaxBoxBound,
            colStart,
            colEnd = getBoxBound.xMaxBoxBound,
            point,
            inPoly;
            
            for(rowStart = getBoxBound.yMinBoxBound; rowStart < rowEnd; rowStart = rowStart + 70) {
                for(colStart = getBoxBound.xMinBoxBound; colStart < colEnd; colStart = colStart + 70) {
                    point = [{x: colStart, y: rowStart}];
                    inPoly = isPointInPoly(getBoxBound.checkerPoints, point[0]);
                    
                    if(inPoly){
                        placementTiles[parseInt(colStart) + ':' + parseInt(rowStart)] = {x: colStart, y: rowStart};
                    }
                }
            }
    },
    
    getBoxBoundPath = function(pathObject) {
        var width = Math.ceil((pathObject.get('width') + 140)/70) * 70,
            height = Math.ceil((pathObject.get('height') + 140)/70) * 70,
            top = Math.ceil(pathObject.get('top')/35) * 35,
            left = Math.ceil(pathObject.get('left')/35) * 35,
            center,
            middle,
            newPath,
            newPathData,
            points = [];
            
            middle = (Math.round((top - (height / 2))/35) * 35) / 70;
            middle = middle - Math.floor(middle);
            if( 0.5 === middle ) {
                top = top - 35;
            }
            center = (Math.round((left - (width / 2))/35) * 35) / 70;
            center = center - Math.floor(center);
            if( 0.5 === center ) {
                left = left - 35;
            }
            newPath = '[["M",0,0],["L",' + width + ',0],["L",' + width + ',' + height + '],["L",0,' + height + '],["L",0,0]]';
            
            //get poly points
            _.each(JSON.parse(pathObject.get('path')), function(eachPoint) {
                points.push({
                x: parseInt(eachPoint[1] + (pathObject.get('left') - (pathObject.get('width') / 2))),
                y: parseInt(eachPoint[2] + (pathObject.get('top') - (pathObject.get('height') / 2)))
                });
            });
            //get poly points
           
        newPathData = {
            id: pathObject.get('id'),
            pageid: pathObject.get('pageid'),
            objWidth: pathObject.get('width'),
            objHeight: pathObject.get('height'),
            objTop: pathObject.get('top'),
            ObjLeft: pathObject.get('left'),
            ObjPath: pathObject.get('path'),
            widthBoxBound: width,
            heightBoxBound: height,
            topBoxBound: top,
            leftBoxBound: left,
            pathBoxBound: newPath,
            xMinBoxBound: left - (width / 2) + 35,
            xMaxBoxBound: (left + (width / 2) - 35) + 70,
            yMinBoxBound: top - (height / 2) + 35,
            yMaxBoxBound: (top + (height / 2) - 35) + 70,
            checkerPoints: points
        };
        
        return newPathData;
    },
    
    drawMap = function() {
        var boxBound,
            pageid = Campaign().get('playerpageid'),
            eachExistingTile = [],
            existTiles; //newcode
        //newcode    
        existTiles = filterObjs(function(obj) {
            switch(obj.get('name')) {
                case 'DD_001':
                case 'DD_002':
                case 'DD_003':
                case 'DD_004':
                case 'DD_005':
                case 'DD_006':
                case 'DD_007':
                case 'DD_008':
                case 'DD_009':
                case 'DD_010':
                case 'DD_011':
                case 'DD_012':
                case 'DD_013':
                case 'DD_014':
                case 'DD_015':
                case 'DD_016':
                    if(pageid === obj.get('pageid')){
                       return true;  
                    }
            }   
            return false;
        });
        _.each(existTiles, function(eachTile) {
            eachExistingTile.push(parseInt(eachTile.get('left')) + ':' + parseInt(eachTile.get('top')));
        });
        //newCode
            
        //Create box bounding
        _.each(pathUndo, function(eachPath) {
            boxBound = getBoxBoundPath(getObj('path', eachPath.id));
            getStepsInBoxBound(boxBound);
            pathUndo = _.reject(pathUndo,function(o){
                    return eachPath.id === o.id;
                });
        });
        
        //newcode
        Object.keys(placementTiles).forEach(function(key) {
            if( -1 !== eachExistingTile.indexOf(key) ) {
                delete placementTiles[key];
            }
        });
        //newcode
        
        evelauateTiles();
        
        _.each(findObjs({_type: 'path', controlledby: 'DungeonDrawPath'}), function(eachPath) {
            getObj('path', eachPath.id).remove();
        });
        pathUndo = [];
        placementTiles = [];
        placeSeek = [];
    },
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Main Script.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Setup, refresh, events and navigation.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getAllBitTiles = function() {
        var newValue,
            newMask;
            
        bitTiles = [];
        
        _.each(allTexturesTiles, function(eachTile) {
            if( 0 !== eachTile.mask ){
                bitTiles.push({
                    degree: 0, 
                    value: eachTile.value,
                    mask: eachTile.mask,
                    url: eachTile.url,
                    key: eachTile.key,
                    pack: eachTile.pack
                });
                newValue = eigthBitClockwise(eachTile.value, 90);
                newMask = eigthBitClockwise(eachTile.mask, 90);
                bitTiles.push({
                    degree: 90, 
                    value: newValue,
                    mask: newMask,
                    url: eachTile.url,
                    key: eachTile.key,
                    pack: eachTile.pack
                });
                newValue = eigthBitClockwise(eachTile.value, 180);
                newMask = eigthBitClockwise(eachTile.mask, 180);
                bitTiles.push({
                    degree: 180, 
                    value: newValue,
                    mask: newMask,
                    url: eachTile.url,
                    key: eachTile.key,
                    pack: eachTile.pack
                });
                newValue = eigthBitClockwise(eachTile.value, 270);
                newMask = eigthBitClockwise(eachTile.mask, 270);
                bitTiles.push({
                    degree: 270, 
                    value: newValue,
                    mask: newMask,
                    url: eachTile.url,
                    key: eachTile.key,
                    pack: eachTile.pack
                });
            }
        });
    },
    
    refreshData = function(){
        var tempPack,
            i;
            
        currentPageId = Campaign().get('playerpageid');
        currentTiles = _.clone(DungeonDrawTiles[state.DungeonDraw.currentTextureName]);
        currentTextureName = state.DungeonDraw.currentTextureName;
        pathUndo = [];
        DungeonDrawProcessing = false;
        placementTiles = [];
        placeSeek = [];
        
        allTexturesTiles = [];
        for (i = 0; i < installedTextures.length; i = i + 1) {
            tempPack = _.clone(DungeonDrawTiles[installedTextures[i]]);
            _.each(tempPack, function(eachTile) {
                allTexturesTiles.push({
                    url: eachTile.url,
                    key: eachTile.key,
                    value: eachTile.value,
                    mask: eachTile.mask,
                    dlBits: eachTile.dlBits, 
                    diag: eachTile.diag,
                    pack: installedTextures[i]
                });
            });
        }
        
        getAllBitTiles();
        
    },
    
    checkInstall = function() {
        
        Object.keys(DungeonDrawTiles).forEach(function(key) {
            installedTextures.push(key);
        });
        
        if( ! _.has(state,'DungeonDraw') || state.DungeonDraw.version !== schemaVersion) {
            log('DungeonDraw: Resetting state');
            state.DungeonDraw = {
                version: schemaVersion,
                currentTextureName: defaultTexture,
                drawMode: true
            };
        }
        
        refreshData();
        macrosInstall();
        
        sendChat('Main Menu', '/direct ' + DungeonDrawDirect['!DungeonDrawMenu']);
    },
    
    handleInput = function(msg) {
        var message = _.clone(msg), messageArguments;
        
        if ( 'api' !== message.type ) { return; }
        if( true === DungeonDrawProcessing ){return; }
        
        messageArguments = msg.content.split(/\s+/);
        
        if ( messageArguments[0] === '!DungeonDrawMode') { 
            state.DungeonDraw.drawMode = (state.DungeonDraw.drawMode === true ? false : true); 
        }
        if( (messageArguments[0] === '!DungeonDrawMenu') || (messageArguments[0] === '!DungeonDrawMode') ){
            DungeonDrawMenu();  
            return;
        }
        if( false === state.DungeonDraw.drawMode ){return; }
        
        DungeonDrawProcessing = true;
        switch(messageArguments[0]) { 
            case '!DungeonDrawClear': clearMap(messageArguments[1]); break;
            case '!DungeonDrawMap': drawMap(); break;
            case '!DungeonDrawUndo': drawUndo(); break;  
            case '!DungeonDrawChange': selectTexture(); break;
            case '!DungeonDrawSetTexture': setTexture(message.content); break;
            case '!DungeonDrawColor': colorMap();  break; 
            case '!DungeonDrawNumber': directTokenAdd(messageArguments[1]); break;
            case '!DungeonAddToolFlatten': addToolFlatten(); break;
            case '!DungeonAddToolRaise': addToolRaise(); break;
            case '!DungeonRemoveReplace': useRemoveReplace(message); break;
        }
        DungeonDrawProcessing = false;
    },
    
    handleGraphicChange = function(obj) {
        var ObjValues = getObjValue(obj,['name','pageid','rotation','left','top','flipv','fliph','id','imgsrc']),
            foundTile = _.where(allTexturesTiles, {url: ObjValues.imgsrc}),
            newLeft,
            newTop,
            newRotation;
            
        if( ('flatten' === ObjValues.name) || ('raise' === ObjValues.name) ) {
            fixFlattenRaiseTool(obj);
            return; 
        }
            
        if( !_.isEmpty(foundTile) ){
            if ( (255 === foundTile[0].value) && (0 === foundTile[0].mask) ){
                return; 
            }
            //force proper tile placement and update dynamic lighting
            forceProperPlacementAddDL(obj,ObjValues.left,ObjValues.top,ObjValues.rotation,ObjValues.id,foundTile[0]);
        }
    },
    
    handleGraphicDestroy = function(obj) {
        var foundTiles = _.where(currentTiles, {key: obj.get('name')});
        
        if( 0 === foundTiles.length) {return; }
        if ( (255 === foundTiles[0].value) && (0 === foundTiles[0].mask) ){
            return; 
        }
        
        _.each(findObjs({_type: 'path', controlledby: obj.get('_id') }), function(eachPath) {
            eachPath.remove();
        });
    },
    
    handlePathAdd = function(obj) {
        var goodPath = pathChecker(obj),
            ObjValues = getObjValue(obj, ['pageid','layer','path','width','height','top','left']),
            newPath,
            snappedPath;
            
        if( (false === state.DungeonDraw.drawMode) || (Campaign().get('playerpageid') !== ObjValues.pageid) ){
            return; 
        }
        
        if( (70 > (Math.round(ObjValues.width/70) * 70)) || (70 > (Math.round(ObjValues.height/70) * 70)) ) {
            obj.remove();
            return;
        }
        
        if(goodPath){
            snappedPath = snapPathing(obj);
            
            newPath = createObj('path', {
                type: 'path',
                pageid: ObjValues.pageid,
                path: snappedPath.path,
                fill: '#00CC99',
                stroke: '#00CC99',
                layer: 'map',
                stroke_width: 1,
                width: snappedPath.width,
                height: snappedPath.height,
                top: snappedPath.top,
                left: snappedPath.left,
                controlledby: 'DungeonDrawPath'
            });
            
            pathUndo.push({
                id: newPath.get('id'),
                pageid: ObjValues.pageid, 
                layer: 'map',
                path: snappedPath.path,
                width: snappedPath.width,
                height: snappedPath.height,
                top: snappedPath.top,
                left: snappedPath.left,
                fill: '#00CC99',
                stroke: '#00CC99',
                stroke_width: 1,
                controlledby: 'DungeonDrawPath',
                sequence: seq()
            });
        }
        
        if( 'map' === ObjValues.layer ) {
            obj.remove();
        }
    },
    
    handlePageChange = function(obj) {
        if ( Campaign().get('playerpageid') !== currentPageId ) {
            refreshData();
        }
    }, 
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Setup, refresh, events and navigation.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    registerEventHandlers = function() {
        on('change:campaign:playerpageid', handlePageChange);
        on('chat:message', handleInput);
        on('change:graphic', handleGraphicChange);
        on('add:path', handlePathAdd);
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
    DungeonDraw.RegisterEventHandlers();
});

var DungeonDrawDirect = (function () {
    'use strict';

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Chat HTML.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    var direct = [],
    
        buttonType01_atag = ' style="border: 1px solid AliceBlue; background-color: SteelBlue; color: white;" ',
        buttonType01_span = ' style="color: white; font-weight: normal; display: block; width: 150px;" ';
        
    direct['TopMenu'] = '<div style="display: table;" >'
                + '<div style="display: table-row;" >'
                    +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                            +'<a href="!DungeonAddToolFlatten" style="border: 1px solid Black; background-color: White; color: white;" >'
                            +'<img src="' + 'https://s3.amazonaws.com/files.d20.io/images/8907984/mi2Vl6tWu8JsGM0LpCmYNg/thumb.png?1429400030'
                            +'" height="50" width="50" border="0" style="padding: 0px 0px 0px 0px; outline: none; border: none;" >'
                            +'</a>'
                    +'</div>'
                    +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                            +'<a href="!DungeonAddToolRaise" style="border: 1px solid Black; background-color: White; color: white;" >'
                            +'<img src="' + 'https://s3.amazonaws.com/files.d20.io/images/8908018/CX3Y6F5LJmI84N5dJP7CUg/thumb.png?1429400112'
                            +'" height="50" width="50" border="0" style="padding: 0px 0px 0px 0px; outline: none; border: none;" >'
                            +'</a>'
                    +'</div>'
                    +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                            +'<a href="!TAKENOACTION" style="border: 1px solid Black; background-color: White; color: white;" >'
                            +'<img src="' + 'https://s3.amazonaws.com/files.d20.io/images/8838664/r-3M8jzLatXgeb88GnKy_g/thumb.jpg?1429048748'
                            +'" height="50" width="50" border="0" style="padding: 0px 0px 0px 0px; outline: none; border: none;" >'
                            +'</a>'
                    +'</div>'
                    +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                            +'<a href="!TAKENOACTION" style="border: 1px solid Black; background-color: White; color: white;" >'
                            +'<img src="' + 'https://s3.amazonaws.com/files.d20.io/images/8838664/r-3M8jzLatXgeb88GnKy_g/thumb.jpg?1429048748'
                            +'" height="50" width="50" border="0" style="padding: 0px 0px 0px 0px; outline: none; border: none;" >'
                            +'</a>'
                    +'</div>'
                +'</div>';
    
    direct['RowMenu'] = '<div style="display: table-row;" >';
    direct['CellMenu'] = '<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >';
    direct['ButtonMenu'] = ' style="border: 1px solid Black; background-color: White; color: white;" ';
    direct['ImageMenu'] = ' style="padding: 0px 0px 0px 0px; outline: none; border: none;" ';

    direct['!DungeonDrawMenu'] = ' <a href="!DungeonDrawMenu"' + buttonType01_atag + ' ><span' + buttonType01_span + '>Dungeon Draw Menu</span></a>';
    direct['!DungeonDrawUndo'] = '<br><a href="!DungeonDrawUndo"' + buttonType01_atag + ' ><span' + buttonType01_span + '>↻-Undo-Path</span></a>';
    direct['!DungeonDrawMap'] = '<br><a href="!DungeonDrawMap"' + buttonType01_atag + ' ><span' + buttonType01_span + '>╔╣-Rol20Draw</span></a>';
    direct['!DungeonDrawClear'] = '<br><a href="!DungeonDrawClear ?{Are You Sure|Y}"' + buttonType01_atag + ' ><span' + buttonType01_span + '>⊠-Clear-Map</span></a>';
    direct['!DungeonDrawColor'] = '<br><a href="!DungeonDrawColor"' + buttonType01_atag + ' ><span' + buttonType01_span + '>▓-Set-Map-Color</span></a>';
    direct['!DungeonDrawChange'] = '<br><a href="!DungeonDrawChange"' + buttonType01_atag + ' ><span' + buttonType01_span + '>⊞-Change-Texture</span></a>';
    direct['DungeonDrawModeFalse'] = '<br><a href="!DungeonDrawMode" style="border: 1px solid DarkGray; background-color: DarkGray; color: white;" ><span style="color: white; font-weight: normal; display: block; width: 150px;" >◯-Draw-Is-<b>OFF</b></span>'; 
    direct['DungeonDrawModeTrue'] = '<br><a href="!DungeonDrawMode" style="border: 1px solid Black; background-color: PaleGreen; color: Black;" ><span style="color: white; font-weight: normal; display: block; width: 150px;" >◯-Draw-Is-<b>ON</b></span>';  

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Chat HTML.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    return direct;
}());
