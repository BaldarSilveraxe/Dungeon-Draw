var DungeonDraw = DungeonDraw || (function(){
    'use strict';
    /* -------------------
    Big thanks to:
    "The Aaron" teaching me to be a Bit Wiser
    And anyone that buys my packs!
    ------------------- */
    
    //Command: !DungeonDrawMenu
    
    //version
    var version = 1.0,
        lastUpdate = 1429442387, //Unix timestamp
        schemaVersion = 1.0,
        deferred={
            batchSize: 30,
            initialDefer: 10,
            batchDefer: 10
        },
        seq = (function(seed) {
            var count = seed;
            return function(){
                return ++seed;
            };
        }(0)),
        
    //Check Installs
    defaultTexture = 'Old School|#18769c',
    installedTextures = [],
    allTexturesTiles = [],
    bitTiles = [],
    currentTiles,
    currentTextureName,
    currentPageId,
    
    //Main Script
    objExtractKeys = ['id','pageid','stroke','rotation','layer','width','height','top','left','controlledby'],
    undoPaths = [],
    dungeonDrawProcessing = false,
    pathToGrid = [], //left:top
    placedToGrid = [], //left:top

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
            {sqr: 4,  left: +70,  top: +70,  outer: false, mask: 127},
            {sqr: 4,  left: 0,    top: +70,  outer: false, mask: 191},
            {sqr: 5,  left: -70,  top: +70,  outer: false, mask: 223},
            {sqr: 5,  left: -70,  top: 0,   outer: false, mask: 239}
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
                            name: checkTiles[i].key
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
                            name: checkTiles[i].key
                        });
                        setTimeout(function() {toBack(changeTarget); }, 500);
                        break;
                    }
                i = i + 1;
                }
            }
        });
    },
    
    dungeonMapperRemoveReplace = function(message) {
        var token = getObj('graphic', message.selected[0]._id);
        
        if( 'flatten' === token.get('name') ) {
            getUnderFlatten(token);
        }else{
            getUnderRaise(token);
        }
    },
    
    fixFlattenTool = function(obj) {
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
    
    dungeonDrawAddToolRaise = function() {
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
    
    dungeonDrawAddToolFlatten = function() {
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
    
    macrosInstall = function() {
        var controller = findObjs({ _type: 'character', name: 'Dungeon-Draw-Connection'})[0] || 
            createObj('character', {name: 'Dungeon-Draw-Connection', avatar: 'https://s3.amazonaws.com/files.d20.io/images/8821111/fBVwB1f2_t7U3k8XrmbKxw/thumb.png?1428953603'}),
            ability = findObjs({_type: 'ability', name: '⇗▀⇘▄-Remove-Replace', characterid: controller.get('id')})[0] || 
            createObj('ability', {name: '⇗▀⇘▄-Remove-Replace', characterid: controller.get('id'), action: '!DungeonMapperRemoveReplace', istokenaction: true});
        
        return controller.get('id');
    },
    
    colorMap = function() {
        var page = getObj('page', Campaign().get('playerpageid')),
            args = state.DungeonDraw.currentTextureName.split('|');
        
        if( _.isEmpty(page) ){return; }
        if( (false === /^#[0-9A-F]{6}$/.test(args[1])) && (2 !== args.length) ){return; }
        page.set('background_color', args[1]);
    },
    
    dungeonDrawSetTexture = function(message) {
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
        dungeonDrawMenu();
    },
    
    dungeonDrawChange = function() {
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
    }
    }()),
    
    getBits = function(left,top,thisPageId) {
        var i,
            checkTiles,
            maskedMapSquare,
            seekBits = 0,
            bit1 = _.isEmpty(pathToGrid[ (parseInt(left,10) - 70).toString()  + ':' + top.toString() ]) ? 0 : 1,
            bit2 = _.isEmpty(pathToGrid[ (parseInt(left,10) - 70).toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 2,
            bit3 = _.isEmpty(pathToGrid[ left.toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 4,
            bit4 = _.isEmpty(pathToGrid[ (parseInt(left,10) + 70).toString()  + ':' + (parseInt(top,10) + 70).toString() ]) ? 0 : 8,
            bit5 = _.isEmpty(pathToGrid[ (parseInt(left,10) + 70).toString()  + ':' + top.toString() ]) ? 0 : 16,
            bit6 = _.isEmpty(pathToGrid[ (parseInt(left,10) + 70).toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 32,
            bit7 = _.isEmpty(pathToGrid[ left.toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 64,
            bit8 = _.isEmpty(pathToGrid[ (parseInt(left,10) - 70).toString()  + ':' + (parseInt(top,10) - 70).toString() ]) ? 0 : 128;
            
        seekBits = bit1 | bit2 | bit3 | bit4 | bit5 | bit6 | bit7 | bit8;
        
        checkTiles = _.where(bitTiles, {pack: currentTextureName});
        
        i=0;
        while (i < checkTiles.length) {
            maskedMapSquare = seekBits & checkTiles[i].mask;
            if(checkTiles[i].value === maskedMapSquare){
                deferredCreateObj('graphic', {
                    subtype: 'token', 
                    pageid: thisPageId, 
                    layer: 'map', 
                    width: 70, 
                    height: 70,
                    left: left, 
                    top: top,
                    rotation: checkTiles[i].degree,
                    imgsrc: checkTiles[i].url,
                    name: checkTiles[i].key
                });
                break;
            }
            i = i + 1;
        }
    },
    
    getGridFromPaths = function(id,pageid,left,top,width,height) {
        var leftMostLeft = left - (width / 2) + 35,
            topMostTop = top - (height / 2) + 35,
            gridWidth = width / 70,
            gridHeight = height / 70,
            stepRight = 0,
            stepDown = 0;
            
        while (stepDown < gridHeight) {
            stepRight = 0;
            while (stepRight < gridWidth) {
                if(_.isEmpty(placedToGrid[ (leftMostLeft + (stepRight * 70)) + ':' + (topMostTop + (stepDown * 70)) ])){
                    pathToGrid[ (leftMostLeft + (stepRight * 70)) + ':' + (topMostTop + (stepDown * 70)) ] = {
                        left: (leftMostLeft + (stepRight * 70)),
                        top: (topMostTop + (stepDown * 70)),
                        pageid: pageid
                    };    
                }
                stepRight = stepRight + 1;
            }
            stepDown = stepDown + 1;
        }    
    },
    
    dungeonDrawMap = function() {
        var drawPaths = _.clone(undoPaths),
            left_top,
            thisPageId = Campaign().get('playerpageid'),
            existTiles;
            
        undoPaths = [];
        
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
                case 'DD_012':
                case 'DD_013':
                case 'DD_014':
                case 'DD_015':
                case 'DD_016':
                    if(thisPageId === obj.get('pageid')){
                       return true;  
                    }
            }   
            return false;
        });
        
        placedToGrid = [];
        _.each(existTiles, function(eachTile) {
            placedToGrid[eachTile.get('left').toString() + ':' + eachTile.get('top').toString()] = {id: eachTile.get('id')};
        });
        
        _.each(drawPaths, function(eachPath) {
            getGridFromPaths(eachPath.id,eachPath.pageid,eachPath.left,eachPath.top,eachPath.width,eachPath.height)
        });
        
        Object.keys(pathToGrid).forEach(function(key) {
            left_top = key.split(':');
            
            getBits(left_top[0],left_top[1],thisPageId);
        });
        
        pathToGrid = [];
        
        _.each(findObjs({_pageid: thisPageId,  _type: 'path', layer: 'map'}), function(obj) {    
            getObj('path', obj.id).remove();
        });
        
        undoPaths = [];
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
    
    getMapCenter = function(xy, wh) {
        var center = (Math.round((xy - (wh / 2))/35) * 35) / 70;
        
        center = center - Math.floor(center);
        if( 0.5 === center ) {
            xy = xy - 35;
        } 
        return xy;
    },
    
    dungeonDrawNumber = function (key) {
        var page,
            pageId,
            thisTile,
            center,
            middle,
            keyArguments,
            newObj,
            width = 70, 
            height = 70;
            
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
                    name: key
                });
                
            setTimeout(function() {toFront(newObj); }, 500);
            }
            return; 
        }
        if ( (255 === thisTile[0].value) && (0 === thisTile[0].mask) ){
            width = 140;
            height = 140;
            }
        
        newObj = createObj('graphic', {
            type: 'graphic', 
            subtype: 'token', 
            pageid: pageId, 
            layer: 'map', 
            width: width, 
            height: height,
            left: getMapCenter((Math.ceil(center/35) * 35), (Math.ceil(width/70) * 70)),
            top: getMapCenter((Math.ceil(middle/35) * 35), (Math.ceil(height/70) * 70)),
            imgsrc: thisTile[0].url, 
            name: key
        });
        newObj.set('gmnotes', newObj.get('id'));
    },
    
    clearMap = function(y) {
        if( 'Y' !== y.toUpperCase() ){return; }
        
        _.each(findObjs({_pageid: Campaign().get('playerpageid'), _type: 'graphic', layer: 'map'}), function(obj) {    
            getObj('graphic', obj.id).remove();
        });
        
        _.each(findObjs({_pageid: Campaign().get('playerpageid'),  _type: 'path', layer: 'map'}), function(obj) {    
            getObj('path', obj.id).remove();
        });
        
        undoPaths = [];
    },
    
    dungeonDrawUndo = function() {
        var lastPathSequence,
            undoThisPathId,
            undoThisPath;
            
        if( _.isEmpty(undoPaths) ){
            return;
        }
        lastPathSequence = Math.max.apply(Math,undoPaths.map(function(o){return o.sequence;}));
        undoThisPath = _.where(undoPaths, {sequence: lastPathSequence});
        undoPaths = _.reject(undoPaths,function(o){
                    return undoThisPath[0].id === o.id;
                });  
        undoThisPath = getObj('path', undoThisPath[0].id).remove();
    },
    
    dungeonDrawMenu = function() {
        var i = 0,
            tableText = DungeonDrawDirect['TopMenu'],
            menuText = '/direct ';
            
        sendChat('Dungeon Draw Tools', ' ');
        while (i < currentTiles.length) {
            tableText += DungeonDrawDirect['RowMenu'];
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + currentTiles[i].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + currentTiles[i].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + currentTiles[i + 1].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + currentTiles[i + 1].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + currentTiles[i + 2].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + currentTiles[i + 2].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += DungeonDrawDirect['CellMenu'];
            tableText += '<a href="!DungeonDrawNumber ' + currentTiles[i + 3].key + '" ' + DungeonDrawDirect['ButtonMenu'] + '>';
            tableText += '<img src="' + currentTiles[i + 3].url
                                +'" height="50" width="50" border="0"' + DungeonDrawDirect['ImageMenu'] + '">'
                                +'</a>'
                        +'</div>';
            tableText += '</div>';
            i = i + 4;
        }
        tableText += '</div>';
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
    
    getObjValue = function(obj, keys) {
        return _.reduce( keys || objExtractKeys, function(m,prop){
            m[prop] = obj.get(prop);
            return m;
        }, {});
    },
    
    createSnappedPath = function(obj) {
        var ObjValues = getObjValue(obj),
            createdObject;
        
        if( 'map' !== ObjValues.layer ){
            return; 
        }
        
        obj.remove();
        if( (70 > (Math.ceil(ObjValues.width/70) * 70)) || (70 > (Math.ceil(ObjValues.height/70) * 70)) ) {
            return;
        }
        
        createdObject = createObj('path',{ 
            pageid: ObjValues.pageid, 
            layer: ObjValues.layer, 
            path: '[["M",0,0],["L",' + (Math.ceil(ObjValues.width/70) * 70) + ',0],["L",' + (Math.ceil(ObjValues.width/70) * 70) + ',' + (Math.ceil(ObjValues.height/70) * 70) + '],["L",0,' + (Math.ceil(ObjValues.height/70) * 70) + '],["L",0,0]]',
            left: getMapCenter((Math.ceil(ObjValues.left/35) * 35), (Math.ceil(ObjValues.width/70) * 70)),
            top: getMapCenter((Math.ceil(ObjValues.top/35) * 35), (Math.ceil(ObjValues.height/70) * 70)),
            width: (Math.ceil(ObjValues.width/70) * 70), 
            height: (Math.ceil(ObjValues.height/70) * 70), 
            fill: '#00C957', 
            stroke:'#00C957',
            stroke_width: 1,
            controlledby: 'DungeonDrawPath'
        });
        
        undoPaths.push({
            id: createdObject.get('id'),
            pageid: ObjValues.pageid, 
            layer: ObjValues.layer,
            path: createdObject.get('path'),
            left: createdObject.get('left'),
            top: createdObject.get('top'),
            width: createdObject.get('width'),
            height: createdObject.get('height'),
            fill: ObjValues.stroke,
            stroke: ObjValues.stroke,
            stroke_width: 1,
            controlledby: 'DungeonDraw',
            sequence: seq()
        });
        
        setTimeout(function() {toBack(createdObject); }, 600);
    },
    
    //~~~~~~~~~~~~~~~~~~~~~OnReady or Page Bookmark Move~~~~~~~~~~~~~~~
    refreshData = function(){
        var i,
            tempPack;
            
        currentTiles = _.clone(DungeonDrawTiles[state.DungeonDraw.currentTextureName]);
        currentTextureName = state.DungeonDraw.currentTextureName;
        
        allTexturesTiles = [];
        for (i = 0; i < installedTextures.length; i++) {
            tempPack = _.clone(DungeonDrawTiles[installedTextures[i]]);
            _.each(tempPack, function(eachTile) {
                allTexturesTiles.push({
                    url: eachTile.url,
                    key: eachTile.key,
                    value: eachTile.value,
                    mask: eachTile.mask,
                    pack: installedTextures[i]
                });
            });
        }
        
        currentPageId = Campaign().get('playerpageid');
        
        getAllBitTiles();
        
        _.each(findObjs({_type: 'path', controlledby: 'DungeonDrawPath'}), function(eachPath) {
            getObj('path', eachPath.id).remove();
        });
    },
    
    checkInstall = function() {
        var i,
            tempPack;
        
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
    
    // Event Handlers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    handleInput = function(msg) {
        var message = _.clone(msg), messageArguments;
        
        if ( 'api' !== message.type ) {return; }
        if( true === dungeonDrawProcessing ){return; }
        
        messageArguments = message.content.split(/\s+/);
        
        if ( messageArguments[0] === '!DungeonDrawMode') { 
            state.DungeonDraw.drawMode = (state.DungeonDraw.drawMode === true ? false : true); 
        }
        if( (messageArguments[0] === '!DungeonDrawMenu') || (messageArguments[0] === '!DungeonDrawMode') ){
            dungeonDrawMenu();  
            return;
        }
        if( false === state.DungeonDraw.drawMode ){return; }
        
        dungeonDrawProcessing = true;
        
        switch(messageArguments[0]) { 
            case '!DungeonDrawUndo': dungeonDrawUndo(); break;    
            case '!DungeonDrawClear': clearMap(messageArguments[1]); break;
            case '!DungeonDrawMap': dungeonDrawMap(); break;
            case '!DungeonDrawColor': colorMap();  break; 
            case '!DungeonDrawNumber': dungeonDrawNumber(messageArguments[1]); break;  
            case '!DungeonDrawChange': dungeonDrawChange(); break;  
            case '!DungeonDrawSetTexture': dungeonDrawSetTexture(message.content); break;
            case '!DungeonDrawAddToolFlatten': dungeonDrawAddToolFlatten(); break;
            case '!DungeonDrawAddToolRaise': dungeonDrawAddToolRaise(); break;
            case '!DungeonMapperRemoveReplace': dungeonMapperRemoveReplace(message); break;
            //case '!DungeonDrawGmMenu': dungeonDrawGmMenu(); break;
        }
        dungeonDrawProcessing = false;
    },
    
    handleGraphicAdd = function(obj) {
        
    },
    
    handleGraphicChange = function(obj) {
        var ObjValues = getObjValue(obj,['name','pageid','rotation','left','top','flipv','fliph','id','imgsrc']),
            foundTile = _.where(allTexturesTiles, {url: ObjValues.imgsrc}),
            featurePathArray,
            bitCount,
            pathValue,
            newRotation,
            newLeft,
            newTop,
            findOtherTiles;
        
        if( !_.isEmpty(foundTile) ){
            if ( (255 === foundTile[0].value) && (0 === foundTile[0].mask) ){
                return; 
            }
            newLeft = (Math.round((ObjValues.left - 35)/70)*70) + 35;
            newTop = (Math.round((ObjValues.top - 35)/70)*70) + 35;
            newRotation = (Math.round(ObjValues.rotation/90)*90)%360 + (ObjValues.rotation<0 ? 360 : 0);
            obj.set({
                rotation: newRotation,
                flipv: false,
                fliph: false,
                width: 70,
                height: 70,
                top: newTop,
                left: newLeft
            });
            _.each( findObjs({_type: 'path', controlledby: ObjValues.id}), function(eachPath) {
                eachPath.remove();
            });
            featurePathArray = [];
            for (bitCount = 0; bitCount < 8; bitCount = bitCount + 1) {
                if (!(foundTile[0].value & (1<<bitCount))) {
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
                            forID: ObjValues.id
                        });
                    }
                }
            }
            placeRotatedFlipPaths(featurePathArray);
            setTimeout(function() {toFront(obj); }, 500);
        }
        if( ('flatten' === ObjValues.name) || ('raise' === ObjValues.name) ) {
            fixFlattenTool(obj);
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
        if( false === state.DungeonDraw.drawMode ) {
            return; 
        }
        if( obj.get('_pageid') !== Campaign().get("playerpageid") ) {
            return; 
        }
        createSnappedPath(obj);
    },
    
    handlePathChange = function(obj) {
        var ObjValues = getObjValue(obj),
            thesePath = _.where(undoPaths, {id: ObjValues.id}),
            changedPath;
            
            _.each(thesePath, function(eachPath) {
                changedPath = getObj('path', eachPath.id);
                changedPath.set({
                    layer: eachPath.layer,
                    left: eachPath.left,
                    top: eachPath.top,
                    width: eachPath.width,
                    height: eachPath.height,
                    fill: '#00C957',
                    stroke: '#00C957',
                    stroke_width: 1
                });
            });
            setTimeout(function() {toBack(obj); }, 500);
    },
    
    handlePathDestroy = function(obj) {
        var ObjValues = getObjValue(obj),
            thesePath = _.where(undoPaths, {id: ObjValues.id});
            
            _.each(thesePath, function(eachPath) {
                undoPaths = _.reject(undoPaths,function(o){
                    return eachPath.id === o.id;
                });    
            });
    },
    
    handlePageChange = function(obj) {
        if ( Campaign().get('playerpageid') !== currentPageId ) {
            refreshData();
        }
    }, 
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
        //on('add:graphic', handleGraphicAdd);
        on('change:graphic', handleGraphicChange);
        on('destroy:graphic', handleGraphicDestroy);
        on('add:path', handlePathAdd);
        on('change:path', handlePathChange);
        on('destroy:path', handlePathDestroy);
        on('change:campaign:playerpageid', handlePageChange);
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
    var direct = [],
    
    buttonType01_atag = ' style="border: 1px solid AliceBlue; background-color: SteelBlue; color: white;" ',
    buttonType01_span = ' style="color: white; font-weight: normal; display: block; width: 150px;" ';

    direct['!DungeonDrawMenu'] = ' <a href="!DungeonDrawMenu"' + buttonType01_atag + ' ><span' + buttonType01_span + '>Dungeon Draw Menu</span></a>';
    
    direct['TopMenu'] = '<div style="display: table;" >'
                    + '<div style="display: table-row;" >'
                        +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                                +'<a href="!DungeonDrawAddToolFlatten" style="border: 1px solid Black; background-color: White; color: white;" >'
                                +'<img src="' + 'https://s3.amazonaws.com/files.d20.io/images/8907984/mi2Vl6tWu8JsGM0LpCmYNg/thumb.png?1429400030'
                                +'" height="50" width="50" border="0" style="padding: 0px 0px 0px 0px; outline: none; border: none;" >'
                                +'</a>'
                        +'</div>'
                        +'<div style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;" >'
                                +'<a href="!DungeonDrawAddToolRaise" style="border: 1px solid Black; background-color: White; color: white;" >'
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
    direct['!DungeonDrawUndo'] = '<br><a href="!DungeonDrawUndo"' + buttonType01_atag + ' ><span' + buttonType01_span + '>↻-Undo-Path</span></a>';
    direct['!DungeonDrawMap'] = '<br><a href="!DungeonDrawMap"' + buttonType01_atag + ' ><span' + buttonType01_span + '>╔╣-Dungeon-Draw</span></a>';
    direct['!DungeonDrawClear'] = '<br><a href="!DungeonDrawClear ?{Are You Sure|Y}"' + buttonType01_atag + ' ><span' + buttonType01_span + '>⊠-Clear-Map</span></a>';
    direct['!DungeonDrawColor'] = '<br><a href="!DungeonDrawColor"' + buttonType01_atag + ' ><span' + buttonType01_span + '>▓-Set-Map-Color</span></a>';
    direct['!DungeonDrawChange'] = '<br><a href="!DungeonDrawChange"' + buttonType01_atag + ' ><span' + buttonType01_span + '>⊞-Change-Texture</span></a>';
    direct['DungeonDrawModeFalse'] = '<br><a href="!DungeonDrawMode" style="border: 1px solid DarkGray; background-color: DarkGray; color: white;" ><span style="color: white; font-weight: normal; display: block; width: 150px;" >◯-Draw-Is-<b>OFF</b></span>'; 
    direct['DungeonDrawModeTrue'] = '<br><a href="!DungeonDrawMode" style="border: 1px solid Black; background-color: PaleGreen; color: Black;" ><span style="color: white; font-weight: normal; display: block; width: 150px;" >◯-Draw-Is-<b>ON</b></span>';  
    
    return direct;
}());
