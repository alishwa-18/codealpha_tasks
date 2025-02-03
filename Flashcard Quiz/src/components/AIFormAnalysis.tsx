import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Camera, AlertCircle } from 'lucide-react';

const AIFormAnalysis: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializePoseDetection = async () => {
      try {
        await tf.ready();
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig = {
          runtime: 'tfjs',
          modelType: 'full'
        };
        const detector = await poseDetection.createDetector(model, detectorConfig);
        setDetector(detector);
      } catch (err) {
        setError('Failed to initialize pose detection. Please ensure camera access is granted.');
      } finally {
        setIsInitializing(false);
      }
    };

    initializePoseDetection();
  }, []);

  const startAnalysis = async () => {
    if (!detector || !webcamRef.current || !canvasRef.current) {
      setError('Camera or pose detection not initialized properly');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const analyzePose = async () => {
        if (!isAnalyzing) return;

        const video = webcamRef.current?.video;
        if (!video) return;

        try {
          const poses = await detector.estimatePoses(video);
          
          if (poses.length > 0) {
            const pose = poses[0];
            analyzePoseQuality(pose);
            drawPose(pose);
          }

          if (isAnalyzing) {
            requestAnimationFrame(analyzePose);
          }
        } catch (err) {
          console.error('Error during pose analysis:', err);
          setError('Error analyzing pose. Please try again.');
          setIsAnalyzing(false);
        }
      };

      analyzePose();
    } catch (err) {
      console.error('Error starting analysis:', err);
      setError('Failed to start analysis. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const analyzePoseQuality = (pose: poseDetection.Pose) => {
    const keypoints = pose.keypoints;
    const hipPoint = keypoints.find(point => point.name === 'left_hip');
    const kneePoint = keypoints.find(point => point.name === 'left_knee');
    const anklePoint = keypoints.find(point => point.name === 'left_ankle');

    if (hipPoint && kneePoint && anklePoint) {
      const angle = calculateAngle(hipPoint, kneePoint, anklePoint);
      
      if (angle < 90) {
        setFeedback('Good depth! Maintain form.');
      } else if (angle < 120) {
        setFeedback('Go lower to achieve proper squat depth.');
      } else {
        setFeedback('Start the squat movement.');
      }
    }
  };

  const calculateAngle = (p1: poseDetection.Keypoint, p2: poseDetection.Keypoint, p3: poseDetection.Keypoint) => {
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - 
                   Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  };

  const drawPose = (pose: poseDetection.Pose) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw keypoints
    pose.keypoints.forEach(keypoint => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      }
    });

    // Draw skeleton
    const connections = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.BlazePose);
    connections.forEach(([i, j]) => {
      const kp1 = pose.keypoints[i];
      const kp2 = pose.keypoints[j];

      if (kp1.score && kp2.score && kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setFeedback('');
  };

  return (
    <div className="card dark:bg-gray-800/90 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Camera className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">AI Form Analysis</h2>
        </div>
        <button
          onClick={isAnalyzing ? stopAnalysis : startAnalysis}
          disabled={isInitializing}
          className={`btn-primary flex items-center space-x-2 ${
            isAnalyzing ? 'bg-red-500 hover:bg-red-600' : ''
          } ${isInitializing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Camera className="w-5 h-5" />
          <span>{isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2 text-red-500">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        <Webcam
          ref={webcamRef}
          className="absolute inset-0 w-full h-full object-contain"
          mirrored
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {isInitializing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="text-blue-500">Initializing AI...</p>
            </div>
          </div>
        )}
      </div>

      {feedback && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-500">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default AIFormAnalysis;