var imageLoader = {
    videoSources: [
    	{id: 'bjBefore', data: 'https://imgur.com/5IGnXnq.mp4'},
    	{id: 'bjAfter', data: 'https://imgur.com/9t1kbXZ.mp4'}
    ],

    /**
     * Looks for figures with id's in the videoSources 
     * and appends video elements with the data source 
     * @return {undefined}
     */
    appendVideoElements: function() {
    	var id, data;
    	var figure;
    	for(var i = this.videoSources.length-1; i >= 0; i--) {
    		console.log(this.videoSources[i]['id']);
    		id = this.videoSources[i]['id'];
    		data = this.videoSources[i]['data'];
    		figure = document.getElementById(id);
    		figure.insertBefore(this.generateVideoElement(data), figure.firstChild);
    	}
    },

    generateVideoElement: function(data) {
    	var video = document.createElement("video");
    	video.src = data;
    	video.innerhtml = "Your browser doesn't support the video tag.";
    	video.type="video/mp4";
    	video.width = 177;
    	video.height = 240;
    	video.autoplay = "autoplay";
    	video.loop = "loop";
    	return video;
    },
};