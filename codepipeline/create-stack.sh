aws cloudformation create-stack \
--stack-name voicefoundry-custom-ccp-dev \
--template-body file://template.yml \
--parameters file://parameters.json \
--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM