import axios from 'axios'
import React from 'react'
import { Progress, notification } from 'antd'

export const GroupTypes = [
  { name: 'Programs', collectionName: 'Groupings', type: 'Programs' },
  { name: 'Events', collectionName: 'Groupings', type: 'Events' },
  { name: 'Campaigns', collectionName: 'Groupings', type: 'Campaigns' },
  { name: 'Segments', collectionName: 'Groupings', type: 'Segments' },
  { name: 'Guide', collectionName: 'Groupings', type: 'Guide' },
  { name: 'WebPage', collectionName: 'Groupings', type: 'WebPage' },
  { name: 'DND', collectionName: 'Groupings', type: 'DND' },
  { name: 'Areas', collectionName: 'Groupings', type: 'Areas' },
  { name: 'SubAreas', collectionName: 'Groupings', type: 'SubAreas' },
  { name: 'Cases', collectionName: 'Groupings', type: 'Cases' },
  { name: 'Info', collectionName: 'Groupings', type: 'Info' },
  { name: 'Police', collectionName: 'Groupings', type: 'Police' },
  { name: 'Fire', collectionName: 'Groupings', type: 'Fire' },
  { name: 'Communication', collectionName: 'Groupings', type: 'Communication' },
  { name: 'National Weather Service', collectionName: 'Groupings', type: 'National Weather Service' },
  { name: 'Twitter', collectionName: 'Groupings', type: 'Twitter' },
  { name: 'Facebook', collectionName: 'Groupings', type: 'Facebook' },
  { name: 'Instagram', collectionName: 'Groupings', type: 'Instagram' },
  { name: 'Users', collectionName: 'Groupings', type: 'Users' },
]

export const inlineStyle = {
  labelCol: { xs: { span: 3 } },
  wrapperCol: { xs: { span: 20 } },
}

export const inlineDeviceStyle = {
  labelCol: { xs: { span: 4 } },
  wrapperCol: { xs: { span: 19 } },
}

export const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  marginTop: '5px',
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export const getDepthValue = (data, field, initialValue = undefined) => {
  if (!data) return initialValue

  if (!field || field === '') {
    return data || initialValue
  }

  const terms = field.split('.')
  let current = { ...data }
  for (let i = 0; i < terms.length; i++) {
    if (!current[terms[i]]) return initialValue
    current = current[terms[i]]
  }

  return current
}

