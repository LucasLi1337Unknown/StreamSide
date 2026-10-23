let task=null,kind='',busy=false;
self.onmessage=async({data:d})=>{
 if(d.type==='init'){
  try{
   kind=d.kind;const v=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/vision_bundle.mjs');
   const files=await v.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm');
   if(kind==='gesture')task=await v.GestureRecognizer.createFromOptions(files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',delegate:'CPU'},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minHandPresenceConfidence:.6,minTrackingConfidence:.6});
   else task=await v.FaceLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numFaces:1,minFaceDetectionConfidence:.6,minFacePresenceConfidence:.6});
   self.postMessage({type:'ready',kind});
  }catch(e){self.postMessage({type:'error',message:e.message||String(e),kind});}
 }
 if(d.type==='frame'){
  if(!task||busy){d.image?.close();self.postMessage({type:'skip'});return;}
  busy=true;
  try{const r=kind==='gesture'?task.recognizeForVideo(d.image,d.time):task.detectForVideo(d.image,d.time);self.postMessage({type:'result',kind,result:kind==='gesture'?{landmarks:r.landmarks,gestures:r.gestures}:{landmarks:r.faceLandmarks}});}catch(e){self.postMessage({type:'error',kind,message:e.message||String(e)});}finally{d.image.close();busy=false;}
 }
};
