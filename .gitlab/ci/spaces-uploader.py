# https://medium.com/@brianobilo/uploading-files-to-digital-ocean-spaces-using-api-keys-and-boto3-1f24242f6cd7
import os
from os import walk
import boto3
from boto3 import session
from botocore.client import Config
from boto3.s3.transfer import S3Transfer

public_folder_path = '../../packages/app/public'

files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(public_folder_path):
    print(d)
    for file in f:
        files.append(os.path.join(r, file))

#Use the API Keys you generated at Digital Ocean
ACCESS_ID = os.environ['SPACES_KEY_ID']
SECRET_KEY = os.environ['SPACES_SECRET_ACCESS_KEY']

# Initiate session
session = session.Session()
client = session.client('s3', 
                        region_name='sfo2', 
                        endpoint_url='https://sfo2.digitaloceanspaces.com',
                        aws_access_key_id=ACCESS_ID,
                        aws_secret_access_key=SECRET_KEY)

transfer = S3Transfer(client)
name_of_space = "assets.gameofblocks"

for f in files:
    file_to_import = f[(len(public_folder_path) + 1):len(f)]
    print(file_to_import)
    transfer.upload_file(f, name_of_space, file_to_import)
    # This makes the file you are have specifically uploaded public by default. 
    response = client.put_object_acl(ACL='public-read', Bucket=name_of_space, Key=file_to_import)

print(len(files) + " files uploaded")