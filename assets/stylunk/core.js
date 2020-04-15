var berries = ['lila','bramble','orga'];
var methods = ['bleach','dye'];

var dyeconfig = {
    dye : {
        'B' : 2,
        'L' : 0,
        'O' : 1
    },
    bleach : {
        'B' : [ 0, 1 ],
        'L' : [ 1, 2 ],
        'O' : [ 0, 2 ],
    },
    ShirtDark: 202,
    ShirtMid: 195,
    ShirtLight: 182,
    PantsDark: 170,
    PantsLight: 127
};

var state = {
    race:0,
    variant:0,
    underwear:1,
    skin:0,
    hair:0,
    skindye:0,
    shoes:0,
    belt:0,
    helm:0,
    weapon:0,
    cloaked:false,
    baseshirt:0,
    basepants:0,
    shirtrecipe:[],
    pantsrecipe:[]
};

function cloneState(){
    return jQuery.extend(true, {},state);
}

function computeShirt(baseId,recipe) {
    if ( baseId == 0 ) return [];

    var sc = jQuery.extend(true, [], shirt[baseId].colors);
    
    for ( var i = 0 ; i < recipe.length ; i ++ ) {
        var berry =  recipe[i].berry;
        if ( recipe[i].op == '+' ) {
            // dye
            if ( sc[dyeconfig.ShirtLight][dyeconfig.dye[berry]] > 102 ) sc[dyeconfig.ShirtLight][dyeconfig.dye[berry]] -= 51;
            if ( sc[dyeconfig.ShirtMid][dyeconfig.dye[berry]] > 51 ) sc[dyeconfig.ShirtMid][dyeconfig.dye[berry]] -= 51;
            if ( sc[dyeconfig.ShirtDark][dyeconfig.dye[berry]] > 0 ) sc[dyeconfig.ShirtDark][dyeconfig.dye[berry]] -= 51;
        } else {
            // bleach
            if ( sc[dyeconfig.ShirtLight][dyeconfig.bleach[berry][0]] < 204 ) sc[dyeconfig.ShirtLight][dyeconfig.bleach[berry][0]] += 51;
            if ( sc[dyeconfig.ShirtLight][dyeconfig.bleach[berry][1]] < 204 ) sc[dyeconfig.ShirtLight][dyeconfig.bleach[berry][1]] += 51;

            if ( sc[dyeconfig.ShirtMid][dyeconfig.bleach[berry][0]] < 153 ) sc[dyeconfig.ShirtMid][dyeconfig.bleach[berry][0]] += 51;
            if ( sc[dyeconfig.ShirtMid][dyeconfig.bleach[berry][1]] < 153 ) sc[dyeconfig.ShirtMid][dyeconfig.bleach[berry][1]] += 51;

            if ( sc[dyeconfig.ShirtDark][dyeconfig.bleach[berry][0]] < 102 ) sc[dyeconfig.ShirtDark][dyeconfig.bleach[berry][0]] += 51;
            if ( sc[dyeconfig.ShirtDark][dyeconfig.bleach[berry][1]] < 102 ) sc[dyeconfig.ShirtDark][dyeconfig.bleach[berry][1]] += 51;
        }
    }
    return sc;
}

function computePants(baseId,recipe) {
    if ( baseId == 0 ) return [];

    var sc = jQuery.extend(true, [], pants[baseId].colors);
    
    for ( var i = 0 ; i < recipe.length ; i ++ ) {
        var berry =  recipe[i].berry;
        if ( recipe[i].op.substr(0,1) == '+' ) {
            // dye
            if ( sc[dyeconfig.PantsLight][dyeconfig.dye[berry]] > 102 ) sc[dyeconfig.PantsLight][dyeconfig.dye[berry]] -= 51;
            if ( sc[dyeconfig.PantsDark][dyeconfig.dye[berry]] > 0 ) sc[dyeconfig.PantsDark][dyeconfig.dye[berry]] -= 51;
        } else {
            // bleach
            if ( sc[dyeconfig.PantsLight][dyeconfig.bleach[berry][0]] < 204 ) sc[dyeconfig.PantsLight][dyeconfig.bleach[berry][0]] += 51;
            if ( sc[dyeconfig.PantsLight][dyeconfig.bleach[berry][1]] < 204 ) sc[dyeconfig.PantsLight][dyeconfig.bleach[berry][1]] += 51;

            if ( sc[dyeconfig.PantsDark][dyeconfig.bleach[berry][0]] < 102 ) sc[dyeconfig.PantsDark][dyeconfig.bleach[berry][0]] += 51;
            if ( sc[dyeconfig.PantsDark][dyeconfig.bleach[berry][1]] < 102 ) sc[dyeconfig.PantsDark][dyeconfig.bleach[berry][1]] += 51;
        }
    }
    return sc;
}

