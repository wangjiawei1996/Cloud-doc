const QiniuManager = require('./src/utils/QiniuManager')
const accessKey = 'QhPee3DoXzlj6bYxa5IGnpsoBmYR5X9QxbQ_zE-o';
const secretKey = 'QttXMmKyn27vzGvq8_zK3C7yRcOD9Ncyp0fBsZG7';

var localFile = "/Users/wangjiawei/Desktop/README.md";
var key='README.md';
const manager = new QiniuManager(accessKey, secretKey, 'anthony96')
manager.deleteFile(key)
// manager.uploadFile(key, localFile)
// var publicBucketDomain = 'http://q53yy67pz.bkt.clouddn.com';
