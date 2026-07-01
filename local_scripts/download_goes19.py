# local_scripts/download_goes19.py
import boto3
from botocore import UNSIGNED
from botocore.config import Config
import os

def download_data():
    s3 = boto3.client('s3', config=Config(signature_version=UNSIGNED))
    bucket_name = 'noaa-goes19'
    
    # Prefix path for GOES-19 CMI CONUS data (Year: 2025, Julian Day: 180, Hour: 12 UTC)
    # Channel 13 is the Thermal Infrared channel (10.3 micrometers)
    prefix = 'ABI-L2-CMIPC/2025/180/12/'
    
    print(f"Connecting to NOAA GOES-19 Public S3 Bucket...")
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
    
    if 'Contents' not in response:
        print("Error: No files found. Check date/time prefix.")
        return
        
    # Get all files containing Channel 13 data (C13)
    c13_files = [obj['Key'] for obj in response['Contents'] if 'C13' in obj['Key']]
    c13_files.sort()
    
    if len(c13_files) < 3:
        print(f"Error: Found only {len(c13_files)} files. Need at least 3.")
        return
        
    # Take 3 consecutive frames (spaced 10 minutes apart)
    selected_files = c13_files[:3]
    
    # Create the data folder locally
    os.makedirs('data', exist_ok=True)
    
    print("\nStarting downloads:")
    for idx, key in enumerate(selected_files):
        filename = os.path.basename(key)
        local_path = f"data/frame_{idx}.nc"
        print(f"Downloading Frame {idx}: {filename} ➔ {local_path}")
        s3.download_file(bucket_name, key, local_path)
        
    print("\nData download complete! Files stored in the 'data/' folder.")

if __name__ == "__main__":
    download_data()