export const createActionTypes = (base, actions = []) =>
  actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`

    return acc
  }, {})

// Extract query parameters to check if backend was specified.
const qp = new URLSearchParams(window.location.search);

var bepr = "SECURE";
if (qp.has('backendprotocol')) {
  bepr = qp.get("backendprotocol");
}

// var bed = 'backend-dev.oelement.openznet.com';
var bed = 'oe-core.sig-cloud.com';
if (qp.has('backenddomain')) {
  bed = qp.get("backenddomain");
}
var bep = '4001';
if (qp.has('backendport')) {
  bep = qp.get("backendport");
}

var beu = "https://"+bed+":"+bep;
var wbeu = "wss://"+bed+":"+bep;;
if (bepr == "STANDARD")
{
  beu = "http://"+bed+":"+bep;
  wbeu = "ws://"+bed+":"+bep;;
}

export const backendProtocol = bepr;
export const backendDomain = bed;
export const backendPort = bep;
export const urlBackend = beu;
export const wsUrlBackend = wbeu;

// export const S3_BUCKET = 'assets.oelement.net'
export const S3_BUCKET = 'oe-assets.sig-cloud.com'

export const API_REST_URL = beu+'/api';
export const API_UPLOAD_FILE_TO_S3_URL = beu+'/api/media';

export const AWS_ACCESS_KEY_ID = "AKIAUTQMLYA7CP3UUFW2"
export const AWS_SECRET_ACCESS_KEY = "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"
export const AWS_REGION = "us-east-2"

console.log("urlBackend: "+urlBackend);
console.log("wsUrlBackend: "+wsUrlBackend);
console.log("API_REST_URL: "+API_REST_URL);
console.log("API_UPLOAD_FILE_TO_S3_URL: "+API_UPLOAD_FILE_TO_S3_URL);

// export const API_LAMBDA_UPLOAD_FILE = 'https://webq2f3t55.execute-api.us-east-1.amazonaws.com/prod/presigned-url'
export const API_LAMBDA_UPLOAD_FILE = 'https://x3378tqui5.execute-api.us-east-2.amazonaws.com/dev/getSignedUrl'
export const corsHandler = 'https://cors-anywhere-handler.herokuapp.com/'

export const getDateDifferenceFromToday = updated_date => {
  const today = new Date()
  const updateDate = new Date(updated_date)
  const start = Math.floor(updateDate.getTime() / (3600 * 24 * 1000)) // days as integer from..
  const end = Math.floor(today.getTime() / (3600 * 24 * 1000)) // days as integer from..
  const diff = end - start
  let diffStr = ''
  if (diff == 0) diffStr = 'Today'
  else if (diff == 1) diffStr = 'Yesterday'
  else if (diff > 1 && diff < 31) diffStr = `${diff}d ago`
  else if (diff > 31 && diff < 365) diffStr = `${Math.floor(diff / 30)} month ago`
  else if (diff >= 365) diffStr = `${Math.floor(diff / 365)}y ago`

  return diffStr
}

export const getPlainedString = str => str.replace(/ /g, '-')

export const validateUrl = value =>
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value,
  )

export default createActionTypes

export const _uploadFileToS3 = file =>
  new Promise(async (resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file.originFileObj)
    await axios
      .post(API_UPLOAD_FILE_TO_S3_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        resolve(response.data.Location)
      })
      .catch(error => {
        reject(error)
      })
  })

export const uploadFileToS3 = file =>
  new Promise(async (resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file.originFileObj)
    await axios
      .post(API_UPLOAD_FILE_TO_S3_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        resolve(response.data.Location)
      })
      .catch(error => {
        reject(error)
      })
  })


export const getImageData = url => {
  return new Promise((resolve, reject) => {
    let urlArray = url.split("/")
    let bucket = urlArray[2]
    let key = `${urlArray[3]}/${urlArray[4]}`

    var AWS = require('aws-sdk');
    let s3 = new AWS.S3({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION})
    let params = {Bucket: bucket, Key: key}

    s3.getObject(params, (err, data) => {
      if (err == null) {
        resolve(data)
      }else {
        reject(err)
      }      
    })
  })  
}

export const uploadToS3UsingPresignedUrl = file => {
  return new Promise( (resolve, reject) => {
    const fileName = `media/${Date.now()}-lg${file.name.substr(file.name.lastIndexOf('.'))}`
    const url = `${corsHandler}${API_LAMBDA_UPLOAD_FILE}?bucket=${S3_BUCKET}&key=${fileName}`;
    axios.get(url)
      .then((response) => {
        if (response.data.errorType === 'Error') {
          openNotification('error', 5, 'Get presigned url error.', response.data.errorMessage)
          reject(response.data)
        } else {
          console.log("url:", response.data.signedUrl);
          console.log("file:", file.originFileObj);
          axios.put(corsHandler+response.data.signedUrl, file.originFileObj,
            {
              onUploadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                openNotification('open',
                  percentCompleted === 100 ? 1.5 : 0,
                  percentCompleted === 100 ? 'Upload completed!' : 'Uploading...',
                  <Progress percent={percentCompleted} type="line" strokeWidth={10} />)
              }
            })
            .then(response => {
              resolve(`https://${S3_BUCKET}/${fileName}`)
            })
            .catch(error => {
              openNotification('error', 5, 'Error while upload to S3.', 'Unable to upload to S3')
              reject(error)
            })
        }
      })
      .catch(err => {
        openNotification('error', 5, 'Get presigned url error.', JSON.stringify(err))
        reject(err)
      })
  })
}

export const openNotification = (type, duration, message, description) => {
  notification[type]({
    key: 'upload-to-s3-key',
    message,
    duration,
    description,
    placement: 'bottomRight',
  })
}

