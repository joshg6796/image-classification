# Image Classification
Image classification using [TensorFlowJS](https://www.tensorflow.org/js) and Angular 10 by file upload or by webcam streaming. The [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) model is used to classify the image element and the streaming video element.

File upload:

* After choosing an image, the image will be loaded and the model will classify the image returning the top three predictions for that image.
  
Webcam Streaming:

* When the webcam is turned on, the video streaming will begin and the model will classify the HTMLVideoElement returning the top three predictions for that video element every three seconds.
