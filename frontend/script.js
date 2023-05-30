// Access the webcam and stream video
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        var video = document.getElementById("video");
        video.srcObject = stream;
        video.play();
    })
    .catch(function (error) {
        console.log("Error accessing webcam: " + error);
    });

// Capture image from video stream
function captureImage() {
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to data URL
    var dataURL = canvas.toDataURL("image/png");

    // Send dataURL to the server for face recognition
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: dataURL })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful');
        } else {
            console.log('Login failed');
        }
    })
    .catch(error => {
        console.log('Error: ' + error);
    });
}

document.getElementById('captureButton').addEventListener('click', captureImage);
