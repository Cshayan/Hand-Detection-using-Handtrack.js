const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size .
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.82, // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Get the DOM from HTML
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({
                    video: {}
                }, stream => {
                    video.srcObject = stream;
                     requestAnimationFrame(runDetection);
                },
                err => console.log(err));
        }
    });


function runDetection() {
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            if (predictions.length > 0) {
                audio.play();
            }
            requestAnimationFrame(runDetection);
        });
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });