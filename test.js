const qiniu = require('qiniu')

const accessKey = 'QhPee3DoXzlj6bYxa5IGnpsoBmYR5X9QxbQ_zE-o';
const secretKey = 'QttXMmKyn27vzGvq8_zK3C7yRcOD9Ncyp0fBsZG7';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: 'anthony96',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

var localFile = "/Users/wangjiawei/Desktop/README.md";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key='README.md';
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode === 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});

var bucketManager = new qiniu.rs.BucketManager(mac, config);
var publicBucketDomain = 'http://q53yy67pz.bkt.clouddn.com';
// 公开空间访问链接
var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
console.log(publicDownloadUrl);

