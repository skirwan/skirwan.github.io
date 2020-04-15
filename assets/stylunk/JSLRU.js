var LRUCache = (function(){
	return function(cacheSize){
		if ( typeof(cacheSize) != "number" ) cacheSize = 10;
		
		var content = {};
		var accessedKeys = [];
		var accessCounter = 0;
		
		function findIndexForAccessTime(accessTime) {
			var low = 0;
			var high = accessedKeys.length;
			var mid;

			while ( low <= high ) {
				mid = Math.floor( ( low + high ) / 2 );
				if ( accessTime < accessedKeys[mid].accessTime ) {
					low = mid + 1;
				} else if ( accessTime > accessedKeys[mid].accessTime ) {
					high = mid - 1;
				} else {
					break;
				}
			}

			if ( accessTime != accessedKeys[mid].accessTime ) {
				throw "LRUCache accessedKeys didn't contain entry for access time " + entry +  ".";
			}
			
			return mid;
		}
		
		return {
			get : function(key) {
				var entry = content[key];

				if ( ! entry ) return null;
				
				accessedKeys.splice(findIndexForAccessTime(entry.accessTime),1);
				
				entry.accessTime = accessCounter ++;
				accessedKeys.unshift( {
					accessTime: entry.accessTime,
					key: key
				} );
				
				return entry.value;
			},
			
			set : function(key, value) {
				var existing = content[key];
				
				if ( existing ) {
					
					accessedKeys.splice(findIndexForAccessTime(existing.accessTime),1);

					existing.accessTime = accessCounter ++;
					accessedKeys.unshift( {
						accessTime: existing.accessTime,
						key: key
					} );
					
					existing.value = value;
				} else {
					var newEntry = {
						accessTime: accessCounter ++,
						value: value
					}
					
					content[key] = newEntry;
					
					accessedKeys.unshift( {
						accessTime: newEntry.accessTime,
						key: key
					} );
					
					var removed = accessedKeys.splice( cacheSize );
					
					for ( var i = 0 ; i < removed.length ; i ++ ) {
						delete content[removed[i].key];
					}
				}
			},
			
			dump : function() {
				var dump = {};
				
				for ( var prop in content ) {
					dump[prop] = { value: content[prop].value, accessTime: content[prop].accessTime };
				}
				
				return dump;
			}
		}
	}
})()
