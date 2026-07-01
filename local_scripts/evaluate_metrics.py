# local_scripts/evaluate_metrics.py
import numpy as np
import cv2
import json
import os
from skimage.metrics import structural_similarity as ssim
from skimage.metrics import peak_signal_noise_ratio as psnr

def evaluate_and_export():
    # Final clean paths at the root of the project
    gt_path = "public/ground_truth/frame_10.png"
    pred_path = "public/interpolated/frame_10_interpolated.png"
    
    if not os.path.exists(gt_path):
        print(f"Error: Ground truth frame not found at {gt_path}. Make sure it is inside public/ground_truth/.")
        return
        
    if not os.path.exists(pred_path):
        print(f"Error: AI frame not found at {pred_path}. Place your downloaded Colab image in public/interpolated/.")
        return

    # Load images in grayscale
    gt_image = cv2.imread(gt_path, cv2.IMREAD_GRAYSCALE)
    pred_image = cv2.imread(pred_path, cv2.IMREAD_GRAYSCALE)
    
    # Resize prediction to match ground truth size if they differ
    if gt_image.shape != pred_image.shape:
        print(f"Resizing prediction from {pred_image.shape} to match ground truth {gt_image.shape}...")
        pred_image = cv2.resize(pred_image, (gt_image.shape[1], gt_image.shape[0]))

    # Compute metrics
    mse_val = np.mean((gt_image - pred_image) ** 2)
    psnr_val = psnr(gt_image, pred_image, data_range=255)
    ssim_val = ssim(gt_image, pred_image, data_range=255)
    
    # Sobel filters for FSIM approximation
    sobelx_gt = cv2.Sobel(gt_image, cv2.CV_64F, 1, 0, ksize=3)
    sobely_gt = cv2.Sobel(gt_image, cv2.CV_64F, 0, 1, ksize=3)
    grad_gt = np.sqrt(sobelx_gt**2 + sobely_gt**2)

    sobelx_pred = cv2.Sobel(pred_image, cv2.CV_64F, 1, 0, ksize=3)
    sobely_pred = cv2.Sobel(pred_image, cv2.CV_64F, 0, 1, ksize=3)
    grad_pred = np.sqrt(sobelx_pred**2 + sobely_pred**2)

    fsim_approx = np.mean(2 * grad_gt * grad_pred + 1e-5) / np.mean(grad_gt**2 + grad_pred**2 + 1e-5)

    metrics_report = {
        "mse": round(float(mse_val), 4),
        "psnr": f"{round(float(psnr_val), 2)} dB",
        "ssim": round(float(ssim_val), 4),
        "fsim": round(float(fsim_approx), 4)
    }

    # Save to JSON file inside the root public directory
    os.makedirs('public', exist_ok=True)
    with open("public/metrics.json", "w") as f:
        json.dump(metrics_report, f, indent=4)
        
    print("\nValidation completed successfully!")
    print(json.dumps(metrics_report, indent=4))

if __name__ == "__main__":
    evaluate_and_export()