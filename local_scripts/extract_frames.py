import xarray as xr
import numpy as np
import cv2
import os
def process_nc_to_png(nc_path, output_png_path, variable_name='CMI'):
    """
    Reads NetCDF file, extracts TIR data, normalizes Kelvin values,
    and exports a 3-channel grayscale PNG image.
    """
    if not os.path.exists(nc_path):
        print(f"Error: {nc_path} not found. Run download_goes19.py first.")
        return False
        
    print(f"Processing {nc_path}...")
    ds = xr.open_dataset(nc_path)
    data = ds[variable_name].values
    
    # Fill NaN values with the mean temperature
    data = np.nan_to_num(data, nan=np.nanmean(data))
    
    # Robust outlier-aware normalization using 1st and 99th percentiles
    min_val = np.percentile(data, 1)
    max_val = np.percentile(data, 99)
    data_clipped = np.clip(data, min_val, max_val)
    
    # Map to 0-255 uint8 range
    normalized = ((data_clipped - min_val) / (max_val - min_val) * 255).astype(np.uint8)
    
    # Convert to 3-channel grayscale for deep learning compatibility
    grayscale_3ch = cv2.merge([normalized, normalized, normalized])
    
    # Save the frame
    os.makedirs(os.path.dirname(output_png_path), exist_ok=True)
    cv2.imwrite(output_png_path, grayscale_3ch)
    print(f"Saved: {output_png_path}")
    return True
if __name__ == "__main__":
    # Preprocess the 3 downloaded frames
    process_nc_to_png("data/frame_0.nc", "web_dashboard/public/original/frame_00.png")
    process_nc_to_png("data/frame_1.nc", "web_dashboard/public/ground_truth/frame_10.png")
    process_nc_to_png("data/frame_2.nc", "web_dashboard/public/original/frame_20.png")
    print("\nExtraction complete! Frames saved to React public directories.")