var DungeonDraw = DungeonDraw || (function(){
    'use strict';
    /* -------------------
    Big thanks to:
    "The Aaron" teaching me to be a Bit Wiser
    And anyone that buys my packs!
    ------------------- */
 
    var version = 0.1,
        lastUpdate = 1428220800, //Unix timestamp
        schemaVersion = 0.2,
        
        toggleIcon = 'https://s3.amazonaws.com/files.d20.io/images/8434850/ijzdctgdJpFj_Q2NC9GFvg/thumb.png?1427221316',
        
        undo = [],
        
        //asciiMap[rowCount][columnCount])
        asciiMap = [],
        paddedAsciiMap = [],
        
        tileSidePattern = [],
        
        defaultTexture = 'Old School|#18769c',
        installedTextures = [],
        currentTiles,
        activePage = false,
        
        tablDivStyle = ' style="display: table;"',
        trowDivStyle = ' style="display: table-row;"',
        cellDivStyle = ' style="display: table-cell; border-collapse: collapse; padding-left: 0px; padding-right: 0px;"',
        atagOneStyle = ' style="border: 1px solid AliceBlue; background-color: SteelBlue; color: white;"',
        atagTwoStyle = ' style="border: 1px solid Black; background-color: White; color: white;"',
        imagDivStyle = ' style="padding: 0px 0px 0px 0px; outline: none; border: none;"',
        spanOneStyle = ' style="color:white; font-weight:normal; display:block; width: 150px;"',
        
    dungeonDrawSetTexture = function(message) {
        var pack = message.replace('!DungeonDrawSetTexture ', ''),
            switchPack = defaultTexture,
            args;
        
        _.each(installedTextures, function(eachTextures) {
            args = eachTextures.split('|');
            if( args[0] === pack ) {switchPack = eachTextures; } 
        });
        
        state.DungeonDraw = {
                version: schemaVersion,
                currentTextureName: switchPack,
                drawMode: true
            };
            
        currentTiles = _.clone(DungeonDrawTiles[state.DungeonDraw.currentTextureName]);
        
        dungeonDrawMenu();
    },
    
    dungeonDrawChange = function() {
        var text = '/direct ',
            args;
        
        if( 0 === installedTextures.length) {return; }
        
        _.each(installedTextures, function(eachTextures) {
            args = eachTextures.split('|');
            if( 2 !== args.length){return };
        });
        _.each(installedTextures, function(eachTextures) {
            args = eachTextures.split('|');
            text += '<br><a href="!DungeonDrawSetTexture ' + args[0] + '"><span ' + spanOneStyle + '>▹ ' + args[0] + '</span></a>';
        });
        sendChat('Select Texture', text);
    },
    
    colorMap = function() {
        var page = getObj('page', Campaign().get('playerpageid')),
            args = state.DungeonDraw.currentTextureName.split('|');
        
        if( _.isEmpty(page) ){return; }
        if( (false === /^#[0-9A-F]{6}$/.test(args[1])) && (2 !== args.length) ){return; }
        page.set('background_color', args[1]);
    },
    
    dungeonDrawNumber = function (key) {
        var page,
            pageId,
            thisTile,
            center,
            middle;
            
        thisTile = _.where(currentTiles, {key: key});
        if( _.isEmpty(thisTile) ) {return; }
        
        pageId = Campaign().get('playerpageid');
        page = getObj('page', pageId);
        center = Math.floor(page.get('width') / 2) * 70;
        middle = Math.floor(page.get('height') / 2) * 70;
        
        createObj('graphic', {
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
    },
    
    dungeonDrawMenu = function() {
        var i = 0, 
        tableText = '';
        
        sendChat('Dungeon Draw Tools', ' ');
        tableText += '<div' + tablDivStyle + '>';
        while (i < currentTiles.length) {
            tableText += '<div' + trowDivStyle + '>'
                        +'<div' + cellDivStyle + '>'
                                +'<a href="!DungeonDrawNumber ' + currentTiles[i].key + '" ' + atagTwoStyle + '>'
                                +'<img src="' + currentTiles[i].url
                                +' height="50" width="50" border="0"' + imagDivStyle + '">'
                                +'</a>'
                        +'</div>'
                        +'<div' + cellDivStyle + '>'
                                +'<a href="!DungeonDrawNumber ' + currentTiles[i + 1].key + '" ' + atagTwoStyle + '>'
                                +'<img src="' + currentTiles[i + 1].url
                                +' height="50" width="50" border="0"' + imagDivStyle + '">'
                                +'</a>'
                        +'</div>'
                        +'<div' + cellDivStyle + '>'
                                +'<a href="!DungeonDrawNumber ' + currentTiles[i + 2].key + '" ' + atagTwoStyle + '>'
                                +'<img src="' + currentTiles[i + 2].url
                                +' height="50" width="50" border="0"' + imagDivStyle + '">'
                                +'</a>'
                        +'</div>'
                        +'<div' + cellDivStyle + '>'
                                +'<a img href="!DungeonDrawNumber ' + currentTiles[i + 3].key + '" ' + atagTwoStyle + '>'
                                +'<img src="' + currentTiles[i + 3].url
                                +' height="50" width="50" border="0"' + imagDivStyle + '">'
                                +'</a>'
                        +'</div>'
                    +'</div>';
            i = i + 4;
        }
        tableText += '</div>';
        sendChat("Current Tiles", tableText);
        
        sendChat('Main Menu', '/direct '
            +'<br><a href="!DungeonDrawUndo"' + atagOneStyle + '><span ' + spanOneStyle + '>↻-Undo-Path</span></a>'
            +'<br><a href="!DungeonDrawMap"' + atagOneStyle + '><span ' + spanOneStyle + '>╔╣-Dungeon-Draw</span></a>'
            +'<br><a href="!DungeonDrawClear ?{Are You Sure|Y}"' + atagOneStyle + '><span ' + spanOneStyle + '>⊠-Clear-Map</span></a>'
            +'<br><a href="!DungeonDrawColor"' + atagOneStyle + '><span ' + spanOneStyle + '>▓-Set-Map-Color</span></a>'
            +'<br><a href="!DungeonDrawReady"' + atagOneStyle + '><span ' + spanOneStyle + '>⇕-Ready-Door-Torches</span></a>'
            +'<br><a href="!DungeonDrawChange"' + atagOneStyle + '><span ' + spanOneStyle + '>⊞-Change-Texture</span></a>'
            );
    },
    
    clearMap = function(y) {
        var currentPageGraphics = findObjs({                              
            _pageid: Campaign().get('playerpageid'),                              
            _type: 'graphic',
            layer: 'map'
        });
        
        if( 'Y' !== y ){return; }
        
        _.each(currentPageGraphics, function(obj) {    
            getObj('graphic', obj.id).remove();
        });
        currentPageGraphics = findObjs({                              
            _pageid: Campaign().get('playerpageid'),                              
            _type: 'path',
            layer: 'map'
        });
        _.each(currentPageGraphics, function(obj) {    
            getObj('path', obj.id).remove();
        });
        undo = [];
    },
    
    macrosInstall = function() {
        var controllerName = 'Door-And-Torch-Control',
            controllerSheet = findObjs({ _type: 'character', name: controllerName}), 
            controllerAbility;
        if ( 0 === controllerSheet.length ) { 
            createObj('character', {name: controllerName, avatar: toggleIcon}); 
        }
        controllerAbility = findObjs({ 
            _type: 'ability', 
            name: '⇕-Toggle-Feature', 
            characterid: findObjs({ _type: 'character', name: controllerName})[0].get('_id'),
        });
        if ( 0 === controllerAbility.length ) { 
            createObj('ability', {
                name: '⇕-Toggle-Feature', 
                characterid: findObjs({ _type: 'character', name: controllerName})[0].get('_id'),
                action: '!DungeonMapperDoorsToggle',
                istokenaction: true
            }); 
        }
    },
    
    doorInitial = function(name,id){
        var findPaths;
        
        switch(name) {
            case 'DD_017':
            case 'DD_019':
                findPaths = findObjs({_type: 'path', controlledby: id});
                _.each(findPaths, function(path) {
                    if( '#FFFF00' === path.get('stroke') ){
                       path.set('layer', 'gmlayer');
                    }
                });
            break;
            case 'DD_018':
            case 'DD_020':
                findPaths = findObjs({_type: 'path', controlledby: id});
                _.each(findPaths, function(path) {
                    if( '#00FF00' === path.get('stroke') ){
                       path.set('layer', 'gmlayer');
                    }
                });
            break;
        }
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
            findPaths,
            a, b;
            
        if ( false === objCheck ) {return; }    
        token = getObj('graphic', selected._id);
        name = token.get('name');
        id = token.get('id');
        
        switch(name) {
            case 'DD_017':
            case 'DD_018':
                a = _.where(currentTiles, {key: 'DD_017'})[0].url;
                b = _.where(currentTiles, {key: 'DD_018'})[0].url;
                token.set('imgsrc', (token.get('imgsrc') === a ? b : a));
                token.set('name', (token.get('imgsrc') === a ? 'DD_017' : 'DD_018'));
                break;
            case 'DD_019':
            case 'DD_020':
                a = _.where(currentTiles, {key: 'DD_019'})[0].url;
                b = _.where(currentTiles, {key: 'DD_020'})[0].url;
                token.set('imgsrc', (token.get('imgsrc') === a ? b : a));
                token.set('name', (token.get('imgsrc') === a ? 'DD_019' : 'DD_020'));
                break;    
            case 'DD_021':
            case 'DD_022':
                a = _.where(currentTiles, {key: 'DD_021'})[0].url;
                b = _.where(currentTiles, {key: 'DD_022'})[0].url;
                token.set('imgsrc', (token.get('imgsrc') === a ? b : a));
                token.set('light_radius', (token.get('imgsrc') === a ? 40 : 0));
                token.set('name', (token.get('imgsrc') === a ? 'DD_021' : 'DD_022'));
                break;   
            case 'DD_023':
            case 'DD_024':
                a = _.where(currentTiles, {key: 'DD_023'})[0].url;
                b = _.where(currentTiles, {key: 'DD_024'})[0].url;
                token.set('imgsrc', (token.get('imgsrc') === a ? b : a));
                token.set('light_radius', (token.get('imgsrc') === a ? 40 : 0));
                token.set('name', (token.get('imgsrc') === a ? 'DD_023' : 'DD_024'));
                break;
            case 'DD_027':
            case 'DD_028':
                a = _.where(currentTiles, {key: 'DD_027'})[0].url;
                b = _.where(currentTiles, {key: 'DD_028'})[0].url;
                token.set('imgsrc', (token.get('imgsrc') === a ? b : a));
                token.set('name', (token.get('imgsrc') === a ? 'DD_027' : 'DD_028'));
                break;
        }
        
        
        switch(name) {
            case 'DD_017':
            case 'DD_019':
                findPaths = findObjs({_type: 'path', controlledby: id});
                _.each(findPaths, function(path) {
                    if( '#FFFF00' === path.get('stroke') ){
                       path.set('layer', 'walls');
                    }
                    if( '#00FF00' === path.get('stroke') ){
                       path.set('layer', 'gmlayer');
                    }
                });
            break; 
            case 'DD_018':
            case 'DD_020':
                findPaths = findObjs({_type: 'path', controlledby: id});
                _.each(findPaths, function(path) {
                    if( '#FFFF00' === path.get('stroke') ){
                       path.set('layer', 'gmlayer');
                    }
                    if( '#00FF00' === path.get('stroke') ){
                       path.set('layer', 'walls');
                    }
                });
            break; 
        }
        
    },
    
    dungeonDrawReady = function() {
        var allObjectImages = findObjs({ _type: 'graphic', layer: 'objects', pageid: Campaign().get('playerpageid')}),
            controllerName = 'Door-And-Torch-Control', name;
        
        _.each(allObjectImages, function(obj) {
            name = obj.get('name');
            switch(name) {
                case 'DD_021':
                case 'DD_022':
                case 'DD_023':
                case 'DD_024':
                case 'DD_028':
                case 'DD_027':
                    macrosInstall();
                    obj.set('represents', findObjs({ _type: 'character', name: controllerName})[0].get('_id'));
                break;
                case 'DD_017':
                case 'DD_018':
                case 'DD_019':
                case 'DD_020':
                    macrosInstall();
                    obj.set('represents', findObjs({ _type: 'character', name: controllerName})[0].get('_id'));
                    doorInitial(name,obj.get('id'));
                break;
            }
        });
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
    
    createTile = function(pageid, degree, url, topTile, leftTile, key) {
        createObj('graphic', {
            type: 'graphic', 
            subtype: 'token', 
            pageid: pageid, 
            layer: 'map',
            width: 70,
            height: 70,
            left: leftTile, 
            top: topTile, 
            imgsrc: url,
            rotation: degree,
            name: key
        });
    },

    eigthBitClockwise = function(value, degree) {
        var shift = (degree/90) * 2;
        return (((value | (value << 8)) >> shift) & 255);
    },
    
    placeTiles = function(pageid) {
        var bitTiles = [],
            newValue,
            newMask,
            maskedMapSquare,
            i,
            foundTiles,
            foundTile;
            
        _.each(currentTiles, function(eachTile) {
            if( 0 !== eachTile.value ){
                bitTiles.push({
                    degree: 0, 
                    value: eachTile.value,
                    mask: eachTile.mask,
                    url: eachTile.url,
                    key: eachTile.key
                });
            }
            newValue = eigthBitClockwise(eachTile.value, 90);
            newMask = eigthBitClockwise(eachTile.mask, 90);
            bitTiles.push({
                degree: 90, 
                value: newValue,
                mask: newMask,
                url: eachTile.url,
                key: eachTile.key
            });
            newValue = eigthBitClockwise(eachTile.value, 180);
            newMask = eigthBitClockwise(eachTile.mask, 180);
            bitTiles.push({
                degree: 180, 
                value: newValue,
                mask: newMask,
                url: eachTile.url,
                key: eachTile.key
            });
            newValue = eigthBitClockwise(eachTile.value, 270);
            newMask = eigthBitClockwise(eachTile.mask, 270);
            bitTiles.push({
                degree: 270, 
                value: newValue,
                mask: newMask,
                url: eachTile.url,
                key: eachTile.key
            });
        }); 

        _.each(tileSidePattern, function(eachTile) {
            i=0;
            while (i < bitTiles.length) {
                maskedMapSquare = parseInt( eachTile.mapBits, 2 ) & bitTiles[i].mask;
                foundTiles = _.where(bitTiles, {value: maskedMapSquare});
                if(bitTiles[i].value === maskedMapSquare){
                    createTile(pageid, bitTiles[i].degree, bitTiles[i].url, eachTile.topTile, eachTile.leftTile, bitTiles[i].key);
                    break;
                }
                i++;
            }
            
        });
    },
    
    findTileSidePattern = function(pageWidth,pageHeight) {
        var rowCount,
            columnCount,
            mapBits; 
        
        tileSidePattern = [];
        for (rowCount = 0; rowCount < (pageHeight + 2); rowCount++) {
            for (columnCount = 0; columnCount < (pageWidth + 2); columnCount++) {
                if( (0 !== rowCount) && (0 !== columnCount) && (pageHeight) >= rowCount && (pageWidth) >= columnCount ) {
                    if( '1' === paddedAsciiMap[rowCount][columnCount]) {
                        mapBits = paddedAsciiMap[rowCount - 1][columnCount - 1];
                        mapBits += paddedAsciiMap[rowCount - 1][columnCount];
                        mapBits +=  paddedAsciiMap[rowCount - 1][columnCount + 1];
                        mapBits += paddedAsciiMap[rowCount][columnCount + 1];
                        mapBits += paddedAsciiMap[rowCount + 1 ][columnCount + 1];
                        mapBits += paddedAsciiMap[rowCount + 1][columnCount];
                        mapBits += paddedAsciiMap[rowCount + 1][columnCount - 1];
                        mapBits += paddedAsciiMap[rowCount][columnCount - 1];
                        tileSidePattern.push({
                            topTile: ((rowCount - 1) * 70) + 35,
                            leftTile: ((columnCount - 1) * 70) + 35,
                            mapBits: mapBits
                        });
                    }
                }
            }
        } 
    },
        
    findFill = function(path) {
        var rowCount,
            columnCount,
            pageHeight = path.pageHeight,
            pageWidth = path.pageWidth,
            leftMostLeft = (path.pathLeft - (path.width/2)) / 70,
            topMostTop = (path.pathTop - (path.height/2)) / 70,
            width = path.width / 70,
            height = path.height / 70,
            currentPath;
        
        //Flag tiles
        for (rowCount = 0; rowCount < height; rowCount++) {
            for (columnCount = 0; columnCount < width; columnCount++) {
                asciiMap[topMostTop + rowCount][leftMostLeft + columnCount] = "1";
            }
        }
        
        //Pad Edges
        paddedAsciiMap = [];
        for (rowCount = 0; rowCount < (pageHeight + 2); rowCount++) {
            paddedAsciiMap[rowCount] = [];
            for (columnCount = 0; columnCount < (pageWidth + 2); columnCount++) {
                if( 0 === rowCount || (pageHeight + 1) === rowCount || 0 === columnCount || (pageWidth + 1) === columnCount ){
                    paddedAsciiMap[rowCount][columnCount] = '0';
                }else{
                    paddedAsciiMap[rowCount][columnCount] = asciiMap[(rowCount - 1)][(columnCount - 1)];
                }
            }
        }
        
        currentPath = getObj('path', path.id);
        currentPath.remove();
    },
  
    dungeonDrawMap = function() {
        var copyPaths, 
        pageid,
        page,
        pageWidth, 
        pageHeight,
        sortedPaths = [], 
        thePath,
        rowCount,
        columnCount;
        
        if( 0 === undo.length ){return; }
        copyPaths = _.clone(undo); 
        
        pageid =  getObj('path', _.first(copyPaths)).get('pageid');
        page = getObj('page', pageid);
        pageWidth =  page.get('width');
        pageHeight =  page.get('height');
        
        asciiMap = [];
        for (rowCount = 0; rowCount < pageHeight; rowCount++) {
            asciiMap[rowCount] = [];
            for (columnCount = 0; columnCount < pageWidth; columnCount++) {
                asciiMap[rowCount][columnCount] = '0';
            }
        }

        _.each(copyPaths, function(eachPath) {
            thePath = getObj('path', eachPath);
            sortedPaths.push({
                id: eachPath,
                area: (thePath.get('width')/70) * (thePath.get('height')/70),
                pathLeft: thePath.get('left'),
                pathTop: thePath.get('top'),
                width: thePath.get('width'),
                height: thePath.get('height'),
                pageWidth: pageWidth,
                pageHeight: pageHeight
                });
        });
        sortedPaths = _.sortBy(sortedPaths, 'area')
        sortedPaths.reverse();
        _.each(sortedPaths, function(eachPath) {
            findFill(eachPath);
        });
        
        findTileSidePattern(pageWidth,pageHeight);
        placeTiles(pageid);
    },
 
    dungeonDrawUndo = function() {
        var lastItem,
            obj;
        if( 0 === undo.length ){return; }
        lastItem = undo.pop();
        obj = getObj('path', lastItem);
        obj.remove(); 
    },

    checkInstall = function() {
        macrosInstall();
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
        currentTiles = _.clone(DungeonDrawTiles[state.DungeonDraw.currentTextureName]);
        sendChat('Main Menu', '<a href="!DungeonDrawMenu"' + atagOneStyle + '><span ' + spanOneStyle + '>Dungeon Draw Menu</span></a>');
    },
    
    handleGraphicDestroy = function(obj) {
        var locatedPaths = findObjs({                                                          
            _type: 'path',
            controlledby: obj.get('_id')
        });
        _.each(locatedPaths, function(eachPath) {
            if (eachPath.length !== 0) { 
                eachPath.remove();
            }
        });
    },
    
    specialTiles = function(obj) {
        var name = obj.get('name'),
            foundTiles,
            value,
            pageId = obj.get('_pageid'),
            rotation = obj.get('rotation'),
            tileLeft = obj.get('left'),
            tileTop = obj.get('top'),
            tileVflip = obj.get('flipv'),
            tileHflip = obj.get('fliph'),
            tileId = obj.get('_id'),
            featurePathArray,
            locatedPaths;
            
        featurePathArray = [];
        switch(name) {
                    case 'DD_025':
                    case 'DD_026':
                        obj.set({
                            width: 140,
                            height: 140,
                        });
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,141],[0,0],[140,0],[140,141]],
                            stroke: '#FFFF00',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 'DD_027':
                    case 'DD_028':
                        obj.set({
                            width: 140,
                            height: 140,
                            layer: 'objects',
                        });
                    break;
                    case 'DD_021':
                    case 'DD_023':
                        obj.set({
                            width: 140,
                            height: 140,
                            light_radius: 60,
                            light_dimradius: 20,
                            light_otherplayers: true,
                            layer: 'objects'
                        });
                    break;
                    case 'DD_022':
                    case 'DD_024':
                        obj.set({
                            width: 140,
                            height: 140,
                            light_radius: 0,
                            light_dimradius: 20,
                            light_otherplayers: true,
                            layer: 'objects'
                        });
                    break;
                    case 'DD_017':
                    case 'DD_018':
                        obj.set({
                            width: 140,
                            height: 140,
                            layer: 'objects'
                        });
                        //Door Wall
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[60,65],[141,65],[141,70]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                        //Door Open
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[60,65],[55,70],[60,120]],
                            stroke: '#00FF00',
                            strokewidth: 3,
                            forID: tileId
                        });
                        //DoorClosed
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,70],[0,65],[60,65]],
                            stroke: '#FFFF00',
                            strokewidth: 3,
                            forID: tileId
                        });       
                    break;
                    case 'DD_019':
                    case 'DD_020':
                        obj.set({
                            width: 140,
                            height: 140,
                            layer: 'objects'
                        });
                        //DoorClosed_Double
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,70],[0,65],[140,65],[140,70]],
                            stroke: '#FFFF00',
                            strokewidth: 3,
                            forID: tileId
                        });
                        //DoorClosed_Single
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,70],[0,65],[15,65],[25,128]],
                            stroke: '#00FF00',
                            strokewidth: 3,
                            forID: tileId
                        });
                        featurePathArray.push({
                            width: 140,
                            height: 140,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[140,70],[140,65],[125,65],[115,128]],
                            stroke: '#00FF00',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
        }
        if(_.isEmpty(featurePathArray)){
            return;
        }
        locatedPaths = findObjs({                                                          
            _type: 'path',
            controlledby: tileId
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
        var name = obj.get('name'),
            foundTiles,
            value,
            pageId,
            rotation, 
            tileLeft, 
            tileTop, 
            tileVflip, 
            tileHflip,
            tileId,
            bitCount,
            featurePathArray,
            locatedPaths;
        
        foundTiles = _.where(currentTiles, {key: name});
        if( 0 === foundTiles.length) {
            return;
        }
        if ( (255 === foundTiles[0].value) && (0 === foundTiles[0].mask) ){
            specialTiles(obj); 
            return;
        }
        activePage = obj.get('_pageid'); 
        value = foundTiles[0].value;
        pageId = obj.get('_pageid');
        rotation = obj.get('rotation'); 
        tileLeft = obj.get('left'); 
        tileTop = obj.get('top');
        tileVflip = obj.get('flipv'); 
        tileHflip = obj.get('fliph');
        tileId = obj.get('_id');
        
        locatedPaths = findObjs({                                                          
            _type: 'path',
            controlledby: tileId
        });
        _.each(locatedPaths, function(eachPath) {
            if (eachPath.length !== 0) { 
                eachPath.remove();
            }
        });
        
        featurePathArray = [];
        for (bitCount = 0; bitCount < 8; bitCount++) {
            if (!(value & (1<<bitCount))) {
                switch(bitCount + 1) {
                    case 1:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,-1],[0,71]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 2:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,68],[0,70],[2,70]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 3:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[-1,70],[71,70]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 4:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[70,68],[70,70],[68,70]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 5:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[70,-1],[70,71]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 6:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[70,2],[70,0],[68,0]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 7:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[-1,0],[71,0]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                    case 8:
                        featurePathArray.push({
                            width: 70,
                            height: 70,
                            top: tileTop,
                            left: tileLeft,
                            rotation: rotation,
                            fliph: tileHflip,
                            flipv: tileVflip,
                            path: [[0,2],[0,0],[2,0]],
                            stroke: '#FF0000',
                            strokewidth: 3,
                            forID: tileId
                        });
                    break;
                }
            }
        }
        placeRotatedFlipPaths(featurePathArray);
        toFront(obj);
    },
    
    getCenter = function(xy, wh) {
        var center;
        center = (Math.round((xy - (wh / 2))/35) * 35) / 70;
        center = center - Math.floor(center);
        if( 0.5 === center ) {
            xy = xy - 35;
        } 
        return xy;
    },
   
    handlePathAdd = function(obj) {
        if( false === state.DungeonDraw.drawMode ){return; }
        var top = obj.get('top'), 
            left = obj.get('left'), 
            width = obj.get('width'),
            height = obj.get('height'), 
            layer = obj.get('layer'), 
            pageid = obj.get('_pageid'), 
            stroke = obj.get('stroke'), 
            newPath,             
            createdPath;
        if( 'map' !== layer ){return; }
        activePage = pageid;
        obj.remove(); 
        
        width = Math.ceil(width/70) * 70;
        height = Math.ceil(height/70) * 70;
        top = Math.ceil(top/35) * 35;
        top = getCenter(top, height);
        left = Math.ceil(left/35) * 35;
        left = getCenter(left, width); 
        newPath = '[["M",0,0],["L",' + width + ',0],["L",' + width + ',' + height + '],["L",0,' + height + '],["L",0,0]]';

        createdPath = createObj('path',{ 
            pageid: pageid, 
            layer: layer, 
            path: newPath,
            left: left,
            top: top,
            width: width, 
            height: height, 
            fill: stroke,
            stroke: stroke,
            stroke_width: 1,
            controlledby: 'DungeonDraw'
        });
        
        undo.push(createdPath.get('id'));
    },
    
    handlePathDestroy = function(obj) {
        undo = _.without(undo, obj.get('id'));
    },

    handlePathChange = function(obj) {
        //log(obj);
    },
    
    handleInput = function(msg) {
        var message = _.clone(msg), args;
        
        if ( 'api' !== message.type ) {return; }
        
        args = msg.content.split(/\s+/);
        
        switch(args[0]) {
            case '!DungeonDrawMenu': dungeonDrawMenu(); return;
            case '!DungeonDrawUndo': dungeonDrawUndo(); return;
            case '!DungeonDrawMap': dungeonDrawMap(); return;
            case '!DungeonDrawClear': clearMap(args[1]); return;
            case '!DungeonDrawColor': colorMap(); return;
            case '!DungeonDrawNumber': dungeonDrawNumber(args[1]); return;
            case '!DungeonDrawReady': dungeonDrawReady(); return;
            case '!DungeonMapperDoorsToggle': dungeonMapperDoorsToggle(message); return;
            case '!DungeonDrawChange': dungeonDrawChange(); return;
            case '!DungeonDrawSetTexture': dungeonDrawSetTexture(msg.content); return;
        };
        return;
    },
 
    registerEventHandlers = function() {
        on('chat:message', handleInput);
        on('change:graphic', handleGraphicChange);
        on('destroy:graphic', handleGraphicDestroy);
        on('add:path', handlePathAdd);
        on('change:path', handlePathChange);
        on('destroy:path', handlePathDestroy);
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
