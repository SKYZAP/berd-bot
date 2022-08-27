import { BadRequestException, Injectable } from '@nestjs/common';
import { MediaDto } from './utils';

const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const path = require('path');
require('dotenv').config();

@Injectable()
export class AppService {
  public async UploadToCloudinary(file, target?): Promise<MediaDto> {
    try {
      if (!target) {
        target = 'trace';
      }

      if (!file)
        throw new BadRequestException('No file was provided for upload!');

      let imageObject;
      cloudinary.config({
        cloud_name: process.env.CD_NAME,
        api_key: process.env.CD_KEY,
        api_secret: process.env.CD_SECRET,
      });

      const parser = new DatauriParser();
      const content = parser.format(
        path.extname(file.originalname).toString(),
        file.buffer,
      ).content;

      await cloudinary.uploader.upload(
        content,
        { folder: target },
        (error, result) => {
          if (error) {
            throw new BadRequestException(`${error}`);
          }

          imageObject = { url: result.secure_url, public_id: result.public_id };
        },
      );

      return imageObject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async DeleteFromCloudinary(publicId, target?): Promise<Boolean> {
    try {
      if (!target) {
        target = 'trace';
      }

      if (!publicId)
        throw new BadRequestException('No id was provided for deletion!');

      cloudinary.config({
        cloud_name: process.env.CD_NAME,
        api_key: process.env.CD_KEY,
        api_secret: process.env.CD_SECRET,
      });

      await cloudinary.uploader.destroy(
        publicId,
        { folder: target, resource_type: 'image' },
        function (error, result) {
          if (error || result !== 'ok') {
            return false;
          }
        },
      );

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
