import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export const CheckValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const CheckValidObjectID = (id) => {
  return String(id).match(/^[0-9a-fA-F]{24}$/);
};

export class UploadDto {
  @IsString()
  title: string;

  @IsString()
  name: string;
}

@ObjectType()
export class MediaDto {
  @Field()
  @IsString()
  url: string;

  @Field()
  @IsString()
  public_id: string;
}

@InputType()
export class MediaInputDto {
  @Field()
  url: string;

  @Field()
  public_id: string;
}

@InputType()
export class PaginationOptions {
  @Field({ nullable: true })
  page?: number = 1;

  @Field({ nullable: true })
  records?: number = 5;
}

@InputType('StatChangeInputDto')
@ObjectType()
export class StatChangeDto {
  @Field()
  statName: string;

  @Field()
  value: number;
}

export const CapitalizeFirstLetter = (string) => {
  string = string.toLowerCase();
  let words = string.split(' ');
  let newString = '';
  for (let i = 0; i < words.length; i++) {
    if (!(i == words.length - 1)) {
      newString =
        newString + words[i].charAt(0).toUpperCase() + words[i].slice(1) + ' ';
    } else {
      newString =
        newString + words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return newString;
};
