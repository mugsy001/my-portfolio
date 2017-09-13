import boto3  #(there are resources for three major aws services)
import StringIO
import zipfile
from botocore.client import Config
import mimetypes



def lambda_handler(event, context):
    # TODO implement
    #create name for s3 resource
    import boto3

    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:952916189126:deployPortfolioTopic')

    try:
        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

        #create name for both buckets
        portfolio_bucket = s3.Bucket('portfolio.test')
        build_bucket = s3.Bucket('portfoliobuild.portfolio.test')

        #create stringio in memory file of zipfile
        #and downloading the zipfile to that object
        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuild.zip',portfolio_zip)

        #using the zipfile to extract, upload and set the ACK to public
        with zipfile.ZipFile(portfolio_zip ) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm)
                #need to make each file public
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
        topic.publish(Subject="Portfolio Deployed", Message="Portfolio deployed successfully.")
        print "job done!"
    except:
        topic.publish(Subject="Portfolio Deploy Failed", Message="The Portfolios wasn't deployed successfully")
        raise

    return 'Hello from Lambda'
