var imageLoader = {
    videoSources: [
    	{id: 'bjBefore', data: 'https://imgur.com/5IGnXnq.mp4', width: 177, height: 240},
    	{id: 'bjAfter', data: 'https://imgur.com/9t1kbXZ.mp4', width: 177, height: 240}
    ],

    imageSources: [
    	{id: 'cmd-line-image', data: 'https://i.imgur.com/lsjtPLV.png', width: 300, height: 355},
    	{id: 'excel-image', data: 'https://imgur.com/xiSYQXo.png', width: 300, height: 355},
    	{id: 'seads-image', data: 'https://i.imgur.com/VIl6hLk.png', width: 199, height: 355}

    ],



    /**
     * Looks for figures with id's in the videoSources 
     * and appends video elements with the data source 
     * @return {undefined}
     */
    appendVideoElements: function() {
    	var id, data;
    	var figure;
    	var height, width;
    	for(var i = this.videoSources.length-1; i >= 0; i--) {
    		id = this.videoSources[i]['id'];
    		data = this.videoSources[i]['data'];
    		width = this.videoSources[i]['width'];
    		height = this.videoSources[i]['height'];
    		figure = document.getElementById(id);
    		figure.insertBefore(this.generateVideoElement(data, width, height), figure.firstChild);
    	}
    },

    generateVideoElement: function(data, width, height) {
    	var video = document.createElement("video");
    	video.src = data;
    	video.innerhtml = "Your browser doesn't support the video tag.";
    	video.type="video/mp4";
    	video.width = width;
    	video.height = height;
    	// video.autoplay = "none";
    	video.loop = "loop";
    	// video.preload="none";
    	video.controls="controls";
    	video.muted="muted";
    	return video;
    },

    appendImageElements: function() {
    	var id, data;
    	var figure;
    	var height, width;
    	for(var i = this.imageSources.length-1; i >= 0; i--) {
    		id = this.imageSources[i]['id'];
    		data = this.imageSources[i]['data'];
    		width = this.imageSources[i]['width'];
    		height = this.imageSources[i]['height'];
    		figure = document.getElementById(id);
    		figure.insertBefore(this.generateImageElement(data, width, height), figure.firstChild);
    	}
    },

    generateImageElement: function(data, width, height) {
    	var img = document.createElement("img");
    	img.src = data;
    	img.width = width;
    	img.height = height;
    	return img;
    },


};