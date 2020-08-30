"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

var _storage = _interopRequireDefault(require("../../../../../config/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: process.env.AWS_DEFAULT_REGION
    });
  }

  async saveFile(file) {
    const originPath = _path.default.resolve(_storage.default.tmpFolder, file);

    const ContentType = _mime.default.getType(originPath);

    const fileContent = await _fs.default.promises.readFile(originPath);
    if (!ContentType) throw new Error('File not found');
    await this.client.putObject({
      Bucket: _storage.default.config.s3.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _storage.default.config.s3.bucket,
      Key: file
    }).promise();
  }

}

exports.default = DiskStorageProvider;