function canApplyColor(state,article,method,berry){
    if(article=='shirt'){
        if ( state.baseshirt == 0 )
            return false;
        
        if ( shirt[state.baseshirt].locked ) return false;
        
        var c = computeShirt(state.baseshirt,state.shirtrecipe);

        if (method=='dye'){
            if (c[dyeconfig.ShirtLight][dyeconfig.dye[berry]] >= 153 ) return true;
            if (c[dyeconfig.ShirtMid][dyeconfig.dye[berry]] >= 102 ) return true;
            if (c[dyeconfig.ShirtDark][dyeconfig.dye[berry]] >= 51 ) return true;
        } else if (method=='bleach') {
            if (c[dyeconfig.ShirtLight][dyeconfig.bleach[berry][0]] < 204 ) return true;
            if (c[dyeconfig.ShirtLight][dyeconfig.bleach[berry][1]] < 204 ) return true;

            if (c[dyeconfig.ShirtMid][dyeconfig.bleach[berry][0]] < 153 ) return true;
            if (c[dyeconfig.ShirtMid][dyeconfig.bleach[berry][1]] < 153 ) return true;

            if (c[dyeconfig.ShirtDark][dyeconfig.bleach[berry][0]] < 102 ) return true;
            if (c[dyeconfig.ShirtDark][dyeconfig.bleach[berry][1]] < 102 ) return true;
        }
        return false;
    }else{
        if ( state.basepants == 0 )
            return false;

        var c = computePants(state.basepants, state.pantsrecipe);

        if (method=='dye'){
            if (c[dyeconfig.PantsLight][dyeconfig.dye[berry]] >= 153 ) return true;
            if (c[dyeconfig.PantsDark][dyeconfig.dye[berry]] >= 51 ) return true;
        } else if (method=='bleach') {
            if (c[dyeconfig.PantsLight][dyeconfig.bleach[berry][0]] < 204 ) return true;
            if (c[dyeconfig.PantsLight][dyeconfig.bleach[berry][1]] < 204 ) return true;

            if (c[dyeconfig.PantsDark][dyeconfig.bleach[berry][0]] < 102 ) return true;
            if (c[dyeconfig.PantsDark][dyeconfig.bleach[berry][1]] < 102 ) return true;
        }
    }

}
function imageIdForState(s) {
    return icons[s.race].variants[s.variant][s.cloaked?'cloakedImage':'image'];
}

function overrideColors(table, overrides){
    for ( var c in overrides ) {
        table[c] = overrides[c];
    }
}

function colorTableForState(s) {
    var result = colorTable.slice(0);
    
    overrideColors(result, underwear[s.underwear].colors);
    overrideColors(result, hair[s.hair].colors);
    if(hair[s.hair].colors[129])
        result[251] = hair[s.hair].colors[129];
    if(hair[s.hair].colors[172])
        result[252] = hair[s.hair].colors[172];
    
    overrideColors(result, skin[s.skin].colors);
    overrideColors(result, shoes[s.shoes].colors);
    overrideColors(result, belt[s.belt].colors);
    overrideColors(result, skindye[s.skindye].colors);
    overrideColors(result, helm[s.helm].colors);
    overrideColors(result, weapon[s.weapon].colors);
    
    overrideColors(result, computeShirt(s.baseshirt, s.shirtrecipe));
    overrideColors(result, computePants(s.basepants, s.pantsrecipe));
    
    return result;
}
var previewPoseFacing = 'south';
var previewPose = 'stand';
var previewZoom = 5;

