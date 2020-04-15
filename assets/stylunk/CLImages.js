var CLImages = (function(){
	var frameCache = LRUCache(100);
	
	function CLSpriteFrame(spriteJs){
		this.data = spriteJs.data.slice(0);
		this.width = spriteJs.width;
		this.height = spriteJs.height;
	}

	CLSpriteFrame.prototype.drawInImageData = function(colorTable, imgData, drawX, drawY, zoom) {
		if ( zoom == 1 ) {
			var line = drawY;
			var cursor = ( drawY * imgData.width + drawX ) * 4;
			this.data.forEach(function(ix){
				switch(ix.op){
					case 'next':
						cursor = ( ++line * imgData.width + drawX ) * 4;
					break;
					case 'skip':
						cursor += ix.n * 4;
					break;
					case 'draw':
						ix.data.forEach(function(pix){
							imgData.data[cursor] = colorTable[pix][0];
							imgData.data[cursor+1] = colorTable[pix][1];
							imgData.data[cursor+2] = colorTable[pix][2];
							imgData.data[cursor+3] = 255;
							cursor+=4;
						});
					break;
				}
			});
		} else {
			var line = drawY;
			var cursor = ( drawY * imgData.width + drawX ) * 4;
			this.data.forEach(function(ix){
				switch(ix.op){
					case 'next':
						line += zoom;
						cursor = ( line * imgData.width + drawX ) * 4;
					break;
					case 'skip':
						cursor += ix.n * 4 * zoom;
					break;
					case 'draw':
						ix.data.forEach(function(pix){
							for ( var subY = 0 ; subY < zoom ; subY ++ ) {
								for ( var subX = 0 ; subX < zoom ; subX ++ ) {
									imgData.data[cursor + subX * 4 + subY * imgData.width * 4] = colorTable[pix][0];
									imgData.data[cursor + subX * 4 + subY * imgData.width * 4 + 1] = colorTable[pix][1];
									imgData.data[cursor + subX * 4 + subY * imgData.width * 4 + 2] = colorTable[pix][2];
									imgData.data[cursor + subX * 4 + subY * imgData.width * 4 + 3] = 255;
								}
							}
							cursor+=4*zoom;
						});
					break;
				}
			});
		}
	}

	CLSpriteFrame.prototype.drawInContext = function(colorTable, ctx, drawX, drawY, zoom) {
		var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

		this.drawInImageData(colorTable, imgData, drawX, drawY, zoom);

		ctx.putImageData(imgData, 0, 0);
	}

	CLSpriteFrame.prototype.draw = function( colorTable, target, drawX, drawY, zoom ) {
		drawX = Math.floor(drawX);
		drawY = Math.floor(drawY);
		
		if ( ! zoom ) zoom = 1;
		
		if ( "CANVAS" == target.nodeName ) {
			var ctx = target.getContext("2d");
			this.drawInContext( colorTable, ctx, drawX, drawY, zoom );
		} else if ( target.canvas ) {
			this.drawInContext(colorTable, target, drawX, drawY, zoom )
		} else {
			this.drawInImageData(colorTable, target, drawX, drawY, zoom );
		}
	}
	
	function loadFrame( spriteId, poseX, poseY, callback ) {
		jQuery.ajax( '/assets/stylunk/sprite-js-2/'+spriteId+'/'+poseX+'_'+poseY+'.js', {
			dataType:'text',
			success: function(data) {
				data = eval('(('+data+'))');
				callback(new CLSpriteFrame(data));
			}, 
			error: function(xhr, status, err) {
				//console.log('ajax failure:', xhr, status, err);
			}
		});
	}
	
	var activeLoads = {};
	
	return {
		getSpriteFrame : function(spriteId, poseX, poseY, callback) {
			var key = spriteId + ':' + poseX + ':' + poseY;
			
			var result = frameCache.get(key);
			
			if ( result ) return callback( result );
			
			if ( activeLoads[key] ) {
				activeLoads[key].push(callback);
			} else {
				activeLoads[key] = [callback];
				
				loadFrame( spriteId, poseX, poseY, function(loaded) {
					frameCache.set(key,loaded);
					
					activeLoads[key].forEach(function(cb){ cb(loaded); });
					delete activeLoads[key];
				});
			}
		}
	}
})();