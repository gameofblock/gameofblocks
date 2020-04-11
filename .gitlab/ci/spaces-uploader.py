# https://medium.com/@brianobilo/uploading-files-to-digital-ocean-spaces-using-api-keys-and-boto3-1f24242f6cd7
import os
import boto3
from boto3 import session
from botocore.client import Config
from boto3.s3.transfer import S3Transfer

#Use the API Keys you generated at Digital Ocean
ACCESS_ID = os.environ['SPACES_KEY_ID']
SECRET_KEY = os.environ['SPACES_SECRET_ACCESS_KEY']

print(ACCESS_ID)

# # Initiate session
# session = session.Session()
# client = session.client('s3', 
#                         region_name='sfo2', 
#                         endpoint_url='sfo2.digitaloceanspaces.com',
#                         aws_access_key_id=ACCESS_ID,
#                         aws_secret_access_key=SECRET_KEY)

# transfer = S3Transfer(client)

# # Uploads a file called 'name-of-file' to your Space called 'name-of-space'
# # Creates a new-folder and the file's final name is defined as 'name-of-file' 
# transfer.upload_file('name-of-file', 'name-of-space', 'new-folder'+"/"+'new-name-of-file')

# #This makes the file you are have specifically uploaded public by default. 
# response = client.put_object_acl(ACL='public-read', Bucket='name-of-space', Key="%s/%s" % ('new-folder', 'new-name-of-file'))