function operationsForButton(el){
    var result = {
        article: el.hasClass('shirt') ? 'shirt' : 'pants',
        operation: el.hasClass('dye') ? 'dye' : 'bleach'
    };
    
    if ( el.hasClass('bramble')) {
        result.berry = 'B';
    } else if ( el.hasClass('lila')) {
        result.berry = 'L';
    } else if ( el.hasClass('orga')) {
        result.berry = 'O';
    }
    
    return result;
}
function applyOperationToState(ops,s){
    s[ops.article+'recipe'].push( {op: ops.operation == 'dye' ? '+' : '-', berry:ops.berry } );
}
function calculatePreviewFrame(){
    var sx = 0, sy = 0;
    var frameOffX = 0;
    switch( previewPose ) {
        case 'walk1':
            frameOffX=1;
        break;
        case 'walk2':
            frameOffX=2;
        break;
        case 'attack':
            frameOffX=3;
        break;
    }
    try {
        sx = poses.stand[previewPoseFacing][0] + frameOffX;
        sy = poses.stand[previewPoseFacing][1];

        return [sx,sy];
    } catch(err) {
        return [8,0];
    }
}
function updateDisplayFromState(stateChanged){
    if ( icons[state.race].variants[state.variant].hasHelm) {
        if ( ! $('#HelmBlock').is(':visible') )
            $('#HelmBlock').slideDown();
    } else if ( $('#HelmBlock').is(':visible') ) {
        $('#HelmBlock').slideUp();
        state.helm = 0;
        $('#Helm').text(helm[state.helm].name);
    }
    
    var poseIdx = calculatePreviewFrame();
    var sx = poseIdx[0];
    var sy = poseIdx[1];
    
    var hashState = jQuery.extend(true,{},state);
    hashState.shirtrecipe=state.shirtrecipe.map(function(op){return op.op+op.berry;}).join('');
    hashState.pantsrecipe=state.pantsrecipe.map(function(op){return op.op+op.berry;}).join('');
    
    var hash = jQuery.param(hashState);
    location.hash = hash;
    $('.outfit-link-box input').val(document.location.href.replace(/#.*$/,'') + '#' + hash);
    
    var imgId = imageIdForState(state);
    CLImages.getSpriteFrame(imgId, sx, sy, function(icon){
        var currPoseIdx = calculatePreviewFrame();
        if ( currPoseIdx[0] != sx ) return;
        if ( currPoseIdx[1] != sy ) return;
        
        var c = $('#Preview canvas').get(0);
        var ctx = c.getContext("2d");
        
        ctx.clearRect( 0, 0, c.width, c.height );
        
        var ct = colorTableForState(state);
        
        icon.draw(ct, ctx, c.width/2 - icon.width/2*previewZoom, c.height/2 - icon.height/2*previewZoom, previewZoom);
    })
    
    if ( state.baseshirt != 0 && state.shirtrecipe.length > 0 ) {
        $('.recipe-block.shirt-recipe input').removeAttr('disabled');
        $('.recipe-block.shirt-recipe span').text(shirt[state.baseshirt].name + ' ' + state.shirtrecipe.map(function(r){ return r.op + r.berry }).join(' '));
    } else {
        $('.recipe-block.shirt-recipe input').attr('disabled', 'disabled');
        
        if ( state.baseshirt != 0 ) {
            $('.recipe-block.shirt-recipe span').text(shirt[state.baseshirt].name);
        } else {
            $('.recipe-block.shirt-recipe span').text('');
        }
    }
    
    if ( state.basepants != 0 && state.pantsrecipe.length > 0) {
        $('.recipe-block.pants-recipe input').removeAttr('disabled');
        $('.recipe-block.pants-recipe span').text(pants[state.basepants].name + ' ' + state.pantsrecipe.map(function(r){ return r.op + r.berry }).join(' '));
    } else {
        $('.recipe-block.pants-recipe input').attr('disabled', 'disabled');
        
        if ( state.baseshirt != 0 ) {
            $('.recipe-block.pants-recipe span').text(pants[state.basepants].name);
        } else {
            $('.recipe-block.pants-recipe span').text('');
        }
    }
    
    if ( stateChanged ) {
        if ( icons[state.race].cloakOnly || shirt[state.baseshirt].cloakOnly ) {
            $('.cloak-box').addClass('disabled');
            $('.cloak-box input[type=checkbox]').attr('disabled','disabled');
        } else {
            $('.cloak-box').removeClass('disabled');
            $('.cloak-box input[type=checkbox]').removeAttr('disabled');
        }
        
        $('.button-panel .preview-button').each(function(idx,b){
            b = $(b);
            
            var ops = operationsForButton(b);
            
            if ( canApplyColor(state, ops.article, ops.operation, ops.berry ) ) {
                b.removeClass('disable');
                
                var s = cloneState();

                applyOperationToState(ops, s);

                CLImages.getSpriteFrame(imgId, 8, 0, function(icon){
                    var c = b.find('canvas').get(0);
                    var ctx = c.getContext("2d");

                    ctx.clearRect( 0, 0, c.width, c.height );

                    var ct = colorTableForState(s);

                    icon.draw(ct, ctx, c.width/2 - icon.width/2, c.height/3 - icon.height/2);
                })
            } else {
                b.addClass('disable');
                CLImages.getSpriteFrame(imgId, 8, 0, function(icon){
                    var c = b.find('canvas').get(0);
                    var ctx = c.getContext("2d");

                    ctx.clearRect( 0, 0, c.width, c.height );

                    var ct = colorTableForState(state);

                    icon.draw(ct, ctx, c.width/2 - icon.width/2, c.height/3 - icon.height/2);
                })
            }
            
        });
    }
}

$(document).ready(function(){
    if ( location.hash.length > 1 ) {
        var hashKeyVals = location.hash.substr(1).split('&');
        for ( var i = 0 ; i < hashKeyVals.length ; i ++ ) {
            var kv = hashKeyVals[i].split('=');
            var key = kv[0];
            var value = kv[1];
            
            if ( key == 'shirtrecipe' || key == 'pantsrecipe') {
                value = unescape(value);
                var adjsVal = [];
                var comp = value.split(/(?=[\+\-][BLO])/);
                for ( var j = 0 ; j < comp.length ; j ++ ) {
                    if(comp[j].length == 2)
                        adjsVal.push({op:comp[j].substr(0,1), berry:comp[j].substr(1,1)})
                }
                state[key] = adjsVal;
            } else {
                if (value=='false') value=false;
                if (value=='true') value=true;
                state[key] = value;
            }
        }
        
        updateDisplayFromState(true);
    }
    
    function touchDevice(){
        if ('ontouchstart' in document.documentElement) return true;
        var el = document.createElement('div');
        el.setAttribute('ontouchstart', 'return;');
        if(typeof(el['ontouchstart'])=='function') return true;
        el = null;
        
        return false;
    }
    
    var isTouch = touchDevice();
    var primaryTriggerEvent = isTouch ? 'touchend' : 'click';
    
    if ( isTouch ) {
        (function(){
            var moved = false;
            var startX = 0;
            var startY = 0;
            
            $(document).on('touchstart', function(evt){
                moved = false;
                startX = evt.originalEvent.targetTouches[0].clientX;
                startY = evt.originalEvent.targetTouches[0].clientY;
            }).on('touchmove', function(evt){
                if ( ( Math.abs( startX - evt.originalEvent.targetTouches[0].clientX ) > 10 ) || ( Math.abs( startY - evt.originalEvent.targetTouches[0].clientY ) > 10 ) ) {
                    moved = true;
                }
            }).on('touchend', function(evt){
                if(!moved)
                    closeAllPickers();
            });
        })();
    } else {
        $(document).on('click', function(evt){
            closeAllPickers();
        });
    }
    
    $('label').click(function(evt){
        evt.preventDefault();
        var target = $(this).parent().find('input[name='+$(this).attr('for')+']');
        
        if ( target.attr('type') == 'text') {
            target.focus();
            target.select();
        } else {
            target.click();
        }
    })
    
    
    var evtTarget = $('.button-panel .preview-button').bind(primaryTriggerEvent, function(evt){
        evt.preventDefault();
        
        var me = $(this);
        
        if ( me.hasClass('disable') ) return;
        
        applyOperationToState(operationsForButton(me), state);
        
        updateDisplayFromState(true);
    });
    
    if ( isTouch ) evtTarget.bind('click', function(evt){ evt.preventDefault(); });
    
    $('#Race').text(icons[state.race].name);
    $('#Variant').text(icons[state.race].variants[state.variant].name);
    addColorPipForState($('#Underwear').text(underwear[state.underwear].name), {underwear:state.underwear});
    addColorPipForState($('#Skin').text(skin[state.skin].name), {skin:state.skin});
    addColorPipForState($('#Hair').text(hair[state.hair].name), {hair:state.hair});
    addColorPipForState($('#Skindye').text(skindye[state.skindye].name), {skindye:state.skindye});
    addColorPipForState($('#Helm').text(helm[state.helm].name), {helm:state.helm});
    addColorPipForState($('#Weapon').text(weapon[state.weapon].name), {weapon:state.weapon});
    addColorPipForState($('#Shoes').text(shoes[state.shoes].name), {shoes:state.shoes});
    addColorPipForState($('#Belt').text(belt[state.belt].name), {belt:state.belt});
    addColorPipForState($('#Shirt').text(shirt[state.baseshirt].name), {baseshirt:state.baseshirt});
    addColorPipForState($('#Pants').text(pants[state.basepants].name), {basepants:state.basepants});
    
    function closeAllPickers() {
        $('.picker-view').each(function(idx,p){
            var picker = $(p);
            picker.parents('.dropdown').removeClass('active');
            picker.remove()
        });
    }
    
    function colorSampleForStateMod(stateMod) {
        var colorMod = {};
        
        if ( stateMod.baseshirt ) {
            jQuery.extend(true,colorMod, shirt[stateMod.baseshirt].colors);
        } else if ( stateMod.basepants ) {
            jQuery.extend(true,colorMod, pants[stateMod.basepants].colors);
        } else {
            for ( var prop in stateMod ) {
                if ( window[prop] && window[prop][stateMod[prop]] && window[prop][stateMod[prop]].colors ) {
                    jQuery.extend(true, colorMod, window[prop][stateMod[prop]].colors)
                }
            }
        }
        
        var props = [];
        for ( var prop in colorMod ) {
            props.push(prop);
        }
        props = props.sort();
        
        var clrs = [];
        for( var i = 0 ; i < props.length ; i ++ ) {
            clrs.push(colorMod[props[i]]);
        }
        
        return clrs.unique();
    }
    
    function addColorPipForState(element, stateMod) {
        var clrs = colorSampleForStateMod(stateMod).unique();

        var pip = $('<span class="picker-pip"></span>');

        if ( clrs.length > 1 ) {
            var decl='linear-gradient(top,'+clrs.map(function(c){ return 'rgb('+c.join()+')'; }).join()+')';

            pip.css('background','-moz-'+decl);
            pip.css('background','-webkit-'+decl);
            pip.css('background', decl);
            pip.css('display', 'inline-block');

            element.prepend(pip);
        } else if ( clrs.length == 1 ) {
            pip.css('background','rgb('+clrs[0].join()+')');
            pip.css('display', 'inline-block');

            element.prepend(pip);
        }
    }
    window.colorSampleForStateMod = colorSampleForStateMod;
    function configurePicker(sel, optionsSource) {
        var evtTarget = $(sel).bind(primaryTriggerEvent, function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            
            var picker = $(sel).find('.picker-view');
            
            if ( picker.length )
                return closeAllPickers();
            
            closeAllPickers();
            
            picker = $('<div class="picker-view"></div>');
            
            var options = optionsSource();
            
            if ( typeof(options) == "function" )
                options = options();
            
            picker.css('width',(options.width*72)+'px');
            
            for ( var section = 0 ; section < options.sections.length ; section ++ ) {
                var sectionDiv = $('<div></div>');
                
                if ( options.sections[section].header )
                    sectionDiv.append($('<h3></h3>').text(options.sections[section].header));
                
                for ( var item = 0 ; item < options.sections[section].items.length ; item ++ ) {
                    var el=$('<a href="#" class="preview-button button"><canvas width="70" height="70"></canvas><span class="name"><span></span></span></a>');
                    el.find('span.name span').text(options.sections[section].items[item].label);
                    
                    if ( options.sections[section].items[item].selected )
                        el.addClass('active');
                    
                    var s = cloneState();
                    var stateMod = options.sections[section].items[item].state;
                    
                    if ( typeof(stateMod) == "function" ) {
                        s = stateMod(s);
                    } else {
                        jQuery.extend(s,stateMod);
                    }
                    
                    (function(itemState,canvas){
                        var imgId = imageIdForState( itemState );
                        var ct = colorTableForState( itemState );
                        
                        var poseIdx = calculatePreviewFrame();
                        var sx = poseIdx[0];
                        var sy = poseIdx[1];
                        
                        CLImages.getSpriteFrame(imgId, sx, sy, function(icon){
                            icon.draw(ct, canvas, canvas.width/2 - icon.width/2, canvas.height*.4 - icon.height/2);
                        });
                    })( s, el.find('canvas').get(0) );
                    
                    (function(stateMod){
                        el.bind(primaryTriggerEvent, function(evt2){
                            evt2.preventDefault();
                            evt2.stopPropagation();
                            
                            var selEl = $(sel);
                            // This removes the picker too
                            selEl.text($(this).find('span.name span').text()).removeClass('active');
                            
                            addColorPipForState(selEl, stateMod);
                            
                            jQuery.extend(state, stateMod);
                            updateDisplayFromState(true);
                        });
                        
                        if ( isTouch ) el.bind('click', function(evt){ evt.preventDefault(); });
                    })(options.sections[section].items[item].state);
                    
                    sectionDiv.append(el);
                }
                
                picker.append(sectionDiv);
            }
            
            $(sel).append(picker).addClass('active');
        });
        
        if ( isTouch ) evtTarget.bind('click', function(evt){ evt.preventDefault(); });
    }
    
    configurePicker(
        '#Race', 
        function(){
            var currVariantGender;
            var currVariantIndex;
            
            var allVariants = icons[state.race].variants.map(function(v,idx){ return jQuery.extend(true, {index:idx}, v); });
            var genderVariants;
                                    
            if ( icons[state.race].variants[state.variant].name.indexOf('Female') == -1 ) {
                currVariantGender = 'male';
                genderVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') == -1; });
            } else {
                currVariantGender = 'female';
                genderVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') != -1; });
            }
            
            for ( currVariantIndex = 0 ; currVariantIndex < genderVariants.length ; currVariantIndex ++ ) {
                if ( genderVariants[currVariantIndex].index == state.variant ) break;
            }
            
            return {
                width: 4,
                sections: [ 
                    {
                        items: icons.map(function(i,idx){
                            var fixedVariant = 0;
                            
                            var allVariants = icons[idx].variants.map(function(v,idx){ return jQuery.extend(true, {index:idx}, v); });
                            
                            if ( currVariantGender == 'male' ) {
                                genderVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') == -1; });
                            } else {
                                genderVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') != -1; });
                            }
                            
                            if ( currVariantIndex >= genderVariants.length ) {
                                fixedVariant = genderVariants[0].index;
                            } else {
                                fixedVariant = genderVariants[currVariantIndex].index;
                            }
                                                                    
                            return {
                                selected: idx == state.race,
                                label:i.name,
                                state:{race:idx, variant:fixedVariant} 
                            };
                        })
                    }
                ]
            };
        });
    
    configurePicker(
        '#Variant', 
        function(){
            var allVariants = icons[state.race].variants.map(function(v,idx){ return jQuery.extend(true, {index:idx}, v); });
            var maleVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') == -1; });
            var femaleVariants = allVariants.filter(function(v){ return v.name.indexOf('Female') != -1; });
            
            return {
                width: Math.max(maleVariants.length, femaleVariants.length),
                sections: [ 
                    {
                        header: 'Male',
                        items: maleVariants.map(function(v){
                            return {
                                label:v.name,
                                state:{variant:v.index} };
                            })
                    },
                    {
                        header: 'Female',
                        items: femaleVariants.map(function(v){
                            return {
                                label:v.name,
                                state:{variant:v.index} };
                            })
                    }
                ]
            };
        });
    
    var keys = ['underwear','skin','hair', 'shoes', 'belt', 'skindye', 'helm', 'weapon'];
    
    for(var i = 0 ; i < keys.length ;i ++ ) {
        (function(key){
            configurePicker(
                '#'+key.substr(0,1).toUpperCase()+key.substr(1),
                function(){
                    var w = window[key].length;
                    
                    if ( w > 20 ) {
                        w = 7;
                    } else if ( w > 12 ) {
                        w = 5;
                    } else if ( w > 4 ) {
                        w = 4;
                    }
                    return {
                        width: w,
                        sections: [ 
                            {
                                items: window[key].map(function(o,idx){
                                    var ts = {};
                                    ts[key]=idx;
                                    return {
                                        selected: state[key] == idx,
                                        label:o.name,
                                        state:ts
                                    };
                                })
                            }
                        ]
                    };
                });
        })(keys[i]);			
    }
    
    function createItemSections(key, list, stateMod ) {
        var numbered = list.map( function(p, idx) { return jQuery.extend(true, {index:idx}, p); });
        
        return numbered.map(function(p){ return p.category; } ).unique().map(
            function(cat){
                return {
                    header:cat,
                    items: numbered.filter( function(p) {
                        return ( p.category == cat )
                    }).map( function(p) {
                        var itemState = {};
                        
                        if ( stateMod ) {
                            stateMod(itemState, p);
                        }
                        
                        itemState['base'+key] = p.index;
                        itemState[key+'recipe'] = [];
                        
                        return {
                            selected: state['base'+key] == p.index,
                            label: p.name,
                            state: itemState
                        }
                    })
                };
            });
    }
    
    configurePicker('#Shirt', function(){
        return {
            width: 6,
            sections: createItemSections('shirt', shirt, function(itemState, item){
                if ( item.cloakOnly ) {
                    itemState.cloaked = true;
                } else {
                    itemState.cloaked = $('.cloak-box input[type=checkbox]').get(0).checked;
                }
            })
        }
    });
    
    configurePicker('#Pants', function(){
        return {
            width: 4,
            sections: createItemSections('pants', pants)
        }
    });

    $('.cloak-box input[type=checkbox]').change(function(){
        state.cloaked = $('.cloak-box input[type=checkbox]').get(0).checked;
        updateDisplayFromState(true);
    });
    
    $('.shirt-recipe input').click(function(evt){
        evt.preventDefault();
        state.shirtrecipe = [];
        updateDisplayFromState(true);
    });
    $('.pants-recipe input').click(function(evt){
        evt.preventDefault();
        state.pantsrecipe = [];
        updateDisplayFromState(true);
    });
    
    $('.outfit-link-box a').click(function(evt){
        evt.preventDefault();
        
        window.location = $(this).attr('href');
    });
    
    sliderRadius = 10;
    sliderRevert = null;
    
    function radialDrag(x, y) {
        var scale = sliderRadius / Math.sqrt(Math.pow(y-sliderRadius,2) + Math.pow(x-sliderRadius,2));
        
        var result = {
            left: ( x-sliderRadius ) * scale + sliderRadius,
            top: ( y-sliderRadius ) * scale + sliderRadius
        }
        
        var angle = Math.atan( ( y-sliderRadius ) / ( x-sliderRadius ) ) * 360 / 2 / Math.PI + 90;
        if ( x < sliderRadius ) angle += 180;
        
        var marks = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'north'];
        var i;
        for ( i = 0 ; i < marks.length; i ++ ) {
            if ( angle <= i * 45 + 45 / 2 ) {
                angle = i * 45;
                break;
            }
        }
        
        sliderRevert = [
            -sliderRadius * Math.cos( ( angle + 90 ) / 360 * 2 * Math.PI) + sliderRadius,
            -sliderRadius * Math.sin( ( angle + 90 ) / 360 * 2 * Math.PI) + sliderRadius
        ];
        
        var facing = marks[i];
        if ( previewPoseFacing != facing ) {
            previewPoseFacing = facing;
            
            updateDisplayFromState( false );
        }
        
        return result;
    }
    
    $('.circular-slider .knob').draggable({
        start: function(evt,ui) {
            ui.helper.addClass('active');
        },
        drag: function(evt,ui) {
            var r = radialDrag( ui.position.left, ui.position.top );
            
            ui.position.left = r.left;
            ui.position.top = r.top;
            
            return;
            
            var scale = sliderRadius / Math.sqrt(Math.pow(ui.position.top-sliderRadius,2) + Math.pow(ui.position.left-sliderRadius,2));
            ui.position.left = ( ui.position.left-sliderRadius ) * scale + sliderRadius;
            ui.position.top = ( ui.position.top-sliderRadius ) * scale + sliderRadius;
            
            var angle = Math.atan( ( ui.position.top-sliderRadius ) / ( ui.position.left-sliderRadius ) ) * 360 / 2 / Math.PI + 90;
            if ( ui.position.left < sliderRadius ) angle += 180;
            
            var marks = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'north'];
            var i;
            for ( i = 0 ; i < marks.length; i ++ ) {
                if ( angle <= i * 45 + 45 / 2 ) {
                    angle = i * 45;
                    break;
                }
            }
            
            sliderRevert = [
                -sliderRadius * Math.cos( ( angle + 90 ) / 360 * 2 * Math.PI) + sliderRadius,
                -sliderRadius * Math.sin( ( angle + 90 ) / 360 * 2 * Math.PI) + sliderRadius
            ];
            
            var facing = marks[i];
            if ( previewPoseFacing != facing ) {
                previewPoseFacing = facing;
                
                updateDisplayFromState( false );
            }
        },
        stop: function(evt,ui){
            ui.helper.removeClass('active');
            if ( sliderRevert ) {
                ui.helper.css({
                    top: sliderRevert[1] + 'px',
                    left: sliderRevert[0] + 'px'
                });
            }
        }
    }).bind('touchmove', function(evt){
        evt.preventDefault();
        
        var parLoc = $('.circular-slider').offset();
        
        var relX = evt.originalEvent.targetTouches[0].pageX - parLoc.left;
        var relY = evt.originalEvent.targetTouches[0].pageY - parLoc.top;
        
        //alert( relX + ', ' + relY );
        var r = radialDrag( relX, relY );
        
        $(this).css({
            top: r.top + 'px',
            left: r.left + 'px'
        })
    }).bind('touchend', function(evt){
        evt.preventDefault();
        $(this).css({
            top: sliderRevert[1] + 'px',
            left: sliderRevert[0] + 'px'
        });
    });
    
    $('.zoom-slider .knob').draggable({
        start: function(evt,ui) {
            ui.helper.addClass('active');
        },
        drag: function(evt,ui) {
            ui.position.top = 0
            ui.position.left = Math.max(0,Math.min(100,ui.position.left));
            
            var newZoom = Math.floor( ( ui.position.left + 12 ) / 25) + 1;
            
            if ( newZoom != previewZoom ) {
                ui.helper.css({
                    height: ( 6 + 2 * newZoom ) + 'px',
                    marginTop: ( 5 - newZoom * 2 ) + 'px'
                })
                previewZoom = newZoom;
                
                updateDisplayFromState( false );
            }
        },
        stop: function(evt,ui){
            ui.helper.removeClass('active');
            ui.helper.css({
                top: '0px',
                left: ((previewZoom-1)*25) + 'px'
            });
        }
    }).bind('touchmove', function(evt){
        evt.preventDefault();

        var parLoc = $('.zoom-slider').offset();
        var relX = evt.originalEvent.targetTouches[0].pageX - parLoc.left;
        relX = Math.max(0,Math.min(100,relX));
        
        var newZoom = Math.floor( ( relX + 12 ) / 25) + 1;
        
        if ( newZoom != previewZoom ) {
            $(this).css({
                height: ( 6 + 2 * newZoom ) + 'px',
                marginTop: ( 5 - newZoom * 2 ) + 'px',
                left: relX + 'px'
            })
            previewZoom = newZoom;
            
            updateDisplayFromState( false );
        }
    }).bind('touchend', function(evt){
        evt.preventDefault();
        $(this).css({
            top: '0px',
            left: ((previewZoom-1)*25) + 'px'
        });
    });
    
    var animationTimer = null;
    
    $('.pose-picker').change(function(evt,a,b,c){
        var choice = eval($('.pose-picker').val())[0];
        
        if ( choice.type == 'pose') {
            $('.circular-slider').css('opacity', 0.5)
            
            if(animationTimer) clearInterval(animationTimer);
            
            if ( choice.pose != previewPose ) {
                previewPose = choice.pose;
                if (! previewPoseFacing) previewPoseFacing = 'south';
                
                updateDisplayFromState( false );
            }
        } else if ( choice.type == 'animation' ) {
            $('.circular-slider').css('opacity', 0.5)
            
            if(animationTimer) clearInterval(animationTimer);
            
            var f;
            var random = false;
            var directions = ['south', 'southwest', 'west', 'northwest', 'north', 'northeast', 'east', 'southeast'];
            
            switch (choice.animation){
                case 'fight':
                    f = [];
                    for ( var i = 0 ; i < directions.length ; i ++ ) {
                        f.push( { pose: 'stand', facing: directions[i] } );
                        f.push( { pose: 'attack', facing: directions[i] } );
                        f.push( { pose: 'attack', facing: directions[i] } );
                        f.push( { pose: 'stand', facing: directions[i] } );
                    }
                break;
                case 'walk':
                    f = [];
                    for ( var i = 0 ; i < directions.length ; i ++ ) {
                        f.push( { pose: 'walk1', facing: directions[i] } );
                        f.push( { pose: 'stand', facing: directions[i] } );
                        f.push( { pose: 'walk2', facing: directions[i] } );
                        f.push( { pose: 'stand', facing: directions[i] } );
                    }
                break;
                case 'run':
                    f = [];
                    for ( var i = 0 ; i < directions.length ; i ++ ) {
                        f.push( { pose: 'walk1', facing: directions[i] } );
                        f.push( { pose: 'walk2', facing: directions[i] } );
                    }
                break;
                case 'dance':
                    random = true;
                    f = [];
                    f.push( { pose: 'stand', facing: 'south' } );
                    f.push( { pose: 'leanleft' } );
                    f.push( { pose: 'leanright' } );
                    f.push( { pose: 'leanleft' } );
                    f.push( { pose: 'leanright' } );
                    f.push( { pose: 'akimbo' } );
                    f.push( { pose: 'celebrate' } );
                    f.push( { pose: 'bless' } );
                    f.push( { pose: 'kneel' } );
                break;
            }
            
            (function(frames, r){
                var j = 0;
                
                animationTimer = setInterval(function(){
                    var frame = frames[j];
                    
                    previewPose = frame.pose;
                    previewPoseFacing = frame.facing || previewPoseFacing;
                    
                    updateDisplayFromState( false );
                    
                    if ( random ) {
                        j = Math.floor(Math.random()*frames.length)
                    } else {
                        j = ( j + 1 ) % frames.length;
                    }
                },200);
            })(f, random);						
        } else {
            $('.circular-slider').css('opacity', 1 );
            
            if(animationTimer) clearInterval(animationTimer);
            animationTimer = null;
            
            if ( choice.type != previewPose ) {
                previewPose = choice.type;
                if (! previewPoseFacing) previewPoseFacing = 'south';
                updateDisplayFromState( false );
            }
        }
    })
    
    updateDisplayFromState( true );
});